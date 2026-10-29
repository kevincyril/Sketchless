# Chair request-to-confirmation regression

Verified on the public [Sketchless workspace](https://sketchless-cad-7931c5be.onrender.com/) on October 29, 2026, running `4d90e63bbd960cffc235bf18a0821a505a4e9ac1` (modeling contract 2). [Machine-readable results](chair-flow-results.json) include the exact prompts, actual confirmation text, component dimensions, timings, geometry checks, and earlier failed development checks.

## What caused the incorrect proposal

The public service still ran `e76091a`: the earlier fix was local and uncommitted, and Render automatic deployment was disabled. No local server listened on port 8000.

The old purpose parser treated the word **legs** as walking intent. Its size summary detached numbers from their components. It did not understand the reported prompt's comma-separated overall dimensions, seat dimension triple with a separate top-surface clause, or count modifiers such as **three evenly spaced horizontal backrest slats**. Gemini could therefore produce 450 mm legs while stating a 450 mm seat top over a 30 mm seat, without a semantic geometry check rejecting the contradiction.

The original saved scenes did contain three slats. The conversation confirmation displayed only eight part names, hiding the last two; this was a display truncation, not an absence of those solids. Repeated messages in the same session used the saved, unbuilt proposal as the edit baseline. The stored tool events were `propose_scene` / `update_components`; no chair recipe or silent template fallback was used.

A first real check after deployment failed the bounded repair loop on dimensional assumptions. A second reached a correct confirmation and successful CAD build but exposed inflated post-tessellation aggregate bounds. These failures are retained in the results instead of being reported as successful runs.

## Fix

Each proposal saves named requirements and counts. New explicit corrections override the earlier snapshot. Geometry is checked against those facts within the bounded repair loop. Conflicting dimensional assumption text is regenerated from scene measurements, without changing geometry. The confirmation lists every actual solid and its dimensions. Old saved proposals require review before approval; the API and UI expose the running revision and contract version. CAD inspection now measures analytic B-rep bounds rather than cached preview triangles.

## Actual live result

Chrome used the site's real Send and Build buttons, with real Gemini and real CAD. No browser routes or provider responses were mocked.

| Property | Initial confirmation and build | Follow-up confirmation and build |
| --- | --- | --- |
| Purpose | Sitting | Sitting |
| Overall size | 450 x 450 x 850 mm | 450 x 450 x 850 mm |
| Seat thickness | 30 mm | 40 mm |
| Seat top above ground | 450 mm | 450 mm |
| Four leg lengths | 420 mm | 410 mm |
| Named backrest slats | Lower, Middle, Upper | All three preserved |
| Solid components | 10 | Same 10 stable IDs; only seat and four legs changed |
| Confirmation latency | 10.316 s | 6.477 s |
| Build latency | 39.883 s | 38.228 s |

The CAD worker's exported `scene.json` components exactly matched each approved proposal. Component and overall bounds passed; both actual CAD previews loaded. This used two interpretation requests and three modeling tool attempts, including one bounded initial height repair. No paid provider, billing change, or quota increase was used.

[Initial confirmation screenshot](screenshots/chair-live-confirmation.png) | [Follow-up confirmation](screenshots/chair-live-correction.png) | [Built chair](screenshots/chair-live-built.png)

## Reproduce

Install the Python and frontend dependencies as described in the README. For offline coverage:

```powershell
.\.venv\Scripts\python -m pytest tests/test_chair_corrections.py -q
cd frontend
npm run build
npx playwright test e2e/chair-correction.spec.ts e2e/proposal-revision.spec.ts --reporter=list
```

For an opt-in real check from the repository root (consumes free Gemini allowance and creates two saved CAD versions):

```powershell
node scripts/verify_chair_browser.mjs https://sketchless-cad-7931c5be.onrender.com 4d90e63bbd960cffc235bf18a0821a505a4e9ac1 data/chair-browser-check.json
```

The verifier refuses to overwrite an existing report or test a different deployed revision. It stops on provider errors and never substitutes a paid provider. Use a new report path only after inspecting the prior result. This is one reported development scenario, not a general generation success-rate claim. The frozen held-out evaluation and its historical results were not changed. These primitive CAD checks do not establish furniture strength or printability.


## Validation record

The live Chrome check passed both confirmations, both CAD exports, both previews, stable component IDs, and unchanged non-target components, with no JavaScript errors. [Linux container CI passed](https://github.com/kevincyril/Sketchless/actions/runs/40969507243).

The final local full suite reported **236 passed, 5 skipped, and one startup timeout** while other checks were running. The startup subprocess exceeded the test's 30-second limit; its isolated rerun passed in **4.40 seconds**. The analytic cylindrical-chair bounds regression also passed at 0.001 mm absolute tolerance. An older cleaner test expected an inflated 340.342 mm preview-mesh bound; it now verifies the intended 340 mm analytic body dimension at 0.01 mm tolerance, and passed.

Render remained on the Free plan. The public report contains no browser cookies or backend keys. Browser state used for a read-only screenshot was kept in an ignored, access-restricted local file. The application's deployed source revision above remains the verified runtime; subsequent report and test-expectation commits do not alter it.
