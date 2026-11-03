"""Validated bounded feature-part parameter contracts; no CAD or scene dependency."""
from typing import Annotated, Literal
from pydantic import BaseModel, ConfigDict, Field, FiniteFloat, model_validator

class Strict(BaseModel):
    model_config=ConfigDict(extra="forbid",allow_inf_nan=False)

Measure=Annotated[FiniteFloat,Field(gt=0,le=500)]

class BoxFeatures(Strict):
    kind:Literal['enclosure','organizer','slotted_tray']
    length_mm:Measure
    width_mm:Measure
    height_mm:Measure
    wall_mm:Measure
    floor_mm:Measure
    post_diameter_mm:Measure|None=None
    post_hole_mm:Measure|None=None
    post_inset_mm:Measure|None=None
    columns:Annotated[int,Field(ge=1,le=6)]=1
    rows:Annotated[int,Field(ge=1,le=6)]=1
    divider_mm:Measure=2
    slot_length_mm:Measure|None=None
    slot_width_mm:Measure|None=None
    slot_centers_mm:list[tuple[FiniteFloat,FiniteFloat]]=Field(default_factory=list,max_length=12)
    corner_radius_mm:Annotated[FiniteFloat,Field(ge=0,le=50)]=0

    @model_validator(mode='after')
    def fits(self):
        l,w,h,t,b=self.length_mm,self.width_mm,self.height_mm,self.wall_mm,self.floor_mm
        if min(l,w)<=2*t or b>=h:raise ValueError('Walls/floor must leave a positive interior.')
        if self.corner_radius_mm>=min(l,w)/2:raise ValueError('Corner radius exceeds the footprint.')
        if self.kind=='enclosure':
            if not all((self.post_diameter_mm,self.post_hole_mm,self.post_inset_mm)):raise ValueError('Specify post diameter, through-hole diameter and edge inset.')
            r=self.post_diameter_mm/2;i=self.post_inset_mm
            if self.post_hole_mm>=self.post_diameter_mm or i-r<t or i+r>=min(l,w)/2:raise ValueError('Posts must fit inside the walls, remain separate, and have positive wall thickness.')
        if self.kind=='organizer':
            if self.columns*self.rows>24 or (l-2*t-(self.columns-1)*self.divider_mm)<=0 or (w-2*t-(self.rows-1)*self.divider_mm)<=0:raise ValueError('Dividers must leave positive equal compartments (at most 24).')
        if self.kind=='slotted_tray':
            if not self.slot_length_mm or not self.slot_width_mm or not self.slot_centers_mm:raise ValueError('Specify slot length, width and outside-corner X/Y centers.')
            for x,y in self.slot_centers_mm:
                if not (t+self.slot_length_mm/2<x<l-t-self.slot_length_mm/2 and t+self.slot_width_mm/2<y<w-t-self.slot_width_mm/2):raise ValueError('Slots must fit inside the floor without cutting the walls.')
        return self

class BracketFeatures(Strict):
    kind:Literal['bracket']='bracket'
    length_mm:Measure
    width_mm:Measure
    height_mm:Measure
    thickness_mm:Measure
    hole_diameter_mm:Measure
    hole_positions_mm:list[Measure]=Field(min_length=1,max_length=4)

    @model_validator(mode='after')
    def fits(self):
        r=self.hole_diameter_mm/2;t=self.thickness_mm
        if t>=min(self.length_mm,self.height_mm) or self.width_mm<=2*r:raise ValueError('Bracket plates must leave room for the holes.')
        if any(p-r<=t or p+r>=min(self.length_mm,self.height_mm) for p in self.hole_positions_mm):raise ValueError('Hole centers are measured from the outside corner and must fit both legs.')
        if any(abs(a-b)<=2*r for i,a in enumerate(self.hole_positions_mm) for b in self.hole_positions_mm[i+1:]):raise ValueError('Hole openings must remain separate.')
        return self

class PhoneStandFeatures(Strict):
    kind:Literal['phone_stand']='phone_stand'
    base_width_mm:Measure
    base_depth_mm:Measure
    base_thickness_mm:Measure
    support_width_mm:Measure
    support_length_mm:Measure
    support_thickness_mm:Measure
    angle_deg:Annotated[FiniteFloat,Field(gt=10,lt=90)]
    lip_height_mm:Measure
    cable_width_mm:Measure

    @model_validator(mode='after')
    def fits(self):
        if self.support_width_mm>self.base_width_mm or self.cable_width_mm>=self.support_width_mm:raise ValueError('Support and cable notch must fit the base width.')
        if self.base_depth_mm<40 or self.lip_height_mm<4 or self.base_thickness_mm>=self.lip_height_mm:raise ValueError('The base and lip need space for a connected cable notch.')
        return self

class ShaftSection(Strict):
    length_mm:Measure
    diameter_mm:Measure

class ShaftFeatures(Strict):
    kind:Literal['shaft']='shaft'
    sections:list[ShaftSection]=Field(min_length=2,max_length=8)
    cross_hole_diameter_mm:Measure
    hole_section_index:Annotated[int,Field(ge=0,le=7)]=0

    @model_validator(mode='after')
    def fits(self):
        if sum(s.length_mm for s in self.sections)>500:raise ValueError('Total shaft length cannot exceed 500 mm.')
        if self.hole_section_index>=len(self.sections):raise ValueError('Hole section must exist.')
        section=self.sections[self.hole_section_index]
        if self.cross_hole_diameter_mm>=min(section.diameter_mm,section.length_mm):raise ValueError('Cross-hole must fit the selected shaft section.')
        return self

class PlateFeatures(Strict):
    kind:Literal['plate']='plate'
    length_mm:Measure
    width_mm:Measure
    thickness_mm:Measure
    hole_diameter_mm:Measure
    hole_edge_inset_mm:Measure

    @model_validator(mode='after')
    def fits(self):
        r=self.hole_diameter_mm/2;i=self.hole_edge_inset_mm
        if i<=r or i+r>=min(self.length_mm,self.width_mm)/2:raise ValueError('Four separate holes must fit within the plate edges.')
        return self

FeatureDesign=Annotated[BoxFeatures|BracketFeatures|PhoneStandFeatures|ShaftFeatures|PlateFeatures,Field(discriminator='kind')]
class FeatureRequest(Strict):
    design:FeatureDesign
