"""Local Desktop OAuth setup with allowlisted, secret-free stage diagnostics."""
import argparse
import base64
import hashlib
from http.server import BaseHTTPRequestHandler, HTTPServer
import importlib
import json
import os
from pathlib import Path
import re
import secrets
import tempfile
import time
from urllib.parse import urlencode, urlsplit, parse_qs
import webbrowser

SCOPE = 'https://www.googleapis.com/auth/drive.file'
PROBLEMS = {
 'desktop_required':'Select a downloaded Desktop client JSON, not a Web client or service account. Do not change scopes.',
 'client_fields':'The Desktop JSON is incomplete or has unexpected Google endpoints or loopback redirects. Download it again.',
 'output_missing':'The protected output folder is missing or is a symbolic link. Use the PowerShell wrapper.',
 'partial_output':'Only one saved authorization file exists. Existing files were preserved; inspect the partial setup before retrying.',
 'saved_invalid':'Existing saved authorization is incomplete. Files were preserved.',
 'browser_unavailable':'Windows did not open the consent browser. Check the default HTTPS browser association. The helper sent no Google request.',
 'callback_timeout':'No valid callback arrived within five minutes. Check browser consent and local loopback firewall rules; do not open a public port.',
 'callback_invalid':'The callback was malformed. No callback URL, state or code was logged.',
 'grant_missing':'Google did not return the same drive.file grant and offline tokens. Reauthorize the same scope; do not broaden permissions.',
 'folder_private':'Drive did not confirm a valid owner-private folder. No authorization files were saved.',
 'unexpected_redirect':'The provider returned an unexpected redirect. No redirect URL was printed.'}
PROVIDER_ERRORS = {
 'access_denied':'Google consent was declined or blocked by account policy.',
 'invalid_client':'Google rejected the Desktop client identity or secret. Download its JSON again from the same project.',
 'invalid_grant':'The code expired, was used already, or did not match redirect/PKCE. Start fresh consent.',
 'unauthorized_client':'Google rejected this client for the Desktop flow.',
 'redirect_uri_mismatch':'Google rejected the client type or loopback redirect. Use a Desktop client.',
 'invalid_request':'Google rejected the OAuth request. Check client type and project consent configuration.',
 'accessNotConfigured':'Drive API is not enabled for this OAuth project. Enable the existing API without changing billing.',
 'SERVICE_DISABLED':'Drive API is disabled for this OAuth project. Enable the existing API without changing billing.',
 'insufficientPermissions':'The same drive.file grant was unavailable. Reauthorize that scope; do not request full-drive access.',
 'storageQuotaExceeded':'Drive storage is exhausted. Keep the runner disabled; no purchase or billing change was requested.',
 'rateLimitExceeded':'Google temporarily limited requests. Keep the runner disabled and try later.',
 'userRateLimitExceeded':'Google temporarily limited this account. Keep the runner disabled and try later.',
 'domainPolicy':'The account administrator blocks this app or Drive access.'}

class SetupError(ValueError):
 def __init__(self,code):
  self.code=code
  super().__init__('Setup validation failed.')

def normalize_client_path(value):
 text=str(value).strip().strip('\u202a\u202c\u2066\u2069')
 if len(text)>=2 and text[0]==text[-1] and text[0] in ('"',"'"):text=text[1:-1]
 return Path(text).expanduser()

def provider_reason(response):
 try:
  data=response.json();error=data.get('error') if isinstance(data,dict) else None
  if isinstance(error,str):return error if error in PROVIDER_ERRORS else None
  if isinstance(error,dict):
   reasons=[error.get('status')]
   for key in ('errors','details'):
    if isinstance(error.get(key),list):reasons += [item.get('reason') for item in error[key] if isinstance(item,dict)]
   return next((value for value in reasons if isinstance(value,str) and value in PROVIDER_ERRORS),None)
 except Exception:pass
 return None

class Diagnostics:
 def __init__(self,output,check_only=False):
  self.path=Path(output)/('drive-preflight-diagnostics.json' if check_only else 'drive-setup-diagnostics.json')
  self.stage='dependencies'
  self.report={'status':'running','stage':self.stage,'scheduled_backups_enabled':False}
 def save(self):
  try:
   if self.path.is_symlink() or self.path.parent.is_symlink():return
   with self.path.open('w',encoding='utf-8') as stream:json.dump(self.report,stream,indent=2)
  except OSError:pass
 def start(self,stage):
  self.stage=stage;self.report.update(status='running',stage=stage);self.save()
  print('Drive setup stage: '+stage,flush=True)
 def failure(self,error):
  summary={
   'dependencies':'Required package loading failed in the wrapper virtual environment.',
   'client_read':'Reading the selected JSON failed. Check local file availability and path syntax.',
   'client_structure':'The selected JSON did not satisfy the Desktop client contract.',
   'output_permissions':'Output-folder inspection or its create/read/write/delete probe failed.',
   'loopback_bind':'The local callback listener could not bind to 127.0.0.1. Check local firewall or socket policy.',
   'browser_launch':PROBLEMS['browser_unavailable'],
   'callback_wait':'The local callback was not accepted. Check browser consent and loopback access.',
   'token_exchange':'The token exchange failed. Check the sanitized HTTP status or recognized provider reason.',
   'token_validation':'The token response did not satisfy the existing scope/offline-token contract.',
   'folder_create':'Drive folder creation failed. Check API enablement, account policy or the sanitized HTTP status.',
   'folder_validation':PROBLEMS['folder_private'],
   'credentials_save':'Saving the authorization files failed. Existing files are not overwritten.'
   ,'github_sign_in':'GitHub stored sign-in was unavailable. No credential-manager output was printed.'
   ,'repository_privacy':'The private repository check failed. Inspect GitHub access; no repository visibility was changed.'
   ,'repository_encryption_key':'The repository encryption key could not be retrieved. Check repository-secret access.'
   ,'private_setup_read':'A protected local setup file was missing, inaccessible or incomplete. No contents were printed.'
   ,'local_secret_encryption':'Local encryption to the GitHub repository key failed. Check the setup-only PyNaCl dependency.'
   ,'encrypted_secret_upload':'GitHub rejected or could not receive the locally encrypted secret. Check sanitized HTTP status and repository-secret access.'
  }.get(self.stage,'Setup failed. No exception text or provider response body was printed.')
  if isinstance(error,SetupError):summary=PROBLEMS.get(error.code,PROVIDER_ERRORS.get(error.code,summary))
  elif isinstance(error,FileNotFoundError):summary='The input file or output folder does not exist. Check the local path; it was not printed.'
  elif isinstance(error,PermissionError):summary='Windows denied access. Run as the account that owns the protected file/folder.'
  elif isinstance(error,json.JSONDecodeError):summary='The input or provider response was not valid JSON. No content was printed.'
  elif isinstance(error,ModuleNotFoundError):summary='A required package is missing from the wrapper virtual environment. Install backup/setup dependencies there.'
  elif type(error).__name__ in ('SSLError','ConnectionError','ProxyError','ConnectTimeout','ReadTimeout','Timeout'):summary='HTTPS failed due to TLS, proxy, network access or timeout. No connection details were printed.'
  elif isinstance(error,OSError) and self.stage=='browser_launch':summary=PROBLEMS['browser_unavailable']
  elif isinstance(error,KeyError):summary='A required JSON field was absent at this stage. No field value was printed.'
  self.report.update(status='failed',stage=self.stage,error_type=type(error).__name__,explanation=summary)
  if isinstance(error,OSError):
   for name in ('errno','winerror'):
    value=getattr(error,name,None)
    if type(value) is int:self.report[name]=value
  response=getattr(error,'response',None);status=getattr(response,'status_code',None)
  if type(status) is int and 100<=status<=599:
   self.report['http_status']=status;reason=provider_reason(response)
   if reason:self.report.update(provider_reason=reason,explanation=PROVIDER_ERRORS[reason])
  self.save()
  return self.report

def validate_client(data):
 if not isinstance(data,dict) or not isinstance(data.get('installed'),dict) or 'web' in data:raise SetupError('desktop_required')
 client=data['installed']
 if not all(isinstance(client.get(key),str) and client[key].strip() for key in ('client_id','client_secret','auth_uri','token_uri')):raise SetupError('client_fields')
 if (not client['client_id'].endswith('.apps.googleusercontent.com') or client['token_uri']!='https://oauth2.googleapis.com/token' or client['auth_uri'] not in ('https://accounts.google.com/o/oauth2/auth','https://accounts.google.com/o/oauth2/v2/auth')):raise SetupError('client_fields')
 redirects=client.get('redirect_uris')
 if not isinstance(redirects,list) or not any(isinstance(uri,str) and urlsplit(uri).scheme=='http' and urlsplit(uri).hostname in ('localhost','127.0.0.1','::1') for uri in redirects):raise SetupError('client_fields')
 return client

def check_output(output):
 if not output.is_dir() or output.is_symlink():raise SetupError('output_missing')
 with tempfile.NamedTemporaryFile(dir=output,prefix='.drive-permission-probe-',delete=True) as stream:
  stream.write(b'probe');stream.flush();stream.seek(0)
  if stream.read()!=b'probe':raise OSError('Output probe failed.')
 paths=[output/'drive-oauth.json',output/'drive-folder.txt'];exists=[path.exists() for path in paths]
 if any(exists) and not all(exists):raise SetupError('partial_output')
 if all(exists):
  data=json.loads(paths[0].read_text(encoding='utf-8'))
  if not isinstance(data,dict) or not all(isinstance(data.get(key),str) and data[key] for key in ('client_id','client_secret','refresh_token')) or not re.fullmatch(r'[A-Za-z0-9_-]+',paths[1].read_text().strip()):raise SetupError('saved_invalid')
 return all(exists)

def callback_handler(state,answer):
 class Callback(BaseHTTPRequestHandler):
  def do_GET(self):
   if self.path=='/favicon.ico':self.send_response(204);self.end_headers();return
   try:
    parts=urlsplit(self.path);values=parse_qs(parts.query,max_num_fields=16);supplied=values.get('state',[])
    valid=parts.path=='/' and len(supplied)==1 and secrets.compare_digest(supplied[0],state)
   except (ValueError,TypeError):valid=False
   if not valid:self.send_error(400,'Invalid OAuth callback. Return to the terminal.');return
   if 'error' in values:
    reason=values['error'][0];answer['error']=reason if reason in PROVIDER_ERRORS else 'callback_invalid'
   elif len(values.get('code',[]))==1:answer['code']=values['code'][0]
   else:answer['error']='callback_invalid'
   self.send_response(200);self.send_header('Content-Type','text/plain; charset=utf-8');self.send_header('Referrer-Policy','no-referrer');self.send_header('Cache-Control','no-store');self.end_headers()
   self.wfile.write(b'Callback received. Return to the setup terminal. No credentials belong in chat.')
  def log_message(self,*args):pass
 return Callback

def checked_json(response):
 response.raise_for_status()
 if response.status_code>=300:raise SetupError('unexpected_redirect')
 return response.json()

def configure(client_path,output_dir,*,check_only=False,diagnostics=None):
 diag=diagnostics or Diagnostics(output_dir,check_only)
 diag.start('dependencies');requests=importlib.import_module('requests');importlib.import_module('nacl.public')
 diag.start('client_read');data=json.loads(normalize_client_path(client_path).read_text(encoding='utf-8-sig'))
 diag.start('client_structure');client=validate_client(data)
 diag.start('output_permissions');output=Path(output_dir);saved=check_output(output)
 state=secrets.token_urlsafe(32);verifier=secrets.token_urlsafe(48);challenge=base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).rstrip(b'=').decode();answer={}
 diag.start('loopback_bind')
 with HTTPServer(('127.0.0.1',0),callback_handler(state,answer)) as server:
  redirect='http://127.0.0.1:'+str(server.server_port)+'/'
  if check_only or saved:
   diag.report.update(status='passed',stage='complete',client_type='Desktop',output_probe='passed',loopback_bind='passed',existing_authorization=saved,note='No browser opened, Google requests sent, secrets uploaded or runner enabled.')
   diag.save();print(json.dumps(diag.report),flush=True);return
  url='https://accounts.google.com/o/oauth2/v2/auth?'+urlencode({'client_id':client['client_id'],'redirect_uri':redirect,'response_type':'code','scope':SCOPE,'access_type':'offline','prompt':'consent','state':state,'code_challenge':challenge,'code_challenge_method':'S256'})
  diag.start('browser_launch')
  if not webbrowser.open(url):raise SetupError('browser_unavailable')
  print('Complete Google consent in the system browser. Waiting up to five minutes; callback URLs/codes are never printed.',flush=True)
  diag.start('callback_wait');server.timeout=1;deadline=time.monotonic()+300
  while not answer and time.monotonic()<deadline:server.handle_request()
 if not answer:raise SetupError('callback_timeout')
 if answer.get('error'):raise SetupError(answer['error'])
 diag.start('token_exchange')
 token=checked_json(requests.post('https://oauth2.googleapis.com/token',data={'client_id':client['client_id'],'client_secret':client['client_secret'],'code':answer['code'],'redirect_uri':redirect,'grant_type':'authorization_code','code_verifier':verifier},timeout=30,allow_redirects=False))
 diag.start('token_validation')
 if not isinstance(token,dict) or SCOPE not in token.get('scope','').split() or not all(token.get(key) for key in ('refresh_token','access_token')):raise SetupError('grant_missing')
 diag.start('folder_create')
 data=checked_json(requests.post('https://www.googleapis.com/drive/v3/files',headers={'Authorization':'Bearer '+token['access_token']},params={'fields':'id,shared,ownedByMe'},json={'name':'Sketchless private backups','mimeType':'application/vnd.google-apps.folder'},timeout=30,allow_redirects=False))
 diag.start('folder_validation')
 if not isinstance(data,dict) or data.get('shared') is not False or data.get('ownedByMe') is not True or not isinstance(data.get('id'),str) or not re.fullmatch(r'[A-Za-z0-9_-]+',data['id']):raise SetupError('folder_private')
 credentials={key:client[key] for key in ('client_id','client_secret')};credentials['refresh_token']=token['refresh_token']
 diag.start('credentials_save');created=[]
 try:
  for name,value in (('drive-oauth.json',json.dumps(credentials)),('drive-folder.txt',data['id'])):
   target=output/name;fd=os.open(target,os.O_CREAT|os.O_EXCL|os.O_WRONLY,0o600);created.append(target)
   with os.fdopen(fd,'w',encoding='utf-8') as stream:stream.write(value)
 except Exception:
  for target in created:
   try:target.unlink()
   except OSError:pass
  raise
 diag.report.update(status='passed',stage='complete',explanation='Authorization saved privately. Scheduled backups remain disabled.');diag.save()
 print('Drive authorization saved privately. The runner remains disabled.',flush=True)

def main():
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--client',required=True);parser.add_argument('--output-dir',type=Path,required=True);parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
 diag=Diagnostics(args.output_dir,args.check_only)
 try:configure(args.client,args.output_dir,check_only=args.check_only,diagnostics=diag)
 except Exception as error:
  print('Drive setup failed: '+json.dumps(diag.failure(error)),flush=True)
  raise SystemExit(1) from None

if __name__=='__main__':main()
