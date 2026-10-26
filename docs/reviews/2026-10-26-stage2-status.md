# Task2 accepted after load-controlled retest

Task2 passed its developer gate. The independent reviewer recomputed raw timing/freshness/rate data and cleared Task3. The learner has not been asked for another camera trial. These automated checks do not establish physical hand accuracy.

## Current production changes

- The studio stops drawing when unchanged. Controls, asynchronous textures/appearance, hair changes, reset, resize and capture invalidate it. Camera drawing retains its original30fps cap; acquisition and physics/lifecycle updates run before the draw gate. Real detached geometry continues falling and settles.
- Only the static head and collar cast shadows, so their unchanged shadow map is reused. Full hair geometry, original direct rendering, antialiasing and materials remain.
- A bounded HandRuntime measures detected/fresh frames, actual delivery rate and p95. Loaded is separate from healthy; missing timing stays unknown. After1000ms without new delivery, evidence expires; recovery clears the old window. The250ms stale-input rejection remains.
- The SDK duration is labeled local processing, with a diagnostic definition including image ingestion and graph synchronization.

## Verification

The latest full Node run passed96/96. Vite build passed with main1203.71kB/gzip382.05kB and the pre-existing chunk-size warning. `git diff --check` passed with existing line-ending notices. Independent review of this minimal scope found no Critical or Important code issue. The earlier production/benchmark alternate-scheduler mismatch was closed by removing that scheduler.

Task1's production frame-to-geometry controlled-clock integration remains separately evidenced by `2026-10-26-stage1-integration-controlled.json`. It is not camera accuracy or throughput evidence. The known compound-rotation gesture defect remains pending Task3.

## Why performance acceptance is pending

After multiple variable performance runs, a WMI snapshot found75% total CPU and80% GPU3D utilization by League of Legends, plus8% by msedge. See `2026-10-26-external-load.json`. Per-case system load was not recorded earlier; the snapshot does not prove the exact source of every earlier delay. Those runs cannot certify an uncontended runtime budget.

The agent should have checked whole-machine load before iterating performance changes. The learner was asked asynchronously to report when the game has ended and the computer is idle. Do not stop unrelated apps or infer that elapsed time is permission to do so.

## Retired experiments

Early canvas-only input, live canvas streams and later encoded video runs used different producer paths. Later harnesses corrected per-frame JSON DOM overhead by buffering reports after a case in a fixed-height area. Requested delegates were checked against actual worker readiness. These controls remain useful, but do not remove the external-load confound.

Lower draw resolution, hair LOD, GPU serialization, CPU pixel/readback variants, an older official SDK and an adapted lite landmark bundle provided no accepted stable advantage. None changed the shipped model, SDK or capture implementation. A depth-based CPU projection experiment passed color/occlusion/orbit/resize parity checks, including a CSS-hidden regression, but failed to establish a performance budget. Its modules/tests were moved into ignored `test-assets`; no alternate render path remains in production.

The numeric review artifacts are retained as experiment records. They are not success-rate claims, physical camera trials or release gates.

## Resume

1. Confirm low external CPU/GPU load, then run the actual default current worker/capture with no concurrent test process. Save system-load context and raw phase data; do not cherry-pick an alternate schedule or input format.
2. Check the fixed-video idle-aiming target of95%+ detected frames fresh,10+ usable samples/s and p95 at most150ms. Verify real falling workload preserves fresh input, and the real-clock full-path harness passes.
3. Only after Task2 review clears, compare gesture geometry candidates against rigid compound rotations and natural positives, then implement/review Task3. Prepare one learner trial after all mechanical checks pass.

No paid model API, webcam capture persistence, commit, push or publication occurred in this repair.

## Superseding accepted retest

External GPU demand fell objectively before retesting. Pre-context was GPU7%/CPU39%, post-context GPU8%/CPU29%, saved in stage2-load-before-retest and stage2-load-after-retest. No concurrent Node tests or load queries ran during benchmarks. The previous asynchronous question requested resource information, not new permission; existing authorization covered the retests once the condition was observed.

- `2026-10-26-stage2-default-idle-retest.json`: actual AUTO/current SDK/full model/default bitmap path, returnedGPU.64/64 detected frames fresh,14.999 usableHz,p9528ms,0drawHz.
- `2026-10-26-stage2-default-falling-retest.json`: same default path, two64-frame runs allfresh.14.852/14.763Hz,p9534.6/48.7ms,32 actual cuts with falling geometry,GL30.17/29.99Hz.
- `2026-10-26-stage2-delegates-retest.json`: explicitCPU/GPU/GPU/CPU32frames each, requested matched returned delegate, allfresh. CPU10.74/12.66Hz,p95103.7/94.2;GPU15.08/15.34Hz,p9528.3/28.4. Retain GPU priority and CPU fallback.
- `2026-10-26-stage2-invalidation.json`:8/8 actualscene checks. `stage2-pipeline-controlled.json` and `stage2-pipeline-realclock.json`:8/8 each; four recognized cuts equal four hits, trial stops recorded.

The minimal production implementation passed96/96 Node tests and build. Independent review found no remaining Critical/Important and cleared Task2. Proceed to gesture geometry and natural-closure work, keeping physical acceptance distinct. The earlier Resume list is historical and steps1-2 are now complete.
