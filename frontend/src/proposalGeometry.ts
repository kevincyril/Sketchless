import * as THREE from 'three';
import type {SceneSpec,Component} from './types';

/** Geometry-only preview of the scene contract; CAD artifacts remain authoritative after building. */
export function proposalMeshes(spec:SceneSpec){
 const nodes=new Map(spec.components.map(c=>[c.id,c])),world=new Map<string,THREE.Matrix4>();
 function transform(c:Component):THREE.Matrix4{
  const cached=world.get(c.id);if(cached)return cached;
  // The contract is Rz * Ry * Rx, matching a ZYX Euler in Three.
  const rotation=new THREE.Euler(...c.rotation_deg.map(THREE.MathUtils.degToRad) as [number,number,number],'ZYX');
  const matrix=new THREE.Matrix4().makeRotationFromEuler(rotation);matrix.setPosition(...c.position_mm);
  if(c.parent_id)matrix.premultiply(transform(nodes.get(c.parent_id)!));world.set(c.id,matrix);return matrix;
 }
 return spec.components.filter(c=>c.primitive!=='group').map(c=>{
  const d=c.dimensions;let geometry:THREE.BufferGeometry;
  if(c.primitive==='box')geometry=new THREE.BoxGeometry(d.x_mm!,d.y_mm!,d.z_mm!);
  else if(c.primitive==='sphere')geometry=new THREE.SphereGeometry(d.radius_mm!,32,20);
  else {geometry=new THREE.CylinderGeometry(c.primitive==='cone'?d.top_radius_mm!:d.radius_mm!,d.radius_mm!,d.z_mm!,48);geometry.rotateX(Math.PI/2);}
  geometry.applyMatrix4(transform(c));return {geometry,color:c.color,id:c.id};
 });
}
