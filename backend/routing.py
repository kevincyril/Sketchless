"""Explicit routing outside the three-category trained precise-part classifier."""
import re
from difflib import SequenceMatcher

def route_workflow(description,current=None,context=None,requested='auto'):
    if requested!='auto':return requested
    text=description.lower()
    from backend.requirements import purpose
    intent=purpose(description)
    if intent in ('enclosure','tray','bracket'):return 'precise'
    if intent in ('cooking','cleaner','walking','table','stand'):return 'concept'
    if is_cleaner_request(text):return 'concept'
    if re.search(r'\b(robot|table|stand|assembly|character|creature|chair|lamp|concept)\b',text):return 'concept'
    if re.search(r'\b(enclosure|tray|bracket|housing|open[ -]?(?:top )?box|electronics box)\b',text):return 'precise'
    if current:return 'concept' if current.get('part_type')=='assembly' else 'precise'
    for m in reversed(context or []):
        if m['role']=='user':
            previous=route_workflow(m['content'])
            if re.search(r'\b(robot|table|stand|enclosure|tray|bracket|housing|box)\b',m['content'].lower()):return previous
    return 'concept' # Unknown ideas go to constrained concept clarification, never misclassified as trays.

def concept_clarification(description,current=None,context=None):
    from backend.requirements import effective_context,requirements_summary
    context=effective_context(description,context)
    user_text=' '.join([m['content'] for m in context or [] if m['role']=='user']+[description]).lower()
    defaults=wants_defaults(user_text)
    facts=requirements_summary(description,context)
    if facts['purpose']=='cooking' and re.search(r'\b(robot|robotic|assistant)\b',user_text):
        if facts['form'] and facts['tasks'] and facts['size']:return None
        questions=[]
        if not facts['form']:questions.append('Do you mean a countertop appliance, a fixed robotic arm at a stove, or a mobile kitchen assistant (possibly humanoid)?')
        if not facts['tasks']:questions.append('What should it do (for example stir, chop, heat or serve)?')
        if not facts['size']:questions.append('Roughly what size should it be? You can use defaults for size.')
        return 'I understand you want a robot that helps with cooking. '+' '.join(questions)+' I will propose the design for you to confirm before building.'
    if current and current.get('part_type')=='assembly':return None
    if facts['purpose']=='cleaner':
        if re.search(r'\b(upright|handheld|stick vacuum|carpet washer)\b',user_text):return None
        if defaults:return None
        if re.search(r'\d+(?:\.\d+)?\s*(?:mm|cm|inches?|inch)\b',user_text):return None
        if re.search(r'\b(robot|robotic|floor)\b',user_text):return 'For a low-profile robot vacuum, what body diameter and height would you like? Say use default settings to start with a 340 mm round body, 75 mm high, two drive wheels, a bumper, sensors and a side brush.'
        return 'Do you mean a robot vacuum, an upright vacuum or a handheld cleaner? With default settings I can start with a low-profile round robot vacuum; its dimensions and components remain editable.'
    walking=bool(re.search(r'\b(legs|legged|walking|cube|cubed|cube-shaped)\b',user_text))
    if re.search(r'\brobot\b',user_text) and not walking:
        if facts['form'] and facts['size']:return None
        return 'What should the robot do, and what form do you have in mind: a wheeled assistant, a fixed arm, or a walking character? Tell me its key tasks and approximate size. I will summarize the proposed design for you to confirm before building.'
    if defaults:return None
    if re.search(r'\brobot\b',user_text):
        count=bool(re.search(r'\b(?:two|four|six|2|4|6)\s+(?:(?:articulated|straight|jointed)\s+)?legs\b',user_text))
        sized=bool(re.search(r'\d+(?:\.\d+)?\s*(?:mm|cm|millimeters?|centimeters?|inches?|inch)\b',user_text))
        style=bool(re.search(r'\b(?:articulated|straight|jointed)\b',user_text))
        if not (count and sized and style):
            return 'How many legs (2, 4 or 6), what body size, and should the legs be straight or articulated? Include units, for example: four articulated legs and a 200 mm cube body. You can also say “use sensible defaults.”'
    if re.search(r'\b(?:table|stand)\b',user_text) and not re.search(r'\d+(?:\.\d+)?\s*(?:mm|cm|inches?|inch)\b',user_text):
        return 'What overall size and leg/post height would you like? Include units, or say “use sensible defaults” for an editable concept.'
    return None


def is_cleaner_request(text):
    return bool(re.search(r'\b(?:vacuum|c+leaner|cleaning robot|robot mop|floor mop)\b',text.lower()))

def rejects_defaults(text):
    return bool(re.search(r"\b(?:no|without)\s+defaults?\b|\b(?:do not|don't|never)\s+use(?:\s+\w+){0,2}\s+defaults?\b",text.lower()))

def wants_defaults(text):
    if rejects_defaults(text):return False
    words=re.findall(r'[a-z]+',text.lower())
    return bool(re.search(r'\b(?:default settings|standard settings|you decide)\b',text.lower())) or any(SequenceMatcher(None,word,'defaults').ratio()>=.82 for word in words)
