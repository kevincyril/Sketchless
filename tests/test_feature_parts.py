import math
from pathlib import Path
import cadquery as cq
import pytest
from backend.feature_parts import FeatureRequest,feature_scene
from backend.scene_cad import build_scene
from backend.scene_schema import SceneSpec

DESIGNS={
 'enclosure':dict(kind='enclosure',length_mm=120,width_mm=80,height_mm=45,wall_mm=3,floor_mm=3,post_diameter_mm=8,post_hole_mm=3,post_inset_mm=10),
 'bracket':dict(kind='bracket',length_mm=70,width_mm=50,height_mm=80,thickness_mm=5,hole_diameter_mm=6,hole_positions_mm=[20,45]),
 'phone_stand':dict(kind='phone_stand',base_width_mm=90,base_depth_mm=100,base_thickness_mm=6,support_width_mm=80,support_length_mm=110,support_thickness_mm=6,angle_deg=65,lip_height_mm=12,cable_width_mm=14),
 'shaft':dict(kind='shaft',sections=[dict(length_mm=30,diameter_mm=20),dict(length_mm=40,diameter_mm=14),dict(length_mm=30,diameter_mm=10)],cross_hole_diameter_mm=4),
 'organizer':dict(kind='organizer',length_mm=180,width_mm=120,height_mm=35,wall_mm=3,floor_mm=3,divider_mm=2,columns=3,rows=2),
 'plate':dict(kind='plate',length_mm=152.4,width_mm=101.6,thickness_mm=5,hole_diameter_mm=6,hole_edge_inset_mm=12.7),
 'slotted_tray':dict(kind='slotted_tray',length_mm=160,width_mm=100,height_mm=30,wall_mm=3,floor_mm=3,slot_length_mm=20,slot_width_mm=8,slot_centers_mm=[(40,50),(120,50)])}


def scene(kind,**updates):
    return feature_scene(FeatureRequest(design={**DESIGNS[kind],**updates}))


@pytest.mark.parametrize('kind',list(DESIGNS))
def test_actual_feature_cad_exports(kind,tmp_path):
    proposed=scene(kind)
    result=build_scene(proposed,tmp_path)
    assert all(result['checks'].values()) and result['solid_count']==1
    imported=cq.importers.importStep(str(tmp_path/'part.step'))
    assert imported.val().isValid() and len(imported.solids().vals())==1
    shape=imported.val();bbox=shape.BoundingBox()
    assert [bbox.xlen,bbox.ylen,bbox.zlen]==pytest.approx(result['bounding_box_mm'],abs=.02)
    assert shape.Volume()==pytest.approx(result['volume_mm3'],rel=1e-6)
    for ext in ('stl','glb'):
        assert (tmp_path/('part.'+ext)).stat().st_size>100
    inside=lambda x,y,z:shape.isInside(cq.Vector(x,y,z),1e-6)
    if kind=='enclosure':
        for x,y in ((10,10),(110,10),(10,70),(110,70)):
            assert not inside(x,y,1.5) and not inside(x,y,24)
            assert inside(x+3,y,24)
        assert not inside(60,40,24) and inside(60,40,1.5)
        expected=120*80*45-114*74*42-4*math.pi*1.5**2*3+4*math.pi*(4**2-1.5**2)*42
        assert shape.Volume()==pytest.approx(expected,abs=.01)
    elif kind=='bracket':
        for offset in (20,45):
            assert not inside(offset,0,2.5) and not inside(2.5,0,offset)
        assert shape.Volume()==pytest.approx(50*5*(70+80-5)-4*math.pi*3**2*5,abs=.01)
    elif kind=='phone_stand':
        support=next(c for c in proposed.components if c.id=='support')
        assert support.rotation_deg[0]==65 and support.dimensions.y_mm==110
        assert not inside(0,8,10) and inside(0,8,16)
    elif kind=='shaft':
        assert result['bounding_box_mm']==pytest.approx([100,20,20],abs=.02)
        assert not inside(15,0,10) and inside(15,5,10)
        assert inside(50,0,10) and inside(85,0,10)
    elif kind=='organizer':
        assert len(proposed.components[0].cutouts)==6
        expected=180*120*35-6*((174-4)/3)*((114-2)/2)*32
        assert shape.Volume()==pytest.approx(expected,abs=.01)
    elif kind=='plate':
        assert result['bounding_box_mm']==pytest.approx([152.4,101.6,5],abs=.02)
        for x,y in ((12.7,12.7),(139.7,12.7),(12.7,88.9),(139.7,88.9)):assert not inside(x,y,2.5)
    else:
        for x in (40,120):assert not inside(x,50,1.5)
        assert inside(80,50,1.5)
        assert shape.Volume()==pytest.approx(160*100*30-154*94*27-2*20*8*3,abs=.01)


def test_tray_height_and_corner_edit_preserves_real_floor_slots(tmp_path):
    before=scene('slotted_tray');after=scene('slotted_tray',height_mm=45,corner_radius_mm=5)
    assert [c.id for c in before.components]==[c.id for c in after.components]
    for old,new in zip(before.components[0].cutouts[1:],after.components[0].cutouts[1:]):
        assert old.dimensions==new.dimensions
        assert old.position_mm[:2]==new.position_mm[:2]
        assert old.position_mm[2]+before.components[0].position_mm[2]==new.position_mm[2]+after.components[0].position_mm[2]
    result=build_scene(after,tmp_path)
    shape=cq.importers.importStep(str(tmp_path/'part.step')).val()
    expected=(160*100-(4-math.pi)*25)*45-(154*94-(4-math.pi)*4)*42-2*20*8*3
    assert shape.Volume()==pytest.approx(expected,abs=.01)
    assert result['bounding_box_mm']==pytest.approx([160,100,45],abs=.02)
    assert not shape.isInside(cq.Vector(40,50,1.5),1e-6)
    assert not shape.isInside(cq.Vector(120,50,1.5),1e-6)


def test_disconnected_fusion_and_nonintersecting_cuts_are_rejected(tmp_path):
    raw=dict(name='Invalid',fuse_solids=True,components=[dict(id='a',name='A',primitive='box',dimensions=dict(x_mm=20,y_mm=20,z_mm=20)),dict(id='b',name='B',primitive='box',dimensions=dict(x_mm=20,y_mm=20,z_mm=20),position_mm=(100,0,0))])
    with pytest.raises(ValueError,match='connect'):build_scene(SceneSpec(**raw),tmp_path/'disconnected')
    raw['fuse_solids']=False;raw['components']=raw['components'][:1]
    raw['components'][0]['cutouts']=[dict(primitive='cylinder',dimensions=dict(radius_mm=2,z_mm=30),position_mm=(100,0,0))]
    with pytest.raises(ValueError,match='remove real material'):build_scene(SceneSpec(**raw),tmp_path/'outside')


@pytest.mark.parametrize('kind,updates',[('enclosure',dict(post_hole_mm=10)),('organizer',dict(divider_mm=100)),('plate',dict(hole_edge_inset_mm=1)),('bracket',dict(hole_positions_mm=[3,6])),('shaft',dict(cross_hole_diameter_mm=30))])
def test_invalid_manufacturing_features_do_not_reach_cad(kind,updates):
    with pytest.raises(ValueError):scene(kind,**updates)


def test_stale_outer_stock_patch_cannot_publish_bad_parametric_geometry(tmp_path):
    invalid=scene('slotted_tray')
    invalid.components[0].dimensions.z_mm=45
    invalid.components[0].position_mm=(80,50,22.5)
    invalid.components[0].vertical_fillet_mm=5
    with pytest.raises(ValueError,match='parameters and component geometry disagree'):
        build_scene(invalid,tmp_path)
    assert not (tmp_path/'part.step').exists()


def test_model_stock_only_patch_repairs_through_linked_parameters(tmp_path):
    from types import SimpleNamespace
    from backend import agent
    from scripts.evaluate_features import response
    original=scene('slotted_tray');original.components[0].color='#c43d32'
    replies=[response('update_components',{'updates':[{'id':'body','dimensions':{'z_mm':45},'position_mm':[80,50,22.5],'vertical_fillet_mm':5}]}),
             response('edit_feature_part',{'design':{**DESIGNS['slotted_tray'],'height_mm':45,'corner_radius_mm':5}})]
    calls=[]
    def generate(**kwargs):
        calls.append(kwargs)
        if len(calls)==2:assert 'edit_feature_part' in kwargs['contents'][-1].parts[0].function_response.response['error']
        return replies.pop(0)
    result,_=agent.interpret('Increase the outside height to 45 mm and add 5 mm corner fillets. Keep the floor and slots unchanged.',original.model_dump(mode='json'),None,lambda *args:None,scene=True,client=SimpleNamespace(models=SimpleNamespace(generate_content=generate)))
    assert len(calls)==2 and result.feature_design.height_mm==45 and result.components[0].color=='#c43d32'
    assert result.components[0].cutouts[0].dimensions.z_mm==43
    assert result.components[0].cutouts[1].position_mm==(-40,0,-21)
    assert all(build_scene(result,tmp_path)['checks'].values())
