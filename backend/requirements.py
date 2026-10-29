"""User-stated requirements only. These labels do not establish mechanical capability."""
import re
from copy import deepcopy

PURPOSES=[('cooking',r'\b(cooking|kitchen|chef|culinary)\b'),('cleaner',r'\b(vacuum|c+leaner|cleaning robot|robot mop)\b'),('walking',r'\b(walking|legged|cube-shaped|toy robot)\b'),('table',r'\btable\b'),('stand',r'\bstand\b'),('enclosure',r'\b(enclosure|housing|electronics box)\b'),('tray',r'\btray\b'),('bracket',r'\bbracket\b')]
FORMS=[('Countertop appliance',r'\b(countertop|worktop)\b'),('Fixed robotic arm',r'\b((fixed|stationary|robotic|robot) arm)\b'),('Humanoid assistant',r'\b(humanoid|human-shaped|biped|dual-arm)\b'),('Mobile assistant',r'\b(mobile kitchen|wheeled|on wheels)\b')]
TASKS=[('stir',r'\bstir(?:ring)?\b'),('chop',r'\bchop(?:ping)?\b'),('mix',r'\bmix(?:ing)?\b'),('heat',r'\bheat(?:ing)?\b'),('fry',r'\bfr(?:y|ying)\b'),('serve',r'\bserv(?:e|ing)\b'),('prepare',r'\bprepar(?:e|ing)\b'),('dispense',r'\bdispens(?:e|ing)\b')]

def negated(text,start):
    prefix=re.split(r'[,;.!?]|\bbut\b',text[:start])[-1][-45:]
    return bool(re.search(r"\b(?:not|no|without|don't|do not|never|instead of)\b",prefix))

def purpose(text):
    if any(not negated(text.lower(),m.start()) for m in re.finditer(r'\b(chair|sitting|seating)\b',text.lower())):
        return 'sitting'
    matches=[(m.start(),kind) for kind,pattern in PURPOSES for m in re.finditer(pattern,text.lower()) if not negated(text.lower(),m.start())]
    if not matches:return None
    # A product's function takes precedence over its robot locomotion description.
    functional=[m for m in matches if m[1] in ('cooking','cleaner')]
    return max(functional or matches)[1]

def effective_context(description,context=None):
    """Explicit purpose replacement drops the obsolete brief, not ordinary dimension corrections."""
    entries=list(context or []);latest=purpose(description)
    old=next((purpose(m['content']) for m in reversed(entries) if m['role']=='user' and purpose(m['content'])),None)
    correction=bool(re.search(r'\b(actually|instead|forget|start over|different idea|change to|switch to|no|not)\b',description.lower()))
    if latest and old and latest!=old and correction:return []
    return entries

def requirements_summary(description,context=None,previous=None):
    entries=effective_context(description,context)
    texts=([m['content'].lower() for m in entries if m['role']=='user'] if previous is None else [])+[description.lower()]
    replacing=previous and purpose(description) and purpose(description)!=previous.get('purpose') and re.search(r'\b(forget|start over|different idea|change to|switch to)\b',description.lower())
    result=deepcopy(previous) if previous and not replacing else {'purpose':None,'form':None,'tasks':[],'size':None}
    from backend.measurements import merge_constraints,dimension_summary
    from backend.routing import wants_defaults,rejects_defaults
    for text in texts:
        kind=purpose(text)
        if kind:result['purpose']=kind
        merge_constraints(result,text)
        form_matches=sorted((m.start(),label,negated(text,m.start())) for label,pattern in FORMS for m in re.finditer(pattern,text))
        for _,label,is_negative in form_matches:
            if is_negative:
                if result['form']==label:result['form']=None
            else:result['form']=label
        if re.search(r'\b(only|just)\b',text) and any(re.search(p,text) for _,p in TASKS):result['tasks']=[]
        for label,pattern in TASKS:
            for m in re.finditer(pattern,text):
                if negated(text,m.start()):result['tasks']=[t for t in result['tasks'] if t!=label]
                elif label not in result['tasks']:result['tasks'].append(label)
        measures=re.findall(r'\b\d+(?:\.\d+)?\s*(?:mm|cm|inch(?:es)?|millimeters?|centimeters?)\b',text)
        if result.get('dimensions'):result['size']=dimension_summary(result['dimensions'])
        elif len(measures)==1:result['size']=measures[0]
        elif measures:result['size']='; '.join(clause.strip() for clause in re.split(r'[;\n]',text) if re.search(r'\d',clause))
        elif wants_defaults(text):result['size']='Suggested default dimensions'
        elif rejects_defaults(text) and result['size']=='Suggested default dimensions':result['size']=None
    return result

def clarification_help(description,current=None,context=None):
    """Optional draft suggestions; choosing one is never a send/approval action."""
    facts=requirements_summary(description,context)
    text=' '.join(m['content'] for m in effective_context(description,context) if m['role']=='user')+' '+description
    suggestions=[];topic='Your answer';missing=[]
    if facts['purpose']=='cooking':
        missing=[key for key in ('form','tasks','size') if not facts[key]]
        if 'form' in missing:
            topic='Choose a form'
            suggestions=[('Countertop appliance','A countertop cooking appliance.'),('Fixed robotic arm','A fixed robotic arm working at a stove.'),('Mobile assistant','A mobile kitchen assistant on wheels.'),('Humanoid assistant','A humanoid cooking assistant.')]
        elif 'tasks' in missing:
            topic='Choose the main tasks'
            suggestions=[('Stir and heat','It should stir and heat food.'),('Chop and mix','It should chop and mix ingredients.'),('Serve food','It should serve prepared food.'),('Stir only','It should only stir food, without chopping or heating.')]
        elif 'size' in missing:
            topic='Choose a starting size'
            suggestions=[('Suggest dimensions','Use sensible defaults for dimensions, and show the assumptions before building.'),('400 mm wide','Make it about 400 mm wide.'),('600 mm wide','Make it about 600 mm wide.')]
    elif facts['purpose']=='cleaner':
        missing=['size'] if re.search(r'\b(robot|robotic|floor)\b',text.lower()) else ['form']
        if missing==['form']:
            topic='Choose a cleaner type'
            suggestions=[('Robot vacuum','I mean a low-profile robot vacuum for home floors.'),('Upright vacuum','I mean an upright vacuum cleaner.'),('Handheld cleaner','I mean a handheld vacuum cleaner.')]
        else:
            topic='Choose a starting size'
            suggestions=[('Default robot vacuum','Use default settings for a 340 mm diameter, 75 mm high robot vacuum.'),('Compact vacuum','Use a 280 mm body diameter and 65 mm body height.')]
    elif facts['purpose'] in ('table','stand') and not facts['size']:
        topic='Choose starting dimensions';missing=['size']
        suggestions=[('Suggest dimensions','Use sensible default dimensions and show the assumptions before building.'),('Specify my own size','I want to specify the dimensions: ')]
    elif re.search(r'\brobot\b',text.lower()) and not facts['purpose']:
        topic='Choose a purpose';missing=['purpose','form']
        suggestions=[('Cooking assistant','I want a robot that helps with cooking.'),('Home cleaner','I want a robot vacuum for home cleaning.'),('Walking character','I want a walking toy robot with legs.')]
    elif facts['purpose']=='walking':
        topic='Choose a starting layout';missing=['layout']
        suggestions=[('Four articulated legs','Use four articulated legs, a 200 mm cube body and two eyes. Use sensible defaults for remaining visual details.'),('Four straight legs','Use four straight legs, a 200 mm cube body and two eyes. Use sensible defaults for remaining visual details.')]
    return {'requirements':facts,'missing_fields':missing,'topic':topic,'suggestions':[{'label':label,'text':value} for label,value in suggestions]}
