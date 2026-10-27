import {useRef} from 'react';
import {modelLabel,modelMeasurements,type Job} from './types';
export function Conversation({history}:{history:Job[]}){
 const container=useRef<HTMLDivElement>(null);
 const requests=history.filter(j=>j.request_summary?.startsWith('Chat:')).slice(-6);
 const latest=requests.at(-1);
 if(!requests.length)return null;
 const renderEntry=(entry:Job)=><article key={entry.id}>
   <div className="prompt-user"><small>You</small><p>{entry.request_summary!.replace(/^Chat:\s*/,'')}</p></div>
   <div className={'prompt-answer '+entry.status}><small>Sketchless</small>
    {entry.status==='succeeded'&&entry.spec?<><p>{modelLabel(entry.spec)} created: {modelMeasurements(entry.spec)}.</p>{entry.changes?.filter(c=>!c.startsWith('Part type:')).map(c=><span key={c}>{c}</span>)}</>
    :entry.status==='restored'||entry.status==='clarification'?<p>{entry.message}</p>
    :entry.status==='failed'?<p>{entry.message || 'Your request failed. Check Details and try again.'}</p>
    :<p>{entry.status==='queued'?'Your request is queued.':'Working on your request…'}</p>}
   </div>
  </article>;
 return <section className="conversation-section" aria-label="Conversation history"><h3>Your conversation</h3><div ref={container} className="prompt-conversation" role="log" aria-label="Design conversation" aria-live="polite">
  {latest&&renderEntry(latest)}
  {requests.length>1&&<details className="conversation-archive"><summary>Earlier conversation ({requests.length-1})</summary>{requests.slice(0,-1).map(renderEntry)}</details>}
 </div></section>;
}
