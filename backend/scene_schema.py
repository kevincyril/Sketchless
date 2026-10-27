"""Versioned primitive scene contract; Z-up, mm, local XYZ Euler degrees (Rz Ry Rx)."""
from typing import Literal, Annotated
from pydantic import BaseModel, ConfigDict, Field, FiniteFloat, model_validator, field_validator

class Strict(BaseModel):
    model_config=ConfigDict(extra='forbid',allow_inf_nan=False)

Coordinate=Annotated[FiniteFloat,Field(ge=-2000,le=2000)]
Angle=Annotated[FiniteFloat,Field(ge=-360,le=360)]
Vector=tuple[Coordinate,Coordinate,Coordinate]
Rotation=tuple[Angle,Angle,Angle]
Size=Annotated[FiniteFloat,Field(ge=.1,le=1000)]
ID=Annotated[str,Field(pattern=r'^[a-zA-Z][a-zA-Z0-9_.-]{0,63}$')]

class Dimensions(Strict):
    x_mm:Size|None=None
    y_mm:Size|None=None
    z_mm:Size|None=None
    radius_mm:Size|None=None
    top_radius_mm:Annotated[FiniteFloat,Field(ge=0,le=1000)]|None=None

class Component(Strict):
    id:ID
    name:str=Field(min_length=1,max_length=80)
    primitive:Literal['box','cylinder','sphere','cone','group']
    dimensions:Dimensions=Field(default_factory=Dimensions)
    position_mm:Vector=(0,0,0)
    rotation_deg:Rotation=(0,0,0)
    parent_id:ID|None=None
    color:str=Field(default='#6d907b',pattern=r'^#[0-9a-fA-F]{6}$')
    role:str=Field(default='',max_length=64)
    symmetry_group:str=Field(default='',max_length=64)

    @model_validator(mode='after')
    def primitive_dimensions(self):
        keys={k for k,v in self.dimensions.model_dump().items() if v is not None}
        required={'box':{'x_mm','y_mm','z_mm'},'cylinder':{'radius_mm','z_mm'},'sphere':{'radius_mm'},'cone':{'radius_mm','top_radius_mm','z_mm'},'group':set()}[self.primitive]
        if keys!=required:raise ValueError(f'{self.primitive} requires exactly these dimensions: {sorted(required)}')
        return self

class SceneSpec(Strict):
    part_type:Literal['assembly']='assembly'
    schema_version:Literal[1]=1
    units:Literal['mm']='mm'
    coordinates:Literal['right-handed-z-up-xyz-degrees']='right-handed-z-up-xyz-degrees'
    name:str=Field(min_length=1,max_length=80)
    concept:Literal['robot','table','stand','cleaner','custom']='custom'
    assumptions:list[str]=Field(default_factory=list,max_length=8)
    components:list[Component]=Field(min_length=1,max_length=64)

    @field_validator('schema_version',mode='before')
    @classmethod
    def version_number(cls,value):
        if type(value) is not int or value!=1:raise ValueError('Only scene schema version 1 is supported.')
        return value

    @model_validator(mode='after')
    def graph(self):
        nodes={c.id:c for c in self.components}
        if len(nodes)!=len(self.components):raise ValueError('Component IDs must be unique.')
        if not any(c.primitive!='group' for c in self.components):raise ValueError('A scene needs at least one solid component.')
        for c in self.components:
            seen={c.id};parent=c.parent_id
            while parent:
                if parent not in nodes:raise ValueError('Missing parent ID: '+parent)
                if parent in seen:raise ValueError('Parent cycle detected.')
                if nodes[parent].primitive!='group':raise ValueError('Only groups can be parents.')
                seen.add(parent)
                if len(seen)>8:raise ValueError('At most eight hierarchy levels are supported.')
                parent=nodes[parent].parent_id
        if any(len(a)>500 for a in self.assumptions):raise ValueError('Keep assumptions concise.')
        return self

class ConceptRequest(Strict):
    concept:Literal['robot','table','stand']
    body_x_mm:Size=200
    body_y_mm:Size=200
    body_z_mm:Size=200
    leg_count:Literal[2,4,6]=4
    leg_height_mm:Size=160
    articulated:bool=True
    eye_count:Literal[0,1,2]=2
    assumptions:list[str]=Field(default_factory=list,max_length=8)

class Patch(Strict):
    id:ID
    dimensions:Dimensions|None=None
    position_mm:Vector|None=None
    rotation_deg:Rotation|None=None
    color:str|None=Field(default=None,pattern=r'^#[0-9a-fA-F]{6}$')
    name:str|None=Field(default=None,min_length=1,max_length=80)

class Copy(Strict):
    source_id:ID
    new_id:ID
    offset_mm:Vector=(0,0,0)
    mirror_axis:Literal['x','y','z']|None=None

class SceneChanges(Strict):
    updates:list[Patch]=Field(default_factory=list,max_length=32)
    additions:list[Component]=Field(default_factory=list,max_length=32)
    remove_ids:list[ID]=Field(default_factory=list,max_length=32)
    copies:list[Copy]=Field(default_factory=list,max_length=8)
    lengthen_legs_mm:Annotated[FiniteFloat,Field(ge=-500,le=500)]|None=None
    cylindrical_feet:bool=False

class RestoreAction(Strict):
    version_id:str=Field(pattern=r'^[0-9a-f-]{36}$')


class CleanerRequest(Strict):
    diameter_mm:Annotated[FiniteFloat,Field(ge=200,le=500)]=340
    body_height_mm:Annotated[FiniteFloat,Field(ge=35,le=160)]=75
    shell_color:str=Field(default='#e5e8e2',pattern=r'^#[0-9a-fA-F]{6}$')
    accent_color:str=Field(default='#60998f',pattern=r'^#[0-9a-fA-F]{6}$')
    lidar:bool=True
    side_brushes:Literal[1,2]=1

    @model_validator(mode='after')
    def low_profile(self):
        if self.body_height_mm>self.diameter_mm*.45:raise ValueError('This robot-vacuum concept must be low-profile: body height no more than 45% of its diameter. Use a custom scene for a different product form.')
        return self
