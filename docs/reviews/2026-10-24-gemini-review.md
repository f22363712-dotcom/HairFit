# HairFit review with Gemini · 2026-10-24

Three browser conversation rounds at https://gemini.google.com/app/b50a95e62683cba6 . No credentials, personal photographs or account data were sent. This is AI critique, not an expert or end-user validation study. Gemini UI label was Argon; token usage and provider latency are not exposed by the page.

## Evidence inspected before recommendations

- `handoff-to-codex.md` describes fixed topology, motion-centroid input and Canvas-derived views despite stronger reconstruction claims.
- `src/state/session-store.js` contained `buildMultiViewCandidates`, producing transformed crops without new viewpoints.
- `src/components/upload-panel.js` manufactured sample side/back images from one frontal portrait.
- `src/components/haircut-scene.js` started automatic cutting before camera permission, and motion directly triggered cutting.
- `logs/model-usage.jsonl` contained two successful runs, 129416ms and 210340ms, while UI promised 15–40 seconds. Image counts 2/1 were recorded in token fields.
- Baseline HEAD requests to `/.env`, `/.git/config`, `/logs/model-usage.jsonl`, `/devpost/learner-profile.md` returned 200. Only status codes were inspected, never secret bodies.
- Official judging source https://learn-ai-basics.devpost.com/rules explicitly equally weights Design, Potential Impact, Innovation/Idea and Presentation. Homepage omits Potential Impact from its displayed criteria list. Use rules as authority.

## Discussion and disagreement

Round 1 identified a 2D-to-3D experience discontinuity, unreliable movement-based input and no portable result for a stylist. These match the code. It also suggested cm/mm instructions, IoU >0.75, guaranteed inexpensive MediaPipe integration and mandatory online accessibility. Those claims had no supporting evidence.

Round 2 supplied actual zone-count semantics, camera activation code behavior, timing and usage records. Gemini withdrew the physical-length / IoU claims and deployment requirement. Its useful challenge was that merely renaming motion input does not stop accidental cutting; a deliberate input gate is needed. It also recommended completing the portable consultation card in the first repair batch.

Round 3 separated three kinds of progress. Correct behavior and truthful labels are engineering progress. Actual finger-scissors input is still missing. User and stylist usefulness remains untested. Numerical time boxes and FPS targets suggested by Gemini are experiment proposals, not competition rules or measured facts.

## Implemented within existing PRD

- Single AI result with small input references; old fabricated candidates and synthetic side/back samples removed.
- Photo appearance on a preset model described accurately; no personalized geometry claim.
- Camera waiting/error/late-close states cannot cut. Ready motion control requires holding an explicit button; automatic demo requires a separate labeled action.
- Saveable consultation card separates AI target from virtual trim image and relative zone changes; no physical-length conversion.
- Waiting indicator has elapsed time, no fabricated duration. Full fashion montage remains unfinished.
- Private-file static routing blocked, service bound to loopback.
- Correct usage units; network and invalid-result failures recorded with unknown fields as appropriate. No paid generation in this session.

## What would falsify the product assumptions

| Task | Record | Counterevidence |
| --- | --- | --- |
| A user tries their own target hairstyle, then compares generated result with their original | Actual latency, whether it still looks like them, facial/lighting drift, stylist comments about hair texture and density | The model changes identity, or a stylist explains that the appealing result depends on unavailable hair volume or a different treatment |
| A user trims a specific area, saves the card and silently hands it to someone experienced with haircuts | Intended area/change before the test, recipient interpretation after seeing the card, confusion between virtual percentage and actual length | The recipient ignores the 3D information or consistently misreads the requested change |
| On the target device, compare mouse with a real finger-landmark experiment | Open-to-close event, missed cuts, accidental cuts during head movement/open palm/hand exit, wrong zones, actual render and inference timings | The user cannot reliably clip one intended clump, or gesture tracking degrades control below the mouse baseline |

## Next order

1. Learner hands-on check of the repaired baseline and saved card. Keep final review unchecked.
2. A separate true finger-scissors experiment. Preserve the original user goal; do not describe button-gated motion as finger recognition. Test aiming separately from the open-to-close trigger. A stable mouse aim plus real finger closure is an option if freehand aiming fails, subject to learner acceptance.
3. Obtain real user/stylist observations, then refine the 2D/3D relationship according to that evidence.
4. Finish original hairstyle montage, clarify sample rights, prepare license/README, public repo, English materials and a 1–3 minute video. No submission or publication has been performed.

## Verification record

Node regression suite covers private-file access, camera lifecycle, saved result provenance, legacy candidate removal, usage units/network failures and uncalibrated consultation output. Browser exercised sample → single result → mouse cut → card, pending camera authorization with zero cuts, close and reset. Actual webcam recognition, mobile performance, live generation with the revised code and human understanding remain unverified.

## Independent code review

A read-only reviewer checked the repair implementation, without credentials, photos or paid calls. It found one Important defect: an abandoned sample/direct-demo loader could resume after screen teardown, overwrite personal inputs and reset the live request's loading guard. Two regression cases reproduced the failure before disposed guards were added; both now pass. No other Critical or Important findings were reported in the inspected code. This was a code review, not a browser, provider or human-utility validation. The reviewer did not re-review the subsequent fix; regression evidence verifies it.

The full suite is now 10 tests. Browser card export also hides transient falling hair during its snapshot so the saved model remains legible.
