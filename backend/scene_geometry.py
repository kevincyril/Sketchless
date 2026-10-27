"""Analytic scene bounds and transforms; no CAD builds or artifacts required."""
import math
import numpy as np

def matrix(component):
    x,y,z=map(math.radians,component.rotation_deg)
    rx=np.array([[1,0,0],[0,math.cos(x),-math.sin(x)],[0,math.sin(x),math.cos(x)]])
    ry=np.array([[math.cos(y),0,math.sin(y)],[0,1,0],[-math.sin(y),0,math.cos(y)]])
    rz=np.array([[math.cos(z),-math.sin(z),0],[math.sin(z),math.cos(z),0],[0,0,1]])
    m=np.eye(4);m[:3,:3]=rz@ry@rx;m[:3,3]=component.position_mm
    return m

def world_matrices(scene):
    nodes={n.id:n for n in scene.components};result={}
    def resolve(id):
        if id not in result:
            n=nodes[id];result[id]=(resolve(n.parent_id) if n.parent_id else np.eye(4))@matrix(n)
        return result[id]
    for id in nodes:resolve(id)
    return result

def expected_bounds(c,m):
    d=c.dimensions;r=m[:3,:3];center=m[:3,3]
    if c.primitive=='box':
        extent=np.abs(r)@np.array([d.x_mm,d.y_mm,d.z_mm])/2
        return center-extent,center+extent
    if c.primitive=='sphere':return center-d.radius_mm,center+d.radius_mm
    radial=np.sqrt(r[:,0]**2+r[:,1]**2)
    bottom=center-r[:,2]*d.z_mm/2;top=center+r[:,2]*d.z_mm/2
    rb=d.radius_mm;rt=d.top_radius_mm if c.primitive=='cone' else rb
    return np.minimum(bottom-radial*rb,top-radial*rt),np.maximum(bottom+radial*rb,top+radial*rt)

def scene_dimensions(scene):
    world=world_matrices(scene)
    bounds=[expected_bounds(c,world[c.id]) for c in scene.components if c.primitive!='group']
    low=np.min([b[0] for b in bounds],axis=0)
    high=np.max([b[1] for b in bounds],axis=0)
    return [round(float(v),2) for v in high-low]


def layout_warnings(scene):
    """AABB separation flags possible floating parts; overlap does not prove contact."""
    world=world_matrices(scene)
    bounds={c.id:expected_bounds(c,world[c.id]) for c in scene.components if c.primitive!='group'}
    if len(bounds)<2:return []
    reached={next(iter(bounds))}
    while True:
        adjacent={key for key,(low,high) in bounds.items() if any(np.all(np.maximum(low,bounds[other][0])<=np.minimum(high,bounds[other][1])+.5) for other in reached)}
        if adjacent<=reached:break
        reached|=adjacent
    if len(reached)==len(bounds):return []
    return ['Some components have separated bounding boxes and may float apart. Check their placement before building. Separation may be intentional; overlapping bounds do not prove a physical connection.']
