# Ponytail full 稳定性独立审查

审查日期为 2026-10-27。对象为当前工作树，包含既有未提交修改。HEAD 仍是旧 slice，未将 HEAD 当作完整变更基线。报告只写入本文件，未修改源码，未 commit 或 push。

## 决定清单

[决定] 优先修复用量写盘失败覆盖生成结果的问题
  └ 后果: 避免模型已完成生成，用户却只收到本地文件错误并再次付费生成
  └ 另一种做法: 保持现状，接受磁盘异常导致已生成图片无法交付
  └ 证据: server/image-generation.js:80 与隔离实验输出 clientOutcome=rejected、errorCode=EEXIST
  └ 需要你做什么: 无需回复，主 Agent 已开始修复，待独立复核

## 项目与审查范围

HairFit 将本人照片和发型图发给图像服务，展示换发预览，再提供预设 3D 试剪与沟通卡。负载按本机单人使用、可能连续点击或开两个本地页面判断，不套用公共多租户服务标准。

具体材料包括 README.md:5 的启动约定、server/index.js:49 的代理入口、server/image-generation.js:23 的生成及记账路径、src/state/session-store.js:139 的调用方，以及 src/components/upload-panel.js:237 的自拍生命周期。3D 与导出另核对 src/components/haircut-scene.js:1803、src/lib/consultation-card.js:11；异常行为使用隔离临时目录和全 mock 输入证明。

已顺序检查 UploadPanel → SessionStore.triggerGenerate → Node 代理 → generatePreview → usage → ResultView → 3D/card。补查了 HandTracker 的工作线程背压、CameraSession 的迟到流释放，以及 3D 的纹理版本保护和 teardown。完整测试在主 Agent 修日志前运行，结果为 154 项通过、0 项失败。

## 必修

### 1. P1 用量日志失败覆盖成功图片和原始接口错误

审查时点尚未修复，主 Agent 已着手修复。

- 位置为 server/image-generation.js:18、server/image-generation.js:80、server/index.js:68。
- 本地日志在 finally 中直接 await。磁盘满、无写权限，或 logs 路径被普通文件占据，均会使日志异常覆盖已取得的图片；上游原始 HTTP 错误也会被覆盖。代理最终返回 500，前端回到上传页，用户可能再次点击生成。
- 最小证明只在临时目录建立普通文件 logs，fetch 全 mock 返回 HTTP 200、可用 data:image 与 usage。实际输出为 `{ "mockedProviderCalls": 1, "providerStatus": 200, "acceptedImageFixture": true, "clientOutcome": "rejected", "errorCode": "EEXIST" }`。没有网络调用。
- 最小完整修复为隔离日志异常，保留成功图片或原始上游错误，并将记账失败和实际 usage 明确返回。界面提示本地记录未写入，禁止静默丢记录或自动重试模型。需覆盖成功和上游失败两个用例。
- 若跳过，已完成的模型生成可能无法交付，账本也缺少记录。

## 可延后

### 2. P2 自拍权限等待时重复点击会遗失第一个摄像头流

- 位置为 src/components/upload-panel.js:229、src/components/upload-panel.js:237。
- 权限尚未返回时重复点击自拍按钮会启动两次 getUserMedia。两个请求先后成功后，后者覆盖 activeStream，关闭弹窗或离开页面只停止最后一个流。
- 最小证明将 getUserMedia 换成两个可控 Promise，按顺序返回两个 mock stream，再执行 teardown。实际输出为 `{ "mockedCameraRequests": 2, "firstStreamStops": 0, "secondStreamStops": 1 }`。没有申请真实摄像头权限。
- 最小完整修复为 pending 标志防重入，结束时恢复按钮；页面已销毁或请求已过期时，直接停止刚返回的 stream。已有 CameraSession 的版本检查可作为本项目参考，src/lib/camera-session.js:12。
- 若跳过，快速重复操作后仍可能有摄像头流存活。此项不阻挡当前图像接口修复，可独立处理。

## 已修并复核

### 3. P2 可选侧背照片使合法上传超过代理限制

客户端原先将四张照片全部 JSON 编码提交。单张允许 10MiB，四张经过 base64 可超过 53MiB；代理 readBody 上限为 35,000,000 字节。图像服务实际只读取正面与发型，侧背照片造成无效传输和生成失败。

主 Agent 已将 src/state/session-store.js:154 的请求限制为两张实际使用的图片，侧背照片保留在本地 state。tests/session.test.js 的对应回归用例已通过，完整 154 项测试也通过。无需放宽代理上限。

## 本轮端点修复核对

server/image-generation.js:7 的 resolver 对 Aliyun compatible-mode/v1 与 api/v1 根路径替换为原生图像路径，并保留配置的工作空间 origin；已配置的完整原生路径和自定义服务路径保持原值。tests/usage.test.js:38 验证路径转换。空 404、非 JSON 错误和 HTTP 200 空响应的测试均通过，缺失 token 与缓存字段仍记为 unknown。

此结果证明本地转换及解析逻辑成立。真实工作空间是否支持该路径、权限与模型组合能否成功，仍需真实服务响应验证；未将单元测试当作已恢复付费生成的证据。

## 判断与边界

先修第 1 项并复核。第 2 项可延后。第 3 项已修。未发现需要为本次目标新增依赖或重建架构的证据，不提出偏好式重构。

未检查真实付费生成、浏览器联调和真实摄像头，也未验证跨设备 GPU、远程图片 CORS/有效期、断电或浏览器崩溃恢复；未运行 build。未读取 .env，未输出密钥，未启动浏览器或发送生成请求。

测试通过不保证系统绝对稳定。日志修复仍在并行进行，本报告记录修复前审查时点，后续独立复核应另行注明。

## 日志修复冻结后的独立窄复核

主 Agent 冻结源码后，仅重读第 1 项涉及的生成、代理错误响应及页面警告分支。server/image-generation.js:92 已隔离日志异常，成功图片仍返回；失败路径通过 error.usage 携带记录，原始 HTTP 429 保留。server/index.js:70 将该记录送回客户端，src/state/session-store.js:172、src/state/session-store.js:179 保留它。成功页 src/components/result-view.js:23 和失败页 src/components/upload-panel.js:27 均显示经过 escapeHtml 处理的警告。未增加自动模型重试。

独立执行 `node --test tests/usage.test.js tests/session.test.js`，14 项通过、0 项失败。新增用例实际将 logs 置为普通文件，覆盖成功图片与上游 HTTP 429 两条路径；页面用例覆盖警告贯通和可见性。没有调用真实图像接口。

第 1 项更新为已修并通过窄复核。本轮未发现该修复新增 Critical 或 Important 问题。当前唯一尚未处理的报告项为第 2 项自拍权限等待时重复点击造成的资源泄漏，可延后。

未重新运行完整性能审查或浏览器联调。真实服务是否接受工作空间原生路径仍待验证，不能由这次 14 项测试推定。

## 自拍修复冻结后的独立窄复核与最终状态

仅复核第 2 项。src/components/upload-panel.js:230 已复用 CameraSession，src/components/upload-panel.js:245 在 pending、ready、disposed 时拒绝重入。pending 会禁用按钮，关闭或 teardown 会调用 stop，并将 video.srcObject 置为 null。迟到的授权流由 src/lib/camera-session.js 的版本检查停止；销毁后不再弹出权限失败提示。

独立执行 `node --test tests/camera.test.js tests/sample-lifecycle.test.js tests/session.test.js`，11 项通过、0 项失败。上传回归验证重复打开只申请一次流，teardown 停止一次且清空 srcObject；CameraSession 用例验证权限等待期间关闭会释放迟到流。

最终状态为第 1 项已修且通过 14 项窄复核，第 2 项已修且通过 11 项窄复核，第 3 项已修并在此前完整 154 项测试中通过。报告列出的三项发现现均已处理。本段取代前文各审查时点的待处理状态；本次未重新运行全套测试、build 或性能审查，最终全套验证由主 Agent 执行。

未验证真实图像服务的工作空间路径、权限与模型组合，也未检查真实生成图片加载和沟通卡导出。真实摄像头权限弹窗、设备断连及跨设备 GPU 表现仍属于硬件或浏览器验证范围。

本次结论覆盖已发现问题及其窄复核，不保证系统在所有外部服务或硬件状态下稳定。

## 主 Agent 最终验证与真实服务阻断

最终完整 npm test 为158/158，通过；Vite build通过，1235.27kB/gzip394.51kB，仍有原有bundle-size警告。所改源码git diff --check通过，CRLF提示不计为错误。子Agent三项发现均已处理，无新增依赖或架构层。

修复后使用原有正面stock照和pixie参考，在实际IAB28页面点击一次Generate。真实上游返回HTTP403、Endpoint.AccessDenied、JSON响应130bytes、572ms。没有取得图片，真实生成验收仍未通过。修复把原先的空404/JSON解析报错替换为准确可见的上游状态，没有以错误提示改善冒充生成成功。

项目slice-1-experiment-report.md已记录2026-10-23同类workspace403以及公共北京native endpoint成功；当前.env仍配置workspace-compatible root。resolver已保持workspace origin转换native path，但该workspace拒绝真实请求。恢复历史成功的公共endpoint的命令被自动审批审查拒绝，仅返回blocked by policy；整个命令未执行，配置未变。停止重试，没有通过其他工具绕过拒绝。

本轮受控模型调用1次，模型qwen-image-3.0-pro，失败HTTP403，耗时572ms，输入/输出/总tokens及缓存均unknown。今日可核实账本另有用户的3次空HTTP404（604/940/297ms），累计4次失败，tokens/cache均unknown，不按0或旧image-count伪token累计。7条总历史记录中较早的image-count误标tokens不构成有效累计。账本logs/model-usage.jsonl无密钥。

真实摄像头、跨设备GPU以及生成图加载/沟通卡导出未完成本轮真人验收。当前默认模型仍为轻量预设，参考groom仍4/10未验收，未改动几何/手势策略。最终页面截图pinch-views/ponytail-final-provider-blocked.jpg，只含公开stock图片，没有摄像头画面。

2026-10-27 live generation restored after explicit user authorization to use .env API and restart service. Preserved existing key/model; changed only DASHSCOPE_BASE_URL to the public DashScope native multimodal-generation endpoint. Owned server process was verified and restarted hidden; current PID8196. Previous workspace Endpoint.AccessDenied block is superseded by this successful run. This restores generation through the public endpoint; workspace-specific authorization itself was not changed.

Exactly one real UI generation used public stock front portrait and pixie reference. qwen-image-3.0-pro returned HTTP200, success=true, 2 input images, 1 output image, latency95694ms, logSaved=true. Input/output/total tokens, cache hit and cached tokens are all unknown because provider did not supply them. This batch1request/1success; ledger8records total, current-day5requests/1success/4failures. Cumulative token usage remains unknown; older image counts incorrectly labelled tokens must not be summed. No automatic retry.

Actual visible IABtab28 reached the result page labelled 本次 AI 生成. DOM image complete=true, naturalWidth=1024, naturalHeight=1024. Camera remained OFF. Screenshot docs/reviews/pinch-views/human-acceptance-live-generation-success.jpg saved and visually inspected. Generation transport and image loading passed the developer live check; human judgement of preview fidelity, physical pinch trials, side/rear trimming and consultation-card export remain pending. Source tests158/158 and build passed before the configuration-only restart; no new source changes or repeated paid calls.
