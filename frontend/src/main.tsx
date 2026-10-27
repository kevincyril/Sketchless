import {useEffect,useRef,useState, type FormEvent} from 'react';
import {createRoot} from 'react-dom/client';
import {Viewer} from './Viewer';
import {ProposalPreview} from './ProposalPreview';
import {DesignManager} from './DesignManager';
import {Conversation} from './Conversation';
import {ComponentPanel} from './ComponentPanel';
import {RequirementSummary} from './RequirementSummary';
import {api,dimensions,containerThickness,initial,bracketDefault,specificationError,isScene,modelLabel,type ModelSpec,type SceneSpec,type Spec,type Job} from './types';
import './style.css';
const examples: {name:string;label:string;note:string;path:string;spec:Spec}[]=[
  {name:'enclosure',label:'Open box',note:'For electronics & small projects',path:'M15 25 55 8 88 26 48 45Z M15 25v25l33 15 40-20V26 M48 45v20',spec:initial},
  {name:'tray',label:'Shallow tray',note:'For organizing small things',path:'M12 36 55 15 90 34 47 55Z M12 36v9l35 16 43-20v-7 M47 55v6',spec:{...initial,part_type:'tray',length_mm:120,width_mm:80,height_mm:15}},
  {name:'bracket',label:'L-bracket',note:'For mounting & joining',path:'M20 15 48 5 48 40 82 51 54 64 20 50Z M20 15 26 18 26 46 60 58 M26 18 48 9 M26 46 48 40 M60 58 82 51',spec:bracketDefault}
];
const checkNames:Record<string,string>={valid_shape:'Valid OpenCascade shape',one_solid:'Exactly one solid',positive_volume:'Positive material volume',outer_dimensions_match:'Outer dimensions ±0.01 mm',cavity_volume_match:'Expected cavity volume',bracket_volume_match:'Expected bracket material volume',through_holes_clear:'Hole centers clear through material',hole_diameters_match:'Hole diameters match requested size',expected_hole_surfaces:'Expected cylindrical hole surfaces',step_nonempty:'STEP export size checked',stl_nonempty:'STL export size checked'};
const promptExamples=[
  {kind:'concept',label:'Robot vacuum',text:'Create a home robot cleaner with default settings: a low round robot vacuum with two drive wheels, bumper, front sensor window, a dust-bin lid, controls, lidar and a side brush. Use a 340 mm body diameter and 75 mm body height.'},
  {kind:'concept',label:'Four-legged robot',text:'Build a cube robot with four articulated legs, a 200 mm cube body, two camera eyes and 160 mm leg height. Use sensible defaults for the visual joints and feet.'},
  {kind:'concept',label:'Table concept',text:'Build a table concept with a 300 mm by 200 mm tabletop, 20 mm thick, and four cylindrical legs 250 mm high. Use sensible defaults for the leg diameter.'},
  {kind:'concept',label:'Display stand',text:'Build a display stand concept with a 120 mm diameter base 12 mm thick, a 160 mm tall post, and a 96 by 100 mm platform 12 mm thick. Use sensible defaults for the post diameter.'},
  {kind:'precise',label:'Electronics box',text:'Make an open-top electronics enclosure 100 mm long, 60 mm wide, and 35 mm high, with 3 mm walls and a 3 mm base.'},
  {kind:'precise',label:'Desk tray',text:'Make a shallow rectangular tray 120 mm long, 80 mm wide, and 15 mm high, with 3 mm walls and a 3 mm base.'},
  {kind:'precise',label:'Mounting bracket',text:'Make an L-shaped bracket with a 60 mm foot, 40 mm width, 50 mm upright, 3 mm plates, and two 5 mm holes on each face.'}
];
function displayedJob(entries:Job[],current?:Job,chosen:'auto'|'precise'|'concept'='auto'){
  const latest=entries.at(-1);
  if(latest?.workflow&&chosen!=='auto'&&latest.workflow!==chosen&&!['queued','generating'].includes(latest.status))return current;
  if(latest&&['queued','generating'].includes(latest.status))return latest;
  // Keep unanswered questions/errors on reload, while honoring a restored version.
  const lastSolid=[...entries].reverse().find(entry=>entry.status==='succeeded');
  if(latest?.status==='restored')return current;
  return latest&&lastSolid?.id===current?.id?latest:current;
}
type Workflow='auto'|'precise'|'concept';
function savedWorkflow(id:string):Workflow{const value=localStorage.getItem('sketchless-workflow:'+id);return value==='precise'||value==='concept'?value:'auto';}
function App(){
  const [mode,setMode]=useState('CONNECTING'),[sid,setSid]=useState(''),[spec,setSpec]=useState<Spec>(initial);
  const [job,setJob]=useState<Job>(),[accepted,setAccepted]=useState<Job>(),[history,setHistory]=useState<Job[]>([]);
  const [text,setText]=useState(''),[error,setError]=useState(''),[delta,setDelta]=useState('20'),[busy,setBusy]=useState(false),[inspector,setInspector]=useState(false),[activity,setActivity]=useState(false);
  const [name,setName]=useState(()=>localStorage.getItem('sketchless-project')||'My design');
  const [notice,setNotice]=useState('');
  const [aiConfigured,setAiConfigured]=useState(false);
  const [selected,setSelected]=useState<string>();
  const [workflow,setWorkflow]=useState<Workflow>('auto');
  const [sceneDraft,setSceneDraft]=useState<SceneSpec>();
  const [connection,setConnection]=useState('Connecting'),[pollError,setPollError]=useState(false);
  const previewRef=useRef<HTMLElement>(null);
  const detailsRef=useRef<HTMLDialogElement>(null);
  const promptRef=useRef<HTMLTextAreaElement>(null);
  useEffect(()=>{if(sid){localStorage.setItem('sketchless-prompt:'+sid,text);localStorage.setItem('sketchless-prompt:'+sid+':'+workflow,text);localStorage.setItem('sketchless-workflow:'+sid,workflow);}},[sid,text,workflow]);
  function changeWorkflow(next:Workflow){if(next===workflow)return;localStorage.setItem('sketchless-prompt:'+sid+':'+workflow,text);setText(localStorage.getItem('sketchless-prompt:'+sid+':'+next)||'');setWorkflow(next);setSelected(undefined);setJob(accepted);setNotice('');}
  function fillPrompt(value:string){setText(value);promptRef.current?.focus();}
  const demo=mode==='DEMO_MODE';
  const running=busy||!!job&&['queued','generating'].includes(job.status);
  const dirty=!!accepted?.spec&&!isScene(accepted.spec)&&JSON.stringify(spec)!==JSON.stringify(accepted.spec);
  const geometricError=specificationError(spec);
  useEffect(()=>{localStorage.setItem('sketchless-project',name);},[name]);
  useEffect(()=>{let dead=false;(async()=>{
    try{
      const config=await api('config');if(dead)return;setMode(config.mode);setAiConfigured(config.ai_configured===true);
      let id=localStorage.getItem('sketchless-session');
      if(id){
        try{
          const s=await api('sessions/'+id);if(dead)return;
          if(s.spec&&!isScene(s.spec))setSpec(s.spec);
          if(s.name)setName(s.name);
          const current=s.job_id?await api('jobs/'+s.job_id):undefined;
          if(current)setAccepted(current);
          const entries=await api('sessions/'+id+'/jobs');if(dead)return;
          setHistory(entries);
          setJob(displayedJob(entries,current,savedWorkflow(id!)));
        }catch(e){
          // Only discard a genuinely missing session, never a transient connection failure.
          const check=await fetch('/api/sessions/'+id);if(check.status===404)id=null;else throw e;
        }
      }
      if(!id){id=(await api('sessions',{})).session_id;localStorage.setItem('sketchless-session',id!);}
      if(!dead){setSid(id!);setWorkflow(savedWorkflow(id!));setText((localStorage.getItem('sketchless-prompt:'+id+':'+savedWorkflow(id!))??localStorage.getItem('sketchless-prompt:'+id)??'').slice(0,3000));setConnection('Connected');}
    }catch(e){if(!dead){setError(String(e));setConnection('Offline');}}
  })();return()=>{dead=true;};},[]);
  useEffect(()=>{
    if(!job||!['queued','generating'].includes(job.status))return;
    let canceled=false,inFlight=false;
    async function poll(){
      if(inFlight)return;inFlight=true;
      try{
        const next:Job=await api('jobs/'+job!.id);if(canceled)return;
        const restored=next.status==='restored'&&next.restored_job_id?await api('jobs/'+next.restored_job_id):undefined;if(canceled)return;
        setPollError(false);setConnection('Connected');setJob(next);
        if(next.status==='failed'&&next.request_summary?.startsWith('Chat:'))setText(prev=>prev||next.request_summary!.replace(/^Chat:\s*/,''));
        setHistory(prev=>prev.map(j=>j.id===next.id?next:j));
        if(next.status==='succeeded'){setSceneDraft(undefined);setAccepted(next);if(next.spec&&!isScene(next.spec))setSpec(next.spec);setSelected(undefined);}
        if(restored){setAccepted(restored);if(!isScene(restored.spec))setSpec(restored.spec);setSelected(undefined);setNotice('Previous version restored. Its model and exports are active.');}
      }catch{if(!canceled){setPollError(true);setConnection('Reconnecting');}}
      finally{inFlight=false;}
    }
    const timer=setInterval(poll,700);poll();return()=>{canceled=true;clearInterval(timer);};
  },[job?.id,job?.status]);
  useEffect(()=>{if(activity)detailsRef.current?.showModal();},[activity]);
  useEffect(()=>{if(accepted?.id && job?.status==='succeeded' && innerWidth<=740)previewRef.current?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});},[accepted?.id]);
  async function submit(payload:Record<string,unknown>){
    if(running||!sid)return;
    setError('');setNotice('');setBusy(true);
    try{const next:Job=await api('jobs',{session_id:sid,...payload,...(payload.spec||payload.edit_length_delta_mm!==undefined?{}:{workflow,base_version_id:accepted?.id,selected_component_id:selected,selection_only:!!selected})});setJob(next);setHistory(prev=>[...prev,next]);if(payload.description)setText(next.status==='failed'?String(payload.description):'');
      if(next.status==='restored'&&next.restored_job_id){const restored=await api('jobs/'+next.restored_job_id);setAccepted(restored);if(!isScene(restored.spec))setSpec(restored.spec);setSelected(undefined);setNotice('Previous version restored. Its model and exports are active.');}
      if(next.status==='succeeded'){setSceneDraft(undefined);setAccepted(next);if(next.spec&&!isScene(next.spec))setSpec(next.spec);setSelected(undefined);}
    }
    catch(e){setError(String(e));}finally{setBusy(false);}
  }
  async function openDesign(nextId:string,draft?:ModelSpec,importName?:string){
    const [saved,entries]=await Promise.all([api('sessions/'+nextId),api('sessions/'+nextId+'/jobs')]);
    const current=saved.job_id?await api('jobs/'+saved.job_id):undefined;
    localStorage.setItem('sketchless-session',nextId);
    setSid(nextId);setName(importName||saved.name||'My design');setSpec(!isScene(draft||saved.spec)?draft||saved.spec||initial:initial);setSelected(undefined);setSceneDraft(isScene(draft)?draft:undefined);
    setAccepted(current);setHistory(entries);setJob(displayedJob(entries,current,savedWorkflow(nextId)));
    setWorkflow(savedWorkflow(nextId));setText((localStorage.getItem('sketchless-prompt:'+nextId+':'+savedWorkflow(nextId))??localStorage.getItem('sketchless-prompt:'+nextId)??'').slice(0,3000));setError('');setPollError(false);setNotice(draft?isScene(draft)?'Scene file opened. Review the components, then rebuild the concept.':'Design file opened. Review the size, then select Create my model.':current?'Saved design opened. Your model and downloads are ready.':aiConfigured?'Describe your new part to get started.':'Choose a shape to start your new design.');
  }
  async function startOver(){
    if(running||!sid)return;
    const hasDraft=!!sceneDraft||dirty||text.trim()||(!accepted&&JSON.stringify(spec)!==JSON.stringify(initial))||(['auto','precise','concept'] as const).some(value=>localStorage.getItem('sketchless-prompt:'+sid+':'+value)?.trim());
    if(hasDraft&&!window.confirm('Start a new design? Your conversation, browser drafts, and created models stay in My designs. Unbuilt size changes will not be carried over.'))return;
    setBusy(true);setError('');
    try{
      if(accepted||history.length||hasDraft)await api('sessions/'+sid+'/name',{name:name.trim()||'My design'});
      const next=await api('sessions',{});await openDesign(next.session_id,undefined,'My design');
      setDelta('20');setInspector(false);setActivity(false);setNotice('Fresh design started. Describe a new idea or choose a workflow.');
    }catch(e){setError(String(e));}finally{setBusy(false);}
  }
  function restoreVersion(restored:Job){setAccepted(restored);if(restored.spec&&!isScene(restored.spec))setSpec(restored.spec);setSelected(undefined);setJob(restored);setError('');setText('');setNotice('Earlier version restored. Its measurements, model, and downloads are ready.');}
  function generate(e:FormEvent){e.preventDefault();if(!geometricError)submit({spec,description:spec.part_type});}
  function selectExample(next:Spec){
    setSpec({...next});
    setText(next.part_type==='bracket'
      ?`Make an L-shaped bracket with a ${next.length_mm} mm foot length, ${next.width_mm} mm width, ${next.height_mm} mm upright height, ${next.thickness_mm} mm thickness and ${next.holes_per_face} ${next.hole_diameter_mm} mm holes per face.`
      :`Make an open-top ${next.part_type} ${next.length_mm} mm long, ${next.width_mm} mm wide, ${next.height_mm} mm high, with ${next.wall_thickness_mm} mm walls and a ${next.base_thickness_mm} mm base.`);
  }
  const matchingModel=!!accepted&&(workflow==='auto'||(workflow==='concept')===isScene(accepted.spec));
  const workflowCopy={
    auto:{title:'Brainstorm your next design.',intro:'Describe what it should do. We’ll clarify the form, size and important features before building.',label:'What should your model look like?',placeholder:'An electronics box, a robot with legs, or a display stand. Describe its size and the features you need.',send:'Send',scope:'Start with a purpose or an idea. Use default settings when you want a practical starting point.'},
    precise:{title:'Build a precise part.',intro:'Describe a measured part, or enter its dimensions below.',label:'Describe your part',placeholder:'An open-top electronics box, 100 mm long, 60 mm wide and 35 mm high, with 3 mm walls and base.',send:'Send part request',scope:'Precise parts: open boxes, shallow trays and L-brackets. Exact dimensions with geometry checks.'},
    concept:{title:'Build a concept assembly.',intro:'Describe the object, its components and approximate size.',label:'Describe your concept',placeholder:'A robot with a 200 mm cube body, four articulated legs and two camera eyes. Use sensible defaults for the visual joints.',send:'Send concept request',scope:'Concept assemblies: robot vacuums, walking robots, tables, stands and primitive scenes. Components are editable; mechanics are not validated.'}
  }[workflow];
  const visibleExamples=workflow==='precise'?promptExamples.filter(example=>example.kind==='precise'):workflow==='concept'?promptExamples.filter(example=>example.kind==='concept'):promptExamples;
  return <div className="easy-app">
    <header className="easy-header"><a className="brand" href="/">Sketchless<span className="brand-period">.</span></a><span className="tagline">Describe it. Shape it. Build it.</span><div className="header-right"><span className="connection"><i/>{connection==='Connected'?(demo?'Demo mode':'Live AI'):connection}</span><button type="button" className="quiet-button start-over-button" disabled={!sid||running} title="Start a fresh design" onClick={startOver}>Start over</button><DesignManager sid={sid} name={name} accepted={accepted} history={history} hasDraft={!!text.trim()||(['auto','precise','concept'] as const).some(value=>!!localStorage.getItem('sketchless-prompt:'+sid+':'+value)?.trim())} running={running} dirty={!!sceneDraft||dirty||(!accepted&&JSON.stringify(spec)!==JSON.stringify(initial))} onName={setName} onOpen={openDesign} onRestore={restoreVersion} onError={setError}/><button className="quiet-button details-button" onClick={()=>setActivity(!activity)} aria-expanded={activity}>Details</button></div></header>
    <main className="easy-workspace">
      <section className="build-panel" aria-label="Create your part">
        <div className="build-intro"><span className="eyebrow">FROM IDEA TO SOMETHING REAL</span><h1>{matchingModel?'What would you like to change?':workflowCopy.title}</h1><p>{workflowCopy.intro}</p></div>
        <div className="build-scroll">
          <p className="prompt-scope">{workflowCopy.scope}</p>
          <fieldset className="workflow-options" disabled={running}><legend>How would you like to build?</legend>{([
            ['auto','Brainstorm','Explore an idea and choose a modeling approach.'],
            ['precise','Precise part','Measured boxes, trays and brackets.'],
            ['concept','Concept assembly','Editable robots, tables and stands.']
          ] as const).map(([value,label,description])=><label key={value}><input type="radio" name="workflow" aria-label={label} value={value} checked={workflow===value} aria-describedby={'workflow-'+value+'-description'} onChange={()=>changeWorkflow(value)}/><span><strong>{label}</strong><small id={'workflow-'+value+'-description'}>{description}</small></span></label>)}</fieldset>
          {sceneDraft&&<form id="scene-import-form" className="scene-import" onSubmit={e=>{e.preventDefault();submit({spec:sceneDraft});}}><strong>{sceneDraft.name}</strong><p>{sceneDraft.components.length} components imported. Rebuild from this editable scene specification without an AI request.</p></form>}
          {job?.status==='clarification'&&<div className="composer-feedback" role="note">{job.brief?<><strong>Is this the design you have in mind?</strong><RequirementSummary requirements={job.brief.requirements}/><p className="proposal-name">Proposed model: {job.brief.name}</p>{job.proposed_spec&&<ProposalPreview key={job.id} spec={job.proposed_spec} bounds={job.brief.overall_dimensions_mm}/>}{job.brief.overall_dimensions_mm&&<p className="proposal-overall-size"><strong>Overall size:</strong> {job.brief.overall_dimensions_mm.join(' × ')} mm <small>(width × depth × height)</small></p>}{job.brief.layout_warnings?.map((warning,i)=><p className="approval-hint" key={i}>{warning}</p>)}<p>{job.brief.primary_component}: {job.brief.primary_dimensions}</p>{!!job.brief.changes?.length&&<div className="proposal-changes"><strong>What changed</strong><ul>{job.brief.changes.map((change,i)=><li key={i}>{change}</li>)}</ul></div>}<details className="proposal-details"><summary>{job.brief.solid_components} components & assumptions</summary><ul>{job.brief.components.map((name,i)=><li key={i}>{name}</li>)}</ul>{job.brief.assumptions.map((a,i)=><p key={i}>{a}</p>)}</details><p>I haven't built it yet. Confirm below, or send corrections first.</p>{text.trim()&&<p className="approval-hint">Send your message first, or clear it to approve this proposal.</p>}<button type="button" className="confirm-concept" disabled={running||!!text.trim()} onClick={()=>submit({confirm_job_id:job.id,description:'Build this concept.'})}>Build this concept</button></>:<><strong>Let's understand your idea first</strong><RequirementSummary requirements={job.clarification?.requirements}/><p>{job.message}</p>{!!job.clarification?.suggestions.length&&<div className="clarification-answers" role="group" aria-label="Quick reply suggestions"><small>{job.clarification.topic}</small><div>{job.clarification.suggestions.map(option=><button type="button" key={option.label} aria-pressed={text.trim()===option.text.trim()} disabled={running} onClick={()=>fillPrompt(option.text)}>{option.label}</button>)}</div><p>Fills your answer. Review it and press Send, or write your own.</p></div>}</>}</div>}
          {job?.status==='failed'&&job.message?.startsWith('Gemini')&&<div className="composer-feedback feedback-error" role="note"><p>{job.message}</p></div>}
          {<form id="prompt-form" className="chat-composer prompt-first" onSubmit={e=>{e.preventDefault();if(aiConfigured&&text.trim())submit({description:text.trim()});}}><label htmlFor="message">{job?.brief?'Tell me what to change':job?.status==='clarification'?'Add the missing details':matchingModel?'Describe a change':workflowCopy.label}</label><textarea ref={promptRef} id="message" aria-label="Description or follow-up edit" placeholder={job?.brief?'Describe any corrections to the purpose, form, components or measurements.':job?.status==='clarification'?'Answer the question above. Include measurements and units, or ask me to use sensible defaults.':selected?'Move this component 10 mm higher, keeping the rest unchanged…':matchingModel?isScene(accepted?.spec)?'Describe which components to change and by how much…':'Make it 20 mm longer, keeping the same width and height…':workflowCopy.placeholder} maxLength={3000} value={text} disabled={running||!sid} onChange={e=>setText(e.target.value)}/><div>{!aiConfigured&&<small>AI is not connected yet</small>}<button type="submit" className="prompt-submit" aria-label="Send message" disabled={!aiConfigured||running||!sid||!text.trim()}>{running?'Sending…':workflowCopy.send}<span aria-hidden="true"> ↑</span></button></div></form>}
          {aiConfigured&&<div className="prompt-suggestions" aria-label={matchingModel?'Ideas for your next change':'Example descriptions'}><small>{matchingModel?'Try a follow-up':workflow==='precise'?'Part descriptions to try':workflow==='concept'?'Concept ideas to try':'Start with an example. Make it yours.'}</small><div>{(selected?[{label:'Move up 10 mm',text:'Move this selected component 10 mm higher. Preserve every other component and dimension.'}]:matchingModel&&isScene(accepted?.spec)&&accepted.spec.concept==='robot'?[
            {label:'Longer legs',text:'Make all legs 30 mm longer. Preserve body dimensions and other components.'},
            {label:'Cylindrical feet',text:'Replace all feet with cylindrical feet, keeping their positions and stable IDs.'},
            {label:'Restore previous',text:'Restore the previous version'}
          ]:matchingModel&&isScene(accepted?.spec)?[{label:'Restore previous',text:'Restore the previous version'}]:matchingModel?[
            {label:'20 mm longer',text:'Make it 20 mm longer. Keep every other measurement unchanged.'},
            {label:'5 mm taller',text:'Make it 5 mm taller. Keep every other measurement unchanged.'},
            accepted.spec?.part_type==='bracket'?{label:'One hole per side',text:'Use one hole on each face. Keep the dimensions, thickness and hole diameter unchanged.'}:{label:'4 mm walls',text:'Change the wall thickness to 4 mm. Keep the outside measurements and base thickness unchanged.'}
          ]:visibleExamples).map(example=><button type="button" key={example.label} disabled={running||!sid} onClick={()=>fillPrompt(example.text)}>{example.label}</button>)}</div><p>Fills the description for you to review. Nothing is sent yet.</p></div>}
          {!aiConfigured&&<p className="ai-not-connected">{workflow==='concept'?'Concept descriptions need an AI connection. Choose Precise part to build from measurements without AI.':'Prompt generation needs live AI. You can build a precise part using the size controls below.'}</p>}
          {workflow!=='concept'&&<details className="manual-controls" open={workflow==='precise'||!aiConfigured}><summary>{workflow==='precise'?'Choose a part and enter exact measurements':demo?'Try a sample part without AI':'Or choose a shape and adjust measurements'}</summary>
          <form id="part-form" onSubmit={generate}>
            <fieldset disabled={running}><legend><span className="step-number">1</span> Choose your shape</legend><div className="shape-options">{examples.map(ex=><button type="button" key={ex.name} aria-pressed={spec.part_type===ex.spec.part_type} onClick={()=>selectExample(ex.spec)}><svg viewBox="0 0 100 70" aria-hidden="true"><path d={ex.path}/>{ex.name==='bracket'&&<><ellipse cx="34" cy="26" rx="3" ry="4"/><ellipse cx="52" cy="51" rx="4" ry="2"/></>}</svg><strong>{ex.label}</strong><small>{ex.note}</small></button>)}</div>
            <h3 className="size-heading"><span className="step-number">2</span> Choose the size</h3><p className="size-hint">{spec.part_type==='bracket'&&<>Length is the foot reach; height is the upright.<br/></>}Outside measurements in millimeters. <span>10 mm = 1 cm</span></p>
            <div className="friendly-dimensions">{dimensions.slice(0,3).map(([key,label,max])=><label key={key}><span>{spec.part_type==='bracket'?(key==='length_mm'?'Foot length':key==='height_mm'?'Upright height':label):label} <small>{key==='length_mm'?'\u2194':key==='width_mm'?'\u2197':'\u2195'}</small></span><div><input aria-label={label+' in millimeters'} type="number" min="0.5" max={max} step="any" required value={Number.isNaN(spec[key])?'':spec[key]} onChange={e=>setSpec({...spec,[key]:e.target.value===''?NaN:Number(e.target.value)})}/><span>mm</span></div></label>)}</div>
            {spec.part_type==='bracket'?<div className="bracket-options">
              <label className="advanced-dimension">Plate thickness<span><input aria-label="Plate thickness in millimeters" type="number" min="0.5" max="20" step="any" required value={Number.isNaN(spec.thickness_mm)?'':spec.thickness_mm} onChange={e=>setSpec({...spec,thickness_mm:e.target.value===''?NaN:Number(e.target.value)})}/> mm</span></label>
              <label className="advanced-dimension">Holes on each side<select aria-label="Holes on each side" value={spec.holes_per_face} onChange={e=>setSpec({...spec,holes_per_face:Number(e.target.value) as 0|1|2})}><option value="0">No holes</option><option value="1">1 per side (2 total)</option><option value="2">2 per side (4 total)</option></select></label>
              {spec.holes_per_face>0&&<label className="advanced-dimension">Hole diameter<span><input aria-label="Hole diameter in millimeters" type="number" min="1" max="30" step="any" required value={Number.isNaN(spec.hole_diameter_mm)?'':spec.hole_diameter_mm} onChange={e=>setSpec({...spec,hole_diameter_mm:e.target.value===''?NaN:Number(e.target.value)})}/> mm</span></label>}
              <p>Holes go through both plates, centered on each arm and evenly spaced across the width. Defaults: 3 mm thick; two 5 mm holes per side.</p>
            </div>:<details className="more-options" open={inspector} onToggle={e=>setInspector(e.currentTarget.open)}><summary>Wall & bottom thickness <span>{spec.wall_thickness_mm} / {spec.base_thickness_mm} mm</span></summary><p>We start with 3 mm walls and a 3 mm bottom. Adjust them if you need to.</p>{containerThickness.map(([key,label,max])=><label className="advanced-dimension" key={key}>{label==='Wall'?'Wall thickness':'Bottom thickness'}<span><input aria-label={label+' in millimeters'} type="number" min="0.5" max={max} step="any" required value={Number.isNaN(spec[key])?'':spec[key]} onChange={e=>setSpec({...spec,[key]:e.target.value===''?NaN:Number(e.target.value)})}/> mm</span></label>)}</details>}
            {geometricError&&<p className="field-error" role="alert">{geometricError}</p>}
            </fieldset>

            {aiConfigured&&<button className="manual-build-button" disabled={!sid||running||!!geometricError}>Create from these measurements</button>}
            {dirty&&<button className="restore-button" type="button" disabled={running} onClick={()=>setSpec(accepted!.spec! as Spec)}>Undo size changes</button>}
          </form>
          </details>}
          {accepted&&workflow!=='concept'&&!isScene(accepted.spec)&&<div className="quick-edit"><h3>A little longer or shorter?</h3><form onSubmit={e=>{e.preventDefault();if(delta.trim()&&Number.isFinite(Number(delta)))submit({edit_length_delta_mm:Number(delta)});}}><label><span className="sr-only">Length change in millimeters</span><input type="number" min="-500" max="500" required step="any" value={delta} onChange={e=>setDelta(e.target.value)} disabled={running}/><span>mm</span></label><button disabled={running}>Change length</button></form><p>Use a minus number to make it shorter. The rest stays the same.</p></div>}
          <Conversation history={history}/>
          {demo&&<p className="demo-note">Currently supports open boxes, trays, and L-brackets. Arbitrary objects are not supported yet.</p>}
        </div>
        {(sceneDraft||(!aiConfigured&&workflow!=='concept'))&&<div className="build-action"><button form={sceneDraft?'scene-import-form':aiConfigured?'prompt-form':'part-form'} aria-label={aiConfigured&&!sceneDraft?'Send message':undefined} className="create-button" disabled={!sid||running||(!sceneDraft&&(aiConfigured?!text.trim():!!geometricError))}>{running?'Working on your request...':sceneDraft?'Rebuild imported scene':aiConfigured?(job?.status==='clarification'?'Send details':accepted?'Apply my change':'Generate from description'):(accepted?'Update my model':'Create my model')}<span aria-hidden="true">&rarr;</span></button></div>}
      </section>
      <section ref={previewRef} className="preview-panel" aria-label="Your 3D model"><div className="preview-title"><div><span className="eyebrow">{name==='Untitled project'||name==='My design'?'YOUR DESIGN':name}</span><h2>{accepted?.spec?isScene(accepted.spec)?accepted.spec.name:accepted.spec.part_type==='bracket'?'Your L-bracket':accepted.spec.part_type==='tray'?'Your tray':'Your open box':'Let us bring it to life.'}</h2></div>{accepted&&<details className="download-menu"><summary>Download <span>&darr;</span></summary><div><a download href={'/api/artifacts/'+accepted.id+'/stl'}>For 3D printing <small>{isScene(accepted.spec)?'STL / separate bodies; not one printable object':'STL file'}</small></a><a download href={'/api/artifacts/'+accepted.id+'/step'}>For a CAD app <small>STEP / CAD solids; no feature history</small></a>{isScene(accepted.spec)&&<><a download href={'/api/artifacts/'+accepted.id+'/glb'}>Visual 3D scene <small>GLB / colors and separate meshes</small></a><a download href={'/api/designs/'+accepted.id+'/file'}>Editable scene <small>JSON / components and parameters</small></a></>}</div></details>}</div>
        {accepted&&<p className="active-version">{isScene(accepted.spec)?'Concept assembly · multiple solids':'Precise CAD part'} · Active version {accepted.version_number||accepted.id.slice(0,8)} <span>{accepted.id.slice(0,8)}</span></p>}
        <Viewer id={accepted?.id} spec={accepted?.spec} running={running} selected={selected} onSelect={setSelected} bounds={accepted?.inspection?.bounding_box_mm}/>
        {accepted&&isScene(accepted.spec)&&<><ComponentPanel spec={accepted.spec} selected={selected} onSelect={setSelected} disabled={running}/><details className="concept-assumptions"><summary>Assumptions & limits</summary>{accepted.spec.assumptions.map((a,i)=><p key={i}>{a}</p>)}<p>Concept model only. Intersections, joint motion, balance, strength and printability have not been validated.</p></details></>}
        <div className="result-message" role="status">{running?<><span className="pulse"/> Working on your request. This can take a moment.{accepted&&' Your last version is still here.'}</>:notice?<><span className="ready-icon">&#10003;</span><div><strong>{notice}</strong>{accepted&&<p>You can keep editing or download this version.</p>}</div></>:job?.status==='failed'?<><strong>We could not make that change.</strong><p>{job.message?.startsWith('Gemini')?job.message:'Try a different size or try again. You can find more information in Details.'}</p>{accepted&&<small>Your previous model is safe and ready to download.</small>}</>:job?.status==='clarification'?<><strong>{job.brief?'Ready for your review.':'A little more information is needed.'}</strong><p>{job.message}</p></>:accepted?<><span className="ready-icon">&#10003;</span><div><strong>Your model is ready.</strong><p>Drag to look around. Change the size whenever you like.</p>{job?.changes?.filter(change=>!change.startsWith('Part type:')).slice(0,3).map(change=><span className="dimension-change" key={change}>{change}</span>)}</div></>:<span>{aiConfigured?<>Describe your idea and select <strong>Send</strong>.</>:<>Choose a shape and tap <strong>Create my model</strong> to see it here.</>}</span>}</div>
        {(error||pollError)&&<div className="app-error" role="alert">{pollError?'We lost the connection for a moment. Trying again...':error}{!sid&&<button onClick={()=>location.reload()}>Reconnect</button>}</div>}
        <p className="prototype-note">Prototype only. Have an engineer review your part before making or using it.</p>
      </section>
    </main>
    {activity&&<dialog ref={detailsRef} onClose={()=>setActivity(false)} className="details-drawer" aria-label="Design details"><header><h2>Behind your design</h2><button onClick={()=>setActivity(false)} aria-label="Close details">&times;</button></header><div className="drawer-content"><p>Technical information is here when you need it.</p><h3>Model checks</h3>{accepted?.inspection?<><p>These checks verify geometry, not printability or structural safety.</p><ul className="checks">{Object.entries(accepted.inspection.checks).map(([key,passed])=><li key={key}><span>{passed?'\u2713':'!'}</span>{checkNames[key]||key}</li>)}</ul><pre>{JSON.stringify(accepted.inspection,null,2)}</pre></>:<p>Create a model to see the results.</p>}<h3>Previous changes</h3>{history.map(entry=><details key={entry.id}><summary>{entry.request_summary||'Create a model'}</summary><p>{entry.status} / {entry.message}</p>{entry.changes?.map(change=><p key={change}>{change}</p>)}</details>)}<h3>Tool activity</h3>{job?.events.map((event,i)=><details key={i}><summary>{event.tool} <small>{event.seconds}s</small></summary><pre>{JSON.stringify({input:event.input,result:event.result},null,2)}</pre></details>)}{!job?.events.length&&<p>No tools have run yet.</p>}</div></dialog>}
  </div>;
}
createRoot(document.getElementById('root')!).render(<App/>);
