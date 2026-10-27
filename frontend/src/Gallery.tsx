import {useEffect,useState} from 'react';
import {Viewer} from './Viewer';
import {isScene,type ModelSpec} from './types';

type Sample={id:string;name:string;description:string;spec:ModelSpec;bounds:number[];component_count:number;mesh:string;files:{step:string;stl:string;design:string;glb?:string}};
const configured=import.meta.env.VITE_LIVE_WORKSPACE_URL as string|undefined;
const workspace=configured&&/^https:\/\//.test(configured)?configured:undefined;

export function Gallery({offline=false}:{offline?:boolean}){
 const [samples,setSamples]=useState<Sample[]>([]),[active,setActive]=useState('robot'),[selected,setSelected]=useState<string>(),[error,setError]=useState('');
 useEffect(()=>{const abort=new AbortController();fetch('./samples/catalogue.json',{signal:abort.signal}).then(r=>{if(!r.ok)throw Error('Sample models are not included in this build.');return r.json();}).then(data=>setSamples(data.samples)).catch(e=>{if(e.name!=='AbortError')setError(e.message);});return()=>abort.abort();},[]);
 const sample=samples.find(s=>s.id===active)||samples[0];
 const component=sample&&isScene(sample.spec)?sample.spec.components.find(c=>c.id===selected):undefined;
 return <div className="gallery-page">
  <header className="gallery-header"><a className="brand" href="./gallery.html">Sketchless<span className="brand-period">.</span></a><a href="https://github.com/kevincyril/Sketchless" target="_blank" rel="noreferrer">View source ↗</a></header>
  <main><section className="gallery-intro"><span className="eyebrow">INTERACTIVE CAD EXAMPLES</span><h1>Explore the idea. Inspect the model.</h1><p>Rotate real saved CAD models, select their components and download the files.</p><div className="gallery-status" role="status"><strong>{offline?'Live workspace is unavailable right now.':'You are exploring saved examples.'}</strong><p>These are pre-generated models, not new AI output. This gallery needs no AI service or account.</p></div>{offline&&<button className="gallery-retry" onClick={()=>location.reload()}>Retry live workspace</button>}{workspace?<a className="gallery-live-link" href={workspace}>Open live modeling workspace ↗</a>:<p className="gallery-pending">Live modeling deployment is pending. The examples below work independently.</p>}</section>
   <nav className="gallery-choices" aria-label="Sample models">{samples.map(s=><button key={s.id} aria-pressed={sample?.id===s.id} onClick={()=>{setActive(s.id);setSelected(undefined);}}><strong>{s.name}</strong><small>{s.description}</small></button>)}</nav>
   {error&&<p role="alert">{error}</p>}
   {sample&&<section className="gallery-model" aria-label="Saved CAD sample"><div className="gallery-model-title"><div><span className="eyebrow">SAVED CAD MODEL</span><h2>{sample.name}</h2></div><span>{sample.component_count} {sample.component_count===1?'solid':'separate solids'}</span></div><Viewer id={'sample-'+sample.id} spec={sample.spec} meshUrl={sample.mesh} bounds={sample.bounds} running={false} selected={selected} onSelect={setSelected}/>
    {component&&<div className="gallery-component"><strong>{component.name}</strong><span>{component.primitive} · {Object.entries(component.dimensions).filter(([,v])=>v!==null).map(([k,v])=>k.replace('_mm','')+': '+v+' mm').join(' · ')}</span><button onClick={()=>setSelected(undefined)}>Whole model</button></div>}
    <div className="gallery-downloads"><a href={sample.files.step} download>Download STEP</a><a href={sample.files.stl} download>Download STL</a>{sample.files.glb&&<a href={sample.files.glb} download>Download GLB</a>}<a href={sample.files.design} download>Editable design JSON</a></div>
    <p className="gallery-limit">Concepts are visual assemblies. Geometry checks do not establish motion, physical fit, strength or printability.</p>
   </section>}
   <section className="gallery-about"><h2>How Sketchless works</h2><p>A small trained classifier recognizes three precise-part families. Gemini interprets descriptions and component edits. CadQuery builds and checks the actual geometry. Concept proposals require approval before building.</p><p>The project includes version restoration, exported CAD files, offline tests and a frozen live evaluation. Read the repository for the measured results and limitations.</p></section>
  </main><footer className="gallery-footer">Sketchless · Standalone conversational CAD portfolio project</footer>
 </div>;
}
