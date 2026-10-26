---
doc: checklist
status: approved
mode: learn
---

# HairFit Build Checklist

## Slices

- [x] **1. 可运行的上传与真实生成骨架**
  - Becomes usable: 本地打开 HairFit，上传个人照片和理想发型，点击生成后看到真实请求的结果或明确失败状态。
  - Why now: 先验证阿里云两图接口和整条网页路径，最早暴露外部 API 的风险。
  - PRD ref: `prd.md > 首页`; `prd.md > 生成中`; `prd.md > 结果页`
  - Spec ref: `spec.md > UploadPanel`; `spec.md > ImageGenerationProxy`; `spec.md > External Services and Dependencies`
  - Build: 建立 Vite、Node 本地代理、上传状态、生成等待状态、结果页占位和用量日志；用真实 API 做一次小请求验证响应形状。
  - Verify (mechanical): `npm install`; `npm run build`; 启动本地服务并用脚本检查 `/api/health`；用配置好的 API key 发起一次生成请求，确认响应被解析且日志不含密钥。
  - Learner check: 打开本地地址，上传两张图并点击生成，确认等待动画出现，成功时看到结果大图，失败时两张图仍保留。
  - Commit: `slice 1: establish upload and image generation flow`

- [x] **2. 可用的结果页与恢复动作**
  - Becomes usable: 生成结果页可以进入 3D、重新生成或更换图片。
  - Why now: 先让真实生成结果形成完整产品路径，再把交互核心接上。
  - PRD ref: `prd.md > 结果页`; `prd.md > 页面与状态`
  - Spec ref: `spec.md > ResultView`; `spec.md > Session Store`; `spec.md > Important Failure Modes`
  - Build: 完成单张大图布局、三个动作、错误状态、旧结果清理和短期刷新恢复。
  - Verify (mechanical): `npm run build`; 手动覆盖成功、失败、重新生成、更换图片四种状态；确认重复点击不会并发发起重复请求。
  - Learner check: 从结果页分别试一次进入 3D、重新生成和更换图片，确认每条路径都到达预期页面。
  - Commit: `slice 2: complete preview result states`

- [x] **3. 直接可剪的 3D 发型模型**
  - Becomes usable: 用户进入 3D 页面后，拖动鼠标可以剪短发束并看到头发掉落。
  - Why now: 这是 HairFit 的独特交互，需要在完整图片路径之后尽早验证。
  - PRD ref: `prd.md > 3D 剪发页`; `prd.md > 验收场景`
  - Spec ref: `spec.md > HaircutScene`; `spec.md > What Was Simplified and Why`
  - Build: 添加 Three.js 场景、头部、独立发束、命中检测、拖动剪发、掉发粒子或小发束、状态文字和 Reset。
  - Verify (mechanical): `npm run build`; 检查页面加载无控制台错误；拖动每个主要发区至少一次，确认发束长度下降、掉发对象生成、Reset 恢复初始值。
  - Learner check: 从结果页进入 3D，第一次拖动就剪下一段头发，观察掉落，再点击重新开始。
  - Commit: `slice 3: add interactive haircut scene`

- [x] **4. 视觉整合与演示路径**
  - Becomes usable: 首页、等待、结果、3D 四个状态共享统一的时尚科技视觉，评委能顺畅看完核心路径。
  - Why now: 交互成立后再集中处理视觉层，避免用视觉工作掩盖功能风险。
  - PRD ref: `prd.md > 页面与状态`; `prd.md > 成功标准`
  - Spec ref: `spec.md > Look and Feel`; `spec.md > App Shell and Screen Router`
  - Build: 完成暖瓷白、墨色、铜色和深色 3D 台面；补齐等待蒙太奇、响应式布局、文案和演示用的本地原创或授权素材。
  - Verify (mechanical): `npm run build`; `git diff --check`; 检查所有页面状态可达，图片缺失、API 失败和 3D 加载失败均有可见回退。
  - Learner check: 按演示顺序从首页走到掉发，再自由试一次失败输入和重置。
  - Commit: `slice 4: polish the complete HairFit demo`

## Hands-on Checkpoints

- [x] Slice 1 后：学习者体验真实两图生成，反馈等待状态和结果页信息是否清楚。
- [ ] Slice 4 后：学习者完成最终自由试用，记录破损、困惑和最重要的修改。

## Final Review

- [ ] 学习者完成完整核心路径并确认可作为比赛原型演示。
- [ ] 反馈后的必要修改已实现、验证并提交。

## Code Tour and App Map

- [x] 完成一次从上传动作到本地代理再到结果显示的代码走读。
- [x] 生成 `devpost/app-map.html`，标出页面、数据和关键文件。

## Revisions

- 2026-10-24 Codex return review. Earlier Slice 4 was checked, but the promised 4–6-image fashion montage is absent and learner final review remains unchecked. Do not equate implementation boxes with submission readiness.
- Repair batch preserves the approved single-result / preset-3D boundary. Removed fabricated viewpoint candidates and sample angles; added explicit sample provenance, permission-safe camera lifecycle, armed motion input, virtual consultation-card export, honest wait timer, private-file routing and corrected usage units.
- Mechanical verification and browser repair walkthrough recorded in `docs/reviews/2026-10-24-gemini-review.md`. Actual finger-scissors, target-device FPS, new live generation and user/stylist value remain unverified. Await the learner's hands-on report before closing final review or advancing to 6-ship.

- 2026-10-24 learner authorized real finger-scissors implementation. Local hand-model runtime, pure temporal gesture rules and discrete 3D event bridge implemented. Physical webcam opening/closing and target-device usability remain unchecked, pending learner feedback. See docs/reviews/2026-10-24-finger-scissors.md.

- 2026-10-25 learner confirmed some real closures cut, but sensitivity and visible change were inadequate. Revised closure sampling, visible-tip hit testing and discrete trim depth; added recognized/hit counters. Controlled same-operation browser comparison shows persistent shape changes. Live usability remains open. See docs/reviews/2026-10-25-gesture-feedback.md.

- 2026-10-25 second learner correction. Replaced sphere/photo projection with a CC0 anatomical template, native skin/eye materials and matching hair collision; GPU-first inference observed37ms locally. Temporal replay reproduced missed normal-speed cycles;60ms open/180ms cooldown passes15fps and3Hz regressions. Visual review7.1/10 remains below release bar, and actual fast-camera acceptance stays unchecked. See docs/reviews/2026-10-25-anatomy-and-gpu.md.
