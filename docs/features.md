# Bounded CAD features and linked edits

Use **Brainstorm** or **Concept assembly** for a feature design. Describe the dimensions, review the proposed components/openings and assumptions, then explicitly choose **Build this concept**. The existing precise-form workflow still covers its original enclosure/tray/bracket families. If a feature request is explicitly sent to that simple form workflow, the app explains how to choose the component-based workflow.

The `create_feature_part` tool validates typed dimensions and constructs editable scenes for seven bounded families:

| Family | Implemented geometry |
| --- | --- |
| Electronics enclosure | Open cavity, floor, four connected screw posts and actual bores through posts and floor |
| L bracket | Connected perpendicular plates; holes on each face at specified distances from the common outside corner |
| Phone stand | Fused base, angled support, retaining lip and real cable notch; unspecified placement/notch-height assumptions are disclosed |
| Stepped shaft | Coaxial cylinder sections fused along X; transverse bore at the selected section midpoint |
| Organizer | Equal rectangular compartments with specified rows, columns, walls, floor and dividers |
| Mounting plate | Four actual through-holes at outside-edge insets; interpreted input dimensions are converted to millimeters |
| Slotted tray | Hollow body and floor slots at outside-corner X/Y centers; linked height changes and vertical corner fillets |

Portable JSON examples are under [examples/features](../examples/features). Open one through **My designs → Open a design file**, then rebuild without a Gemini request. The original primitive scenes remain supported. Components can also use bounded local primitive cutouts and vertical box fillets. Each cutout must remove real material; each component must remain one valid solid. One-piece fusion fails if the parts do not connect. Limits remain enforced on primitive size, positions, feature count, build time, tessellation and export size.

## Preserving an edited feature design

The scene stores a typed `feature_design` parameter object. `edit_feature_part` changes those parameters and regenerates linked geometry with stable component IDs, preserving existing component names/colors. A tray height change recalculates cavity height and slot local Z offsets, so the floor and openings remain physically fixed. Outer and inner corner radii are offset to preserve straight-wall thickness. A geometric stock-only patch against a parameterized model is rejected with bounded repair feedback. A direct JSON import whose feature parameters disagree with its geometry is rejected before export.

Generic primitive scenes still use scoped `update_components` edits. Selected-only requests cannot silently regenerate an entire parameterized design; choose **Whole model** for linked dimensions. Naming/color patches remain available by component ID.

Proposals containing cutouts, fillets or joined bodies do not offer the old uncut primitive preview as though it were the final shape. They show their feature measurements and explain that the accurate CAD preview appears after approval. Accepted STEP/STL/GLB and the viewer's tessellation come from the same built B-rep.

## Actual development evidence

The user-authored [ten-request suite](../evaluation/user_acceptance_v2.json) is a development acceptance suite, not an untouched held-out benchmark. The frozen v1 dataset and historical evidence were not changed.

- [Initial offline feature run](../evaluation/results/20261103T202228258687Z-features-v3-offline.json): 10/10 cases, eight scripted SDK replies, actual API/approval/CAD/export/persistence/restoration. This is wiring and geometry evidence, not language accuracy.
- [First real Gemini run](../evaluation/results/20261103T202552156918Z-features-v3-live.json): 9/10 cases, eight real Free Tier requests. Tray stock resized but its cavity and slots did not follow; valid CAD alone missed this intent failure.
- [Focused diagnostic run](../evaluation/results/20261103T202810499077Z-features-v3-live.json): the same tray failure reproduced with two real requests. The actual accepted and edited scene specs are retained in the report.
- [Corrected parameterized tray run](../evaluation/results/20261103T203224321237Z-features-v3-live.json): 1/1 focused case passed with two real requests, including preserved floor slots, 45 mm height, 5 mm outside/2 mm inside corner radii, actual exports, reopening and zero-model restoration.
- [Final offline feature run](../evaluation/results/20261103T203509162524Z-features-v3-offline.json): all ten acceptance cases passed after the linked-edit correction.
- [Hosted geometry verification](hosted-features-verification.json): posted enclosure, tray, edited tray, exports, reopening and restoration; explicit synthetic specs and zero Gemini requests.
- [Linux constrained-container evidence](linux-features-report.json): actual CAD and restart persistence under 512 MiB / 0.1 CPU.

These live attempts used twelve requests in total. The final full suite is rerun offline; the other nine scenarios were not re-executed live after the parameter-preservation correction. Do not describe the focused repair as a fresh final-version 10/10 live score. Each report preserves its implementation fingerprint. No paid provider, model fallback or billing changes were used.

Run the current full offline acceptance path:

```powershell
.\.venv\Scripts\python -m scripts.evaluate_features
```

Optional live checks require `--live --confirm-free-tier` and an explicit request cap no larger than twelve. They use temporary local storage, stop after provider failure/request limits and never reuse personal designs. The retained initial preflight-only report is historical; `scripts.evaluate_acceptance` now delegates to the current feature runner.

This remains bounded CAD, not verified mechanisms, fit, strength or printability. Hinges/motion and verified mating fits receive explicit limitations. The conflicting cap request asks for corrected clearance; the underspecified scanner holder asks for dimensions/reference, orientation, cable clearance and mounting method before building. Those behaviors are the expected outcomes of those acceptance cases.
