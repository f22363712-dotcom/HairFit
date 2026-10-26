# Anatomical head and responsive camera correction

## Learner report and observed runtime

The learner rejected the side silhouette and reported that only slow/repeated scissors motions reliably cut. The supplied screenshot showed a deformed sphere with a frontal face projection, a large rear skull and weak jaw structure.

The active main page still displayed the older strand counter and lacked the new closure/hit counters. It had not loaded the previous correction. Refreshing loaded that code. The subsequent live DOM showed12 recognized closures and12 hair hits. The number of attempted motions was not reported, so this is not a measured success rate.

The old active page displayed inference observations of142–210ms/frame. In a same-image20-frame comparison with320px bitmaps, CPU mean was185.875ms and GPU mean65.33ms; both detected and classified20/20 V-pose samples. After GPU integration, the actual main page showed video readyState4 at640px and GPU37ms/frame at350 processed frames. These are local observations, not a guaranteed frame rate or live-gesture accuracy.

A separate native-image static-pose run passed4/4 but had270–417ms observations. That run is not the controlled320px benchmark and is not evidence of a target camera frame rate. No camera frames were saved or transmitted. Only UI metadata and synthetic/licensed examples were inspected.

## Changes

- Worker initialization tries GPU and performs real warmup, then closes the failed detector and tries CPU if creation or warmup fails. The hand-pose geometry and stale/focus protections remain. A further replay exposed timing limits: two fresh open frames at15fps could not arm the120ms rule, and350ms cooldown dropped the second of three3Hz cycles. Separate failing regressions now pass with60ms opening confirmation and180ms cooldown. Held-close suppression and all cancellation checks still pass. No training was done. The scene displays its actual delegate.
- MakeHuman CC0 graphical assets replace the deformed sphere and separate pseudo-ear. The mesh includes modeled facial structure, ears and a continuous anatomical neck. A generic adult graphical target supplies shape; it is not fitted to the learner. Native UVs preserve skin/lip/ear detail. Eye cornea alpha is respected. Photos only provide color references, with request epochs guarding stale appearance loads. Facial photo projection/alignment controls are removed.
- The scalp lookup, strand collision and detached fragments use the new mesh. A reviewer found old fragment ellipsoid projection causing0.11-unit jumps at valid detached positions; a failing regression was added and the old shell removed.
- Actual head-mesh occlusion replaces the mismatched old ellipsoid. Naive per-triangle queries made a controlled snip take952ms. Adding a MeshBVH reduced the same operation to29ms, with190 edited strands and the same1033.53 virtual segment removal. This controlled snip uses the production operation; it does not test camera classification.
- Strand ribbons are narrower, glare weaker and repeated curl amplitude reduced. The display bust's lower cut is leveled and supported by its base. Shape and hair realism still require learner review.
- Local static assets now send no-store; the page must still reload to replace already-running code. The BVH package has one explicit static allowlist prefix. No private paths were exposed.

## Sources and verification

MakeHuman's source/asset split is documented at https://github.com/makehumancommunity/makehuman/blob/master/LICENSE.md . The official system asset pack lists the selected skin/eye materials as CC0 at https://static.makehumancommunity.org/assets/assetpacks/makehuman_system_assets.html . Exact input and derived hashes, including the core shape target and texture members, are in public/models/head-template-provenance.json. License copies and BVH MIT notice are included. PNG exceptions in .gitignore ensure the new runtime textures can be included in a clone.

Node suite49/49 passed. Independent code review initially passed45/45, checked199 head and12 eye UV seam copies with matching normals, verified GPU-warmup failure cleanup, and rechecked the fragment collision regression. Final npm run build passed (main chunk1185.20kB, gzip375.58kB; bundle-size warning remains); git diff --check passed. Independent final timing review passed16/16 hand-intent tests and found no Important issue. Browser final geometry check cut51 strands/165.25 virtual segments in37.1ms at a fringe aim, reset to100%, and generated the consultation-card preview without canvas taint.

The first visual reviewer scored the supplied original3/10. An intermediate untextured version scored5.5/10, below the3d-asset-critic9/10 release gate. Subsequent native skin/eye materials, adult shape and hair refinements were independently scored7.1/10 (silhouette8.2, face/skin7.5, hair5.6). Remaining issues are hair-card gaps/uniform bangs and facial surface detail. This remains below the9/10 release gate. No release-quality pass, learner acceptance or personal reconstruction is inferred. Screenshots are in the usual visualization directory as HairFit-anatomy-textured-front.png and HairFit-anatomy-textured-side.png.

## Remaining acceptance

Use the already updated main page, inspect the profile and try normal-speed opening/closing. Report recognized closures versus hair hits and any accidental cut. Visual acceptance and fast-motion usability remain open until learner feedback. The working tree has not been committed or published. No paid third-party model API request was made in this correction.


## Final response-load correction

Later live samples still showed109–120ms inference and expired frames under load;37ms was not stable evidence. Camera mode now reduces drawing pixel ratio to1 and limits drawing to30fps, while camera sampling/guards run on every RAF independently. A reviewer caught the first throttling attempt also skipping camera sampling. The extracted production frame loop and integration regression now show75 camera samples and15 synthetic snips over300 callbacks, with150 draws. Independent review passed23 related tests and cleared that P2. Full suite49/49 and final build passed. Full capture-to-result latency is shown even for stale results, rather than only inference time. After load reduction, an actual UI observation was38ms response/35ms inference with video readyState4; this is still a local sample, not a fast-gesture acceptance result.


Last main-page check on the final separated loop showed video readyState4, GPU90ms full response/88ms inference, no hand and no new closure count. Observed full response varied38–90ms after load reduction. Do not claim fixed37ms performance or physical fast-motion acceptance.
