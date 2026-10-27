import {useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader.js';
import {proposalMeshes} from './proposalGeometry';
import {isScene,type SceneSpec,type ModelSpec} from './types';
type View='iso'|'top'|'front'|'right';
export function Viewer({id,spec,running,selected,onSelect,bounds,draft}:{id?:string;spec?:ModelSpec;running:boolean;selected?:string;onSelect?:(id?:string)=>void;bounds?:number[];draft?:SceneSpec}){
 const host=useRef<HTMLDivElement>(null),command=useRef<(view?:View)=>void>(()=>{}),highlight=useRef<(id?:string)=>void>(()=>{}),select=useRef(onSelect);
 select.current=onSelect;
 const [view,setView]=useState<View>('iso'),[state,setState]=useState('empty'),[error,setError]=useState(''),[orientation,setOrientation]=useState('ISO');
 useEffect(()=>highlight.current(selected),[selected,id]);
 useEffect(()=>{
  const el=host.current!;let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({antialias:true});}catch{setState('error');setError(draft?'3D preview is unavailable. You can still review the proposal and measurements.':'WebGL is unavailable. Your model exports remain available.');return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.setClearColor('#eeede6');renderer.domElement.setAttribute('aria-label','3D model. Drag to orbit; scroll to zoom. Click a component to select it.');el.appendChild(renderer.domElement);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,10000),controls=new OrbitControls(camera,renderer.domElement),root=new THREE.Group();scene.add(root);
  controls.enableDamping=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  const grid=new THREE.GridHelper(1000,100,0xb5b9ae,0xd7d8ce);scene.add(grid);
  (Array.isArray(grid.material)?grid.material:[grid.material]).forEach(m=>{m.transparent=true;m.opacity=.35;});
  scene.add(new THREE.HemisphereLight(0xfffef4,0x718078,3));const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(80,150,100);scene.add(key);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.bias=-.0003;key.shadow.normalBias=.15;const ground=new THREE.Mesh(new THREE.PlaneGeometry(8000,8000),new THREE.ShadowMaterial({opacity:.14}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);const fill=new THREE.DirectionalLight(0xffd1a4,1);fill.position.set(-80,40,-100);scene.add(fill);
  let radius=75,dead=false,frame=0,needsRender=true;const invalidate=()=>{needsRender=true;};controls.addEventListener('change',invalidate);const meshes:THREE.Mesh[]=[];
  const directions={iso:new THREE.Vector3(1,.85,1),top:new THREE.Vector3(0,1,.001),front:new THREE.Vector3(0,0,1),right:new THREE.Vector3(1,0,0)};
  command.current=(next?:View)=>{needsRender=true;const direction=next?directions[next].clone():camera.position.clone().sub(controls.target).normalize();const fov=Math.min(camera.fov,THREE.MathUtils.radToDeg(2*Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*camera.aspect)));const distance=radius/Math.sin(THREE.MathUtils.degToRad(fov/2))*1.15;camera.position.copy(direction.normalize().multiplyScalar(distance));camera.near=Math.max(.01,radius/1000);camera.far=Math.max(10000,distance*10);camera.updateProjectionMatrix();controls.target.set(0,0,0);controls.update();if(next)setView(next);};
  const resize=new ResizeObserver(()=>{if(!el.clientWidth||!el.clientHeight)return;renderer.setSize(el.clientWidth,el.clientHeight);camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();command.current();});resize.observe(el);command.current('iso');
  const abort=new AbortController();setError('');setState(id||draft?'loading':'empty');
  function add(geometry:THREE.BufferGeometry,color:string,componentId?:string){geometry.computeVertexNormals();const mesh=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color,roughness:.55,metalness:.12}));mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.componentId=componentId;root.add(mesh);meshes.push(mesh);const edge=new THREE.LineSegments(new THREE.EdgesGeometry(geometry,30),new THREE.LineBasicMaterial({color:0x264c3b,transparent:true,opacity:.35}));root.add(edge);}
  highlight.current=(id?:string)=>{needsRender=true;const ids=new Set([id]);if(isScene(spec)){for(let i=0;i<8;i++)spec.components.forEach(c=>{if(ids.has(c.parent_id||undefined))ids.add(c.id);});}meshes.forEach(mesh=>{const material=mesh.material as THREE.MeshStandardMaterial;material.emissive.set(ids.has(mesh.userData.componentId)&&!!id?'#8a5a12':'#000000');material.emissiveIntensity=.55;});};
  async function load(){
   if(draft){
    for(const mesh of proposalMeshes(draft))add(mesh.geometry,mesh.color,mesh.id);
    root.rotation.x=-Math.PI/2;
   }else{
   if(!id)return;
   const response=await fetch('/api/artifacts/'+id+(isScene(spec)?'/scene':'/stl'),{signal:abort.signal});if(!response.ok)throw Error(isScene(spec)?'Assembly preview could not be loaded. Retry or download its exports.':'STL preview could not be loaded. Retry the preview or download the artifact.');
   if(isScene(spec)){
    const data=await response.json();if(dead)return;
    for(const m of data.meshes){const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(m.positions,3));geometry.setIndex(m.indices);add(geometry,m.color,m.id);}
    root.rotation.x=-Math.PI/2;
   }else{const buffer=await response.arrayBuffer();if(dead)return;const geometry=new STLLoader().parse(buffer);geometry.rotateX(-Math.PI/2);add(geometry,'#567a66');}
   }
   root.updateMatrixWorld(true);let box=new THREE.Box3().setFromObject(root);const center=box.getCenter(new THREE.Vector3());root.position.sub(center);root.updateMatrixWorld(true);box=new THREE.Box3().setFromObject(root);const renderedSize=box.getSize(new THREE.Vector3());renderer.domElement.dataset.renderedSizeMm=JSON.stringify([renderedSize.x,renderedSize.z,renderedSize.y]);radius=1;const vertex=new THREE.Vector3();for(const mesh of meshes){const positions=mesh.geometry.getAttribute('position');for(let i=0;i<positions.count;i++){vertex.fromBufferAttribute(positions,i).applyMatrix4(mesh.matrixWorld);radius=Math.max(radius,vertex.length());}}grid.position.y=box.min.y-.2;ground.position.y=box.min.y-.4;key.position.set(1,2,1).normalize().multiplyScalar(radius*4);key.shadow.camera.left=key.shadow.camera.bottom=-radius*2;key.shadow.camera.right=key.shadow.camera.top=radius*2;key.shadow.camera.far=Math.max(3000,radius*8);key.shadow.camera.updateProjectionMatrix();command.current('iso');highlight.current(selected);setState('ready');
  }
  load().catch(e=>{if(!dead&&e.name!=='AbortError'){setState('error');setError(e.message);}});
  let down={x:0,y:0};const pointerDown=(e:PointerEvent)=>{down={x:e.clientX,y:e.clientY};};
  const pointerUp=(e:PointerEvent)=>{if(!isScene(spec)||Math.hypot(e.clientX-down.x,e.clientY-down.y)>5)return;const rect=renderer.domElement.getBoundingClientRect(),ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),camera);const hit=ray.intersectObjects(meshes)[0];select.current?.(hit?.object.userData.componentId);};
  renderer.domElement.addEventListener('pointerdown',pointerDown);renderer.domElement.addEventListener('pointerup',pointerUp);
  const axisEls=['x','y','z'].map(axis=>el.parentElement!.querySelector<HTMLElement>('[data-axis="'+axis+'"]'));
  renderer.setAnimationLoop(()=>{controls.update();if(!needsRender)return;needsRender=false;renderer.render(scene,camera);if(frame++%6===0){const q=camera.quaternion.clone().invert();[new THREE.Vector3(1,0,0),new THREE.Vector3(0,0,-1),new THREE.Vector3(0,1,0)].forEach((v,i)=>{v.applyQuaternion(q);if(axisEls[i])axisEls[i]!.style.transform=`translate(${v.x*23}px,${-v.y*23}px)`;});}});
  const orbit=()=>setOrientation('ORBIT');controls.addEventListener('start',orbit);
  return()=>{dead=true;abort.abort();resize.disconnect();renderer.setAnimationLoop(null);renderer.domElement.removeEventListener('pointerdown',pointerDown);renderer.domElement.removeEventListener('pointerup',pointerUp);controls.removeEventListener('start',orbit);controls.removeEventListener('change',invalidate);controls.dispose();root.traverse(o=>{if(o instanceof THREE.Mesh||o instanceof THREE.LineSegments){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());}});ground.geometry.dispose();(ground.material as THREE.Material).dispose();grid.geometry.dispose();(Array.isArray(grid.material)?grid.material:[grid.material]).forEach(m=>m.dispose());renderer.dispose();el.removeChild(renderer.domElement);command.current=()=>{};highlight.current=()=>{};};
 },[id,draft]);
 function change(next:View){command.current(next);setOrientation(next.toUpperCase());}
 const size=spec?(isScene(spec)?bounds:[spec.length_mm,spec.width_mm,spec.height_mm]):undefined;
 return <div className="viewport" data-preview-state={state} data-selected-component={selected||''}><div className="canvas-host" ref={host}/><div className="viewport-tools" aria-label="Camera controls"><button onClick={()=>command.current()} title="Fit model to viewport">Fit model</button><button onClick={()=>change('iso')} title="Reset to isometric view">Reset view</button><details className="view-menu"><summary>More views</summary><div>{(['iso','top','front','right'] as const).map(v=><button key={v} aria-pressed={view===v} onClick={()=>change(v)}>{v==='iso'?'Angled':v[0].toUpperCase()+v.slice(1)}</button>)}</div></details></div>
 {state==='empty'&&!running&&<div className="empty-state"><svg className="empty-box" viewBox="0 0 200 160" aria-hidden="true"><path d="m30 58 80-35 62 33-80 39Z M30 58v55l62 30 80-37V56 M92 95v48"/></svg><h2>Your idea, in 3D.</h2><p>Describe a part or a concept assembly.<br/>Your model will appear right here.</p></div>}
 {state==='loading'&&<div className="viewport-notice" role="status">Opening your model…</div>}{error&&<div className="viewport-error" role="alert">{error}<button onClick={()=>location.reload()}>Reload workspace</button></div>}{running&&<div className="generating-note" role="status"><span className="pulse"/> Creating your model…</div>}
 <div className="orientation" aria-label="Model orientation: X length, Y width, Z height"><b data-axis="x">X</b><b data-axis="y">Y</b><b data-axis="z">Z</b><small>{orientation}</small></div><div className="viewport-bottom"><span>{state==='ready'&&size?size.map(n=>Math.round(n*100)/100).join(' × ')+' mm':''}</span><span>{state==='ready'?'Drag to rotate · Scroll to zoom':''}</span></div></div>;
}
