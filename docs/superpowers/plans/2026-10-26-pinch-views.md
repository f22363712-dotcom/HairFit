# Pinch and multi-view studio implementation plan

> For agentic workers: use executing-plans. Existing explicit authorization covers this implementation. Do not commit/push.

Goal: one pinch makes one real cut, with discoverable side/back access and honest, improved hairstyle rendering.
Architecture: reuse existing temporal recognizer guards with a separate pinch-pose adapter; production pipeline accepts pose diagnostics through recognizer; view helper owns current orientation and suspension; existing renderer and real cut geometry remain.
Tech Stack: existing JS/Three/MediaPipe1.1.1; no dependency changes.
Spec: docs/superpowers/specs/2026-10-26-pinch-views-design.md

## Constraints

Preserve D: folder/current branch/all unrelated work. No webcam recordings/joint arrays. No paid API, commit, push or publish.250ms freshness unchanged.

## Review Focus

- Pinch closes once, held/trembling fingers do not repeat; fist and rigid motion cannot cut.
- View switch or orbit invalidates pre-view opening and captured frames.
- Side/back cuts hit current visible geometry and cannot pass through the head.
- Webcam dock and controls remain reachable across viewport sizes.
- Visual changes retain rendering budget and clearly disclose reference approximation.

## Tasks

- [x] Pinch adapter src/lib/pinch-gesture.js + tests/pinch-gesture.test.js. Failing-first positives, negatives, depth/source/lifecycle guards; use existing ScissorsGesture temporal policy without altering V reference behavior. Integrate scene strings/overlay and diagnostics pose adapter.
- [x] Named views and orbit suspension. Add src/lib/studio-view.js + tests/studio-view.test.js; buttons and orbit lifecycle invalidate intent. Browser actual geometry cuts in all4views, held close/switch cannot cut.
- [ ] Model assessment by requested GPT-6.1 sol ultra. Implement bounded source-backed changes with focused geometry tests where behavior changes. Independent visual review under3d-asset-critic; do not call low score accepted.
- [ ] Fresh scoped code review, full Node/build, actual public hand model examples appropriate to pinch, production synthetic integration and default falling performance. Then one learner trial for feel and appearance, with numeric manual stop.

## Ledger

- Current user chose pinch and requested side/back control; retains existing uncommitted project. Model audit running fresh GPT-6.1 sol ultra read-only.

- Learner explicitly selected reference-led hair-strand rebuild with inferred back marked as approximation. Macro-clump experimentsv2-v4 failed independent visual review; reverted from production while retaining coverage/root-attachment fixes. Failed artifacts archived under ignored test-assets/model-experiments. Next, GPT-6.1 sol ultra builds an isolated local curl prototype using controlled layeredgroom paths; parent visually inspects before integration. No more random whole-head parameter loops.
- Pinch now uses fixed projected tip contact with stable-palm rejection after actual model depth bias. Six public/sample images5/6; back-hand positive is a retained detection failure, .5 confidence experiment did not recover it so production.65 remains. No physical accuracy claim.

- Fresh groom_code_review: noCritical,2Important lifecycle findings. Both reproduced in production browser RED0/3 and fixed via shared onGroomRebuilt lifecycle callback; GREEN3/3. See groom-code-review artifact. Final: minor(deferred): strictboolean debugAppearance check; defaultproductionoff, onlyinternaldebugoptintruthy.
- Nativeappearance blackplaceholder was reproduced numerically: map bound whileimageReadyfalse; pure readiness tests RED/GREEN and coldload browserverifiedinitialmapPresentfalse→ready2048nativeboundtrue;claystaysunmapped. DefaultGPUreadbackdisabled.

- Final reference-groom rootpatch passed geometry checks but independent final visual review failed4/10. Actual falling worker64/64fresh/p9599.5ms but4.488Hz failed10Hz cadence under recorded high system load. Do not report modeling completed. Retain candidate behind strict explicit experimental option and restore original lightweight default before final interaction verification. See docs/reviews/2026-10-26-pinch-views-status.md. This checkpoint stops random whole-head parameter iteration; a different asset approach remains open.
