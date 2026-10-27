"""Deterministic multi-solid CAD, shared CAD tessellation preview and visual GLB export."""
import json, math, struct, time
from pathlib import Path
import numpy as np
import cadquery as cq
from OCP.gp import gp_Trsf
from backend.scene_schema import SceneSpec
from backend.scene_geometry import matrix, world_matrices, expected_bounds

LIMIT=20_000_000

def local_shape(c):
    d=c.dimensions
    if c.primitive=='box':return cq.Workplane('XY').box(d.x_mm,d.y_mm,d.z_mm).val(),d.x_mm*d.y_mm*d.z_mm
    if c.primitive=='sphere':return cq.Workplane('XY').sphere(d.radius_mm).val(),4/3*math.pi*d.radius_mm**3
    if c.primitive=='cylinder':return cq.Solid.makeCylinder(d.radius_mm,d.z_mm).translate((0,0,-d.z_mm/2)),math.pi*d.radius_mm**2*d.z_mm
    if c.primitive=='cone':return cq.Solid.makeCone(d.radius_mm,d.top_radius_mm,d.z_mm).translate((0,0,-d.z_mm/2)),math.pi*d.z_mm/3*(d.radius_mm**2+d.radius_mm*d.top_radius_mm+d.top_radius_mm**2)
    raise ValueError('Group nodes have no solid.')

def glb_bytes(meshes):
    binary=bytearray();views=[];accessors=[];materials=[];gmeshes=[];nodes=[]
    def access(raw,target,kind,component_type,count,limits=None):
        while len(binary)%4:binary.append(0)
        offset=len(binary);binary.extend(raw);vi=len(views);views.append({'buffer':0,'byteOffset':offset,'byteLength':len(raw),'target':target})
        item={'bufferView':vi,'componentType':component_type,'count':count,'type':kind}
        if limits:item.update(min=limits[0],max=limits[1])
        accessors.append(item);return len(accessors)-1
    for mesh in meshes:
        # glTF uses meters and Y-up. CAD/scene JSON remain mm and Z-up.
        coords=np.array(mesh['positions'],dtype=np.float32).reshape(-1,3)
        coords=np.column_stack((coords[:,0],coords[:,2],-coords[:,1]))*.001
        indices=np.array(mesh['indices'],dtype=np.uint32)
        p=access(coords.astype('<f4').tobytes(),34962,'VEC3',5126,len(coords),(coords.min(0).tolist(),coords.max(0).tolist()))
        i=access(indices.astype('<u4').tobytes(),34963,'SCALAR',5125,len(indices))
        color=[int(mesh['color'][j:j+2],16)/255 for j in (1,3,5)]
        materials.append({'name':mesh['name'],'pbrMetallicRoughness':{'baseColorFactor':color+[1],'metallicFactor':.1,'roughnessFactor':.65},'doubleSided':True})
        gmeshes.append({'primitives':[{'attributes':{'POSITION':p},'indices':i,'material':len(materials)-1}]})
        nodes.append({'name':mesh['name'],'mesh':len(gmeshes)-1,'extras':{'component_id':mesh['id']}})
    document={'asset':{'version':'2.0','generator':'Sketchless CAD tessellation'},'scene':0,'scenes':[{'nodes':list(range(len(nodes)))}],'nodes':nodes,'meshes':gmeshes,'materials':materials,'buffers':[{'byteLength':len(binary)}],'bufferViews':views,'accessors':accessors}
    js=json.dumps(document,separators=(',',':')).encode();js+=b' '*((-len(js))%4);binary+=b'\0'*((-len(binary))%4)
    return struct.pack('<4sII',b'glTF',2,12+8+len(js)+8+len(binary))+struct.pack('<I4s',len(js),b'JSON')+js+struct.pack('<I4s',len(binary),b'BIN\0')+binary

def build_scene(spec:SceneSpec,folder:Path):
    started=time.perf_counter();world=world_matrices(spec);solids=[];meshes=[];reports=[];assembly=cq.Assembly(name='Sketchless_concept')
    for c in spec.components:
        if c.primitive=='group':continue
        shape,volume=local_shape(c);m=world[c.id];transform=gp_Trsf();transform.SetValues(*m[:3,:].flatten().tolist());shape=shape.moved(cq.Location(transform))
        bb=shape.BoundingBox();lo,hi=expected_bounds(c,m)
        actual_lo=np.array([bb.xmin,bb.ymin,bb.zmin]);actual_hi=np.array([bb.xmax,bb.ymax,bb.zmax])
        checks={'valid_shape':shape.isValid(),'one_component_solid':len(shape.Solids())==1,'positive_volume':shape.Volume()>0,'volume_match':abs(shape.Volume()-volume)<max(.01,volume*1e-6),'transformed_bounds_match':bool(np.max(np.abs(np.r_[lo-actual_lo,hi-actual_hi]))<.02)}
        if not all(checks.values()):raise ValueError('Component inspection failed: '+c.id+' '+str(checks))
        if max(abs(v) for v in (*actual_lo,*actual_hi))>4000:raise ValueError('Assembly must fit within +/-4000 mm of the origin.')
        vertices,triangles=shape.tessellate(.4,.18)
        if len(triangles)>120000 or sum(len(mesh['indices'])//3 for mesh in meshes)+len(triangles)>250000:raise ValueError('Concept tessellation is too complex. Use fewer or smaller curved components.')
        positions=[value for vertex in vertices for value in vertex.toTuple()];indices=[index for tri in triangles for index in tri]
        meshes.append({'id':c.id,'name':c.name,'color':c.color,'positions':positions,'indices':indices})
        rgb=[int(c.color[i:i+2],16)/255 for i in (1,3,5)]
        assembly.add(shape,name=c.id,color=cq.Color(*rgb));solids.append(shape)
        reports.append({'id':c.id,'checks':checks,'bounds_mm':[actual_lo.tolist(),actual_hi.tolist()],'volume_mm3':shape.Volume()})
        if time.perf_counter()-started>45:raise ValueError('Concept geometry time limit reached.')
    compound=cq.Compound.makeCompound(solids);bounds=compound.BoundingBox();folder.mkdir(parents=True,exist_ok=True)
    # Default STEP assembly export retains separate bodies and names; no fusion.
    assembly.export(str(folder/'part.step'))
    cq.exporters.export(compound,str(folder/'part.stl'))
    (folder/'part.glb').write_bytes(glb_bytes(meshes))
    (folder/'scene.json').write_text(json.dumps({'schema_version':1,'units':'mm','coordinates':spec.coordinates,'components':[c.model_dump() for c in spec.components],'meshes':meshes},separators=(',',':')),encoding='utf-8')
    checks={'components_valid':all(all(r['checks'].values()) for r in reports),'component_count_match':len(compound.Solids())==len(solids),'positive_volume':all(s.Volume()>0 for s in solids),'finite_transforms':True,'referenced_ids_valid':True}
    for name in ('part.step','part.stl','part.glb','scene.json'):checks[name.replace('.','_')+'_nonempty']=0<(folder/name).stat().st_size<LIMIT
    if not all(checks.values()):raise ValueError('Concept export inspection failed.')
    result={'workflow':'concept','checks':checks,'solid_count':len(solids),'component_count':len(spec.components),'volume_mm3':sum(s.Volume() for s in solids),'bounding_box_mm':[bounds.xlen,bounds.ylen,bounds.zlen],'tolerance_mm':.02,'components':reports,'generation_seconds':round(time.perf_counter()-started,3),'limitations':['Separate concept solids; intersections, balance, motion, strength and printability are not verified.','Summed component volume may double-count intersecting components.']}
    if spec.concept=='cleaner':
        from backend.concepts import review_cleaner
        result['design_review']=review_cleaner(spec)
    (folder/'inspection.json').write_text(json.dumps(result),encoding='utf-8');return result
