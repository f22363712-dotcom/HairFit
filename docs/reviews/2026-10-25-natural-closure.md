# Natural closure threshold repair

The learner reports that a very standard hand pose and forceful finger closure are required. Saved the frozen manual-stop numeric report to ignored `test-assets/gesture-natural-closure-20261025.json` before refreshing. No pixels or complete hand-joint arrays were saved.

## Evidence

The full window contains57,725 processed frames over about100 minutes, including57,043 inactive/unfocused frames. It is not a controlled five-attempt test. Both rules counted8 accepted closures; the visible scene counted8 hair hits. These totals cannot establish physical recognition accuracy.

The retained240 records include233 eligible hand observations. Their median capture-to-result latency is20.5ms, p95 is35.8ms. This subset supports examining the closure threshold rather than blaming all misses on latency. It does not erase the earlier latency spikes.

Several complete contractions retain valid1100 finger flags throughout. Their minimum world gaps are0.451,0.433,0.388,0.366 and0.397, while the existing fixed threshold is0.30. Screen-gap minima include0.269,0.259 and0.227. Subsequent stronger contractions cross the fixed threshold and produce snips. A further contraction bottoms at0.344 and is also blocked. The strict absolute world-gap rule accounts for these misses; no evidence here requires relaxing finger-shape checks or training a model.

## Change

The close threshold is computed from half of the current opening peak, with a0.30 floor and0.50 cap. It also stays at least0.05 below the opening threshold. The peak remains available during gradual contraction. Clear contraction still fires immediately, while marginal contraction retains55ms confirmation. Holding the fingers together cannot repeat; another opening is required. Earlier stale, focus, visibility, invalid-pose, lost-hand, hand-switch and position-jump safeguards remain.

The read-only comparator now matches the immediately preceding instant-open/fixed-gap implementation. Its only differing option is `relativeCloseRatio:null`. Diagnostics include the effective close threshold and current/reference configuration. Camera resolution, MediaPipe confidence and model are unchanged. No paid API call occurred.

## Verification and limits

A natural-closure joint fixture reproduced the failure before the fix, with a valid pose and world gap between0.4 and0.5. It passes after the change; the fixed-gap comparator still rejects it. Added gradual-closure, held-close jitter and partial-closure checks.

`tests/fixtures/scissors-natural-gaps.json` contains only relative sample time, world gap, four finger flags and eligibility reason from the retained numeric record. The intent path replays these values with a fixed central aim because the original diagnostic did not record aim. It accepts13 closures versus7 with the fixed limit. This isolates the threshold change; it does not reproduce camera detection, aim movement or actual hair hits and cannot be labeled13 successful physical attempts.

At the first checkpoint, `npm test` passed61/61. Independent review found malformed numeric replay inputs could manufacture a snip, although production joint parsing and the recorded fixture were valid. Reproduced this finding before adding finite nonnegative gap and finite aim checks, which disarm on rejection. Independent review rechecked36/36 related tests and found no remaining Critical or Important issue. The final complete suite passes62/62. Vite build retains the existing large-chunk warning. Real acceptance still requires natural motion without forceful squeezing; the head visual quality remains unaccepted separately.

Final Vite build succeeded (1191.40kB/gzip377.79kB). Main browser tab3 refreshed into the changed scene and shows the updated natural-motion guidance. The local model is ready, but the browser has left the new camera request pending; video readyState0 and diagnostic control disabled. Do not claim the new live trial is armed or that capture has started. The learner can allow the browser camera prompt, then click “开始动作诊断” before natural-strength trial. No new video frame was captured for inspection.
