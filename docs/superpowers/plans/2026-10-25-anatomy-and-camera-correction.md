# Correct anatomical shape and camera sampling

The learner rejected the existing head silhouette and reported that fast scissors gestures are missed. Preserve the approved editable preset-head boundary and learn mode. No personal reconstruction, training or paid model call is claimed.

1. Reproduce the loaded version and inference cadence. The live page was still on the prior implementation without closure counters. Refresh it, check the counters, and compare real CPU/GPU inference on the same official sample. Observed baseline CPU mean185.875ms versus GPU65.33ms, with20/20 detected in each sample batch. This is a static benchmark, not live accuracy.
2. Keep the existing temporal guards; use the measured GPU delegate first and CPU after initialization/warmup failure. Regression-test both choices and verify the real GPU runtime before the learner retries.
3. Replace the sphere-deformation head/shoulder and separate pseudo-ear with MakeHuman hm08 graphical asset geometry, licensed CC0. Derive a scalp lookup from that mesh so existing cuttable hair stays attached. Fit the corresponding eyes through its asset binding. Sample photo colors only; remove facial photo projection and alignment controls. The topology remains a generic human template.
4. Review actual front/profile renders, then repair strand width/reflectance and visible-scalp contrast. Review cut occlusion against the changed geometry. Preserve mouse cutting, reset and consultation export.
5. Run all regression/build checks and independent code/visual review. Save sources, hashes and review evidence. Refresh the learner's actual app so the reviewed implementation is active; leave live acceptance open until their feedback.

Alternatives considered by the implementer were further deforming the existing sphere, replacing it with a licensed anatomical template, and personal reconstruction. Sphere tweaks retain the unmodeled facial silhouette; reconstruction exceeds the existing approved small prototype. The anatomical template is the implementer's correction within the accepted preset scope, not a new learner claim of personal reconstruction.
