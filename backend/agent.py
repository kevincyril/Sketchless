"""Gemini Developer API interpreter. Provider text never executes CAD or code."""
import json
import re
import os
import time
import httpx
from google import genai
from google.genai import types, errors
from pydantic import ValidationError
from backend.schemas import Spec, BracketSpec, parse_spec
from backend.public_access import before_model_request, pause_on_quota

DEFAULT_MODEL = 'gemini-3.5-flash-lite'
# Models with documented free text tiers; never silently substitute another model.
FREE_MODELS = {DEFAULT_MODEL, 'gemini-2.5-flash-lite'}

def model_name():
    model = os.getenv('GEMINI_MODEL', DEFAULT_MODEL).strip()
    if model not in FREE_MODELS:
        raise ValueError('GEMINI_MODEL must be a supported free-tier model: ' + ', '.join(sorted(FREE_MODELS)))
    return model

def require_free_tier():
    if os.getenv('GEMINI_FREE_TIER_CONFIRMED', '').lower() != 'true':
        raise ValueError('Confirm the key belongs to a Google AI Studio Free Tier project with no billing linked using Configure-SketchlessAI.ps1. No model request was made.')
    if not os.getenv('GEMINI_API_KEY', '').strip():
        raise ValueError('Live AI requires a backend GEMINI_API_KEY. Run Configure-SketchlessAI.ps1 and restart, or use the dimensions form.')
    return model_name()

def create_client():
    # Explicit API key/backend/endpoint prevent ambient Google or Vertex settings taking over.
    return genai.Client(api_key=os.environ['GEMINI_API_KEY'], vertexai=False, enterprise=False,
        http_options=types.HttpOptions(base_url='https://generativelanguage.googleapis.com',
            api_version='v1beta', timeout=30000,
            retry_options=types.HttpRetryOptions(attempts=1)))

def interpret(description,current,classification,emit,client=None,context=None,scene=False,selected_id=None,selection_only=False,versions=None,provisional=False,requirements=None):
    model = require_free_tier()
    owned = client is None
    try:
        client = client or create_client()
        if scene:
            return _interpret_scene(client,model,description,current,emit,context,selected_id,selection_only,versions,provisional,requirements)
        return _interpret(client, model, description, current, classification, emit, context)
    except errors.APIError as exc:
        if exc.code == 429:
            pause_on_quota()
            raise ValueError('Gemini free quota or rate limit reached. Wait for your quota to reset and try again; check limits in Google AI Studio. No automatic retry, billing upgrade, or provider fallback was attempted. Your previous model is unchanged.') from None
        if exc.code in (401,403):
            raise ValueError('Gemini access denied. Check the backend GEMINI_API_KEY, API restrictions, region eligibility, and Free Tier project access. Your previous model is unchanged.') from None
        if exc.code == 404:
            raise ValueError('The configured Gemini model is unavailable to this project. Check GEMINI_MODEL and free-tier model access; no fallback was attempted.') from None
        raise ValueError('Gemini request failed. Check your connection and free-tier model access, then retry. Your previous model is unchanged.') from None
    except httpx.HTTPError:
        raise ValueError('Could not connect to Gemini within the request timeout. Check your connection and try again. Your previous model is unchanged.') from None
    finally:
        if owned and client is not None:
            client.close()

def _interpret(client,model,description,current,classification,emit,context):
    variants=[Spec.model_json_schema(),BracketSpec.model_json_schema()]
    for variant in variants:
        variant['required']=list(variant['properties'])
    declaration=types.FunctionDeclaration(name='validate_spec',
        description='Propose a complete replacement specification. Validate before constructing geometry.',
        parameters_json_schema={'type':'object','properties':{'spec':{'anyOf':variants}},'required':['spec'],'additionalProperties':False})
    system = 'You are Sketchless, a constrained CAD interpreter. Supported families: open-top enclosure, rectangular tray, and L-shaped mounting bracket. Brackets are two perpendicular plates, sharing thickness_mm (default 3 mm). For a bracket, length is the foot reach, width is across both plates, height is the upright height, all outer measurements. It has evenly spaced holes on BOTH faces: holes_per_face 0, 1, or 2 (default 2); hole_diameter_mm default 5 mm. Hole centers are fixed automatically, centered on exposed arms and spaced across width. Do not promise custom placement, countersinks, fillets, extra holes, bent-sheet radii, or other unsupported features. Explain that unsupported features need clarification. Bracket schema has no wall_thickness_mm, base_thickness_mm, or open_top; enclosure/tray have no bracket fields. Ask for essential missing length, width, height; never invent these. For enclosures/trays optional wall/base default to 3 mm and open_top true. Disclose family-specific defaults. Preserve ALL existing fields on follow-ups, applying relative edits in mm. Retain the current part family unless the user explicitly requests a different one. Clarify ambiguous edits and unsupported requests. Earlier conversation may include failed proposals; the current accepted spec is authoritative. Never output code. Use validate_spec when a complete specification is available; after validation the server builds it. Current accepted spec: ' + json.dumps(current) + ' Initial classifier: ' + json.dumps(classification)
    history=[types.Content(role='model' if m['role']=='assistant' else 'user',parts=[types.Part.from_text(text=m['content'])]) for m in (context or [])]
    history.append(types.Content(role='user',parts=[types.Part.from_text(text=description)]))
    config=types.GenerateContentConfig(system_instruction=system,
        tools=[types.Tool(function_declarations=[declaration])],
        automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True),
        tool_config=types.ToolConfig(function_calling_config=types.FunctionCallingConfig(mode='VALIDATED' if model==DEFAULT_MODEL else 'AUTO')),
        candidate_count=1,max_output_tokens=1500)
    for attempt in range(3):
        start=time.perf_counter()
        before_model_request()
        response=client.models.generate_content(model=model,contents=history,config=config)
        candidates=response.candidates or []
        if not candidates or not candidates[0].content:
            raise ValueError('Gemini returned no usable answer. Rephrase your description and try again.')
        candidate=candidates[0]
        if candidate.finish_reason not in (None, types.FinishReason.STOP):
            raise ValueError('Gemini could not complete this request. Simplify your description and try again. Your previous model is unchanged.')
        content=candidate.content
        parts=content.parts or []
        calls=[p.function_call for p in parts if p.function_call]
        if not calls:
            text=''.join(p.text for p in parts if p.text and not p.thought).strip()
            return None,text or 'Please clarify the part and its dimensions.'
        # Keep the original model Content, including thought signatures, for repair turns.
        history.append(content)
        if len(calls)!=1: raise ValueError('Only one tool call per turn is permitted.')
        call=calls[0]
        if call.name!='validate_spec': raise ValueError('Unsupported tool requested.')
        try:
            args=call.args
            if not isinstance(args,dict) or set(args)!={'spec'}: raise ValueError('Unknown tool argument')
            spec=parse_spec(args['spec'])
            emit('validate_spec',spec.model_dump(),'passed',start)
            return spec,'Specification validated. Shown dimensions and family-specific thickness/hole settings will be used.'
        except (ValidationError,ValueError,TypeError) as exc:
            feedback=str(exc)[:1800]
            emit('validate_spec',{'attempt':attempt+1},feedback,start)
            result=types.FunctionResponse(name=call.name,id=call.id,response={'error':feedback})
            history.append(types.Content(role='user',parts=[types.Part(function_response=result)]))
    raise ValueError('Specification repair limit reached (two retries). Please provide dimensions that leave space for walls or bracket holes.')


def _interpret_scene(client,model,description,current,emit,context,selected_id,selection_only,versions,provisional=False,requirements=None):
    from backend.scene_schema import SceneSpec, ConceptRequest, SceneChanges, RestoreAction, Strict, CleanerRequest
    from backend.concepts import concept_scene, edit_scene, cleaner_scene, review_cleaner
    from backend.routing import is_cleaner_request
    from backend.requirements import effective_context,requirements_summary
    context=effective_context(description,context)
    from backend.requirements import purpose
    facts=requirements if requirements is not None else requirements_summary(description,context)
    requested_purpose=facts['purpose']
    active_purpose=({'robot':'walking'}.get((current or {}).get('concept'),(current or {}).get('concept')) if (current or {}).get('concept')!='custom' else purpose((current or {}).get('name','')))
    replacing_intent=bool(current and current.get('part_type')=='assembly' and not selection_only and requested_purpose and requested_purpose!=active_purpose and re.search(r'\b(actually|instead|forget|start over|different idea|change to|switch to)\b',description.lower()))
    class Proposal(Strict):
        spec:SceneSpec
    contracts={'create_cleaner':CleanerRequest,'create_concept':ConceptRequest,'propose_scene':Proposal,'update_components':SceneChanges,'restore_version':RestoreAction}
    descriptions={
        'create_cleaner':'Create a coherent low-profile robot-vacuum concept with a circular body, bumper, dust-bin lid, two drive wheels, support ball, sensor window, controls, brush and optional lidar turret. Defaults: 340 mm body diameter, 75 mm body height, pale shell, teal accent, lidar, one brush. Components retain separate stable IDs for editing. Use for a home/robot/floor cleaner with default settings, never the walking robot recipe. Not an upright or handheld vacuum.',
        'create_concept':'Create a reusable primitive robot, table or stand recipe, converted to an editable scene. All dimensions in mm. Robot body dimensions independent of leg height; table body dimensions describe tabletop; stand body describes platform/base dimensions. Defaults: robot 200 mm cube, four articulated legs 160 mm tall, two eyes; table 300x200x20 mm top with 250 mm legs; stand 120x100x12 mm base/platform with 160 mm post. Pass these dimensions explicitly.',
        'propose_scene':'Propose a NEW custom scene built from boxes, cylinders, spheres, cones and groups. No booleans or code. Not for edits to an existing assembly.',
        'update_components':'Patch the current scene by stable IDs. Preserve all unrelated components/fields. Partial dimensions merge. Positions/rotations are absolute parent-local values. Remove a group to remove its descendants. Copies duplicate whole subtrees with stable prefixed IDs and optional reflection. lengthen_legs_mm extends all robot legs while preserving body dimensions, foot size and segment widths. cylindrical_feet replaces feet while preserving IDs. Other edits use explicit updates/additions/removals.',
        'restore_version':'Activate an available successful version by its exact version ID. Does not regenerate geometry.'}
    tools=[types.FunctionDeclaration(name=name,description=descriptions[name],parameters_json_schema=contract.model_json_schema()) for name,contract in contracts.items()]
    system=('You are Sketchless, a conversational concept-modeling assistant. Build recognizable editable CONCEPTS from bounded geometric primitives, never mechanically validated machines. '
        'Supported: robot vacuum, walking robot, table and stand recipes, and custom scenes of boxes/cylinders/spheres/cones/groups. No organic meshes, code execution, physics, IK, motors, arbitrary CAD booleans, or guaranteed functionality. Explain limitations rather than substituting an unrelated object. '
        'Design intent comes before primitive placement. A home robot cleaner means a cleaning appliance, not a walking character. Never ask for legs or add camera eyes to a vacuum. For a default home cleaner use create_cleaner: low round silhouette, recessed-looking bumper band, contrasting sensor window, lid, usable-looking controls, side wheels and a visible brush. State that default settings assume a round robot vacuum. Upright/handheld cleaners require a different custom design; clarify the form instead of silently substituting a robot vacuum. For custom product scenes plan silhouette, proportions, functional-looking component layout and restrained material colors. Primitive positions are CENTERS: honor requested overall extents using half-dimensions and transformed bounds, not center heights. Seat height refers to its TOP surface above ground; backrest height or overall height refers to its TOP extent, not its center. Ground standing objects at z=0 and place connected visual parts so they meet rather than float. Check rotated arms and shade directions; do not claim aesthetics or function are proven by valid solids. '
        'A purpose-specific robot is not automatically a walking character. A cooking robot could be a countertop appliance, a fixed kitchen arm or a mobile assistant. First confirm intended tasks, form and approximate size. Defaults apply to measurements after intent is understood, not to guessing the product category. Never use the walking-robot recipe for cooking, healthcare, gardening or other functional robots unless the user explicitly asks for that form. Generate a proposal only after those requirements are clear; the server will require user approval before building. '
        'For an ambiguous robot ask ONE concise combined question about its purpose, form and size. Only after a walking form is requested ask about leg count and straight/articulated legs. Ask about eyes only if relevant. Remember answers; generate without further questions once enough is known. If user says use sensible defaults, use/disclose defaults and proceed. '
        'For a detailed four articulated legs, 200 mm cube body, two camera eyes request call create_concept with explicit dimensions and assumptions: 160 mm leg height, 3D visual joints, millimeters; do not ask unnecessary further questions. '
        'For tables/stands clarify essential size if absent, unless defaults authorized; table defaults 300x200x20 mm top/250 mm legs; stand 120x100x12 mm platform/160 mm post. '
        'Explicit user corrections override older requirements and assumptions. Apply corrections to the structured scene, including missing components, component heights and center positions. Use update_components assumptions to REPLACE obsolete assumptions. A 450 mm seat TOP with a 30 mm seat thickness needs 420 mm vertical legs meeting the underside, not 450 mm legs. Keep each measurement associated with its component and meaning. '
        'Use the supplied current scene as the authoritative edit baseline. For edits ONLY update_components, preserve stable IDs, all unrelated dimensions/colors/components. Selected component scope is enforced. Ask which components/amount when ambiguous; do not guess which leg. For make legs longer without an amount, ask how much unless sensible defaults are authorized. '
        'Scene conventions: mm, right-handed +Z up, front=-Y, boxes/cylinders/cones centered at local origin, cylinders/cones axis Z, sphere origin at center. Local XYZ Euler degrees applied Rx then Ry then Rz, then translation; parent transforms compose. Only groups are parents, max64 nodes, max8 levels, dimensions .1..1000 mm, positions +/-2000 mm, bounds +/-4000 mm. '
        'Use groups for repeated articulated legs, each with separate segments and joints. No boolean operations. Partial dimension patches require only changed dimensions. '
        'Report concise assumptions/units in clarification or create_concept assumptions; never claim tests that have not run. Do not reveal thoughts. '
        'CURRENT SCENE IS AN UNBUILT PROPOSAL: '+str(provisional)+'. If true, revise this proposal rather than recreating it; it has not replaced the accepted CAD model. Approval is still required after every correction. EXPLICIT REPLACEMENT OF PRODUCT PURPOSE: '+str(replacing_intent)+'. When true you may propose a new recipe/custom scene; old geometry stays active until user approval. Otherwise preserve IDs and edit through update_components. USER-STATED REQUIREMENTS (honor latest corrections and negations): '+json.dumps(facts)+' CURRENT MODEL: '+json.dumps(current)+' SELECTED ID: '+str(selected_id)+' SELECTION ONLY: '+str(selection_only)+' AVAILABLE VERSIONS: '+json.dumps(versions or []))
    history=[types.Content(role='model' if m['role']=='assistant' else 'user',parts=[types.Part.from_text(text=m['content'])]) for m in (context or [])]
    history.append(types.Content(role='user',parts=[types.Part.from_text(text=description)]))
    config=types.GenerateContentConfig(system_instruction=system,tools=[types.Tool(function_declarations=tools)],automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True),tool_config=types.ToolConfig(function_calling_config=types.FunctionCallingConfig(mode='VALIDATED' if model==DEFAULT_MODEL else 'AUTO')),candidate_count=1,max_output_tokens=6000)
    for attempt in range(3):
        start=time.perf_counter();before_model_request();response=client.models.generate_content(model=model,contents=history,config=config)
        if not response.candidates or not response.candidates[0].content:raise ValueError('Gemini returned no usable concept response. Try a simpler description.')
        candidate=response.candidates[0]
        if candidate.finish_reason not in (None,types.FinishReason.STOP):raise ValueError('Gemini could not complete the concept. Simplify it; your previous model is unchanged.')
        content=candidate.content;parts=content.parts or [];calls=[p.function_call for p in parts if p.function_call]
        if not calls:return None,''.join(p.text for p in parts if p.text and not p.thought).strip() or 'Please describe the components and their approximate sizes in mm.'
        if len(calls)!=1:raise ValueError('Only one modeling tool call per turn is permitted.')
        call=calls[0]
        if call.name not in contracts:raise ValueError('Unsupported modeling tool requested.')
        history.append(content)
        try:
            args=contracts[call.name].model_validate(call.args)
            if call.name=='restore_version':
                if args.version_id not in {v['id'] for v in versions or []}:raise ValueError('Choose an available successful version ID.')
                result=args
            elif call.name=='create_cleaner':
                if current and current.get('part_type')=='assembly' and not replacing_intent:raise ValueError('Use component patches to edit the active model, or start a new design to build a new cleaner.')
                result=cleaner_scene(args)
            elif call.name=='create_concept':
                if current and current.get('part_type')=='assembly' and not replacing_intent:raise ValueError('Edit the current scene with update_components; do not replace its stable IDs. Start a new design for a new concept.')
                intent=' '.join(m['content'] for m in context or [] if m['role']=='user')+' '+description
                if args.concept=='robot' and facts['purpose']=='cooking':raise ValueError('A generic walking robot does not meet a cooking-robot request. Clarify the purpose/form or propose a custom scene matching the agreed kitchen tasks.')
                result=concept_scene(args)
            elif call.name=='propose_scene':
                if current and current.get('part_type')=='assembly' and not replacing_intent:raise ValueError('Use update_components for the existing scene, preserving IDs.')
                result=args.spec
            else:
                if not current or current.get('part_type')!='assembly':raise ValueError('Create a concept before editing components.')
                original=SceneSpec.model_validate(current);result=edit_scene(original,args,selected_id)
                if selection_only:
                    allowed={selected_id}
                    while True:
                        more={c.id for c in original.components if c.parent_id in allowed}
                        if more<=allowed:break
                        allowed|=more
                    before={c.id:c.model_dump() for c in original.components if c.id not in allowed}
                    after={c.id:c.model_dump() for c in result.components if c.id not in allowed}
                    if before!=after:raise ValueError('Selection-only edit must preserve every component outside the selected subtree. Deselect to edit the whole model.')
            if isinstance(result,SceneSpec):
                from backend.scene_review import review_overall_dimensions,review_scene_requirements
                review_overall_dimensions(result,description)
                review_scene_requirements(result,facts)
            user_context=' '.join(m['content'] for m in context or [] if m['role']=='user')+' '+description
            cleaner_intent=facts['purpose']=='cleaner' and not any(word in user_context.lower() for word in ('upright','handheld','stick vacuum','carpet washer'))
            if isinstance(result,SceneSpec) and (((not current or replacing_intent) and cleaner_intent) or result.concept=='cleaner'):
                review=review_cleaner(result)
                emit('review_concept',{'family':'robot vacuum'},review,start)
            emit(call.name,{'attempt':attempt+1,'selected_id':selected_id},'Validated structured modeling action',start)
            if isinstance(result,RestoreAction):return result,'Restored the selected saved version.'
            assumptions=' '.join(result.assumptions)
            return result,'Concept specification validated. Units: mm. '+assumptions
        except (ValidationError,ValueError,TypeError) as exc:
            feedback=str(exc)[:1800];emit(call.name,{'attempt':attempt+1},feedback,start)
            history.append(types.Content(role='user',parts=[types.Part(function_response=types.FunctionResponse(name=call.name,id=call.id,response={'error':feedback}))]))
    raise ValueError('Concept repair limit reached (two retries). Simplify the scene or identify specific components and dimensions.')
