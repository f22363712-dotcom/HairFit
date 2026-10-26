# Finger-scissors implementation and evidence

Date 2026-10-24. Learner explicitly authorized real two-finger opening/closure and confirmed that the two sample inputs were AI-generated for HairFit. No new paid image request was made.

## Implemented behavior

- Camera permission still goes through CameraSession. Pending, denied or late-closed sessions cannot cut.
- @mediapipe/tasks-vision 1.1.1 runs the Hand Landmarker in a classic browser worker with local SDK, WASM and model assets. The server exposes only explicit model/vendor directories with correct MIME. Camera frames are not sent to a service.
- Index/middle fingers must be extended and ring/little folded. A continuous open pose arms aiming; an open-to-closed transition emits one snip. Holding the fingers closed does not keep cutting. Hand loss, hand switch, invalid pose or tracking jumps require fresh opening.
- Palm-normalized thresholds are 0.55 open / 0.30 closed; initial timing is 120ms open, 55ms closed, 350ms cooldown. These are initial calibration defaults, not measured population accuracy or competition rules.
- Closing clips once at the last displayed stable open aim, without dragging a cut stroke across the model. Mouse, reset and consultation export remain.
- At most one camera bitmap is in flight and sampling is limited to once per 65ms. Inference timings displayed in the interface are actual worker measurements, not a rendering FPS claim.
- Results older than 250ms disarm. Page blur/hidden state and export dialogs suspend gesture intent. Automatic demo is still a distinct labeled opt-in action.

## Actual verification

1. Node suite: 28 tests passed. Includes camera cleanup, local asset routing, real temporal classification, lost/switch/stale-frame behavior, held-close suppression, palm/fist rejection and worker lifecycle/backpressure.
2. Browser: local WASM/model initialized and completed actual inference on a blank warmup image. UI then showed local model ready while permission remained pending; haircut count remained zero.
3. Browser: four Google official notebook static hand test images ran through the real worker/model and pose classifier. All four contained a detected hand. Victory was scissors-positive; thumbs up, thumbs down and pointing up were negative. Exact output is in 2026-10-24-hand-model-results.json. Sample inference observations were about 58–61ms per image in this test environment, not real camera/frame-rate evidence.
4. Build passed. Existing main-chunk size warning remains; no build failure. Whitespace diff check passed.

Static fixture images are local-only under ignored test-assets/hand-check, obtained from the official sample notebook. They are not HairFit demo people and are not being redistributed with the product. Source https://raw.githubusercontent.com/google-ai-edge/mediapipe-samples/main/examples/gesture_recognizer/python/gesture_recognizer.ipynb .

SDK/model source and SHA-256 hashes are recorded in public/models/manifest.json. Official Web guide https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js . Model card states Apache-2.0 https://storage.googleapis.com/mediapipe-assets/Model%20Card%20Hand%20Tracking%20(Lite_Full)%20with%20Fairness%20Oct%202021.pdf . SDK license/notice files are kept with the local vendor copy.

## Independent code review

A read-only reviewer independently ran the 26-test intermediate suite and identified two Important bugs. A delayed closed-frame result could cut after hand exit; an interrupted opening could accumulate dwell through a partially closed pose. Each was reproduced with a failing regression before its fix. The resulting 28-test suite passes. Focus restoration was also tightened with document.hasFocus. Reviewer did not re-review subsequent fixes; tests are their verification evidence.

## Live learner acceptance remains open

Refresh HairFit, enter 3D and enable finger-scissors. Allow camera access. Face the palm toward the camera, extend index/middle, fold ring/little, open and aim at hair tips, then close once. Observe skeleton overlay, a single snip and visible falling hair. Hold closed to confirm there are no repeated cuts, then reopen for a second snip. Also try an open palm, a fist, moving the head and taking the hand out of frame.

Report any missed closure, wrong target, accidental snip or status message. Tune on that evidence. No real-user webcam accuracy, device FPS, long-session fatigue or physical haircut feasibility has been established by the synthetic/blank/static tests. No final-ready checkbox or learner acceptance is inferred.
