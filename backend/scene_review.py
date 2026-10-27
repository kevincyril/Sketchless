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
