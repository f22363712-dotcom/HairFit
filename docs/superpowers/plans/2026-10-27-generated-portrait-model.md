# Generated portrait driven trim model

User approved a first short-hair instance from the actual fused portrait. Preserve the existing editable strands and cutting pipeline. Use local FaceLandmarker anchors and measured image silhouette for frontal appearance and hair geometry; complete unseen depth conservatively. No paid API calls, camera capture, publication or dependency upgrades.

## Design and approach

Reuse the anatomical surface and lightweight ribbon storage. Local image landmark inference aligns a frontal photo projection onto the face. Background-connected silhouette measurements constrain crown volume, temples and fringe. Side/rear are inferred continuous short hair. Prefer this measured approximation over the rejected unrelated preset and over an unverified external reconstruction service. Unsupported pictures must show a visible fallback rather than claim success.

## Tasks

- [ ] Add local one-shot portrait inference worker with timeout, disposal and source-change protection.
- [ ] Test image silhouette extraction and bounded photo-to-head projection using synthetic pixels, including missing-face and implausible-mask failures.
- [ ] Build a deterministic editable short-hair groom whose envelope changes with the measured silhouette, with finite collision-safe strands and all five regions populated.
- [ ] Integrate generated-image geometry and face projection, preserve explicit preset selection and source controls, disclose inferred views and fallback errors.
- [ ] Verify full tests/build; inspect actual live generated image in front/side/back, cut/reset and export with camera off. Record limits and provenance.

Existing unrelated edits stay intact. Work in the current checkout because the running user session and uncommitted model dependencies are here. No automatic regeneration. Human pinch trial and OBS recording stay pending until the model is accepted.
