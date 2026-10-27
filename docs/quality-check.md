# General design smoke test — 2026-10-25

The cooking robot was an example, not a product requirement. This assessment uses unrelated custom objects and separates successful execution from meeting design intent.

## Live Gemini checks

Six Developer API Free Tier model requests total; no provider fallback or billing changes:

- Initial desk lamp, shade-color edit, and dining chair: three requests. All produced valid CAD and STEP/STL/GLB exports; the color edit preserved IDs, dimensions and placements. These execution checks passed, but the lamp was about 346 mm tall against an approximate 400 mm request. The chair reached 830 mm rather than the requested 850 mm, and its seat top was 470 mm rather than 450 mm. Visual inspection also found floating lamp parts. See `live-variety-initial.json`.
- A stricter lamp check stopped after one request because its height was about 344 mm. This failure is preserved in `live-variety-dimension-failure.json`; the test did not continue calling the model.
- After adding calculated dimension feedback, a final lamp request used two model calls including repair. CAD height was about 361 mm, within the declared 10% tolerance for “about 400 mm.” Analytic proposal height was 360 mm. This is a rough concept, not precision compliance. See `live-variety-verification.json`.

The chair was not rerun after the placement guidance change. Its original dimension mismatch remains a documented limitation. None of these checks establishes broad design quality or manufacturing suitability.

## Changes prompted by the findings

- Nonwalking robots with a stated form and size can progress instead of repeating the generic clarification question.
- Proposal review shows calculated overall width, depth and height before approval, using transformed primitive bounds without generating CAD.
- Explicit overall/total measurements and standalone size sentences can produce calculated repair feedback within the existing bounded loop. Approximate sizes allow 10%; exact sizes allow 0.1 mm. The parser deliberately leaves ambiguous, contextual, relative and component measurements to human review. It does not understand arbitrary measurement language.
- Separated component bounding boxes trigger a placement warning. This can reveal floating parts; overlapping boxes do not prove that surfaces touch. Intentional separation is allowed.
- Placement instructions distinguish primitive centers from top surfaces and ask the model to respect ground level and connected visual parts.

## Try the results

Use My designs → Open a design file with `examples/variety/lamp/design.json` or `examples/variety/chair/design.json`, then Rebuild imported scene. Rebuilding these saved results uses no AI. Current lamp is the final rough concept; chair is the original measured imperfect result. The screenshots in `docs/screenshots/custom-lamp.png` and `custom-chair.png` show the actual website previews.

These are a small diagnostic sample, not an independent benchmark. Remaining quality work includes broader prompts, component-level dimensional intent, connectivity and better shape representation than the current primitive vocabulary.

## Review the proposed shape before building

Concept proposals now include **Preview proposed design**. The optional dialog renders the proposed primitives locally, including nested transforms and colors. Rotate it to inspect the silhouette and part placement, then return to review to approve or send corrections. It makes no AI request and creates no CAD artifacts. The existing accepted model and downloads stay active. The preview is an approximate shape display, not a connectivity, engineering or manufacturability check; accepted models still display their actual CAD tessellation.
