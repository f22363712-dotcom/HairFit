# HairFit 手势全盘审查

## 阅读摘要

当前手势功能仍未通过真人验收。本轮检查了摄像头取帧到实际落发的整条路径，并请独立审查者复核。已有69项测试通过，新补的复合转手检查失败；现有测试范围不足以证明交互可靠。

| 问题 | 本轮证据与影响 |
| --- | --- |
| 检出手后被程序丢弃 | 贴近产品渲染配置的静态对照中，GPU检出12/12帧，全部超过250毫秒而被丢弃，中位耗时377.5毫秒。CPU仅5/12帧及时返回，也未达到可用要求。 |
| 不合拢也能误剪 | 保持V形不变，仅复合转动手腕，就能触发一次剪发。检查脚本已保存，运行会明确失败。 |
| 诊断与实际操作未对齐 | 页面累计6次剪发，保存报告为0次；报告含617帧过期和668帧笼统的非活动状态，保留的手部样本全部未进入动作判定。不能据此计算成功率。 |
| 姿态冲突会丢掉整次动作 | 一帧小指投影判定不符就清空张开历史；2D与3D对手型的判断可能不同，目前缺少明确处理策略。 |
| 拖动与窗口变化可能干扰剪发 | 鼠标抬起事件丢失后，剪发状态可能一直挡住手势；窗口缩放后，合拢可能沿用旧的像素坐标。 |
| 骨架准确率尚无真值 | 没有保存或查看摄像头画面，纯数值记录无法证明骨架是否正确贴合手指。4张静态样图也未覆盖自然开合动作。 |

建议先修诊断记录与运行预算，并用完整识别路径复现失焦、窗口变化和转腕等反例。之后再比较空间判定方案或个人校准，选定方案后才安排一次自然动作验收。本轮只补审查报告和隔离测试工具，产品判定未继续改动；云模型请求为0。

下面保留给后续开发者的完整技术证据。

## Technical evidence

Date2026-10-26, Asia/Shanghai. Scope covers camera acquisition, worker inference, scheduling, landmark interpretation, gesture state, cursor/cut mapping, diagnostic evidence and test coverage. Physical acceptance remains failed. This audit changes no product code; it adds isolated reproduction/benchmark tools and preserves evidence. Existing project changes remain untouched.

## Main conclusion

The current failures span several layers. Inference may detect a hand but deliver it after the application's freshness budget, at which point the hand is erased and gesture intent is reset. Screen-space geometry can mistake rigid wrist rotation for a closure. The diagnostic workflow also loses or mixes the evidence needed to distinguish those failures from actual hand-landmark errors. Continuing to adjust opening/closing thresholds is not an adequate next step.

The present records do not establish that the pretrained model requires training, nor do they establish accurate21-joint tracking on the learner's camera. No webcam images or complete joint arrays were saved or inspected. A numeric record can expose control-flow problems, but cannot prove that a skeleton is correctly placed on a real hand.

## Evidence inventory

1. Frozen local report `test-assets/gesture-full-audit-20261026.json`, copied from the visible report before changing the page.1729 frames over roughly25 minutes, zero recorded snips. UI cumulative counters separately showed6 recognized motions/6 hits and591 removed hair segments. These are different windows; the report cannot validate those six motions.
2. Current source in `src/lib/hand-tracker.js`, `src/workers/hand-tracker.worker.js`, `src/lib/scissors-gesture.js`, `src/lib/gesture-diagnostics.js`, `src/lib/studio-frame-loop.js`, `src/components/haircut-scene.js` and webcam CSS.
3. Fresh independent `npm test`, exit0,69/69. Existing tests are not a physical acceptance signal.
4. New ignored invariant check `node test-assets/audit-compound-rotation.mjs`, exit1. It reproduces a cut without finger closure using only synthetic fixture geometry.
5. Explicit-delegate real-worker benchmark `test-assets/gesture-audit-benchmark.html` with public static imagery and real3D scene. It never requests the camera. Initial results are saved in `docs/reviews/2026-10-26-benchmark-initial.json`. Further rendering-profile controls are recorded below, with invalid controls labeled explicitly.
6. A fresh independent reviewer audited the full current filesystem, reproduced the rotation defect, recalculated the report and confirmed the gaps below. No browser or camera use by that reviewer.

## Findings by impact

### P1: A ready worker can continuously produce unusable hand results

`src/workers/hand-tracker.worker.js:13` chooses GPU first. CPU fallback only occurs when initialization or blank-image warmup throws. There is no sustained runtime latency budget or delegate comparison. `src/lib/hand-tracker.js:25` replaces a result's hand with null when total latency exceeds250ms. `src/components/haircut-scene.js:1385` resets the gesture for every stale result.

A valid sequence delivered at300ms therefore loses every opening and closure while the model remains labeled ready. The real report has617 stale frames, so this discard path actually occurred. Their detected-hand status was not preserved in the report; it cannot show how many of those617 frames contained a hand.

The first explicit benchmark used the same320x320 official V image and12 measured frames after four warmups per cell. All four cells detected12/12 hands. GPU without3D had total-latency median248.8ms and6/12 timely results; with the default real3D stress scene median486.8ms and0/12 timely results. CPU medians were257.5ms without3D and265.6ms with3D, with3/12 timely in each. This supports a runtime/performance problem, not a blanket claim that CPU fixes it. The stress scene uses default no-camera rendering and is heavier than the actual camera profile; it is not a camera-mode throughput measurement.

Required next experiment is a measured runtime selection/budget under the actual rendering profile, with independent detection count and useful-result count. Raising the stale limit alone admits delayed actions and does not restore missing intermediate states.

### P1: The saved trial cannot attribute or align the reported failure

`src/components/haircut-scene.js:1383` merges camera-not-ready, hidden/blurred page, mouse cutting, modal dialog and pre-focus timestamps into one inactive reason before processing staleness. Inactive hands do not enter either recognizer. The UI does not consistently explain which gate blocked recognition.

The saved report totals617 stale,668 inactive/unfocused,443 no-hand and one pose rejection. All74 retained hand-pose records are inactive; none reached the temporal recognizer. Three have world1100/screen1111 disagreement, but their intended pose and eligibility are not established. It would be incorrect to label them three missed physical scissors actions.

`src/lib/gesture-diagnostics.js:21` omits detectedHand and stale flags. Compression retains the first latency in a run, so a compressed row is not a full timing distribution. The240-row rolling tail can evict the active transitions and retain later inactive observations. The stop/start button and lifetime scene counters do not define a shared trial boundary. As a result, the apparent six-hit scene and zero-snip report cannot be combined into a success rate.

Required changes are precise independent gate flags, capture/dispatch/inference/delivery timings, a detected-hand boolean on stale results, and per-trial recognized/hit counters. Preserve recent eligible transitions independently of later idle chat activity. Exporting a report should not silently end the recording window for subsequent motions.

### P2: A rigid wrist rotation still creates a false scissors action

`src/lib/scissors-gesture.js:24` rejects near-profile palms through projected palm width/length. Compound rotations can keep that ratio above0.30 while shrinking the projected finger gap.

The isolated check applies Z rotation70 through15 degrees in5-degree steps, then fixed X=-50 and Y=85, to an unchanged open V. Both landmark arrays rotate rigidly,67ms per frame. World gap remains1.2442401678. Screen gap decreases1.120533 to0.410873. All poses stay valid; the final frame emits fast-close. No finger moved relative to the hand. The ordinary test suite only checks a simpler single-axis rotation.

This is a confirmed false-positive defect, separate from the learner's missed actions. A remedy must satisfy this invariant, real natural-closure examples, full-palm/fist negatives and hand-loss/focus protections together. Adding one more projected-ratio threshold would require the same review again.

### P2: Pose disagreement can erase an otherwise complete closure

The selected screen predicate requires a folded projected little finger, and invalid pose immediately resets all opening history. A sequence of valid open, one world1100/screen1111 closed observation, then valid closed observations produces no cut. Existing tests cover screen-positive/world-negative input, but not the reverse case.

The report contains that disagreement while inactive; its presence is evidence to investigate, not proof of intended scissors. The design needs an explicit policy for short pose disagreement and confidence abstention. Simply accepting more poses may cause palm false positives, while using only one projection can reject naturally curled fingers.

### P2: Interaction lifecycle can block or misplace hand cuts

`src/components/haircut-scene.js:1456` resets gesture intent on blur but leaves mouse cutting active. There is no lostpointercapture handler. If an ordinary drag loses its release event, canUseHand continues to reject frames due to cutting. This source-level failure path needs a browser lifecycle reproduction; this audit does not claim it happened in the current trial.

`src/components/haircut-scene.js:1599` resizes the canvas without invalidating or converting the pixel coordinate saved when the fingers opened. Closing after resize can use the old aim coordinate or fail the bounds check. Store normalized aim or explicitly cancel the pending cut on resize.

### P2: Acceptance tests miss the combined path

Four static official examples test that a model can find certain shapes. They do not test opening-to-closing motion, user-specific framing, pose dropout, main-thread/GPU contention, focus changes or cutting the intended hair. The frame-loop test replaces the tracking callback and therefore cannot cover the production guards or asynchronous hand delivery.

The old `test-assets/hand-perf.html` is no longer a valid CPU/GPU comparison: its CPU-labeled arm invokes the production worker without a delegate override, which now defaults to GPU; the other arm uses a duplicated historical GPU worker. The audit harness explicitly requests and verifies the reported delegate. Older saved benchmark numbers must not be presented as freshly reproduced current-code evidence.

## Checked without a finding

Acquisition has one-frame backpressure and epoch-based cleanup. Sampling occurs before draw throttling in the RAF loop. Current CSS overrides object-fit cover with fill, so the video and skeleton canvas stretch together; both apply consistent horizontal mirroring. No current crop mismatch was found. Diagnostics do not retain pixels or full joint arrays. No cloud model API request or model-training job was run for this audit.

## Recommended sequence before another learner trial

First make the diagnostic window and gate attribution trustworthy, and add deterministic full-path tests for stale delivery, blur/drag loss, resize and rigid rotation. Then establish a usable latency budget with real scene rendering and select or degrade execution based on measured performance. Only after those pass, choose the geometry/temporal policy using recorded controlled positive and negative cases. A stable world/palm orientation reference or explicit personal calibration are candidates to compare; neither is claimed as the validated remedy here.

One final aligned learner trial should assess visible skeleton correctness separately from recognized intent and actual hair hits. No further trial is requested during this review. The current failure remains open.

## Benchmark control notes

An intermediate320x240 letterboxed-input run returned no hands in all six cells. Those numbers measure an empty detector path and are rejected as hand-landmark timing evidence. Raw output is retained in `docs/reviews/2026-10-26-benchmark-profiles.json`; do not report its timely-result counts as recognized hands. A center-cropped input with a minimum hand-detection check is used in the final follow-up control. Rendering uses an isolated adapter in `test-assets/three-audit-wrapper.js`, leaving production imports unchanged. Results will be appended with their limitations.

### Final valid-input control

`docs/reviews/2026-10-26-benchmark-crop.json` records the completed six-cell run. Each cell uses the same center-cropped320x240 static V input, four warmups and12 measured frames. Actual CPU/GPU delegate is asserted; all cells detected12/12 hands. The page was visible and focused throughout each cell. The camera rendering profile enforces pixel ratio1 and a30fps upper bound through an isolated renderer subclass; its actual measured draw frequency was10.5fps, below the cap.

| Render profile | GPU total median | GPU timely results | CPU total median | CPU timely results |
| --- | ---: | ---: | ---: | ---: |
| No3D |239.5ms|7/12|234.1ms|6/12|
| Default3D stress |319.5ms|0/12|294.6ms|2/12|
| Camera-like1x /30fps cap |377.5ms|0/12|272.2ms|5/12|

Timely means returned within the unchanged250ms freshness limit, not a recognized physical motion or a correctly placed skeleton. All12 hands were detected in the last GPU cell yet zero were eligible for gesture processing. Switching to CPU alone also fails to establish usable throughput. Cells run sequentially on one current machine with12 samples; varying system load and initialization/transient effects limit causal or long-run comparisons. Do not claim that a lower pixel ratio intrinsically makes performance worse from this table.

The separate local capability probe is saved in `docs/reviews/2026-10-26-graphics-device.json`. The browser reports WebGL2 and ANGLE AMD Radeon(TM) Graphics via Direct3D11,16 logical processors and16GB deviceMemory. It does not report SwiftShader. This audit has not established driver misconfiguration or a benefit from changing browser hardware settings.

The benchmark did not request the camera or a cloud model. Current live camera was closed only after preserving the report; the existing main scene and its six-hit counters were retained. Temporary benchmark/device tabs were closed. Product code and recognition thresholds remain unchanged in this review. The compound-rotation check intentionally fails and the ordinary69-test suite still passes; both results must accompany any progress claim.
