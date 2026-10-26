---
doc: spec
status: approved
---

# HairFit — Technical Spec

## How This Works, In Plain Language

HairFit is a local web app with two parts. The browser shows the upload flow, the generated preview, and the interactive 3D haircut scene. A small local server receives the two images, sends them to Alibaba Cloud's image model, and returns the generated result to the browser. The API key stays on the local server in an environment file.

The 3D scene does not try to rebuild the user's real head. It uses a stylized head with separate hair sections that the app can control. When the mouse passes over a hair section, that section shortens, a visible hair clump falls, and the model updates immediately. This makes the core interaction reliable enough for a live demo.

The app keeps the current images and generated result in the browser while the user moves between screens. It does not need accounts or a database for this proof of concept.

## The Core Journey Through the System

1. The user selects a personal photo and a hairstyle reference in `UploadPanel`.
2. The browser stores each selected image as a temporary local preview and enables the Generate button only when both exist. Implements `prd.md > 首页`.
3. The browser sends the two images and a fixed editing prompt to the local `/api/generate-preview` route.
4. The server forwards an OpenAI-compatible image request to Alibaba Cloud and returns the image URL or base64 image data.
5. While the request is running, `GenerationMontage` loops through local, original or licensed hairstyle visuals. Implements `prd.md > 生成中`.
6. `ResultView` displays the generated image as the largest visual element. The user can enter 3D, regenerate with the same inputs, or replace the images. Implements `prd.md > 结果页`.
7. `HaircutScene` creates the stylized head, hair sections, and camera. The first frame is already interactive. Implements `prd.md > 3D 剪发页`.
8. A pointer drag over a hair section changes its cut amount, spawns a falling hair clump, and updates the status text.
9. Reset restores the initial hair section lengths and clears falling clumps.

## Stack

- **Vite** for the local development server and browser build. Documentation: https://vite.dev/guide/
- **Vanilla JavaScript and HTML/CSS** for the page flow and state transitions. This keeps the learner-facing behavior close to the visible interface.
- **Three.js** for the stylized head, hair ribbons, pointer hit testing, camera controls, and falling hair animation. Documentation: https://threejs.org/docs/
- **Node.js local API proxy** using the built-in HTTP server. It keeps the Alibaba key outside browser code and avoids adding a database or authentication service.
- **Alibaba Cloud Qwen image API** for the real two-image hairstyle preview. Documentation: https://help.aliyun.com/en/model-studio/qwen-image-generation-and-editing-api-reference

Installed lockfile versions are Vite 6.4.5, Three.js 0.172.0 and dotenv 16.6.1. The inherited integration report records successful native DashScope requests; the 2026-10-24 repair has not made a fresh paid request.

## Where It Runs and How Someone Tries It

The app runs locally in a desktop browser. Node.js 20 or newer is recommended. The user creates a `.env` file from `.env.example` and places the Alibaba key there; the key is never committed.

Planned commands:

```text
npm install
npm run dev
```

Open the local URL printed by Vite. The demo path is: upload two images → click Generate → wait for the montage and generated image → click Enter 3D → drag across the hair → show falling hair → click Reset.

The submission also needs a public source repository and a 1–3 minute public demo video. Deployment is optional and is not part of the first build.

## Look and Feel

The interface uses warm porcelain `#F4F0E8` for the main background, ink `#171A18` for text, copper `#B46A45` for key actions, and a deep ink-green 3D stage `#101613`. Sage `#668A7C` and silver `#B8C1BE` support status and secondary controls.

The page should feel like a fashion editorial that opens into a small 3D studio. Use a high-contrast display serif for the headline and a clean geometric sans-serif for controls. Keep the upload and result areas spacious. The 3D stage can be darker and denser so the falling hair remains visible.

## Components

### App Shell and Screen Router

Owns the current screen: upload, generating, result, or 3D. It passes the shared session data to each screen and handles back, regenerate, replace, and reset actions.

PRD ref: `prd.md > 核心用户旅程`.

### UploadPanel

Renders the personal-photo and hairstyle-reference upload cards, thumbnails, replace/remove actions, and Generate button. It rejects unsupported files with a visible message and keeps the valid selection.

PRD ref: `prd.md > 首页`.

### GenerationMontage

Renders the waiting state, progress copy, and a loop of 4–6 local hairstyle visuals. It stops when the API returns success or failure.

PRD ref: `prd.md > 生成中`.

### ImageGenerationProxy

Receives two image inputs and the editing prompt, builds the Alibaba request, parses the returned URL or base64 image, and emits a usage record without secrets.

PRD ref: `prd.md > 生成中` and `prd.md > 结果页`.

### ResultView

Shows one large generated image and three actions: Enter 3D, Regenerate, and Replace images. Regenerate reuses the current two inputs. Replace clears the old result and returns to upload.

PRD ref: `prd.md > 结果页`.

### HaircutScene

Creates the head, hair sections, lighting, camera, pointer interaction, falling hair clumps, status text, and Reset action. Hair sections are data-driven so the cut amount can be changed without rebuilding the scene.

PRD ref: `prd.md > 3D 剪发页`.

### Session Store

Keeps selected image objects, generated image data, current screen, request status, error text, and cut amounts in one small in-memory object. It also writes the last successful preview to browser local storage so a refresh can recover the result during the demo. No personal images are uploaded to a project database.

PRD ref: `prd.md > 页面与状态`.

## Data Model

```text
session = {
  screen: "upload" | "generating" | "result" | "3d",
  personalImage: { name, type, dataUrl },
  hairstyleImage: { name, type, dataUrl },
  generatedImage: { urlOrData, createdAt } | null,
  request: { status: "idle" | "loading" | "success" | "error", message },
  hairSections: { front, left, right, crown, back },
  fallingClumps: []
}
```

Selected files originate from the user's browser. They are held in memory as data URLs for the request and preview. The generated image comes from the proxy response and is stored in memory plus local storage for a short-lived demo recovery. Hair cut values live only in the current session and reset when the user chooses Reset.

## File Structure

```text
HairFit-BuildWithAI-Basics-20261021/
├── index.html                    # Browser entry
├── package.json                  # Scripts and pinned dependencies
├── .env.example                  # Names of required environment variables
├── .gitignore                    # Keeps secrets and learner profile out
├── server/
│   ├── index.js                  # Local API proxy and static-file server
│   ├── image-generation.js       # Alibaba request and response parsing
│   └── usage-log.js              # Token, latency, status records without keys
├── src/
│   ├── main.js                   # App boot and screen routing
│   ├── styles.css                # Shared visual system
│   ├── state/session-store.js    # In-memory session and local recovery
│   ├── components/
│   │   ├── upload-panel.js       # Two-image input
│   │   ├── generation-montage.js # Waiting animation
│   │   ├── result-view.js        # Generated result actions
│   │   └── haircut-scene.js      # Three.js interaction
│   ├── lib/
│   │   ├── api-client.js         # Browser call to local proxy
│   │   ├── image-input.js        # File validation and previews
│   │   └── format.js             # Status and error copy
│   └── assets/
│       └── montage/              # Original or licensed waiting visuals
├── devpost/
│   ├── learner-profile.md
│   ├── scope.md
│   ├── scope.html
│   ├── prd.md
│   ├── prd.html
│   ├── spec.md
│   └── spec.html
└── README.md                     # Setup, demo path, and API key instructions
```

## External Services and Dependencies

### Alibaba Cloud image generation

The local proxy uses the native DashScope multimodal generation contract discovered during Slice 1, superseding the originally planned workspace-compatible image route.

```text
POST https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation
Authorization: Bearer <local environment key>
Content-Type: application/json
```

The configurable environment variable is `DASHSCOPE_BASE_URL`. Payload is `{model, input:{messages:[{role:"user",content:[{image:personalDataUrl},{image:hairstyleDataUrl},{text:prompt}]}]}, parameters:{size:"1024*1024",n:1}}`. Exactly the portrait and hairstyle reference are used. Optional side/back uploads do not enter the generation request in this version.

Successful native response image comes from `output.choices[0].message.content[].image`. The parser also accepts compatible `data[0].url` or `data[0].b64_json`. A five-minute timeout ends waiting with inputs retained; errors never silently substitute a sample. Documentation remains https://help.aliyun.com/en/model-studio/qwen-image-generation-and-editing-api-reference .

Each attempted provider request writes model, token usage, separate image counts, cache evidence, elapsed time, outcome and success. Missing usage is `unknown`. A returned image count must never be logged as a token count. The existing 2026-10-23 logs contain that historical unit error and cannot be summed as token totals. The key, images and prompt contents never enter the usage log.

## Important Failure Modes

- **Image generation is slow** → keep the montage looping and show a clear loading state; do not allow duplicate requests.
- **Image generation fails or returns an unexpected shape** → show a plain error and keep both selected images so the user can retry.
- **The uploaded file is unsupported or too large** → reject it before the request and explain the accepted format or size.
- **The 3D scene fails to load** → show a fallback dark stage with a short explanation and keep the generated result available for the demo.

## What Was Simplified and Why

- **Stylized editable head** instead of personal 3D reconstruction — it proves direct haircut interaction without a capture pipeline or GPU-heavy asset generation.
- **Local session storage** instead of accounts and a database — the submission is a single-user proof of concept and needs a dependable demo path.
- **One generated result image** instead of a gallery or history — the product moment is deciding whether the proposed hairstyle suits the user.
- **Short local montage** instead of a live fashion feed — it gives the waiting state visual energy without another network dependency or copyright risk.
- **Mouse drag first** instead of hand tracking — it makes the core interaction reliable for the judging environment while leaving gesture input as a later extension.

## Decisions and Open Issues

- Learner chose a real two-image preview before 3D.
- Learner chose a single large result image and direct entry into 3D.
- Learner chose a 3D scene that is immediately draggable when it appears.
- Learner accepted Vite, vanilla JavaScript, Three.js, and a local API proxy.
- The useful unfamiliar concept is the proxy: it is a small local middle layer that receives the browser request, adds the secret API key, calls Alibaba, and sends only the result back. This will be checked by making one request with a test image before building the full result page.
- Open issue: confirm the live Alibaba model name and exact two-image payload shape during the first build slice. The official API documentation is linked above and the integration must record the actual response and usage fields.

## 2026-10-24 repair addendum

Implements `prd.md > 结果页` and `prd.md > 3D 剪发页` without changing the approved preset-model boundary.

- Restores one main generated image, explicit live/demo/restored provenance and small input references. Saved legacy manufactured view candidates are discarded; ambiguous legacy side/back data is not restored.
- `src/lib/camera-session.js` owns pending/ready/error/closed transitions and releases late camera streams. Motion control is an experiment requiring an explicit held button; it does not recognize finger-scissors. The separately labeled demo can only start by user action.
- `src/lib/consultation-card.js` creates a browser-local PNG with AI reference, current 3D screenshot and five-zone relative virtual segment changes. It has no physical scale and does not update the AI image.
- Static server exposes only the web entry, source assets, Three.js files and explicit local samples. Private project files return 404; listener is loopback-only.
- Waiting UI uses elapsed time and rotating text indicators. The originally requested fashion montage is still unfinished.
- File map additions are `src/lib/html.js`, `src/lib/camera-session.js`, `src/lib/consultation-card.js`, `tests/*.test.js` and `docs/reviews/2026-10-24-gemini-review.md`.
- Learner final review remains pending. True finger-scissors, user/stylist utility, identity preservation, 2D/3D hairstyle equivalence and mobile performance remain unverified. No new product ownership decision is attributed to the learner.

## True finger-scissors implementation, authorized 2026-10-24

The learner explicitly requested real index/middle finger scissors after confirming AI-generated sample provenance. This extends the earlier mouse-first implementation while retaining its fallback.

- MediaPipe Tasks Vision 1.1.1 and the full Hand Landmarker run locally in a classic worker. Local asset manifest includes SHA-256 hashes and sources. Official documentation: https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js . Model card identifies Apache-2.0, with notices under public/vendor/mediapipe.
- New code is in src/lib/scissors-gesture.js, src/lib/hand-tracker.js and src/workers/hand-tracker.worker.js. The scene consumes discrete intent, not raw image motion. CameraSession still owns stream permission and late-close cleanup.
- A valid scissors pose has extended index/middle fingers and folded ring/little fingers. Palm-normalized gap hysteresis is 0.55 open / 0.30 closed, with 120ms continuous opening and 350ms cooldown. After stable opening, a gap decrease of at least 0.35 can confirm one fresh closed sample; smaller changes require 55ms closed confirmation. These initial defaults require learner calibration; they are not a measured accuracy claim.
- A snip cuts once at the last stable displayed open aim. It cannot sweep along hand closure. A closed first frame cannot cut; lost hand, switch, invalid pose, focus loss, an open export dialog or results more than 250ms old require a fresh opening.
- At most one camera frame is in flight, sampled no faster than once per 65ms. Worker inference time is shown as measured milliseconds per frame; no render-FPS guarantee is made.
- No automatic fallback into demo. Demo remains a distinct user action with a visible label. Mouse cutting, reset and consultation export remain available.
- Live camera usability and device performance remain learner acceptance tasks. Existing 2D/3D geometry equivalence and hairstyle feasibility remain outside this feature.

## Gesture feedback correction, 2026-10-25

The learner reported that some closures cut successfully, but response felt insensitive and shape changes were weak. Live UI observations showed about 111–129ms inference per frame. Requiring two closed samples can miss a brief closure at that cadence; the clear-closure path above addresses that case without training or changing the landmark model.

- A discrete snip uses a full bounded trim, with a minimum depth of two virtual curve segments when enough hair remains. Mouse dragging retains its fine increments. Hit testing and detached geometry interpolate fractional cut boundaries rather than reaching removed original tips.
- The scene exposes snipAt and captureStill as the production gesture/export operations. captureStill flushes geometry changes and hides transient falling fragments, allowing a persistent haircut comparison.
- UI distinguishes recognized closures from successful hair hits. These counters are diagnostic feedback, not model accuracy metrics.
- Controlled browser tests exercise the actual scene and production snip operation. Real-camera sensitivity and false positives still require learner testing; no final acceptance is inferred.


## Anatomical template and fast-motion correction, 2026-10-25

- Replace the deformed sphere/photo projection with the CC0 MakeHuman hm08 head/shoulder mesh, adult graphical target and native skin/eye UVs. Photos supply limited color reference only. This is a generic template and does not reconstruct an individual. Sources/hashes and license are in public/models/head-template-provenance.json and THIRD_PARTY_NOTICES.md.
- A radial scalp lookup shares the rendered geometry's source. Cut occlusion uses the actual head with a BVH; detached fragments collide with that scalp instead of the old wider ellipsoid. Preserve real strand edits, falling geometry, mouse fallback and reset.
- Hand inference tries GPU first and CPU after initialization/warmup failure. Keep frame backpressure and stale/focus/pose guards. Current open confirmation60ms and cooldown180ms allow two open samples at15fps and repeated3Hz synthetic cycles; the close hysteresis and clear-closure rule remain. These are product defaults, not validated camera accuracy.
- The user page was found to be running an older version and was explicitly refreshed. GPU was actually observed at37ms/frame in the local camera page; no cross-device performance guarantee is made. Assets use no-store in the local development server.
- Final visual review remains open. The textured version scored7.1/10 in independent review, with hair cards and surface detail still below the internal release bar. Mechanical checks and controlled actions do not substitute for learner acceptance. See docs/reviews/2026-10-25-anatomy-and-gpu.md.

- Final camera-load correction separates sampling from drawing. During camera use drawing pixel ratio is capped at1 and drawing at30fps; acquisition/guards still run everyRAF with the existing65ms inference gate. UI reports capture-to-result latency, including stale samples. The production scheduling regression preserves75 samples/15 synthetic snips over300 callbacks; actual fast-motion acceptance remains pending.
