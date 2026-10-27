import json, sys, time, math
from pathlib import Path
import cadquery as cq
from backend.schemas import Spec, BracketSpec, parse_spec

def bracket_shape(spec):
    l,w,h,t=spec.length_mm,spec.width_mm,spec.height_mm,spec.thickness_mm
    base=cq.Workplane('XY').box(l,w,t,centered=(False,True,False))
    upright=cq.Workplane('XY').box(t,w,h,centered=(False,True,False))
    shape=base.union(upright)
    centers=[]
    n=spec.holes_per_face
    for i in range(n):
        y=-w/2+w*(i+1)/(n+1)
        x,z=(l+t)/2,(h+t)/2
        shape=shape.cut(cq.Workplane('XY').center(x,y).circle(spec.hole_diameter_mm/2).extrude(t))
        shape=shape.cut(cq.Workplane('YZ').center(y,z).circle(spec.hole_diameter_mm/2).extrude(t))
        centers.extend([(x,y,t/2),(t/2,y,z)])
    expected=w*t*(l+h-t)-2*n*math.pi*(spec.hole_diameter_mm/2)**2*t
    return shape,expected,centers

def build(spec: Spec | BracketSpec, folder: Path):
    from backend.scene_schema import SceneSpec
    if isinstance(spec,SceneSpec):
        from backend.scene_cad import build_scene
        return build_scene(spec,folder)
    start=time.perf_counter()
    l,w,h=spec.length_mm,spec.width_mm,spec.height_mm
    if isinstance(spec,BracketSpec):
        shape,expected,centers=bracket_shape(spec)
        volume_check='bracket_volume_match'
    else:
        t,b=spec.wall_thickness_mm,spec.base_thickness_mm
        outer=cq.Workplane('XY').box(l,w,h,centered=(True,True,False))
        cavity=cq.Workplane('XY').workplane(offset=b).box(l-2*t,w-2*t,h-b+1,centered=(True,True,False))
        shape=outer.cut(cavity)
        expected=l*w*h-(l-2*t)*(w-2*t)*(h-b)
        volume_check='cavity_volume_match'
    solid=shape.val(); bb=solid.BoundingBox()
    checks={'valid_shape':solid.isValid(),'one_solid':len(shape.solids().vals())==1,'positive_volume':solid.Volume()>0,
            'outer_dimensions_match':all(abs(a-e)<0.01 for a,e in zip((bb.xlen,bb.ylen,bb.zlen),(l,w,h))),
            volume_check:abs(solid.Volume()-expected)<max(0.01,expected*1e-6)}
    if isinstance(spec,BracketSpec):
        if centers:
            checks['through_holes_clear']=all(not solid.isInside(cq.Vector(*p),1e-6) for p in centers)
            rings=[edge for edge in solid.Edges() if edge.geomType()=='CIRCLE']
            checks['hole_diameters_match']=len(rings)==4*spec.holes_per_face and all(abs(2*edge.radius()-spec.hole_diameter_mm)<1e-6 for edge in rings)
        checks['expected_hole_surfaces']=sum(face.geomType()=='CYLINDER' for face in solid.Faces())==2*spec.holes_per_face
    if not all(checks.values()): raise ValueError('Geometry checks failed: '+str(checks))
    folder.mkdir(parents=True,exist_ok=True)
    for ext in ('step','stl'):
        file=folder/f'part.{ext}'
        cq.exporters.export(shape,str(file))
        checks[f'{ext}_nonempty']=0<file.stat().st_size<20_000_000
    if not all(checks.values()): raise ValueError('Export size check failed')
    result={'checks':checks,'volume_mm3':solid.Volume(),'bounding_box_mm':[bb.xlen,bb.ylen,bb.zlen], 'tolerance_mm':0.01,'generation_seconds':round(time.perf_counter()-start,3)}
    if isinstance(spec,BracketSpec):
        result['holes']={'per_face':spec.holes_per_face,'total':2*spec.holes_per_face,'diameter_mm':spec.hole_diameter_mm,'placement':'Evenly spaced across width; centered on each exposed arm.','minimum_edge_margin_mm':max(1,spec.thickness_mm/2)}
    (folder/'inspection.json').write_text(json.dumps(result,indent=2))
    return result

if __name__=='__main__':
    payload=json.loads(Path(sys.argv[1]).read_text(encoding='utf-8-sig'))
    result=build(parse_spec(payload),Path(sys.argv[1]).parent)
    print(json.dumps(result))
