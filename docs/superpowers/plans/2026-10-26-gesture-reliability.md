# Gesture reliability repair implementation plan

> For agentic workers, use superpowers:executing-plans task by task. Keep this plan and its progress ledger current through compaction. The learner approved the order and explicitly deferred physical tests until complete mechanical verification.

Goal: deliver explainable, timely hand input and a gesture policy that passes natural closures and rigid-rotation negatives before another physical trial.

Architecture: separate a camera-frame pipeline from Three.js and UI. A bounded numeric recorder observes all gates and actual cut outcomes on shared trial boundaries. Rendering becomes demand-driven so idle3D does not compete with inference. Gesture policy is selected against controlled invariants after the diagnostic/performance stages pass.

Tech stack: existing vanilla JavaScript, Three.js0.172, local MediaPipe1.1.1 worker/WASM, Node test runner. No cloud API or new model dependency required for these stages.

Spec: devpost/spec.md and docs/reviews/2026-10-26-full-gesture-audit.md, plus learner approval in this chat.

## Constraints and rulings

- Preserve the learner's existing uncommitted Antigravity implementation. No blanket staging, commit, push or publication before actual review/acceptance.
- Work in the explicitly requested D:/HairFit-BuildWithAI-Basics-20261021 folder on codex/gesture-reliability-20261026. Ruling: use the current folder and a local branch because the working implementation and assets are uncommitted; a clean HEAD worktree would test the obsolete implementation. No stash, reset or transfer of user files.
- Keep the250ms stale rejection limit and all camera readiness/visibility/focus guards. Do not count stale hands as usable input.
- No webcam screenshots, video or complete user joint arrays persisted. Diagnostics whitelist derived numbers/flags only.
- No physical learner test between these tasks. This explicit user instruction overrides per-slice learner pauses in learn mode. Final human acceptance still remains distinct from automation.
- Diagnostic export is a snapshot, not a stop control. Stopping records a cause. Trial counters and geometry hits must use the same processed-frame window.

## Review focus

Capture-before-blur/delivery-after-focus cannot trigger; idle/inactive frames must not evict the last eligible hand transition. Every actual cut and every blocked frame must be attributable. A lost pointer release and viewport resize must not leave the hand pipeline stuck or aim at stale pixels. Inference readiness must not masquerade as a passing runtime budget. Pure rigid hand rotation must never produce a snip, while a real open-close cannot be solved by rejecting all input.

## Task1: trustworthy diagnostic and complete frame-to-cut pipeline

Files: src/lib/gesture-diagnostics.js, new src/lib/gesture-pipeline.js, src/lib/hand-tracker.js, src/components/haircut-scene.js, focused tests and a local full-path harness.

- [x] Add failing tests for separate stale/detected flags, exact gate reasons, bounded preservation of active transitions, all-frame latency aggregates, trial-local hit counts and immutable snapshots that keep recording.
- [x] Add monotonic bitmap/dispatch/delivery phase durations in HandTracker without retaining images or adding a queue.
- [x] Implement recorder schema3 with trial identity/start/end/stop cause, bounded recent and active-hand buffers, numeric-only whitelists, aggregate latency counts, gate counts and recognized/hit counts.
- [x] Extract GesturePipeline.process(frame, context). Context carries cameraReady/visible/focused/mouseCutting/dialogOpen/resumedAt and viewport. Both recognizers and the real cut callback pass through one tested gate. Store aim normalized and map to the current viewport only when cutting.
- [x] Integrate the pipeline and explicit inactive messages. Separate snapshot/export from stop. Clear pointer-cut state on blur/lostpointercapture, and invalidate pending input on resize.
- [x] Prove open/close actual callback, hits/misses, focus/stale/camera/modal gates, lost release and resize using the production pipeline. Full Node suite and independent review must pass before Task2.

## Task2: runtime budget and inference/render coexistence

Files: src/lib/studio-frame-loop.js, new runtime budget helper if needed, tracker/worker options, scene invalidation and benchmark harness.

- [x] Reproduce idle rendering contention; make the scene draw only when dirty, controls change or falling geometry is moving. Keep camera acquisition independent of rendering and do not fabricate falling animation.
- [x] Test render invalidation for textures, actual cuts, reset, resizing and orbit damping; preserve animated falling fragments until they settle.
- [x] Separate worker lifecycle from measured runtime health, using fresh/detected sample windows. Do not show usable readiness when the budget fails. Compare delegates using actual requested/returned values; never relabel GPU as CPU or extend freshness to hide delays.
- [x] Run counterbalanced real-worker static-hand benchmarks with positive detection validity checks, same3D scene and rendering settings; preserve raw numeric phase timings and actual draw rates. Initial acceptance target: at least95% of detected frames fresh, sustained10+ usable samples/s, capture-to-result p95 at most150ms in the target idle-aiming scene. This is a developer gate, not a claim of physical accuracy.
- [x] Verify real snip/falling workload also preserves fresh input; optimize or use measured scheduling/delegate alternatives if the target is not reached. Full suite and independent review before Task3.

## Task3: gesture geometry experiment and integration

Files: scissors-gesture.js, pipeline, fixtures, compound-rotation invariant and browser full-path harness.

- [x] Compare current projected-gap baseline, affine palm-coordinate gap, and rotation-invariant world gap under the same synthetic open/close and rigid-transform fixtures. Separate finger-pose confidence from the distance metric; no mid-gesture basis switching.
- [x] Add single-axis and compound3D rotation/translation/scale negatives, including nonplanar fingers, plus positive natural closure, held-close, palm/fist, tracking jumps and short pose disagreement. Keep ambiguous inputs disarmed instead of inventing a cut.
- [x] Record which candidate passes the invariant/positive matrix; implement the smallest passing policy. Preserve actual hit geometry and normalized cursor mapping.
- [x] Run actual local model on public positive/negative images, full production frame-to-geometry harness (with explicit synthetic input, not physical-accuracy labeling), performance under snips and complete Node/build/whitespace checks.
- [x] Obtain a fresh broad reviewer; resolve Critical/Important findings with failing-first checks. Only then prepare one learner physical test. Never mark physical or visual acceptance complete from these automated results.

## Progress ledger

- Approved order: learner message2026-10-26. No extra planning approval required.
- Task1 complete. Failing-first checks implemented; final87/87 Node tests and Vite build pass. Browser production-scene/synthetic-input/controlled-clock harness8/8 passes, saved docs/reviews/2026-10-26-stage1-integration-controlled.json. Reviewer diagnostic_pipeline_review found stale-detected frames could evict fresh active evidence; reproduced RED then fixed, reviewed30/30 clear. Later cutMs aggregation and numeric metadata sanitization passed final suite. No physical test requested; known compound rotation remains for Task3.
- Superseded checkpoint: Task2 performance acceptance awaited low external CPU/GPU load. Main tab11 navigated back to result, old3D retired. Every temporary benchmark scene is torn down and its tab closed after saving. Task3 remains pending, per approved order.
- Task2 in progress. Demand-render helper and invalidations implemented; idle0draws confirmed. Runtime health is separate from loaded status, with1000ms expiry and window restart after suspension; focused reviewer found the expiry gap, RED reproduced and fixed. Full suite at intermediate checkpoint94/94; newer scheduling/runtime focused11/11. Camera15fps drawing and GPU fence/alternating scheduler are still experimental pending final benchmark/review.
- Preserve failed experiments: falling-before,15fps,lowpixels,lod,cache,scheduled and video-idle-before JSON in docs/reviews. Pixel reduction and hair LOD were reverted after no sufficient benefit; static color+depth cache also reverted after failed budget and independent review found backdrop tone/AA regression. Complete8050-strand geometry and original direct rendering remain.
- New measurement control: actual production video+bitmap+worker path differs from the standalone canvas input. Factorial intervention capture=getImageData->bitmap and producer canvas willReadFrequently request, both together passed idle CPU/GPU24/24fresh (CPU14.72Hz,p9571.3ms;GPU11.94Hz,p95105.6ms). Either alone did not pass. This is a synthetic-source interaction, not proof of physical camera behavior or measured CPU canvas backend. Do not silently select a source configuration solely to claim a camera fix.
- SDK investigation by reviewer: detectForVideo includes WebGL image ingestion and _waitUntilIdle even for CPU delegate. Relabel UI as local processing; inferenceMs remains the legacy numeric key with diagnostic definition. Next compare full model CPU under controlled falling workload, readback candidate, and only if needed official lite landmark model (local ignored experimental bundle first). No training, paid API, webcam collection or freshness extension.
- Superseding Task2 checkpoint: system WMI snapshot after benchmarks showed CPU75%, League of Legends GPU3D80%, msedge8%. Evidence docs/reviews/2026-10-26-external-load.json. Earlier runs lack per-case system-load samples, so do not infer an exact cause for each run or certify a runtime budget. Learner asked asynchronously to report "已空闲" after game; never stop unrelated apps. Check actual external load before the next acceptance run.
- Restored minimal production Task2 scope after this confound. Keep demand rendering with30fps camera cap, controls/texture/hair/reset/resize/capture invalidations, static-caster shadow cache, physics/lifecycle observation before rendering gates, numeric render stats, measured health with expiry. Preserve original full model, SDK1.1.1, GPU-priority worker and original bitmap capture. No selected delegate/model/capture change from confounded runs. No serial/fence or alternate rendering path remains in src/tests.
- Unproven GPU serialization, lower quality/LOD, direct pixel/readback formats, old SDK0.10.21, locally metadata-adapted official lite weights, and depth/CPU projection were retired from production; local reproducible experiments remain under ignored test-assets. Projection parity itself passed5 browser checks, including a CSS-hidden regression, but was never performance-accepted. Do not promote it from that result.
- Latest code verification:96/96 Node tests, Vite build1203.71kB/gzip382.05kB, git diff --check pass (existing line-ending warnings). Minimal implementation re-reviewed by runtime_repair_review: no Critical/Important; earlier scheduler-config mismatch closed by removing the alternate scheduler. Browser scene invalidation regression running separately; no physical trial requested. Remaining acceptance: unloaded-system default runtime budget + real-clock full path, then Task3 geometry matrix/fix/review and final learner trial.

- TASK2 ACCEPTED after observed GPU load fell to7% (CPU39% pre; GPU8%/CPU29% post). No concurrent test processes during final benchmarks. Original default AUTO/current/full/default capture idle64/64fresh,14.999Hz,p9528ms,0GLdraws. Two falling runs128/128fresh,14.85/14.76Hz,p9534.6/48.7ms,32/32positive realcuts,GL~30fps. CPU/GPU/GPU/CPU32each allfresh;CPU10.74/12.66Hz,p95103.7/94.2ms;GPU15.08/15.34Hz,p9528.3/28.4ms. Keep originalGPUpriority. Numeric artifacts stage2-default-idle-retest,default-falling-retest,delegates-retest andload-before/after-retest.
- Task2 logical checks: scene invalidation8/8; controlled andREALCLOCK production pipeline-to-geometry8/8each. All96 Node tests andbuild pass. runtime_repair_review independently recomputedraw p95/fresh/Hz and clearedTask2 withoutCritical/Important. No physicalaccuracyclaim. Earliergame-load-confounded experiments remain historical only.
- CURRENT: Task3 starting candidate metric/pose experiment; no usercamera trial yet. Do not wait for the old asynchronous game-idle question: its informational condition was objectively met and already used for successful authorized retests. No model/SDK/capture/renderexperiment was promoted.

- Superseding checkpoint2026-10-26 20:34 Asia/Shanghai: Task3 implementation and synthetic tests are now present. Fresh110/110 fullNode tests, build1206.52kB/gzip382.89kB, diff check exit0. See docs/reviews/2026-10-26-stage3-checkpoint.md for chosen depth metric, synthetic matrix and exact remaining gates. Task3 checkboxes remain open until independent review/current browser/model/performance verification finishes. User requested continuation in a NEW chat using the same D: folder. Physical trial is still deferred. Old chat stops editing after handoff; no simultaneous writers.

- Task3 developer gate complete2026-10-26 in fresh chat. Actual model4/4; production scene synthetic integration13/13 controlled and13/13 real clock; Node113/113; build1206.93kB/gzip383.01kB; whitespace checks pass. Default original AUTO/full/bitmap falling64/64fresh14.868Hz,p9542.7ms,16/16actualcuts. Load snapshots58%CPU/11%GPU before and98%CPU/29%GPU after prevent an unloaded-system claim; measured budget passes. Current evidence docs/reviews/2026-10-26-stage3-status.md.
- Final: fixed Important camera-only near-perspective rigid yaw false snip; modest fixed V regression RED(frame4 false snip) to GREEN, then varying-axis near-threshold300-sequence matrix and mild-wrist natural positive; suite113/113. Fresh reviewer task3_review, no Critical/Minor. No second reviewer required.
- Final: Ruling: camera-coordinate fallback requires the opening palm basis to remain stable (normalized basis displacement at most.15); world metric unchanged. Large wrist movements can cancel intended fallback cuts and require reopening. Chosen over demonstrated rigid-motion false cut; physical sensitivity cost still pending.
- Final: Ruling: retain original D: working folder/branch and uncommitted work, no integration/commit/push. Physical trial remains pending; main app tab9 latest3D cameraOFF. User asked about alternative actions; pinch proposed as comparison only, no production replacement. Head/hair and competition deliverables remain unaccepted.
