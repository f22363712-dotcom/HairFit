# Screen gesture correction after failed live trial

The learner reports that the preceding adaptive-world-gap version now cannot recognize gestures. Read the current UI before any reload. Camera640x480/readyState4 and the GPU worker were active; browser error log was empty. The previous requested diagnostic had not been started, so no report from that attempt existed. The assistant armed one without refreshing and later saved the observed failure data to ignored `test-assets/gesture-recognition-failure-20261025.json`. The learner has not confirmed which motions align with its window. It is diagnostic evidence, not attempt accuracy.

## Evidence

The frozen report has2538 frames,343 pose rejections,2193 no-hand results and2 between-threshold results. Both production and read-only comparator count0 snips. In retained records,193 observations have world finger flags0000 and projected flags1110. Another18 have world0000/projected1100. The prior3D pose gate rejects both before opening can arm. This is an additional failure beyond the earlier strict closure threshold.

## Change and tradeoff

Production now measures the index-middle opening and finger extension in the camera image plane, corrected for aspect ratio. It requires extended index/middle and a folded little finger, allowing the ring finger to relax. Full palm, fist and extended-little-finger poses remain rejected. This intentionally accepts a three-extended-finger silhouette when the ring finger follows the middle finger; index/middle still control the snip.

The metric stays in screen space through the whole gesture. There is no fallback or basis switch. The old world-space/adaptive-gap/strict-ring implementation runs read-only on the same eligible frames. Raw world and screen gaps/flags remain separate from the selected intent metric in numeric diagnostics. No images or complete joint arrays are saved.

Independent review found that rigidly rotating an unchanged V toward profile could compress the image gap into a false closure. Reproduced that failure before adding a projected palm-width / wrist-to-middle-MCP-length floor0.30; near-profile observations disarm and show explicit palm-facing-camera guidance. Review also found a numeric compression case where a screen pose with invalid world geometry merged into subsequent no-hand frames. Reproduced before recording explicit hasPose and allowing compression only between absent poses.

## Verification and remaining acceptance

Failing-first joint tests cover relaxed ring and disagreement between world and screen finger extension. Positive/negative checks retain closed-first, stale/time-gap, hand-switch, aim-jump, palm/fist, loss of hand and held-close behavior. An unchanged V rigidly rotating to89 degrees must not snip.

Sanitized `tests/fixtures/scissors-projection-gaps.json` retains only relative time, world/screen gaps, finger flags and eligibility reason. Intent-only replay forms5 snips with the new screen/ring policy versus0 with old world/strict-ring. Fixed aim and absent palm-quality values limit that replay; it cannot be described as five successful camera attempts.

The browser static harness now tests the actual local worker through `ScissorsGesture.update`, rather than only the pose predicate. It uses the existing official test images without opening the camera. An intermediate check passes4/4 including V arming and rejected thumbs-up/down/pointing; the final post-rotation-guard run and final test/build/review results will be appended. Physical-camera acceptance remains failed until the learner confirms normal movement works. No paid API call, model training, confidence/resolution change, commit or publication occurred.

Final post-rotation-guard static check passes4/4, saved in `docs/reviews/2026-10-25-screen-model-results.json`. Safe static-page screenshot is `C:/Users/20651/.codex/visualizations/2026/10/23/01a1661f-c5cc-7143-86c9-d0d8917369c8/HairFit-screen-gesture-check.png`; it contains official sample pictures, no webcam.69/69 complete Node tests pass. Independent review43/43 cleared both reproduced findings. A small diagnostic UI correction allows preparing the numeric waiting state during camera permission/loading; inference and cutting still require camera ready and all prior gates.96 button-state combinations were reviewed without an Important issue.

Main user tab3 refreshed into the final screen policy and updated guidance. Assistant clicked the diagnostic button during loading, verified it could wait, then confirmed actual camera readyState4/640px, active numeric recording and GPU response87ms at one observation. This is readiness, not physical gesture acceptance. Do not refresh while this trial is active. User need only try one natural open/close motion with the palm roughly toward the camera and reply. Save the report under a NEW ignored filename after their reply.
