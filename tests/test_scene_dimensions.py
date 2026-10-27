import pytest
from backend.scene_schema import SceneSpec
from backend.scene_geometry import scene_dimensions
from backend.brief import concept_brief

def scene(components):return SceneSpec(name='Bounds fixture',components=components)

def test_rotated_and_nested_components_use_world_bounds():
 model=scene([
  {'id':'group','name':'Rotated group','primitive':'group','position_mm':[100,0,0],'rotation_deg':[0,0,90]},
  {'id':'body','name':'Body','primitive':'box','dimensions':{'x_mm':40,'y_mm':20,'z_mm':10},'parent_id':'group'},
  {'id':'tip','name':'Tip','primitive':'sphere','dimensions':{'radius_mm':5},'position_mm':[100,0,30]},
 ])
 assert scene_dimensions(model)==pytest.approx([20,40,40])
 assert concept_brief(model)['overall_dimensions_mm']==pytest.approx([20,40,40])

@pytest.mark.parametrize('primitive,dimensions,expected',[
 ('cylinder',{'radius_mm':20,'z_mm':60},[40,60,40]),
 ('cone',{'radius_mm':20,'top_radius_mm':5,'z_mm':60},[40,60,40]),
])
def test_curved_primitives_include_rotated_extents(primitive,dimensions,expected):
 model=scene([{'id':'part','name':'Part','primitive':primitive,'dimensions':dimensions,'rotation_deg':[90,0,0]}])
 assert scene_dimensions(model)==pytest.approx(expected)


def test_disconnected_bounds_warn_without_rejecting_intentional_separation():
 from backend.scene_geometry import layout_warnings
 model=scene([
  {'id':'base','name':'Base','primitive':'box','dimensions':{'x_mm':20,'y_mm':20,'z_mm':20}},
  {'id':'tip','name':'Tip','primitive':'sphere','dimensions':{'radius_mm':5},'position_mm':[0,0,50]},
 ])
 assert 'may float apart' in layout_warnings(model)[0]
 assert concept_brief(model)['layout_warnings']
 model.components[1].position_mm=(0,0,15)
 assert layout_warnings(model)==[]
