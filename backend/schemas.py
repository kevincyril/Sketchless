from typing import Annotated, Literal
from pydantic import BaseModel, ConfigDict, Field, TypeAdapter, field_validator, model_validator

class Spec(BaseModel):
    model_config = ConfigDict(extra='forbid')
    part_type: Literal['enclosure','tray'] = 'enclosure'
    length_mm: float = Field(gt=0, le=500)
    width_mm: float = Field(gt=0, le=500)
    height_mm: float = Field(gt=0, le=300)
    wall_thickness_mm: float = Field(default=3, ge=0.5, le=20)
    base_thickness_mm: float = Field(default=3, ge=0.5, le=20)
    open_top: Literal[True] = True

    @model_validator(mode='after')
    def fits(self):
        if 2*self.wall_thickness_mm >= min(self.length_mm,self.width_mm):
            raise ValueError('Walls must leave a positive interior length and width.')
        if self.base_thickness_mm >= self.height_mm:
            raise ValueError('Base must be thinner than height.')
        return self

class BracketSpec(BaseModel):
    model_config = ConfigDict(extra='forbid')
    part_type: Literal['bracket'] = 'bracket'
    length_mm: float = Field(gt=0, le=500)
    width_mm: float = Field(gt=0, le=500)
    height_mm: float = Field(gt=0, le=300)
    thickness_mm: float = Field(default=3, ge=0.5, le=20)
    hole_diameter_mm: float = Field(default=5, ge=1, le=30)
    holes_per_face: Literal[0,1,2] = 2

    @field_validator('holes_per_face', mode='before')
    @classmethod
    def whole_hole_count(cls,value):
        if type(value) is not int:
            raise ValueError('Holes per face must be a whole number: 0, 1, or 2.')
        return value

    @model_validator(mode='after')
    def fits(self):
        t=self.thickness_mm
        if t>=min(self.length_mm,self.height_mm):
            raise ValueError('Bracket thickness must be less than its length and height.')
        if self.holes_per_face:
            margin=max(1,t/2)
            d=self.hole_diameter_mm
            if min(self.length_mm-t,self.height_mm-t)<d+2*margin:
                raise ValueError('The holes are too large for the arms. Increase length/height or reduce hole diameter.')
            spacing=self.width_mm/(self.holes_per_face+1)
            if spacing-d/2<margin or (self.holes_per_face>1 and spacing<d+2*margin):
                raise ValueError('The holes need more space across the width. Increase width, reduce diameter, or choose fewer holes.')
        return self

PartSpec = Annotated[Spec | BracketSpec, Field(discriminator='part_type')]
part_adapter=TypeAdapter(PartSpec)

from backend.scene_schema import SceneSpec

def parse_spec(payload):
    if isinstance(payload,dict) and payload.get("part_type")=="assembly":
        return SceneSpec.model_validate(payload)
    # Existing enclosure requests may omit their default part type.
    if isinstance(payload,dict) and 'part_type' not in payload:
        payload={'part_type':'enclosure',**payload}
    return part_adapter.validate_python(payload)
