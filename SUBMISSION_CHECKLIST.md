# HairFit submission checklist

Updated 2026-10-27 03:45 Asia/Shanghai. Deadline recorded in `HACKATHON_BRIEF.md` is 05:00 Asia/Shanghai.

## Demo path

- [ ] Start the local server and confirm `GET /api/health` returns `ok: true`.
- [ ] Open `http://localhost:8787/` in Edge.
- [ ] Use the saved generated preview. Do not trigger another paid model request.
- [ ] Enter the real photo-conditioned model.
- [ ] Show front, left, right and back views.
- [ ] Confirm the highlighted hair part.
- [ ] Use mouse clicks to trim visible bundles and show detached tips.
- [ ] Restore the original model.
- [ ] Generate the consultation card.
- [ ] Keep the camera gesture as an experimental feature; do not present it as verified.

## Evidence

- `docs/reviews/pinch-views/2026-10-27-live-model-ready.png`
- `docs/reviews/2026-10-27-human-pinch-baseline.json`
- `docs/reviews/2026-10-27-tripo-real-generation.json`
- `docs/reviews/2026-10-27-tripo-glb-structure.json`
- `logs/final-npm-test-20261027-latency-fix.log`

## Honest claims

- The model is generated from the fused input image through Tripo and loaded as a real GLB.
- Hair bundles are derived from the selected hair surface and support virtual trimming.
- Side and back geometry are model inferences from incomplete image evidence.
- The virtual cut changes the reconstructed hair representation. It does not simulate individual follicles or guarantee real haircut length.
- Webcam pinch remains experimental because the latest human trial still reported high latency and inaccurate recognition.

## Submission fields to fill

- Project title: HairFit
- One-line promise: Preview a hairstyle, inspect a photo-conditioned 3D reconstruction, and mark virtual trim zones before the appointment.
- Demo video: public 1–3 minute link required by the brief.
- Source repository: public URL required by the brief.
- License: verify the repository license is present before submitting.
- Runtime instructions: include Node.js version, `.env` setup without secrets, `npm install`, server start and localhost URL.

## Stop conditions

- Do not submit a claim that webcam recognition is reliable.
- Do not start another paid Tripo task.
- Do not introduce new model, gesture or API architecture before submission.
