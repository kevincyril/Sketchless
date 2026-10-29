"""Human-reviewable concept proposal; geometry is built only after explicit approval."""
from backend.scene_schema import SceneSpec
from backend.scene_geometry import scene_dimensions, layout_warnings

def proposal_changes(previous,current):
    if not previous or previous.get('part_type')!='assembly':return []
    before={c['id']:c for c in previous['components']}
    after={c.id:c.model_dump(mode='json') for c in current.components}
    changes=[]
    for key,c in after.items():
        if key not in before:changes.append('Added '+c['name'])
        else:
            fields=[label for field,label in [('name','name'),('primitive','shape'),('dimensions','size'),('position_mm','position'),('rotation_deg','rotation'),('color','color'),('parent_id','group')] if before[key].get(field)!=c.get(field)]
            if fields:changes.append('Updated '+c['name']+': '+', '.join(fields))
    changes.extend('Removed '+c['name'] for key,c in before.items() if key not in after)
    return changes or ['No component changes.']


def concept_brief(spec:SceneSpec,description="",context=None,previous_spec=None,requirements=None):
    from backend.requirements import requirements_summary
    parts=[c for c in spec.components if c.primitive!='group']
    primary=next((c for c in parts if c.role in ('body','top','base')),parts[0])
    measurements=', '.join(k.removesuffix('_mm').replace('_',' ')+f' {v:g} mm' for k,v in primary.dimensions.model_dump().items() if v is not None)
    names=[c.name for c in parts]
    details=[{'id':c.id,'name':c.name,'primitive':c.primitive,'dimensions_mm':c.dimensions.model_dump(exclude_none=True),'position_mm':list(c.position_mm)} for c in parts]
    return {'requirements':requirements if requirements is not None else requirements_summary(description,context),'name':spec.name,'changes':proposal_changes(previous_spec,spec),'overall_dimensions_mm':scene_dimensions(spec),'layout_warnings':layout_warnings(spec),'primary_component':primary.name,'primary_dimensions':measurements,'components':names,'component_details':details,'assumptions':spec.assumptions,'solid_components':len(parts)}

def brief_message(brief):
    facts=brief.get('requirements',{});agreed=[]
    for key in ('purpose','form','size'):
        if facts.get(key):agreed.append(key+': '+facts[key])
    if facts.get('tasks'):agreed.append('tasks: '+', '.join(facts['tasks']))
    understanding=('User-stated requirements: '+'; '.join(agreed)+'. ') if agreed else ''
    return ('Before I build, please check my understanding. '+understanding+'I propose '+brief['name']+'. Main parts: '+', '.join(brief['components'])+'. '+('Overall size (X × Y × Z): '+' × '.join(f'{v:g}' for v in brief['overall_dimensions_mm'])+' mm. ' if brief.get('overall_dimensions_mm') else '')+brief['primary_component']+': '+brief['primary_dimensions']+'. '+('Assumptions: '+' '.join(brief['assumptions'])+' ' if brief['assumptions'] else '')+'This is a visual concept, not a working mechanism. Is this the design you want? Select Build this concept, or send corrections first.')
