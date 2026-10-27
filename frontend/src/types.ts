export type ContainerSpec = {
  part_type: 'enclosure' | 'tray'; length_mm: number; width_mm: number; height_mm: number;
  wall_thickness_mm: number; base_thickness_mm: number; open_top: true;
};
export type BracketSpec = {
  part_type: 'bracket'; length_mm: number; width_mm: number; height_mm: number;
  thickness_mm: number; hole_diameter_mm: number; holes_per_face: 0 | 1 | 2;
};
export type Spec = ContainerSpec | BracketSpec;
export type Inspection = {checks: Record<string, boolean>; volume_mm3: number; bounding_box_mm: number[]; generation_seconds: number; tolerance_mm: number; holes?:{per_face:number;total:number;diameter_mm:number}};
export type Component = {id:string;name:string;primitive:'box'|'cylinder'|'sphere'|'cone'|'group';dimensions:Record<string,number|null>;position_mm:[number,number,number];rotation_deg:[number,number,number];parent_id:string|null;color:string;role:string;symmetry_group:string};
export type SceneSpec = {part_type:'assembly';schema_version:1;units:'mm';coordinates:string;name:string;concept:'robot'|'table'|'stand'|'cleaner'|'custom';assumptions:string[];components:Component[]};
export type ModelSpec = Spec | SceneSpec;
export const isScene=(spec:ModelSpec|undefined):spec is SceneSpec=>spec?.part_type==='assembly';
export function modelLabel(spec:ModelSpec){return isScene(spec)?spec.name:spec.part_type==='bracket'?'L-bracket':spec.part_type==='tray'?'Shallow tray':'Open box';}
export function modelMeasurements(spec:ModelSpec){return isScene(spec)?`${spec.components.filter(c=>c.primitive!=='group').length} solid components \u00b7 concept assembly`:`${spec.length_mm} \u00d7 ${spec.width_mm} \u00d7 ${spec.height_mm} mm`;}
export type Requirements = {purpose:string|null;form:string|null;tasks:string[];size:string|null};
export type Job = {id: string; proposed_spec?:SceneSpec;revises_proposal_id?:string; clarification?:{requirements:Requirements;missing_fields:string[];topic:string;suggestions:{label:string;text:string}[]}; brief?:{requirements?:Requirements;name:string;primary_component:string;primary_dimensions:string;overall_dimensions_mm?:number[];layout_warnings?:string[];changes?:string[];components:string[];assumptions:string[];solid_components:number}; workflow?:'precise'|'concept'; status: string; message?: string; spec?: ModelSpec; inspection?: Inspection; version_number?:number; base_version_id?:string; restored_job_id?:string;
  request_summary?: string; changes?: string[];
  events: {tool: string; input: unknown; result: unknown; seconds: number}[]};
export const initial: ContainerSpec = {part_type:'enclosure',length_mm:100,width_mm:60,height_mm:35,wall_thickness_mm:3,base_thickness_mm:3,open_top:true};
export const bracketDefault: BracketSpec = {part_type:'bracket',length_mm:60,width_mm:40,height_mm:50,thickness_mm:3,hole_diameter_mm:5,holes_per_face:2};
export const dimensions = [ ['length_mm','Length',500], ['width_mm','Width',500], ['height_mm','Height',300] ] as const;
export const containerThickness = [ ['wall_thickness_mm','Wall',20], ['base_thickness_mm','Base',20] ] as const;
export function specificationError(spec:Spec):string {
  if(!dimensions.every(([key,,max])=>Number.isFinite(spec[key])&&spec[key]>=.5&&spec[key]<=max))return 'Enter a size between 0.5 and 500 mm (height up to 300 mm).';
  if(spec.part_type==='bracket'){
    const t=spec.thickness_mm,d=spec.hole_diameter_mm,n=spec.holes_per_face;
    if(!Number.isFinite(t)||t<.5||t>20)return 'Choose a thickness between 0.5 and 20 mm.';
    if(t>=Math.min(spec.length_mm,spec.height_mm))return 'The thickness must be smaller than the foot length and upright height.';
    if(!Number.isFinite(d)||d<1||d>30)return 'Choose a hole size between 1 and 30 mm.';
    if(n){const margin=Math.max(1,t/2),spacing=spec.width_mm/(n+1);
      if(Math.min(spec.length_mm-t,spec.height_mm-t)<d+2*margin)return 'The holes are too large for these arms. Increase length or height, or choose smaller holes.';
      if(spacing-d/2<margin||(n>1&&spacing<d+2*margin))return 'The holes need more room. Increase width, choose smaller holes, or use fewer holes.';
    }
  }else{
    if(!containerThickness.every(([key,,max])=>Number.isFinite(spec[key])&&spec[key]>=.5&&spec[key]<=max))return 'Choose wall and bottom thicknesses between 0.5 and 20 mm.';
    if(spec.wall_thickness_mm*2>=Math.min(spec.length_mm,spec.width_mm))return 'This part is too narrow for its walls. Increase the width or length, or make the walls thinner below.';
    if(spec.base_thickness_mm>=spec.height_mm)return 'The bottom is thicker than the part is tall. Increase the height or reduce the bottom thickness.';
  }
  return '';
}
export async function api(path: string, body?: unknown) {
  const response = await fetch('/api/'+path, body === undefined ? undefined : {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const data = await response.json();
  if (!response.ok) throw new Error(typeof data.detail === 'string' ? data.detail : Array.isArray(data.detail) ? data.detail.map((e: {msg:string})=>e.msg).join('; ') : 'Request failed');
  return data;
}
