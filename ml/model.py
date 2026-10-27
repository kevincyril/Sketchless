import json
from pathlib import Path
import joblib
import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score, classification_report, confusion_matrix
ROOT=Path(__file__).resolve().parent
LABELS=['enclosure','bracket','tray']
# Each independently defined seed is a group; its variants never cross splits.
SEEDS={
'enclosure':['electronics enclosure for a sensor','protective box around a circuit board','open top housing for a controller','rectangular case for an Arduino','project enclosure with thick walls','hollow box to protect electronics','instrument housing with a solid base','PCB case without a lid','protective shell for a battery','electronics box with an open top','controller enclosure 100 mm long','a housing to surround a small device'],
'bracket':['L shaped mounting bracket with holes','right angle support for a shelf','perpendicular mounting plate','angle bracket to fasten a motor','corner support with screw holes','L mount for a sensor','bent mounting bracket for a wall','ninety degree structural support','two perpendicular plates with bolts','mounting angle with drilled holes','L shaped bracket 60 mm wide','right angle fastener support'],
'tray':['shallow rectangular tray for screws','organizer dish for small parts','low sided tray for tools','flat sorting pan with a rim','catch tray under a machine','shallow parts holder','rectangular serving tray','low wall sorting dish','workbench collection pan','small hardware sorting tray','shallow tray 100 mm long','flat dish with raised edges']}

def dataset():
    rows=[]
    for label,seeds in SEEDS.items():
        for i,seed in enumerate(seeds):
            split='train' if i<8 else 'validation' if i<10 else 'test'
            for text in (seed, 'Please make '+seed, 'I need '+seed+' in millimeters'):
                rows.append(dict(text=text,label=label,group=f'{label}-{i}',split=split,provenance='synthetic starter; authored seed and mechanical variants'))
    return rows

def metrics(model,rows):
    y=[r['label'] for r in rows]; pred=model.predict([r['text'] for r in rows])
    return {'count':len(rows),'accuracy':accuracy_score(y,pred),'macro_f1':f1_score(y,pred,labels=LABELS,average='macro',zero_division=0),'per_class':classification_report(y,pred,labels=LABELS,output_dict=True,zero_division=0),'label_order':LABELS,'confusion_matrix':confusion_matrix(y,pred,labels=LABELS).tolist()}

def train():
    rows=dataset(); (ROOT/'dataset.json').write_text(json.dumps(rows,indent=2))
    train=[r for r in rows if r['split']=='train']; val=[r for r in rows if r['split']=='validation']
    model=make_pipeline(TfidfVectorizer(ngram_range=(1,2)),LogisticRegression(random_state=42,max_iter=1000,C=4))
    model.fit([r['text'] for r in train],[r['label'] for r in train])
    p=model.predict_proba([r['text'] for r in val]); correct=model.classes_[p.argmax(axis=1)]==[r['label'] for r in val]
    candidates=[]
    for threshold in (.4,.45,.5,.55,.6,.65,.7):
        accepted=p.max(axis=1)>=threshold
        precision=float(correct[accepted].mean()) if accepted.any() else 0
        candidates.append({'threshold':threshold,'coverage':float(accepted.mean()),'accepted_accuracy':precision})
    eligible=[c for c in candidates if c['accepted_accuracy']>=.9]
    choice=max(eligible,key=lambda c:(c['coverage'],c['threshold'])) if eligible else candidates[0]
    joblib.dump(model,ROOT/'classifier.joblib')
    (ROOT/'config.json').write_text(json.dumps({'threshold':choice['threshold'],'validation_candidates':candidates},indent=2))
    evaluate(model,rows)

def evaluate(model=None,rows=None):
    model=model or joblib.load(ROOT/'classifier.joblib'); rows=rows or json.loads((ROOT/'dataset.json').read_text())
    report={s:metrics(model,[r for r in rows if r['split']==s]) for s in ('train','validation','test')}
    report['limitations']='Small synthetic dataset; not real-world accuracy. Test prompts were authored in the same development session; no independently collected human evaluation yet. No test-based tuning.'
    (ROOT/'evaluation.json').write_text(json.dumps(report,indent=2)); print(json.dumps(report,indent=2))

def classify(text):
    model=joblib.load(ROOT/'classifier.joblib') # fixed project-owned path only
    p=model.predict_proba([text])[0]; scores=dict(zip(model.classes_,map(float,p)))
    threshold=float(__import__('os').getenv('CLASSIFIER_THRESHOLD',json.loads((ROOT/'config.json').read_text())['threshold']))
    return {'category':max(scores,key=scores.get),'scores':scores,'abstained':bool(max(p)<threshold),'threshold':threshold,'note':'Uncalibrated model probabilities; not certainty or comprehensive out-of-scope detection.'}

if __name__=='__main__':
    import sys
    evaluate() if '--evaluate' in sys.argv else train()

