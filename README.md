# HairFit

HairFit helps someone explore a hairstyle before visiting a salon. Upload a portrait and a hairstyle reference for an AI image preview, then try cutting a preset 3D hairstyle and save a consultation image.

## Run locally

Use Node.js 20 or newer. From this directory:

```powershell
npm ci
Copy-Item .env.example .env
# Set DASHSCOPE_API_KEY in .env locally. Never commit or share it.
npm run dev
```

Open http://localhost:8787 . Existing installations with a configured `.env` can simply run `npm run dev`. The service listens only on this computer.

The provider contract is DashScope native multimodal generation. A configured Aliyun workspace `/compatible-mode/v1` or `/api/v1` root is mapped to `/api/v1/services/aigc/multimodal-generation/generation` on the same workspace host. An explicit full endpoint is preserved. Model defaults to `qwen-image-3.0-pro`. Only the portrait and hairstyle reference are sent for generation; extra side/back uploads stay in the local session as appearance references. No new angles are generated.

## Try the proof of concept

1. Upload the two pictures and generate, or choose the explicitly labeled existing example without a new model call.
2. Review one large AI preview. Enter 3D.
3. Drag across hair tips to cut. Drag empty space to rotate. Reset restores the current preset.
4. Save the consultation card, inspect it, then choose Save PNG.

The learner confirmed that person.jpg and hairstyle.jpg were AI-generated specifically for HairFit; the example result is a Qwen image edit. Provenance is in ASSET_PROVENANCE.md. These local sample files still need deliberate inclusion when packaging a public clone.

## What is and is not demonstrated

The 3D scene uses a MakeHuman CC0 anatomical head/shoulder template and editable hairstyle families. Native licensed skin/eye UV textures provide surface detail; photos only reference skin/hair colors. It is not a reconstruction of someone's head, and a 3D edit does not update the AI photograph. Consultation percentages describe virtual hair segments, not measured physical lengths. Generated facial likeness and hairstyle feasibility need human review. Model sources/hashes are in public/models/head-template-provenance.json and THIRD_PARTY_NOTICES.md.

Camera input now uses a locally hosted MediaPipe Hand Landmarker in a dedicated worker, trying GPU first and falling back to CPU after initialization/warmup failure. Extend index/middle fingers, fold ring/little fingers, hold them open to aim, then bring them together to snip once. Keep the palm facing the camera. Tracking loss, stale frames, palm/fist poses and background tab states disarm cutting; a fresh open gesture is needed. Actual webcam accuracy remains a learner check. Automatic demonstration is separate, opt-in and labeled.

The waiting view has a timer and animated indicators. The originally requested fashion montage is still unfinished. No measured cross-device FPS claim is made.

## Checks

```powershell
npm test
npm run build
git diff --check
```

Tests use Node's built-in runner and a temporary local server. Provider network responses are fixtures in usage-accounting tests; tests do not consume paid model calls. Browser and real-camera user testing is separate. `npm run build` generates browser assets; `npm run dev` is the integrated local app. `npm run preview` alone has no image API proxy.

Model logs are local-only at `logs/model-usage.jsonl`. Missing token/cache fields are `unknown`; image counts have separate fields. Historical 2026-10-23 records used image counts in token fields and are not valid token totals.

## Project evidence

- Approved plan in `devpost/scope.md`, `prd.md`, `spec.md`
- Build and learner feedback state in `devpost/checklist.md`
- Current review and remaining hypotheses in `docs/reviews/2026-10-24-gemini-review.md`
- Competition facts in `HACKATHON_BRIEF.md`
- Resume notes in `HANDOFF.md`

Competition publication is pending asset provenance, license selection, human review, English materials, public repository and the demo video.

## Finger-scissors runtime

Runtime package is pinned to @mediapipe/tasks-vision 1.1.1. WASM, SDK and hand_landmarker.task are hosted locally under public/vendor/mediapipe and public/models. Asset hashes and download source are in public/models/manifest.json; Apache-2.0 notices are included. Camera frames stay within the browser and its worker, with no third-party model API calls.

The recognizer uses palm-normalized gaps and extended/folded finger geometry. Initial calibration is open gap 0.55, closed gap 0.30, continuously open for 60ms and cooldown 180ms. After stable opening, a clear gap decrease of at least 0.35 can close on one fresh sample; smaller changes need 55ms closed confirmation. These are tunable product thresholds, not validated population-wide accuracy or competition rules. Results older than 250ms disarm rather than cut. The close event cuts at the last displayed open aim, without a sweeping stroke through the head.

Each gesture now makes a complete trim rather than one small pointer-move increment. Hit testing follows the currently visible fractional tip; falling fragments use the actual detached section. The camera panel separately counts recognized closures and successful hair hits. See docs/reviews/2026-10-25-gesture-feedback.md for observed latency, controlled before/after evidence and remaining live acceptance.

Actual local-model startup and four official static hand samples were checked in-browser. They establish runtime and sample-pose behavior, not real-camera open/close accuracy or global FPS. See docs/reviews/2026-10-24-finger-scissors.md for evidence and the live acceptance task.

Camera mode caps drawing at30fps and pixel ratio1 to reduce competition with inference. Acquisition continues on every animation callback, with the existing65ms minimum interval and one-frame backpressure. The response label includes capture-to-result latency, including stale frames; inference time alone is not the full response time.
