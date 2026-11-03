# User acceptance requests, November 2, 2026

**Historical initial assessment.** Bounded feature geometry was subsequently added. See [feature implementation and newer evidence](features.md). The report below preserves the earlier preflight-only observation; it is not the current capability assessment. The current runner is `python -m scripts.evaluate_features` (the old entry point now delegates to it).

The ten user-supplied requests are preserved in [the versioned suite](../evaluation/user_acceptance_v2.json). They were used to identify gaps and add deterministic clarification behavior, so they are development acceptance cases, not an untouched held-out benchmark. The original frozen v1 dataset and scores remain unchanged.

Run the current follow-up without credentials, real Gemini requests or personal design data:

```powershell
.\.venv\Scripts\python -m scripts.evaluate_features
```

The [machine-readable report](acceptance-v2-results.json) exercises actual API job creation, stored clarification history and reopening for all ten prompts with provider and CAD transports disabled. All ten return clarification without inventing a successful model. The conflicting cap identifies the 54 mm opening versus 54.6 mm plug and asks for corrected clearance. The scanner holder asks for dimensions/reference, orientation, cable clearance and mounting method.

**Zero models were completed in this assessment.** No export, preview or fit success is claimed for these requests. The eight geometry requests exceed the current schemas: posts/bores, custom hole coordinates, fused solids, arbitrary cutouts, hollow cylinders, hinge geometry, repeated compartments and fillets need additional CAD operations. The hinged-box prompt explicitly permits an explanation of unsupported features. The two clarification cases are useful behavior checks, not geometry passes. The tray follow-up is not run because its initial slotted model cannot be built faithfully.

Supported-model preview, export, reopen and edit/restore behavior has separate backend and browser regression coverage. The new unsupported-edit regression builds a real tray, asks for unsupported fillets, and checks that its accepted specification, active version and STEP download remain intact. None of these checks establishes a manufacturing-ready model or general prompt accuracy.

The preflight is conservative handwritten routing. It recognizes explicit feature wording and one narrow cylindrical-fit syntax in millimeters; it does not understand every paraphrase or independently verify arbitrary fits. Seat support validation checks bounding-box footprint overlap and ground/underside heights; it does not prove physical contact for arbitrary rotated or curved geometry.
