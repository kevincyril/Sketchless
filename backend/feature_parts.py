"""Bounded parametric recipes generating editable cut-feature scenes."""
import math
from backend.scene_schema import SceneSpec
from backend.feature_schema import BoxFeatures, BracketFeatures, PhoneStandFeatures, ShaftFeatures, PlateFeatures, FeatureRequest, FeatureDesign, ShaftSection

def box(id,name,xyz,position,cutouts=None,radius=0):
    return dict(id=id,name=name,primitive='box',role='body',dimensions=dict(zip(('x_mm','y_mm','z_mm'),xyz)),position_mm=position,cutouts=cutouts or [],vertical_fillet_mm=radius)

def cut_box(xyz,position=(0,0,0),radius=0):
    return dict(primitive='box',dimensions=dict(zip(('x_mm','y_mm','z_mm'),xyz)),position_mm=position,vertical_fillet_mm=radius)

def hole(radius,length,position=(0,0,0),rotation=(0,0,0)):
    return dict(primitive='cylinder',dimensions={'radius_mm':radius,'z_mm':length},position_mm=position,rotation_deg=rotation)


def feature_scene(request:FeatureRequest):
    p=request.design;parts=[];fuse=False;assumptions=['Millimeters. Bounded CAD features; strength, printability and physical fit are not verified.']
    if isinstance(p,BoxFeatures):
        l,w,h,t,b=p.length_mm,p.width_mm,p.height_mm,p.wall_mm,p.floor_mm
        cuts=[];radius=p.corner_radius_mm
        if p.kind=='organizer':
            cw=(l-2*t-(p.columns-1)*p.divider_mm)/p.columns;cd=(w-2*t-(p.rows-1)*p.divider_mm)/p.rows
            for col in range(p.columns):
                for row in range(p.rows):cuts.append(cut_box((cw,cd,h-b+1),(t+cw/2+col*(cw+p.divider_mm)-l/2,t+cd/2+row*(cd+p.divider_mm)-w/2,(b+1)/2)))
            assumptions.append(f'{p.columns} columns and {p.rows} rows of equal clear compartments; divider thickness {p.divider_mm:g} mm.')
        else:cuts.append(cut_box((l-2*t,w-2*t,h-b+1),(0,0,(b+1)/2),max(0,radius-t)))
        if p.kind=='slotted_tray':
            cuts += [cut_box((p.slot_length_mm,p.slot_width_mm,b+2),(x-l/2,y-w/2,b/2-h/2)) for x,y in p.slot_centers_mm]
            assumptions.append('Slot X/Y centers are measured from the same outside corner; corner radii preserve the straight-wall thickness.')
        if p.kind=='enclosure':
            i=p.post_inset_mm
            for n,(x,y) in enumerate(((i,i),(l-i,i),(i,w-i),(l-i,w-i))):
                cuts.append(hole(p.post_hole_mm/2,b+2,(x-l/2,y-w/2,b/2-h/2)))
                parts.append(dict(id=f'post{n+1}',name=f'Screw post {n+1}',primitive='cylinder',dimensions={'radius_mm':p.post_diameter_mm/2,'z_mm':h-b},position_mm=(x,y,(h+b)/2),cutouts=[hole(p.post_hole_mm/2,h-b+2)]))
            fuse=True
        parts.insert(0,box('body',p.kind.replace('_',' ').title(),(l,w,h),(l/2,w/2,h/2),cuts,radius))
        name={'enclosure':'Posted electronics enclosure','organizer':'Equal-compartment organizer','slotted_tray':'Slotted tray'}[p.kind]
    elif isinstance(p,BracketFeatures):
        l,w,h,t=p.length_mm,p.width_mm,p.height_mm,p.thickness_mm
        parts=[box('base','Horizontal leg',(l,w,t),(l/2,0,t/2),[hole(p.hole_diameter_mm/2,t+2,(v-l/2,0,0)) for v in p.hole_positions_mm]),
               box('upright','Vertical leg',(t,w,h),(t/2,0,h/2),[hole(p.hole_diameter_mm/2,t+2,(0,0,v-h/2),(0,90,0)) for v in p.hole_positions_mm])]
        name='Corner-referenced L bracket';fuse=True
        assumptions.append('Each face has one centerline row. Hole distances are measured along each leg from the common outside corner.')
    elif isinstance(p,PhoneStandFeatures):
        angle=math.radians(p.angle_deg);b=p.base_thickness_mm
        lip_depth=p.support_thickness_mm;lip_y=8;start_y=25;notch_height=p.lip_height_mm*2/3
        parts=[box('base','Base',(p.base_width_mm,p.base_depth_mm,b),(0,p.base_depth_mm/2,b/2),[cut_box((p.cable_width_mm,20,b+2),(0,lip_y-p.base_depth_mm/2,0))]),
               box('support','Sloped support',(p.support_width_mm,p.support_length_mm,p.support_thickness_mm),(0,start_y+p.support_length_mm/2*math.cos(angle),b+p.support_length_mm/2*math.sin(angle))),
               box('lip','Retaining lip',(p.support_width_mm,lip_depth,p.lip_height_mm),(0,lip_y,b+p.lip_height_mm/2),[cut_box((p.cable_width_mm,lip_depth+2,notch_height),(0,0,-(p.lip_height_mm-notch_height)/2))])]
        parts[1]['rotation_deg']=(p.angle_deg,0,0)
        name='One-piece sloped phone stand';fuse=True
        assumptions.append('Support angle is relative to the horizontal base. Lip rises above the base; its cable notch leaves a top bridge. Lip Y center 8 mm; support lower centerline Y 25 mm.')
    elif isinstance(p,ShaftFeatures):
        offset=0;center_z=max(s.diameter_mm for s in p.sections)/2
        for n,section in enumerate(p.sections):
            parts.append(dict(id=f'section{n+1}',name=f'Shaft section {n+1}',primitive='cylinder',dimensions={'radius_mm':section.diameter_mm/2,'z_mm':section.length_mm},position_mm=(offset+section.length_mm/2,0,center_z),rotation_deg=(0,90,0),cutouts=[hole(p.cross_hole_diameter_mm/2,section.diameter_mm+2,rotation=(0,90,0))] if n==p.hole_section_index else []))
            offset+=section.length_mm
        name='Stepped shaft with transverse bore';fuse=True
        assumptions.append('Coaxial sections run along +X. The transverse bore is centered in its selected section and perpendicular to the shaft axis.')
    else:
        l,w,t=p.length_mm,p.width_mm,p.thickness_mm;i=p.hole_edge_inset_mm
        parts=[box('plate','Mounting plate',(l,w,t),(l/2,w/2,t/2),[hole(p.hole_diameter_mm/2,t+2,(x-l/2,y-w/2,0)) for x,y in ((i,i),(l-i,i),(i,w-i),(l-i,w-i))])]
        name='Four-hole mounting plate'
        assumptions.append('All input dimensions are millimeters, including converted inch dimensions. Hole centers use the same outside-corner reference.')
    return SceneSpec(name=name,components=parts,assumptions=assumptions,fuse_solids=fuse,feature_design=p)
