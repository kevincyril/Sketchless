"""Reusable parameterized concept recipes and validated scene operations. No generated code."""
import math
from backend.scene_schema import Component, SceneSpec, ConceptRequest, SceneChanges

def concept_scene(request:ConceptRequest):
    r=request;nodes=[]
    def add(id,name,shape,dims,position=(0,0,0),parent=None,rotation=(0,0,0),color='#6d907b',role='',symmetry=''):
        nodes.append(Component(id=id,name=name,primitive=shape,dimensions=dims,position_mm=position,parent_id=parent,rotation_deg=rotation,color=color,role=role,symmetry_group=symmetry))
    x,y,z=r.body_x_mm,r.body_y_mm,r.body_z_mm;h=r.leg_height_mm
    if r.concept=='robot':
        foot=12;g=h+foot/2
        add('body','Robot body','box',dict(x_mm=x,y_mm=y,z_mm=z),(0,0,g+z/2),color='#67908a',role='body')
        rows=r.leg_count//2
        for row in range(rows):
            yy=0 if rows==1 else -.38*y+row*.76*y/(rows-1)
            label='front' if row==0 else 'rear' if row==rows-1 else 'middle'
            for sign,side in [(-1,'left'),(1,'right')]:
                id=f'{label}_{side}_leg';a=22 if r.articulated else 0;dx=sign*h/2*math.tan(math.radians(a));upper=h/2/math.cos(math.radians(a))
                add(id,label.title()+' '+side+' leg','group',{},(sign*x*.44,yy,g),role=id,symmetry='legs')
                add(id+'.hip','Hip joint','sphere',dict(radius_mm=12),(0,0,0),id,color='#d4aa69',role='hip')
                add(id+'.upper','Upper leg','box',dict(x_mm=18,y_mm=22,z_mm=upper),(dx/2,0,-h/4),id,(0,-sign*a,0),role='upper_leg')
                add(id+'.knee','Knee joint','sphere',dict(radius_mm=13),(dx,0,-h/2),id,color='#d4aa69',role='knee')
                add(id+'.lower','Lower leg','box',dict(x_mm=16,y_mm=20,z_mm=h/2),(dx,0,-h*.75),id,role='lower_leg')
                add(id+'.foot','Foot','box',dict(x_mm=40,y_mm=36,z_mm=foot),(dx,0,-h),id,color='#3d535d',role='foot')
        for i in range(r.eye_count):
            xx=0 if r.eye_count==1 else (-1 if i==0 else 1)*x*.24
            add('eye_'+str(i+1),'Camera eye '+str(i+1),'sphere',dict(radius_mm=min(x,y,z)*.10),(xx,-y/2-8,g+z*.68),color='#243b4c',role='eye',symmetry='eyes')
    elif r.concept=='table':
        add('top','Tabletop','box',dict(x_mm=x,y_mm=y,z_mm=z),(0,0,h+z/2),role='top')
        for sx,sy in [(-1,-1),(1,-1),(-1,1),(1,1)]:
            id=f'leg_{"left" if sx<0 else "right"}_{"front" if sy<0 else "rear"}'
            add(id,'Table leg','cylinder',dict(radius_mm=min(x,y)*.04,z_mm=h),(sx*x*.4,sy*y*.4,h/2),color='#a78256',role='leg',symmetry='legs')
    else:
        add('base','Stand base','cylinder',dict(radius_mm=x/2,z_mm=z),(0,0,z/2),role='base')
        add('post','Stand post','cylinder',dict(radius_mm=min(x,y)*.06,z_mm=h),(0,0,z+h/2),color='#d4aa69',role='post')
        add('platform','Stand platform','box',dict(x_mm=x*.8,y_mm=y,z_mm=z),(0,0,z+h+z/2),role='platform')
    defaults=['Concept geometry only; joints are visual, not mechanical.','Millimeters; +Z up; front is -Y; positions are local to parent groups.']
    return SceneSpec(name=r.concept.title()+' concept',concept=r.concept,components=nodes,assumptions=defaults+r.assumptions[:6])

def edit_scene(scene:SceneSpec,changes:SceneChanges,selected_id=None):
    data=scene.model_dump(mode="json");nodes={n['id']:n for n in data['components']}
    if changes.assumptions is not None:data['assumptions']=changes.assumptions
    if selected_id and selected_id not in nodes:raise ValueError('Selected component no longer exists.')
    # A selected-only request is expressed as a patch to that stable ID, not a rebuilt scene.
    if changes.lengthen_legs_mm is not None:
        if scene.concept!='robot':raise ValueError('The leg-length operation currently supports articulated robot concepts only. Use explicit component patches for other scenes.')
        d=changes.lengthen_legs_mm;legs=[n for n in nodes.values() if n['primitive']=='group' and n['symmetry_group']=='legs']
        if not legs:raise ValueError('No articulated leg groups found.')
        for group in legs:
            id=group['id'];required=[id+s for s in ('.upper','.lower','.knee','.foot')]
            if any(key not in nodes for key in required):raise ValueError('This leg has a custom structure; edit its components explicitly.')
            upper,lower,knee,foot=[nodes[key] for key in required]
            drop=-knee['position_mm'][2]+d/2
            if drop<=1 or lower['dimensions']['z_mm']+d/2<=1:raise ValueError('Legs must retain positive segment lengths.')
            dx=knee['position_mm'][0]
            upper['dimensions']['z_mm']=math.hypot(dx,drop)
            upper['position_mm'][2]=-drop/2
            upper['rotation_deg'][1]=-math.degrees(math.atan2(dx,drop))
            knee['position_mm'][2]-=d/2;lower['position_mm'][2]-=d*.75;lower['dimensions']['z_mm']+=d/2;foot['position_mm'][2]-=d
            group['position_mm'][2]+=d
        for n in nodes.values():
            if n['role'] in ('body','eye') and n['parent_id'] is None:n['position_mm'][2]+=d
    if changes.cylindrical_feet:
        feet=[n for n in nodes.values() if n['role']=='foot']
        if not feet:raise ValueError('No feet found to replace.')
        for n in feet:
            dim=n['dimensions'];radius=max(dim['x_mm'] or 0,dim['y_mm'] or 0)/2 if n['primitive']=='box' else dim['radius_mm']
            n['primitive']='cylinder';n['dimensions']={'radius_mm':radius,'z_mm':dim['z_mm']}
    for patch in changes.updates:
        if patch.id not in nodes:raise ValueError('Unknown component ID: '+patch.id)
        n=nodes[patch.id]
        for key,value in patch.model_dump(exclude_none=True).items():
            if key=='id':continue
            if key=='dimensions':n[key].update(value)
            else:n[key]=value
    remove=set(changes.remove_ids)
    if not remove.issubset(nodes):raise ValueError('Cannot remove unknown components.')
    while True:
        descendants={n['id'] for n in nodes.values() if n['parent_id'] in remove}
        if descendants<=remove:break
        remove|=descendants
    for id in remove:nodes.pop(id)
    for item in changes.copies:
        if item.source_id not in nodes:raise ValueError('Unknown copy source.')
        subtree={item.source_id}
        while True:
            more={n['id'] for n in nodes.values() if n['parent_id'] in subtree}
            if more<=subtree:break
            subtree|=more
        source=nodes[item.source_id];mapping={key:item.new_id if key==item.source_id else item.new_id+'.'+(key[len(item.source_id)+1:] if key.startswith(item.source_id+'.') else key) for key in subtree}
        for key in sorted(subtree):
            n=__import__('copy').deepcopy(nodes[key]);n['id']=mapping[key];n['name']+=' copy'
            if n['id'] in nodes:raise ValueError('Copy ID already exists.')
            if key==item.source_id:
                n['position_mm']=[a+b for a,b in zip(n['position_mm'],item.offset_mm)]
                if item.mirror_axis:
                    axis='xyz'.index(item.mirror_axis);n['position_mm'][axis]*=-1
            else:n['parent_id']=mapping[n['parent_id']]
            # Reflection about a parent axis; mirrored subtree local coordinates and Euler signs.
            if item.mirror_axis:
                axis='xyz'.index(item.mirror_axis)
                if key!=item.source_id:n['position_mm'][axis]*=-1
                n['rotation_deg']=[v if i==axis else -v for i,v in enumerate(n['rotation_deg'])]
            nodes[n['id']]=n
    for component in changes.additions:
        if component.id in nodes:raise ValueError('Addition ID already exists; use an update.')
        nodes[component.id]=component.model_dump()
    data['components']=list(nodes.values())
    return SceneSpec.model_validate(data)


def cleaner_scene(request):
    """Parametric robot-vacuum design language, expanded into ordinary editable primitives."""
    from backend.scene_schema import CleanerRequest
    r=CleanerRequest.model_validate(request) if isinstance(request,dict) else request
    nodes=[];radius=r.diameter_mm/2;h=r.body_height_mm;bottom=14;top=bottom+h
    def add(id,name,primitive,dims,pos,rotation=(0,0,0),color=None,role='',parent=None):
        nodes.append(Component(id=id,name=name,primitive=primitive,dimensions=dims,position_mm=pos,rotation_deg=rotation,color=color or r.shell_color,role=role,parent_id=parent))
    dark='#27373b';rubber='#18262b'
    add('body','Low-profile circular body','cylinder',{'radius_mm':radius*.965,'z_mm':h},(0,0,bottom+h/2),role='body')
    add('bumper','Wraparound protective bumper','cylinder',{'radius_mm':radius,'z_mm':h*.36},(0,0,bottom+h*.32),color=dark,role='bumper')
    add('deck','Upper shell','cylinder',{'radius_mm':radius*.95,'z_mm':h*.48},(0,0,top-h*.23),role='shell')
    add('lid_seam','Dust-bin lid seam','cylinder',{'radius_mm':radius*.76,'z_mm':2},(0,0,top+1),color=dark,role='lid_seam')
    add('lid','Removable dust-bin lid','cylinder',{'radius_mm':radius*.75,'z_mm':2},(0,0,top+2),role='lid')
    wheel_radius=min(32,h*.43);wheel_z=wheel_radius
    for side,sign in [('left',-1),('right',1)]:
        add('wheel_'+side,side.title()+' drive wheel','cylinder',{'radius_mm':wheel_radius,'z_mm':radius*.12},(sign*radius*.91,20,wheel_z),(0,90,0),rubber,'wheel')
        add('hub_'+side,side.title()+' wheel hub','cylinder',{'radius_mm':wheel_radius*.45,'z_mm':2},(sign*radius*.976,20,wheel_z),(0,90,0),r.accent_color,'hub')
    add('caster','Front support ball','sphere',{'radius_mm':8},(0,-radius*.62,8),color=dark,role='caster')
    add('front_sensor','Front obstacle sensor window','box',{'x_mm':radius*.55,'y_mm':9,'z_mm':h*.21},(0,-radius*.95,bottom+h*.68),color=rubber,role='sensor')
    if r.lidar:
        add('lidar_base','Lidar turret surround','cylinder',{'radius_mm':radius*.175,'z_mm':5},(0,radius*.29,top+5.5),color=dark,role='sensor_mount')
        add('lidar','Lidar sensor turret','cylinder',{'radius_mm':radius*.155,'z_mm':15},(0,radius*.29,top+15.5),color=r.accent_color,role='sensor')
        add('lidar_cap','Lidar cap','cylinder',{'radius_mm':radius*.155,'z_mm':2},(0,radius*.29,top+24),color=dark,role='sensor_cap')
    for id,xx,name in [('power',-12,'Power button'),('home',12,'Dock button')]:
        add(id,name,'cylinder',{'radius_mm':7,'z_mm':2},(xx,-radius*.43,top+4),color=r.accent_color,role='control')
    add('status','Status indicator','box',{'x_mm':22,'y_mm':3,'z_mm':1},(0,-radius*.59,top+3.5),color=r.accent_color,role='indicator')
    for index,sign in enumerate([1] if r.side_brushes==1 else [-1,1]):
        id='brush_'+str(index+1)
        add(id,'Side brush '+str(index+1),'group',{},(sign*radius*.72,-radius*.72,6),role='brush')
        add(id+'.hub','Brush hub','cylinder',{'radius_mm':8,'z_mm':6},(0,0,0),color=dark,role='brush_hub',parent=id)
        for i in range(3):
            angle=math.radians(i*120);reach=radius*.2
            add(id+'.bristle_'+str(i+1),'Brush bristles','box',{'x_mm':reach,'y_mm':4,'z_mm':2},(math.cos(angle)*reach/2,math.sin(angle)*reach/2,0),(0,0,i*120),'#c5aa6b','bristle',id)
    scene=SceneSpec(name='Home cleaner - robot vacuum',concept='cleaner',components=nodes,assumptions=[f'Interpreted home cleaner as a low round robot vacuum: {r.diameter_mm:g} mm body diameter, {h:g} mm body height; brush and sensor may extend beyond the shell.','Two side drive wheels and one small support ball; no walking legs.',f'{r.side_brushes} side brush(es); '+('raised lidar turret' if r.lidar else 'front obstacle sensor without a lidar turret')+'; removable lid and visible controls.','Editable visual concept only: suction, airflow, dust capacity, navigation, wheel clearance, cleaning effectiveness and manufacturability are not validated.'])
    review_cleaner(scene)
    return scene

def review_cleaner(scene):
    roles={role:[c for c in scene.components if c.role==role] for role in ['body','wheel','bumper','sensor','control','brush']}
    checks={'body_present':len(roles['body'])==1,'two_drive_wheels':len(roles['wheel'])==2,'bumper_present':bool(roles['bumper']),'sensor_present':bool(roles['sensor']),'controls_present':bool(roles['control']),'cleaning_brush_present':bool(roles['brush']),'no_walking_legs':not any(c.role in ('upper_leg','lower_leg','knee') for c in scene.components)}
    if not all(checks.values()):raise ValueError('Robot-vacuum concept is missing its identifying features: '+', '.join(k for k,v in checks.items() if not v)+'. Use create_cleaner or include these features in the proposal.')
    return {'checks':checks,'scope':'Checks identifying components only; not a score of aesthetics, mechanical function or cleaning performance.'}
