# Concept assemblies

Sketchless has two distinct workflows. **Precise parts** retain the existing enclosure, tray and L-bracket templates, trained classifier, single-solid/dimension checks and STEP/STL exports. **Concept assemblies** use editable geometric components for robots, tables, stands and other bounded primitive scenes. They are visual concepts, not mechanically validated products.

## Start locally

```powershell
cd C:\Users\cyril\Sketchless
powershell -NoProfile -ExecutionPolicy Bypass -File .\Start-Sketchless.ps1
```

Open http://127.0.0.1:8000/ and keep the server terminal open. The existing local Gemini configuration is backend-only. A fresh installation can enter its key using `Configure-SketchlessAI.ps1`; use a Google AI Studio Free Tier project with no billing linked. `.env` remains ignored. The app does not set up billing or switch providers. A key does not prove billing tier; that is a user confirmation checked during setup.

## Tested conversation

Start a new design:

> Build a cube-shaped robot with legs.

A deterministic clarification gate combines the missing essentials into one question: leg count (2, 4 or 6), body size with units, and straight/articulated style. It makes no model call. Answer:

> Four articulated legs, a 200 mm cube body, and two camera eyes. Use sensible defaults for all remaining visual details and state the assumptions.

The configured Gemini model proposes a validated creation action. The reusable recipe expands it into a normal editable primitive scene with stable IDs. The tested four-leg robot has **27 nodes: 4 groups and 23 solids** (body, two eyes, four sets of upper/lower segments, hip/knee joints and feet). Leg height defaults to 160 mm; assumptions are shown. Each joint is a visual sphere, not a functioning mechanism.

Live-tested follow-up:

> Make all four legs 30 mm longer. Keep the body dimensions, eyes, foot sizes, segment widths and stable component IDs unchanged. Use the lengthen_legs_mm operation.

This raises body/eye positions to keep the feet on the ground and extends the two leg segments; body dimensions, foot sizes and segment widths remain unchanged. The direct semantic operation avoids asking the model to rewrite 27 components. Then:

> Restore the previous version

Restoration activates saved geometry without a model call or a rebuild. It follows the active version's parent, including after editing a restored branch. The UI updates the model, component tree, active version and download targets together.

Other supported edits (validated with mocked model responses/deterministic scene tools; not all live-tested):

- “Add cylindrical feet.” Existing foot IDs/positions are retained.
- “Move both eyes 10 mm higher.” Explicit position patches preserve unrelated components.
- “Make the body 20 mm narrower.” Clarify an ambiguous axis or amount; positions of other parts are changed only if explicitly included in the proposal.
- “Remove the rear legs.” Removing leg groups removes their descendants, preventing dangling references.
- Select one eye in the viewer or component list, then “Move this selected component 10 mm higher.” Selection-only enforcement rejects edits outside that component/subtree. Choose **Whole model** for broader edits.

The built-in prompt examples also include a 300 x 200 x 20 mm tabletop with four 250 mm legs, and a round-base display stand. They use the same primitive schema, CAD builder and exports. Prompt suggestions stay visible and replace the composer text without submitting. Only the Send button submits; Enter adds a line. Unsent drafts persist per design in the browser, and failed/quota requests restore the submitted prompt for editing. Actual conversation and the accepted scene persist in SQLite across refreshes.

## Authoritative scene contract

`backend/scene_schema.py` defines `SceneSpec`, schema version 1:

- `part_type: "assembly"`, units `mm`, coordinates `right-handed-z-up-xyz-degrees`.
- Name, concept (`robot`, `table`, `stand`, `cleaner`, `custom`) and concise assumptions.
- Up to 64 flat nodes, each with a stable ID, human name, primitive, dimensions, local position/rotation, parent ID, color, optional semantic role and symmetry group.
- Primitive types: **box, cylinder, sphere, cone, group**. Only groups can be parents. Parent references must exist, be acyclic and have at most eight levels.
- Boxes use x/y/z dimensions; cylinders use radius and z height; spheres use radius; cones use bottom radius, top radius (zero allowed) and z height. Unused dimensions are rejected. Groups have no dimensions.
- Primitives are centered at the local origin; cylinders/cones point along local Z. Front is -Y, +Z is up. Column-vector transforms apply Rx then Ry then Rz, followed by translation; parent matrices compose outside child transforms.
- Dimensions are 0.1–1000 mm (cone tip radius may be zero); local positions are +/-2000 mm; Euler angles are +/-360 degrees; world bounds must remain within +/-4000 mm.

The scene drives CAD, inspection, component metadata, preview tessellation and all exports. No separate hand-authored preview model exists. Robot/table/stand recipes are parameterized builders of ordinary scene nodes, not fixed meshes. Arbitrary custom scenes can use the same allowlisted primitives.

`SceneChanges` supports partial dimension/position/rotation/color/name patches, additions, subtree removal, subtree duplication/reflection, and bounded robot-leg/foot operations. Reflection is about a parent coordinate axis and transforms descendant coordinates and Euler signs consistently. IDs and graph constraints are revalidated after every edit. Duplicate/copy IDs cannot overwrite existing components. Generic boolean modeling is intentionally unavailable; requests need to use separate primitives or receive a limitation/clarification.

## CAD, preview and exports

CadQuery/OpenCascade produces a separate valid solid for every non-group component and a named, colored STEP assembly. It does not fuse the scene or require Blender/GPU services. Actual solid tessellation is saved in a bounded preview manifest and rendered in Three.js. GLB uses the same tessellation, converts mm/Z-up to meters/Y-up and retains per-component names, colors and IDs in metadata.

Concept downloads:

| Format | Meaning |
|---|---|
| STEP | Named CAD solids/assembly, not original parametric feature history. |
| STL | Combined multi-body triangle surface; disconnected or intersecting components do not become one printable object. No colors or semantic hierarchy. |
| GLB | Visual scene with separate named colored meshes in meters/Y-up; not CAD/parametric history. Transform hierarchy is baked into vertex positions. |
| Editable JSON | Versioned scene parameters, stable IDs, hierarchy, materials and assumptions. Downloaded as a Sketchless design document; open it in My designs and choose Rebuild imported scene without a model call. |

The internal preview manifest contains geometry and is not a substitute for the editable scene document. Shape tessellation has component/total triangle caps and a 20 MB per-artifact limit. The compact tree, selection highlighting, selected dimensions/local transforms, Fit/Reset/standard camera views, orbit and zoom remain available. Static scenes render on demand to avoid wasting CPU; controls and resize request renders.

## Validation and limits

Precise-part checks are unchanged. Concept checks validate every component's OpenCascade solid, positive/expected volume, transformed analytic bounds, finite transforms, graph references, component/solid counts and nonempty bounded exports. Robot “expected components” are guaranteed by the validated recipe; arbitrary scenes do not have a universal object-completeness detector. Summed component volumes can double-count intersections.

**Not checked:** collisions/intersections, balance, ground contact for arbitrary edited scenes, motion range, joint mechanics, structural strength, tolerances, manufacturability or printability. No animation, physics, IK, motor selection, organic mesh generation, arbitrary topology or general boolean operations. Some generic edits need explicit dimensions/IDs; the interpreter may ask clarification rather than guess. A new concept family should normally be started as a new design; existing scenes use patches to preserve IDs.

Geometry gets a 60-second subprocess deadline, with a 45-second component-build guard. At most 4 active/queued requests and 2 CAD worker threads are admitted, with one request per session. A stale active-version ID rejects an edit. Restoration and generation share admission exclusion. Accepted job/spec publication is transactional. Failed builds/interpretation/quota requests leave the previous accepted scene and exports intact. Successful versions are immutable and carry parent version IDs; names belong to sessions. Recent UI history is bounded to 30 requests; exact version IDs remain authoritative.

## Gemini and ML roles

The existing trained TF-IDF/logistic classifier handles only enclosure, tray and bracket routing. Deterministic routing chooses a workflow before that classifier; robot/table/stand/unknown concept ideas are never forced through its three labels. Follow-ups inherit the current workflow unless explicitly switched. The synthetic evaluation report is unchanged; this feature did not train a generative 3D model.

Gemini interprets concepts/edits using allowlisted `create_concept`, `propose_scene`, `update_components`, `restore_version` declarations. Server tools retrieve the current model, validate, build and inspect. Modeling text never runs Python, shell or arbitrary code. Default model remains configurable `gemini-3.5-flash-lite`; the legacy free-tier option remains explicit. Google's current official function-calling, structured-output and Python SDK docs were checked. The existing Developer API endpoint/key isolation, no automatic SDK retries, redacted errors and no provider fallback remain.

There is one modeling action per response, at most three interpretation attempts (two validation repairs). Precise responses keep the 1500-token ceiling; concept responses allow up to 6000 output tokens for structured component patches. A 429 ends that request with a free-quota/rate-limit message. It is not retried automatically or routed elsewhere. Users may retry once quota resets. No hidden reasoning or invented progress is displayed.

## Verification

- Existing precise CAD/classifier/SDK tests passed after integration.
- Actual CAD tests cover robot/table/stand STEP round trips, multiple solids, transformed sphere/cylinder/cone bounds and GLB structure.
- Mocked real Google SDK tests cover clarification-to-generation, all-leg edits, selected-only edits and scope rejection, subtree removal, symmetry/copy, restoration/branch edits, schema/repair limits, quota redaction, stale/overlapping requests and failed worker preservation.
- Chrome verifies a recognizable robot using actual CAD, orbit/zoom, canvas/list selection, highlighted selection, eye editing, GLB download, active-version/export restoration, refresh and responsive layouts. Model interpretation is mocked in these routine tests; CAD is real.
- `docs/live-concept-verification.json` records the successful live run: deterministic clarification, **two real Gemini requests** (generation/edit), all geometry/exports passing and deterministic restoration. One earlier exploratory request generated defaults too soon; the clarification gate corrected that behavior. No additional live calls are needed for routine regression.

Run tests:

```powershell
.\.venv\Scripts\python -m pytest tests -q
cd frontend
npm run build
npx playwright test
```

This environment's sandbox-owned Windows cache folders may require a fresh `--basetemp` under ignored `data/` and `-p no:cacheprovider`. Live verification is opt-in and quota-limited:

```powershell
.\.venv\Scripts\python -m scripts.verify_concept_live --confirm-free-tier
```

It has a hard ceiling of six model requests across the whole check, uses isolated temporary CAD storage and never enables billing. Free-tier status is confirmed by the user, not inferred from the key.

Official references:
- https://ai.google.dev/gemini-api/docs/function-calling
- https://ai.google.dev/gemini-api/docs/structured-output
- https://googleapis.github.io/python-genai/
- https://cadquery.readthedocs.io/en/stable/assy.html


## Robot-vacuum design support and Brainstorm

Brainstorm retains automatic routing and now describes the idea-development role explicitly. Inspection of the user's actual cleaner request found that the robot clarification gate asked about walking legs; the accepted fallback was a seven-component box/wheels scene without cleaning hardware. Cleaner/vacuum intent is now routed before walking-robot questions. Ambiguous cleaner descriptions ask about appliance form/size; “default settings” selects an explicitly stated low-profile robot vacuum. Common default-word misspellings are tolerated, while explicit “no defaults” is respected. Upright/handheld cleaners do not silently select the robot-vacuum recipe.

`create_cleaner` accepts body diameter (200–500 mm), body height (35–160 mm, no more than 45% of diameter), shell/accent colors, optional lidar and one/two side brushes. The default is a 340 mm diameter, 75 mm body-height robot vacuum. It expands into 22 ordinary editable nodes, 21 actual CAD solids: circular shell, bumper, lid/seam, two drive wheels and hubs, support ball, sensor window, controls/indicator, lidar surround/turret/cap and a side-brush group/hub/bristles. Overall height includes the lidar; brushes may extend beyond body diameter.

These are reusable parametric components with stable IDs, not an opaque mesh. Component patches still handle edits. A cleaner-specific review rejects a walking robot or a proposal missing the body, two drive wheels, bumper, sensor, controls or cleaning brush. The review checks identifying features only: it is not an aesthetic score, an airflow/suction calculation, or proof of cleaning effectiveness, navigation, mechanical clearances or manufacturability. Custom unfamiliar products can still be coarse; this is not unrestricted commercial-grade generative industrial design.

The actual default cleaner was built/exported and visually inspected in Chrome. Smoother edge thresholds suppress tessellation seams on curved surfaces; camera fitting uses actual vertices rather than a loose box sphere, and soft contact shadows improve depth. The underlying CAD remains authoritative. A saved sample is available as Refined home cleaner, with artifacts under examples/cleaner and screenshots cleaner-refined.png / cleaner-top.png.

A one-prompt live Gemini check (“Create a home robot cleaner with default settings.”) passed using ONE model request, producing the dedicated cleaner scene and verified STEP/STL/GLB/scene JSON exports. Evidence: live-cleaner-verification.json. This is a targeted verification, not a benchmark of arbitrary product-design quality. Routine regressions use mocks. The optional scripts.verify_cleaner_live command requires --confirm-free-tier and caps the entire check at three model requests including validation repairs; it never upgrades billing or falls back to a different provider.


## Understanding and approval before geometry

Concept modeling now separates requirements, a proposed scene and geometry construction. New concepts AND AI-proposed concept edits return a persisted clarification job containing a typed proposed_spec and a human-readable brief. No geometry subprocess or artifact folder is created at that stage. The brief shows form/name, primary dimensions, component names and assumptions. The user must select Build this concept or send an unambiguous confirmation such as Yes, build it. Corrections create another reviewable proposal, never implicitly approve the old one. Use defaults permits assumed measurements, not assumed purpose or automatic CAD creation.

Cooking/kitchen/chef robot requests ask whether the intended product is a countertop appliance, fixed robotic arm or mobile/humanoid kitchen assistant, which tasks (stir/chop/heat/serve) it should perform and approximate size. The generic walking-robot recipe is rejected for cooking intent, with bounded validation feedback. Other unspecified robots ask about purpose/form rather than immediately requesting leg counts. Clearly requested walking/cube-legged characters retain their existing relevant dimension questions. A proposed custom kitchen scene can still be crude; review is an opportunity to correct the model, not a claim of reliable functional appliance design.

Confirmations are server enforced. A confirmation ID must reference the same session, the latest pending proposal and the unchanged active model version. Superseded/cross-session/stale confirmations fail without replacing geometry. After restoring an older model, new proposals on that active branch remain eligible while abandoned future prompts are excluded. Confirmation builds exactly the saved validated spec without another Gemini request. Explicit structured/manual builds and validated scene imports remain direct user-authorized construction actions.

The review state and pending proposal survive refresh. The previous accepted model stays visible during questions/proposal review. The composer invites corrections and the app uses neutral Working on your request progress rather than claiming geometry is already being created. Viewport and exports update only after a confirmed build succeeds.

Routine verification uses mocked model responses plus actual CAD, including a browser fixture explicitly labeled as such. No live cooking-design quality result is claimed. The live verification CLIs explicitly approve their known test proposals in isolation so their provider budgets remain unchanged; they are not background auto-approval in the application.


## Correction-aware requirements review

The proposal card separates detected user requirements (purpose, form, tasks, size) from the proposed model/components. The requirement extractor records user statements rather than inferring working mechanical capability. Cooking clarification asks only for fields still missing, including across several replies. Corrections such as no chopping, only stirring remove the rejected task. Negated forms and refusal of default settings are respected; rejecting assumed defaults does not erase explicitly supplied measurements.

An explicit change to a different product purpose drops the obsolete brief from interpretation context. Ordinary dimension corrections preserve the original purpose/tasks. Explicit replacement may propose a new recipe/custom scene while retaining the current accepted model until approval; ordinary edits and selected-only actions still cannot silently replace the whole recipe. Proposed geometry can still be an imperfect interpretation, which is why user review remains required.

Build this concept is disabled while an unsent composer message exists; send or clear that message first so corrections are not accidentally ignored. Pending requirements and proposal persist with the job across refresh. Routine tests use mocked interpretation; no live model-quality claim is added by these requirement-handling checks.


Clarification now offers optional draft-only answers for missing form/tasks/size and shows requirements already sent. A cooking request can be answered with Fixed robotic arm, then Stir and heat, then a user-specified/default size. Each choice must be sent explicitly; selecting an option never invokes a provider or approves a model. The user may type any answer instead. The final scene still requires separate review and approval.
