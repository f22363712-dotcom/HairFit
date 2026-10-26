# Finger scissors implementation plan

User authorized continuation on 2026-10-24 after the Gemini review recommended an independent true-landmark experiment. Keep the existing folder, camera lifecycle safety and mouse fallback. No new approval is needed for routine implementation details.

## Scope and choices

Use locally hosted MediaPipe Hand Landmarker in a worker, one hand per frame. Hand imagery stays local. The SDK returns joints, not a ready scissors classification; implement and test that classification separately. Existing frame-difference motion control will be replaced. An explicitly labeled automatic demo remains separate.

Freehand aim follows the mirrored midpoint of index/middle fingertips. Only a stable open-to-closed transition while index/middle stay extended and ring/little fingers remain folded may cut once. Normalize distances to palm width. Require a fresh open pose after lost tracking, hand switch, tab hidden or close; never auto-arm from a first closed frame. Use hysteresis, dwell and a cooldown to prevent repeated cutting while closed. Preserve the last stable open aim for the cut, avoiding the finger-closure jitter path.

## Files and tasks

1. src/lib/scissors-gesture.js and tests/scissors-gesture.test.js. Write RED tests for open/close, no-hands, closed first frame, fist/open palm, lost tracking, hand switch, held close, distance invariance and large aim jumps. Implement the pure recognizer and run GREEN.
2. src/lib/hand-tracker.js, src/workers/hand-tracker.worker.js, local public/vendor/mediapipe assets and public/models/hand_landmarker.task. Pin SDK version, save source/hash/license evidence, allow only those public directories and verify correct MIME. Worker runs inference off the rendering thread, one in-flight frame, timeouts and cleanup; no cloud call.
3. Integrate in haircut-scene.js. Skeleton overlay, open/closed/lost status, true camera frames to worker, single snip at stable aim, close/blur safety, explicit auto demo. Keep mouse input and reset. Warmup verifies actual WASM/model startup independently of camera availability.
4. Run full Node suite/build/diff checks. Browser verify startup and no-hand gate; if no physical camera is available, explicitly leave live opening/closing and target-device latency as learner checks. Independent code review before handoff.

## Evidence boundaries

Synthetic landmark tests prove gesture logic, not real-world detection accuracy. Blank-frame model warmup proves local inference loads, not hand accuracy. Real camera acceptance requires user doing V-open, close, stationary/turn-head/open-palm and hand exit on their target device. No universal FPS or latency claim.
