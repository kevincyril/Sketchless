# Evaluation protocol and results

Sketchless has three separate kinds of evidence. They must not be combined into one accuracy claim.

1. **Trained classifier:** grouped synthetic text classification for enclosure/tray/bracket.
2. **Scripted end-to-end checks:** mocked SDK responses plus real routing, validation, approval, CAD, exports and restoration. These do not measure Gemini language quality.
3. **Live Gemini evaluation:** actual Developer API responses on frozen requests, judged against explicit task predicates.

## Frozen modeling suite v1

`evaluation/modeling_v1.json` was authored and frozen on 2026-10-26 before executing the suite. It has two development scenarios and six held-out scenarios. Entire request/edit/restore chains stay in one split. The adjacent lock records dataset and modeling implementation SHA-256 fingerprints. The runner rejects held-out execution when those modeling files differ. Reports also identify the evaluator, provider model, Python/platform and package versions. `.gitattributes` preserves the frozen input bytes across Git checkouts so automatic line-ending conversion does not invalidate the snapshot.

The suite is project-authored synthetic data. The author knows the application's supported families and recipes. It is not an independent user study or a benchmark of arbitrary objects. Frozen wording/parameters provide a reproducible snapshot, not independence from all design assumptions. Previously used box/robot/lamp/cleaner diagnostics are development evidence and are not presented as new held-out tests.

Held-out cases:

| Case | Initial request | Follow-up and restoration |
| --- | --- | --- |
| Sensor enclosure | 84 × 56 × 32 mm; 2 mm walls/base | +12 mm length; preserve other fields; restore original |
| Organizer tray | 132 × 88 × 18 mm; 2 mm walls, 3 mm base | +12 mm width; preserve other fields; restore original |
| Angle mount | Foot 72, width 48, height 60, plates 4 mm; one 6 mm hole/face | +8 mm foot; preserve other fields; restore original |
| Display table | Top 280 × 180 × 16 mm; four cylindrical legs 220 mm high | Selected tabletop X +40 mm; preserve other components; restore original |
| Walking character | 180 mm cube; four straight 140 mm legs; two eyes | Selected body color #c43d32; preserve IDs/transforms/geometry/other components; restore original |
| Missing size | An enclosure with undecided dimensions | Clarify with nonempty text, no spec/CAD and no accepted model |

The manifest contains the exact prompts and expected predicates. It is never supplied wholesale to Gemini: only the current user prompt, normal application context and selection are sent. Expected answers and scripted fixtures are scoring/transport inputs only, never live-model instructions.

## Procedure

Run development/scripted validation first. The opt-in live command is in the root README. Each scenario uses a fresh isolated session and temporary data directory. Ordinary tests cannot read the local key as their provider key. Live mode uses the configured backend key and requires explicit Free Tier confirmation. There is no provider substitution or paid upgrade.

The default live cap is **12 model requests total**, including production repair attempts, with starts spaced at least 20 seconds apart. Production remains bounded to three interpretation attempts per description. HTTP 429 stops all later model requests; access/model failures stop the run as well. Budget/quota/dependency skips remain visible. Each job has a 180-second evaluation polling limit; production CAD and API timeouts still apply. Completed scenarios are not rerun to seek better answers.

For concepts the harness explicitly confirms returned proposals to exercise CAD; this is a scripted test action, not automatic approval in the product. It checks that the proposal has no accepted CAD artifact before approval. Component edits use the selected ID of the uniquely identified expected role and preserve the active base version. The restore request is exactly `Restore the previous version` and must reactivate the original ID/spec/export without a model call.

## Scoring and latency

- **Intent:** requested parameters and role/count predicates, exact precise edits, stable component IDs, selected edit and unchanged unrelated components. These are narrower than semantic understanding in general. Expected concept/role labels are part of the contract; an equivalent custom scene with different metadata may need human review rather than being accepted by these predicates.
- **Geometry:** actual backend inspection checks after CAD construction. This is distinct from intent success.
- **Exports:** nonempty STEP/STL and, for assemblies, GLB/scene JSON; GLB header checked. Detailed export roundtrip tests exist separately in the normal test suite.
- **Restoration:** original active version ID, exact spec and available original export; no extra model request.
- **Scenario pass:** all required stages/checks pass. Initial intent mismatches remain failures even when valid geometry is built. Follow-up failure preserves the original model and leaves dependent restoration unrun.
- **Blocked/not run:** reported separately from failures. Full-suite denominator always includes all six held-out scenarios; an unavailable provider is not counted as success or mislabeled as a language-model error.
- **Latency:** per-model-call wall time, request-to-first-terminal-job time, approval/build time, whole-step time, CAD-reported generation time and restoration time are recorded separately. Harness approval adds no human decision delay. Live pacing waits contribute to whole-step timing and total runtime; SDK call time excludes pacing. Median/max are reported; tiny-sample percentiles are not used as performance guarantees.

Reports use UTC timestamps; the suite freeze date uses the project user's 2026-10-26 date. Model responses are stochastic and no reproducible provider seed is claimed. Reports contain safe job messages and public specs, not keys, provider error bodies, headers, raw thoughts or full request traces. JSON output files are created exclusively rather than overwritten.

## No tuning against held-out results

Do not edit prompts, rules, classifier thresholds, geometry recipes or predicates to improve this score after reading its outcomes. Keep failures visible. If an outcome motivates an implementation change, this suite becomes regression/development data for that change; fresh held-out claims require a new untouched suite/version. Runner/scoring defects must be documented separately and do not justify silently discarding an original live run.

## Classifier evidence

The runner evaluates the saved classifier without fitting. It reports source/model hashes, group separation, split counts, accuracy, macro F1, per-class measures and confusion matrices. The existing 108 examples are synthetic variants of 36 authored seed groups, split 72/18/18. The selected threshold is 0.45, chosen on validation only. Previously recorded perfect scores are limited to this easy synthetic distribution. They do not measure scene quality, dimensions, Gemini interpretation, unsupported requests or human generalization.

## Actual runs

The live run started at **2026-10-27 00:06 UTC** (2026-10-26 in the project user's America/Phoenix timezone). Frozen modeling files were unchanged throughout. No live case was repeated to improve its score.

| Evidence | Passed | Failed | Blocked / not run | Model attempts | Total runtime |
| --- | ---: | ---: | ---: | ---: | ---: |
| Scripted development | 2/2 | 0 | 0 / 0 | 2 scripted | 16.672 s |
| Scripted held-out workflow | 6/6 | 0 | 0 / 0 | 11 scripted | 49.266 s |
| **Real Gemini held-out workflow** | **6/6** | **0** | **0 / 0** | **11 real API requests** | **203.937 s** |

Scripted timings measure local workflow execution, not model performance.

| Live scenario | Generation | Edit | Restore | Overall |
| --- | --- | --- | --- | --- |
| Sensor enclosure | Passed | Passed | Passed | Passed |
| Organizer tray | Passed | Passed | Passed | Passed |
| Angle mount | Passed | Passed | Passed | Passed |
| Display table | Passed | Selected top size; unrelated parts preserved | Passed | Passed |
| Walking character | Passed | Selected body color; geometry/IDs preserved | Passed | Passed |
| Missing size | Clarified; no model accepted | Not applicable | Not applicable | Passed |

All ten requested builds (five initial and five edits) passed geometry/export checks. Both concept workflows remained behind approval gates. All five restorations reactivated the exact original version without provider calls. Each interpretation used one API request; no model repairs or quota retries were needed in this run.

**Measured live latency:** API median 0.938 s, range 0.781–2.110 s. Restore median 0.156 s, max 0.344 s. Whole initial-step median 19.977 s and edit median 19.735 s include deliberate call spacing; they are not unpaced UI generation timings. The first unpaced enclosure request completed in 6.234 s. This is a single local Windows run, not cloud performance or an availability guarantee.

The saved classifier was re-evaluated without fitting: train 72/72, validation 18/18, test 18/18 correct; macro F1 1.0 for each split. The synthetic-data limitations above still apply. This is not a claim of 100% real-user accuracy.

Reports:

- [Live held-out readable report](../evaluation/results/20261027T000614584983Z-live-heldout.md) · [raw JSON](../evaluation/results/20261027T000614584983Z-live-heldout.json)
- [Scripted held-out report](../evaluation/results/20261027T000014751018Z-offline-heldout.md) · [raw JSON](../evaluation/results/20261027T000014751018Z-offline-heldout.json)
- [Scripted development report](../evaluation/results/20261026T235922941556Z-offline-development.md) · [raw JSON](../evaluation/results/20261026T235922941556Z-offline-development.json)

After the live run, a runner-only audit added a guard that prevents the harness from approving an unexpected proposal in a clarification-only scenario. A regression test verifies it. The actual live clarification returned no proposal, so the guard does not change this recorded result. The original JSON preserves the evaluator hash used for execution; the model, application, scoring predicates and fixtures were not tuned or rerun. Offline mode also now selects its explicit dummy model rather than inheriting unrelated model configuration.

To render future raw reports without editing them, run `python -m scripts.summarize_evaluation PATH_TO_REPORT.json`. The sibling Markdown file is created exclusively and existing results are never overwritten.

Coverage limits: only three precise families and two existing concept recipes are covered. Arbitrary custom scenes, cleaner/stand variants, vague multi-turn user intentions, broad aesthetic quality, engineering correctness, concurrency, cloud deployment and independently collected human requests are not established by the six-scenario score. Existing regression/browser tests cover additional application behavior but do not turn this into a broad language benchmark.
