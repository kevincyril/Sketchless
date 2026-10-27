import {useEffect,useRef,useState} from 'react';
import {api,modelLabel,modelMeasurements,isScene,type ModelSpec,type Job} from './types';
type SavedDesign={session_id:string;name:string;spec:ModelSpec|null;job_id:string|null};
export function DesignManager({sid,name,accepted,history,running,dirty,hasDraft,onName,onOpen,onRestore,onError}:{
 sid:string;name:string;accepted?:Job;history:Job[];running:boolean;dirty:boolean;hasDraft:boolean;
 onName:(name:string)=>void;onOpen:(sid:string,draft?:ModelSpec,name?:string)=>Promise<void>;
 onRestore:(job:Job)=>void;onError:(message:string)=>void;
}){
 const [open,setOpen]=useState(false),[tab,setTab]=useState('designs'),[designs,setDesigns]=useState<SavedDesign[]>([]),[saving,setSaving]=useState(false),[message,setMessage]=useState(''),[failure,setFailure]=useState('');
 const dialog=useRef<HTMLDialogElement>(null),file=useRef<HTMLInputElement>(null);
 const disabled=running||saving;
 const hasWork=!!accepted||history.length>0||hasDraft;
 const versions=history.filter(j=>j.status==='succeeded'&&j.spec);
 async function refresh(){try{setDesigns(await api('designs'));}catch(e){setFailure(String(e));}}
 useEffect(()=>{if(open){dialog.current?.showModal();refresh();}},[open]);
 function close(){setOpen(false);setMessage('');setFailure('');}
 function replaceDraft(){return !dirty||window.confirm('Replace your unbuilt size changes? Your last created model is already kept.');}
 async function save(){
  if(!name.trim()){setFailure('Give your design a name first.');return;}
  setSaving(true);setFailure('');
  try{await api('sessions/'+sid+'/name',{name:name.trim()});onName(name.trim());await refresh();setMessage('Design saved on this computer. Your conversation and browser drafts are kept, along with any created models.');}
  catch(e){setFailure(String(e));}finally{setSaving(false);}
 }
 async function keepCurrent(){if(hasWork)await api('sessions/'+sid+'/name',{name:name.trim()||'My design'});}
 async function openSaved(id:string){
  if(!replaceDraft())return;setSaving(true);setFailure('');
  try{await keepCurrent();await onOpen(id);close();}catch(e){setFailure(String(e));}finally{setSaving(false);}
 }
 async function startNew(){
  if(!replaceDraft())return;setSaving(true);setFailure('');
  try{await keepCurrent();const next=await api('sessions',{});await onOpen(next.session_id,undefined,'My design');close();}catch(e){setFailure(String(e));}finally{setSaving(false);}
 }
 async function restore(target:Job){
  if(!replaceDraft())return;setSaving(true);setFailure('');
  try{const restored=await api('sessions/'+sid+'/restore',{job_id:target.id});onRestore(restored);close();}catch(e){setFailure(String(e));}finally{setSaving(false);}
 }
 async function importFile(selected?:File){
  if(!selected)return;
  if(selected.size>65536){const message='That design file is too large. Choose a Sketchless JSON file smaller than 64 KB.';setFailure(message);onError(message);if(file.current)file.current.value='';return;}
  if(!replaceDraft()){if(file.current)file.current.value='';return;}setSaving(true);setFailure('');
  try{
    const payload=JSON.parse(await selected.text());
    const checked=await api('designs/validate',payload);
    await keepCurrent();const next=await api('sessions',{});
    await onOpen(next.session_id,checked.spec,checked.name);close();
  }catch(e){const explanation=e instanceof SyntaxError?'This is not a readable Sketchless design file. Choose a design JSON downloaded from Sketchless.':String(e);setFailure(explanation);onError(explanation);}
  finally{setSaving(false);if(file.current)file.current.value='';}
 }
 return <>
  <button className="quiet-button designs-button" disabled={!sid} onClick={()=>{setTab('designs');setOpen(true);}}>My designs</button>
  {open&&<dialog ref={dialog} onCancel={e=>{if(disabled)e.preventDefault();}} onClose={close} className="design-dialog" aria-label="My designs"><header><div><span className="eyebrow">YOUR WORK, KEPT SAFE</span><h2>My designs</h2></div><button aria-label="Close my designs" disabled={disabled} onClick={close}>×</button></header>
   <nav aria-label="Design options"><button aria-pressed={tab==='designs'} onClick={()=>setTab('designs')}>Saved designs</button><button aria-pressed={tab==='versions'} onClick={()=>setTab('versions')}>Earlier versions <span>{versions.length}</span></button></nav>
   <div className="design-dialog-content">
    {tab==='designs'?<><div className="save-current"><label>Design name<input aria-label="Design name" value={name} maxLength={64} onChange={e=>onName(e.target.value)} disabled={disabled}/></label><button onClick={save} disabled={disabled||!hasWork}>Save design</button></div><p className="design-help">Save a conversation before building, or return to your models and browser drafts later. Build your model first to keep unbuilt size changes.</p>
     <div className="design-file-actions"><button disabled={disabled} onClick={startNew}>+ New design</button><button disabled={disabled} onClick={()=>file.current?.click()}>Open a design file</button>{accepted&&<a download href={'/api/designs/'+accepted.id+'/file'}>Download design file ↓</a>}<input ref={file} type="file" accept=".json,application/json" aria-label="Open Sketchless design file" hidden onChange={e=>importFile(e.target.files?.[0])}/></div><p className="design-help">A design file keeps your measurements for later. Open it here to rebuild the model; use the model’s Download menu for STEP or STL.</p>
     <h3>Saved on this computer</h3>{!designs.length&&<div className="designs-empty">Save your first design above. You can return to it whenever you like.</div>}<div className="saved-designs">{designs.map(d=><article key={d.session_id}><div className="saved-shape" aria-hidden="true">{d.spec?.part_type==='bracket'?'∟':'▱'}</div><div><strong>{d.name}</strong><small>{d.spec?modelMeasurements(d.spec):'Planning · no model built yet'}</small></div>{d.session_id===sid?<span className="current-badge">Open</span>:<button disabled={disabled} onClick={()=>openSaved(d.session_id)}>Open</button>}</article>)}</div></>
    :<><p className="design-help">Every successful model is kept. Restore one to bring back its measurements, preview, and downloads. Your other versions stay available.</p>{!versions.length&&<div className="designs-empty">Create a model to start your version history.</div>}<div className="saved-versions">{versions.slice().reverse().map((v,i)=><article key={v.id}><div><span className="version-label">{i===0?'Most recent build':'Earlier build'}</span><strong>{v.spec?modelLabel(v.spec):'Model'}</strong><small>{v.spec?modelMeasurements(v.spec):''}</small>{v.spec?.part_type==='bracket'&&<small>{v.spec.thickness_mm} mm thick · {v.spec.holes_per_face*2} holes</small>}</div>{v.id===accepted?.id?<span className="current-badge">In use</span>:<button disabled={disabled} aria-label={'Restore version '+(versions.length-i)} onClick={()=>restore(v)}>Restore</button>}</article>)}</div><p className="design-help">Showing the successful builds among your 30 most recent requests.</p></>}
    {saving&&<p role="status">Working…</p>}{message&&<p className="design-success" role="status">{message}</p>}{failure&&<p className="field-error" role="alert">{failure}</p>}
   </div>
  </dialog>}
 </>;
}
