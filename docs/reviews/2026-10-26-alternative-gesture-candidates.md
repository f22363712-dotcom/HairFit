# Alternative input candidates, discussion only

Learner asked whether another easily recognized action could preserve haircut causality. No replacement has been implemented or accepted.

Proposal: thumb/index pinch. Move the visible scissors to aim, pinch to close the visible blades and cut once, release to prepare another cut. Reduces the required pose constraints on other fingers. Ordinary-webcam robustness is unknown; tip occlusion remains a risk. Compare against current V closure using the same capture, model, real geometry and numeric diagnostics, including false cuts during wrist movement. Avoid declaring a winner from synthetic landmarks.

Alternative: open palm to closed fist, interpreted as squeezing the tool handle. Gesture Recognizer has built-in Open_Palm and Closed_Fist labels, but current HairFit worker uses HandLandmarker; this would require different classification or a new local bundle. Availability of labels is not evidence of higher accuracy or lower latency.

Sources checked2026-10-26 via agent-reach Exa search:
- https://docs.ultraleap.com/xr-and-tabletop/xr/unity/plugin/features/pinch-and-grab-detection.html supports pinch as an established interaction with hysteresis; specialized tracking hardware is not webcam evidence.
- https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer supports built-in pose categories. No paid model API called.

Current decision: retain the already-authorized repair and discuss pinch as a separate comparison candidate. No physical winner, production replacement or new model chosen.
