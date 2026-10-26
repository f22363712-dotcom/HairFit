# Fresh groom code review

Reviewer groom_code_review used fresh context and current working files, read-only. Focused tests10/10. No Critical finding. Geometry capacity, fractional cuts, finite frames, active ranges, native readiness and bounded dirty updates were cleared by inspection/tests. Artwork/performance/physical pinch were explicitly declined and remain separate gates.

## Important findings and failing-first resolution

1. Reset/model replacement kept armed input and allowed captured pre-change frames into the new groom.
2. Async image-driven replacement skipped debris/HUD cleanup performed by the manual selector.

Authored actual production-scene test-assets/groom-lifecycle-integration.html reproduced RED0/3: old opening cut restored hair; old opening cut replacement hair; old debris survived async rebuild. Numeric artifact2026-10-26-groom-lifecycle-red.json.

Central onGroomRebuilt callback now runs after geometry replacement, advances accepted capture boundary and resets pipeline/aim/pointer, kills fragments, dirties HUD and restores session percentages. Initial construction uses a no-op hook until lifecycle state exists. Reset uses the same hook. Direct/manual/async callers share bookkeeping; no queued sensor frame can revive pre-change intent.

Browser controlled-clock GREEN3/3 in2026-10-26-groom-lifecycle-controlled.json. Controlled clock is intentional to pin the invariant independently of current-device reconstruction duration; a slow build's incidental250ms frame-gap rejection cannot substitute for explicit invalidation. No real camera source was used. Full Node/build and final production integration/performance follow current geometric revision.

## Deferred minor

GPU debug currently treats a truthy internal options.debugAppearance as enabled instead of requiring ===true. Production supplies no option and therefore has no GPU readback; diagnostic harness passes literaltrue. Strict boolean validation is deferred, not a blocked user feature. This internal API is not read from remote/page/user query data.

## Limits

No second code reviewer dispatched after regression fixes per executing-plans. Latest root-basis/artwork revisions are verified by geometry regressions and independent image critiques, not represented as passing9/10 by this code review. Six-sample local hand model compatibility remains5/6 with a retained back-hand miss; no physical success-rate claim.

## Narrow renderer-isolation recheck, 2026-10-26

The same reviewer inspected the frozen current working files after the default renderer was restored. No Critical or Important finding was found in this narrow change. This recheck was read-only on source and tests; the parent subsequently authorized appending this record only.

Reviewed src/lib/hair-render-profile.js, tests/hair-render-profile.test.js, their integration in src/components/haircut-scene.js, and the local test-assets/groom-head-experimental.html entry point.

- selectHairRenderProfile requires options.experimentalGroom === true. The default selects 15 segments and two vertices per point before allocating storage (hair-render-profile.js:7). Its storage contains ribbon attributes and indices, exposes bakeCrop as null, and allocates no round layout or point-width buffer (hair-render-profile.js:15, :22, :44; haircut-scene.js:822). The default crop therefore cannot enter the reference-bake branch (haircut-scene.js:872).
- The default writer uses writeRibbonStrand and samples the current fractional cut for its tangents. Profile-specific point and index counts drive dirty update ranges and draw ranges (hair-render-profile.js:30; haircut-scene.js:843, :847, :855). Actual basePos/cutIdx hit testing, detached segment sampling, fragment emission and counters remain connected to the selected segment count (haircut-scene.js:1151, :1205, :1242, :1763).
- The previous lifecycle fixes remain centralized in onGroomRebuilt. Rebuilds and resets invalidate input and captured pre-change frames, clear fragments, dirty the HUD and reset stored percentages (haircut-scene.js:861, :1402, :1665). Native texture readiness, clay selection and disposed/resource-epoch guards remain present (haircut-scene.js:695, :778, :1820; head-appearance.js:2).
- The separate experimental page explicitly passes experimentalGroom:true and labels the model as an unaccepted 4/10 experiment with approximate side/back views. git check-ignore test-assets/groom-head-experimental.html confirmed that the artifact remains ignored. The experimental round geometry and reference bake remain callable through the explicit profile.

The previously recorded debugAppearance truthiness issue remains Minor and unchanged by renderer isolation. No additional reviewer was dispatched. No tests, browser runs, camera operations or performance measurements were run during this recheck. Actual worker performance, visual acceptance and physical gesture accuracy were declined to judge and remain separate evidence. Assessment for the narrow code change: ready; overall performance acceptance is not claimed here.
