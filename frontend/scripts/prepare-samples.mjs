import {mkdir,readFile,copyFile,writeFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const frontend=fileURLToPath(new URL('../',import.meta.url));
const examples=fileURLToPath(new URL('../../examples/',import.meta.url));
const output=path.join(frontend,'public','samples');
async function rejectPrivateFiles(dir){
 for(const item of await readdir(dir,{withFileTypes:true})){
  if(item.isSymbolicLink())throw Error('Public assets must not be symlinks.');
  if(item.isDirectory())await rejectPrivateFiles(path.join(dir,item.name));
  else if(item.name.startsWith('.env')||/\.(pem|key|p12|pfx|sqlite3|db|zip)$/i.test(item.name))throw Error('A private file is present in public assets. Remove it before building.');
 }
}
await rejectPrivateFiles(path.join(frontend,'public'));
const choices=[
 ['enclosure','', 'Electronics enclosure','A measured open box with checked walls and base.'],
 ['bracket','bracket','Mounting bracket','An L-shaped part with through holes.'],
 ['table','table','Display table','A tabletop and four separate legs.'],
 ['robot','robot','Four-legged robot','An editable visual assembly with separate joints and eyes.'],
 ['cleaner','cleaner','Robot vacuum','A round home-cleaner concept with wheels, sensors and brush.'],
];
const catalogue=[];
for(const [id,folder,name,description] of choices){
 const source=path.join(examples,folder),destination=path.join(output,id);await mkdir(destination,{recursive:true});
 const spec=JSON.parse(await readFile(path.join(source,'spec.json'),'utf8'));
 const inspection=JSON.parse(await readFile(path.join(source,'inspection.json'),'utf8'));
 const assembly=spec.part_type==='assembly';
 for(const file of ['part.step','part.stl',...(assembly?['part.glb','scene.json']:[])])await copyFile(path.join(source,file),path.join(destination,file));
 await writeFile(path.join(destination,'design.json'),JSON.stringify({format:'sketchless-design',version:1,name,spec},null,2));
 catalogue.push({id,name,description,spec,bounds:inspection.bounding_box_mm,component_count:inspection.solid_count||1,mesh:'samples/'+id+'/'+(assembly?'scene.json':'part.stl'),files:{step:'samples/'+id+'/part.step',stl:'samples/'+id+'/part.stl',design:'samples/'+id+'/design.json',...(assembly?{glb:'samples/'+id+'/part.glb'}:{})}});
}
await writeFile(path.join(output,'catalogue.json'),JSON.stringify({provenance:'Pre-generated project-owned CAD examples; not live AI generation.',samples:catalogue},null,2));
console.log('Prepared five public CAD samples. No API requests or private data used.');
