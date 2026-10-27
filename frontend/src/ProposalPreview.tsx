import {useEffect,useRef,useState} from 'react';
import {Viewer} from './Viewer';
import type {SceneSpec} from './types';

export function ProposalPreview({spec,bounds}:{spec:SceneSpec;bounds?:number[]}){
 const [open,setOpen]=useState(false),dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(open)dialog.current?.showModal();},[open]);
 return <><button type="button" className="proposal-preview-button" onClick={()=>setOpen(true)}>Preview proposed design</button>
 {open&&<dialog ref={dialog} className="proposal-preview-dialog" aria-label="Proposed design preview" onClose={()=>setOpen(false)}>
  <header><div><span className="eyebrow">REVIEW BEFORE BUILDING</span><h2>{spec.name}</h2></div><button type="button" aria-label="Close proposed design preview" onClick={()=>setOpen(false)}>×</button></header>
  <p>This is a shape preview. CAD has not been built or checked yet. Rotate it to check the form and placement.</p>
  <Viewer draft={spec} spec={spec} bounds={bounds} running={false}/>
  <footer><p>Your current model and downloads stay unchanged. Close this preview to approve the proposal or send corrections.</p><button type="button" onClick={()=>setOpen(false)}>Back to review</button></footer>
 </dialog>}</>;
}
