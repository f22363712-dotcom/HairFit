# Fresh pinch/view review and fixes

Read-only reviewer pinch_view_review used current working files and a fresh context. Scoped21/21 tests; no Critical or Minor findings.

## Important findings

1. Gradually retracting toward a fist could cut at step4 even with a curled index. Added test "gradual fist retraction cannot manufacture a thumb-index cut", observed RED step4 then GREEN with a retraction discriminator that permits a relaxed/bent index when other fingers extend. A fully curled fist cannot supply this corroboration.
2. Mouse cutting during orbit damping bypassed the webcam-only viewStill gate. Authored production-scene browser test RED "pointer cut began while view moving", then gated pointerdown/move until view settles. A fresh mouse press is required. GREEN controlled integration16/16 in intermediate artifact; final re-run follows model stabilization.

## Model-driven pose correction

Actual Wikimedia front-facing contact image had worldGap1.288 while projected gap.458. Using world depth as the pinch aperture failed despite visible finger-pad contact. Added failing depth-offset and pad-center residual regression tests, then selected a fixed projected-contact metric. No mid-cycle metric swapping. Open.75/close.50 palm-width hysteresis, inherited55ms marginal confirmation and180ms cooldown; strong closures still immediate. Camera-palm basis displacement>.15 cancels the cycle, plus edge-on rejection. The near-threshold perspective rigid-motion matrix300sequences ×40frames passes. This is synthetic coverage, not physical accuracy proof. Old V recognizer behavior is preserved except shared opt-in stablePalmRequired check.

## Actual model limits

SDK1.1.1/full model/original production thresholds. Six images: release positive, front contact positive, thumb-up/down negatives and no-hand face negative passed; a back-of-hand OK photo was not detected.5/6 is the actual compatibility result. Experimental confidence.5 still missed that back-hand image; production stays.65. Failed and comparison artifacts are retained. Do not claim complete model compatibility or measured natural-user accuracy.

## Declined to judge and disposition

- Physical comfort/accuracy remain a learner observation, not inferred from synthetic tests.
- Four-view geometry, responsive reachability, actual model and performance are supplied by parent artifacts.
- Model visuals had separate independent critics; their failed gates remain separate and are not cleared by code tests.

## Rulings

- Pinch detects visible contact with palm-motion rejection, rather than trusting biased model depth. Projected overlap at different depths is an inherent monocular ambiguity; rigid-motion/cancel guards bound known false-cut cases, physical sensitivity remains unmeasured.
- Keep original model/delegate/capture/thresholds after the isolated confidence comparison failed to improve the known miss.
- Camera view changes preserve cuts and cancel pending input; gestures and mouse cuts wait until damping settles.
