"""Conservative preflight for operations absent from the current CAD contracts.

This is explicit routing, not a learned intent model. Unknown wording still needs
provider/human review; never use this as proof that a request is supported.
"""
import re


def cylindrical_fit_conflict(text):
    """Only compare explicit cylindrical body OD, wall and plug dimensions in mm."""
    number = r'(\d+(?:\.\d+)?)\s*mm'
    outer = re.search(r'\bbody\s+is\s+'+number+r'\s+in\s+outer\s+diameter', text)
    wall = re.search(number+r'\s+walls?\b', text)
    plug = re.search(number+r'[ -]diameter\s+plug\b', text)
    if not (outer and wall and plug):
        return None
    opening = float(outer[1])-2*float(wall[1])
    diameter = float(plug[1])
    if diameter >= opening:
        return (f'The body opening is {opening:g} mm, but the plug diameter is {diameter:g} mm. '
                'That does not provide clearance for a slip fit. What corrected plug diameter and clearance would you like? '
                'No geometry has been built; the current tools also cannot verify mating fits.')
    return None


def capability_question(description, workflow, current=None):
    text = description.lower()
    from backend.requirements import negated
    def requested(pattern):
        return any(not negated(text,m.start()) for m in re.finditer(pattern,text))
    conflict = cylindrical_fit_conflict(text)
    if conflict:
        return conflict
    if re.search(r'\b(scanner|handheld device)\b', text) and re.search(r'\b(holder|mount|cradle)\b', text):
        return ('Before designing a fitted holder, please provide the device dimensions or a dimensioned reference, '
                'the desired orientation, charging-cable clearance, and mounting method. '
                'A concept preview cannot establish a secure fit.')
    unsupported = []
    rules = [
        (r'\bchamfers?\b', 'edge chamfers'),
        (r'\b(hinge[ds]?|knuckles?|bores?)\b', 'hinge bores, knuckles and verified articulation'),
        (r'\b(slip[ -]fit|press[ -]fit|mating|removable.*cap)\b', 'verified mating fits'),
    ]
    for pattern, label in rules:
        if requested(pattern):
            unsupported.append(label)
    holes = requested(r'\b(?:through[ -]?)?holes?\b')
    bracket = workflow == 'precise' and (re.search(r'\bbracket\b', text) or (current or {}).get('part_type') == 'bracket')
    if holes and not bracket and workflow!='concept':
        unsupported.append('custom through-holes outside the precise bracket tool')
    if bracket and holes and re.search(r'\b(corner|positions?|positioned|edge|edges|offsets?)\b', text):
        unsupported.append('custom bracket hole positions (the tool only spaces holes across width at fixed arm centers)')
    if not unsupported:
        if workflow=='precise' and requested(r'\b(fillets?|screw posts?|compartments?|dividers?|slots?|cutouts?|one[ -]piece)\b'):
            return 'This feature uses the component-based CAD workflow. Choose Brainstorm or Concept assembly to review and approve a cut-feature design; the precise form supports simple boxes, trays and fixed-hole brackets.'
        return None
    return ('This request needs features the current CAD tools cannot faithfully build: '
            + '; '.join(unsupported) + '. Your existing model is preserved. '
            'Would you like to simplify the request to a supported open-top box/tray, a bracket with fixed hole placement, '
            'or a visual primitive assembly? No requested feature will be silently omitted.')
