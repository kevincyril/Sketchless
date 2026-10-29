"""Conservative named dimensions/counts; never detach measurements from their meaning."""
import re

NUMBER = r'\d+(?:\.\d+)?'
UNIT = r'mm|cm|inches|inch|millimeters?|centimeters?'
COMPONENTS = {'seat': r'\bseat\b', 'leg': r'\blegs?\b',
              'backrest_slat': r'\b(?:backrest\s+)?slats?\b', 'backrest': r'\bbackrest\b',
              'overall': r'\b(?:overall|total)\b'}


def mm(value, unit):
    return float(value) * (10 if unit.startswith('c') else 25.4 if unit.startswith('inch') else 1)


def named_dimensions(text):
    text = text.lower()
    result = []
    # Resolve sentence-local component context before splitting comma continuations.
    triple = r'(' + NUMBER + r')\s*[x\u00d7]\s*(' + NUMBER + r')\s*[x\u00d7]\s*(' + NUMBER + r')\s*(' + UNIT + r')\b'
    for sentence in re.split(r'[;!?\n]|(?<!\d)\.(?!\d)', text):
        for match in re.finditer(triple, sentence):
            before = sentence[:match.start()]
            mentions = [(m.start(), name) for name, pattern in COMPONENTS.items() for m in re.finditer(pattern, before)]
            component = max(mentions)[1] if mentions else None
            if component is None and re.search(r'\boverall\s+(?:size|dimensions)\b',sentence[match.end():]):
                component = 'overall'
            axes = ('width','depth','height') if component == 'overall' else ('width','depth','thickness') if component == 'seat' else None
            if axes:
                for axis, number in zip(axes, match.groups()[:3]):
                    result.append({'component': component, 'meaning': axis, 'value_mm': mm(number,match[4]), 'source': match[0]})
        inherited = None
        for clause in sentence.split(','):
            mentions = [(m, name) for name, pattern in COMPONENTS.items() for m in re.finditer(pattern, clause)]
            for match in re.finditer(r'(' + NUMBER + r')\s*(' + UNIT + r')\b', clause):
                prefix = clause[max(0, match.start()-45):match.start()]
                if re.search(r'\b(?:not|instead of)\s*$', prefix):continue
                if re.search(r'[x\u00d7]\s*' + NUMBER + r'\s*[x\u00d7]\s*$', prefix):continue
                distance = lambda m: max(m.start()-match.end(), match.start()-m.end(), 0)
                preceding = [item for item in mentions if item[0].end() <= match.start() and distance(item[0]) <= 45]
                if mentions:
                    mention, component = min(preceding or mentions, key=lambda item: distance(item[0]))
                    if distance(mention)>45:continue
                    vicinity = clause[min(mention.start(),match.start()):max(mention.end(),match.end())]
                elif inherited in ('overall','seat'):
                    component = inherited
                    vicinity = clause[:match.end()]
                else:continue
                words = vicinity + ' ' + clause[match.end():match.end()+18].split(' and ')[0]
                if component == 'seat' and re.search(r'\b(thick|thickness)\b',words):meaning='thickness'
                elif component == 'seat' and re.search(r'\b(surface|height|high|top)\b',words):meaning='surface_height'
                elif component == 'leg':meaning='length'
                else:meaning=next((label for label,pattern in [('width',r'\b(wide|width)\b'),('depth',r'\b(deep|depth)\b'),('height',r'\b(tall|height|high)\b'),('thickness',r'\b(thick|thickness)\b')] if re.search(pattern,words)),'dimension')
                result.append({'component':component,'meaning':meaning,'value_mm':mm(match[1],match[2]),'source':clause.strip()})
            if mentions:inherited=max(mentions,key=lambda item:item[0].start())[1]
    return result


def component_counts(text):
    words = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8}
    result = []
    for match in re.finditer(r'\b(\d+|' + '|'.join(words) + r')\s+(?:(?:straight|articulated|evenly|spaced|horizontal|vertical)\s+)*(backrest\s+slats?|slats?|legs?)\b', text.lower()):
        if re.search(r'\b(?:not|instead of)\s*$', text.lower()[max(0,match.start()-20):match.start()]):
            continue
        result.append({'component': 'leg' if match[2].startswith('leg') else 'backrest_slat',
                       'count': words[match[1]] if match[1] in words else int(match[1]), 'source': match[0]})
    return result


def merge_constraints(result, text):
    dimensions = {(d['component'], d['meaning']): d for d in result.get('dimensions', [])}
    updates = named_dimensions(text)
    for dimension in updates:
        dimensions[(dimension['component'], dimension['meaning'])] = dimension
    counts = {c['component']: c for c in result.get('component_counts', [])}
    counts.update({c['component']: c for c in component_counts(text)})
    if re.search(r'\blegs?\b[^.!?;]{0,65}\b(underside|beneath|under the seat)\b', text.lower()):
        result['seat_leg_connection'] = 'underside'
    height = dimensions.get(('seat', 'surface_height'))
    thickness = dimensions.get(('seat', 'thickness'))
    explicit_leg = any(d['component'] == 'leg' and d['meaning'] == 'length' for d in updates)
    if result.get('seat_leg_connection') == 'underside' and height and thickness and not explicit_leg:
        dimensions[('leg', 'length')] = {'component': 'leg', 'meaning': 'length',
            'value_mm': height['value_mm']-thickness['value_mm'], 'source': 'Seat surface height minus seat thickness; legs meet the underside.', 'derived': True}
    if dimensions:
        result['dimensions'] = list(dimensions.values())
    if counts:
        result['component_counts'] = list(counts.values())


def dimension_summary(dimensions):
    return '; '.join(d['component'].replace('_', ' ') + ' ' + d['meaning'].replace('_', ' ') + ': ' + f"{d['value_mm']:g} mm" for d in dimensions)
