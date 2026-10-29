"""Check explicitly stated overall dimensions, without guessing component dimensions."""
import re
from backend.scene_geometry import scene_dimensions

NUMBER=r'(\d+(?:\.\d+)?)'
UNIT=r'(mm|cm|millimeters?|centimeters?|inches?|inch)'

def overall_constraints(description):
    constraints=[]
    # Deliberately narrow: explicit overall/total dimensions, or a standalone size sentence.
    # Component heights, relative edits, ranges and contextual measurements are left to review.
    for sentence in re.split(r'[.!?;](?!\d)',description.lower()):
        sentence=sentence.strip()
        explicit=re.fullmatch(r'(?:overall|total) (height|width|depth)(?: is| of|:|=)?\s+(about |roughly |approximately |exactly )?'+NUMBER+r'\s*'+UNIT,sentence)
        standalone=re.fullmatch(r'(about |roughly |approximately |exactly )?'+NUMBER+r'\s*'+UNIT+r' (tall|wide|deep)',sentence)
        if explicit:
            axis,approx,number,unit=explicit.groups();index={'width':0,'depth':1,'height':2}[axis]
        elif standalone:
            approx,number,unit,axis=standalone.groups();index={'wide':0,'deep':1,'tall':2}[axis]
        else:continue
        value=float(number)*(10 if unit.startswith('c') else 25.4 if unit.startswith('inch') else 1)
        tolerance=max(.1,value*.1) if approx and approx.strip()!='exactly' else .1
        constraints.append((index,value,tolerance))
    return constraints

def review_overall_dimensions(scene,description):
    constraints=overall_constraints(description)
    if not constraints:return
    actual=scene_dimensions(scene)
    for index,target,tolerance in constraints:
        if abs(actual[index]-target)>tolerance:
            axis=('width','depth','height')[index]
            raise ValueError(f'Requested overall {axis} {target:g} mm (tolerance {tolerance:g} mm), but transformed scene measures {actual[index]:g} mm. Adjust the component dimensions/positions to meet this extent; preserve the intended design. Positions are centers, not top surfaces.')


def review_scene_requirements(scene, facts):
    """Reject misleading confirmations; feedback goes through the existing bounded repair loop."""
    from backend.measurements import named_dimensions
    from backend.requirements import negated
    from backend.scene_geometry import world_matrices, expected_bounds
    dimensions={(d['component'],d['meaning']):d['value_mm'] for d in facts.get('dimensions',[])}
    # Model-selected defaults must also agree with geometry; they never override the user.
    if facts.get('purpose')=='sitting':
        for assumption in scene.assumptions:
            for d in named_dimensions(assumption):
                if d['component']=='seat':dimensions.setdefault((d['component'],d['meaning']),d['value_mm'])
    actual=scene_dimensions(scene)
    for axis,name in enumerate(('width','depth','height')):
        target=dimensions.get(('overall',name))
        if target is not None and abs(actual[axis]-target)>.1:
            raise ValueError(f'Correct the overall {name}: required {target:g} mm, proposed {actual[axis]:g} mm. Preserve the other requirements.')
    def label(c):return re.sub(r'([a-z])([A-Z])',r'\1 \2',c.id+' '+c.name+' '+c.role).lower().replace('_',' ').replace('-',' ')
    parts=[c for c in scene.components if c.primitive!='group']
    for count in facts.get('component_counts',[]):
        pattern={'backrest_slat':r'\bslat(?=\b|\d)','leg':r'\bleg(?=\b|\d)'}[count['component']]
        matched=[c for c in (scene.components if count['component']=='leg' else parts) if re.search(pattern,label(c))]
        matched_ids={c.id for c in matched};nodes={c.id:c for c in scene.components}
        def nested(c):
            parent=c.parent_id
            while parent:
                if parent in matched_ids:return True
                parent=nodes[parent].parent_id
            return False
        matched=[c for c in matched if not nested(c)]
        if len(matched)!=count['count']:
            raise ValueError(f"Include {count['count']} separate {count['component'].replace('_',' ')} components; proposed scene has {len(matched)}. Each must appear in the actual model, not just its description.")
    if facts.get('purpose')=='sitting' or ('seat','surface_height') in dimensions or ('seat','thickness') in dimensions:
        seats=[c for c in parts if c.role=='seat'] or [c for c in parts if re.search(r'\bseat\b',label(c)) and not re.search(r'\b(leg|support)\b',label(c))]
        if len(seats)!=1:raise ValueError('Identify one seat component to verify seat surface height and thickness.')
        world=world_matrices(scene);low,high=expected_bounds(seats[0],world[seats[0].id])
        for meaning,value in [('surface_height',high[2]),('thickness',high[2]-low[2])]:
            target=dimensions.get(('seat',meaning))
            if target is not None and abs(value-target)>.1:raise ValueError(f'Seat {meaning.replace("_"," ")} must be {target:g} mm; proposed {value:g} mm. Height means its top surface, not its center.')
        if facts.get('purpose')=='sitting' or facts.get('seat_leg_connection')=='underside':
            legs=[c for c in parts if re.search(r'\bleg(?=\b|\d)',label(c))]
            if not legs:raise ValueError('The seat requires supporting legs beneath its underside.')
            for leg in legs:
                bottom,top=expected_bounds(leg,world[leg.id])
                target=dimensions.get(('leg','length'))
                if target is not None and abs(top[2]-bottom[2]-target)>.1:
                    raise ValueError(f'{leg.name} length must match the latest explicit requirement: {target:g} mm. Resolve conflicting seat/leg constraints before confirmation.')
                if abs(bottom[2])>.1 or abs(top[2]-low[2])>.1:
                    raise ValueError(f'{leg.name} must run from ground to the seat underside at {low[2]:g} mm. For a {high[2]:g} mm seat surface and {high[2]-low[2]:g} mm seat thickness, use {low[2]:g} mm vertical legs, not {top[2]-bottom[2]:g} mm.')
    for assumption in scene.assumptions:
        if facts.get('purpose')=='sitting' and any(not negated(assumption.lower(),m.start()) for m in re.finditer(r'\bwalking\b',assumption.lower())):
            raise ValueError('Replace the obsolete walking assumption: the corrected purpose is sitting.')
        for stated in named_dimensions(assumption):
            target=dimensions.get((stated['component'],stated['meaning']))
            if target is not None and abs(stated['value_mm']-target)>.1:
                raise ValueError('Revise obsolete assumptions to match the corrected structured dimensions: '+stated['component']+' '+stated['meaning'])


def reconcile_scene_assumptions(scene, facts):
    """Replace stale dimensional prose from actual scene measurements; never change geometry."""
    from backend.measurements import named_dimensions
    from backend.requirements import negated
    from backend.scene_geometry import world_matrices, expected_bounds
    if facts.get('purpose')!='sitting':return scene
    dimensions={(d['component'],d['meaning']):d['value_mm'] for d in facts.get('dimensions',[])}
    def stale(text):
        if any(not negated(text.lower(),m.start()) for m in re.finditer(r'\bwalking\b',text.lower())):return True
        return any((d['component'],d['meaning']) in dimensions and abs(d['value_mm']-dimensions[(d['component'],d['meaning'])])>.1 for d in named_dimensions(text))
    if not any(stale(a) for a in scene.assumptions):return scene
    seats=[c for c in scene.components if c.role=='seat' or c.name.lower()=='seat']
    legs=[c for c in scene.components if c.primitive!='group' and re.search(r'\bleg',c.role.lower().replace('_',' '))]
    if len(seats)!=1 or not legs:return scene
    world=world_matrices(scene);low,high=expected_bounds(seats[0],world[seats[0].id])
    heights=[expected_bounds(c,world[c.id])[1][2]-expected_bounds(c,world[c.id])[0][2] for c in legs]
    if max(heights)-min(heights)>.1:return scene
    result=scene.model_copy(deep=True)
    result.assumptions=[a for a in scene.assumptions if not stale(a)]+[f'Purpose is sitting. Seat surface height {high[2]:g} mm; seat thickness {high[2]-low[2]:g} mm; leg length {heights[0]:g} mm.']
    return result
