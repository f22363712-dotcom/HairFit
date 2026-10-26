# Model-conditioned bundle haircut implementation plan

> For agentic workers use superpowers:subagent-driven-development. No commits, paid requests, publication or service restart.

Goal: replace editable shell with model-derived curved hair bundles, trim distal segments, animate bounded sway and detached tips.

User approved the bundle/basic-physics option on 2026-10-27. Existing reconstructed head shape remains authoritative; the selected hair mesh supplies the actual envelope. Generated curve roots/directions are inferred, not recovered follicles. Keep explicit inference wording. No preset haircut or photo face overlay.

## Design

Derive deterministic guide bundles from normalized selected hair geometry, using its surface and head bounds for root placement. Render tapered volumetric bundles in a small number of draw calls, hide original hair only after successful conversion. The original hair mesh remains private reset/source reference and an occlusion envelope; unchanged nonhair parts stay exact. A visible-ray test chooses the nearest bundle, then cuts only distal curve segments intersecting a local brush. Retained roots never move. Finite small sway with outward clearance and gravity-driven detached tips provide basic physical response, not scientific material simulation. Reset restores generated bundles from immutable guides. Camera pinch and mouse call the same entry point, with immediate feedback, no CSG delay in bundle mode. Shell mode remains explicitly selectable for comparison.

## Tasks

- [ ] Task 1 owns src/lib/model-conditioned-groom.js and tests/model-conditioned-groom.test.js. API createModelConditionedGroom(hairGeometry, options) returns {group, cut(raycaster,radius), step(timeMs), reset(), dispose(), stats}; geometry already normalized, no mutations to input. options headGeometries immutable list. cut returns {affectedStrands,zone,durationMs}; no hit means0. step returns boolean animation-active. Tests actual GLB dependency, change source changes envelope, immutable head/source, trim shortens only intersected bundles and cannot regrow, reset, stable roots, finite physics, capped budgets/disposal. Root integrates after API ready.
- [ ] Task 2 root owns reconstructed-scene.js integration. Default derived bundle mode after hair confirmation; explicit shell comparison. Preserve view, camera gates, numeric accounting, export, reset/disposal, no stale worker result. Cap camera resolution1; sample timestamp at image acquisition; throttle report text refresh250ms. Save human baseline before reload.
- [ ] Task 3 independent review then full tests/build and camera-off front/side/back browser inspection. Physical hand acceptance remains pending until new human trial. No new model requests.

## Preflight

Task1->Task2 shared interface as above; same normalized coordinate system, radius in world units. Task1 does not touch scene. Task2 does not edit groom internals. Task3 reads/tests only. Task1 tests match module behavior; Task2 preserves shell worker tests, adds integration evidence; no source ownership conflict.

## Rulings

Use current working checkout to preserve uncommitted project changes. No automatic commits. Hair envelope and unseen flow remain approximations. Human baseline has154 frames/72stale,330ms mean latency vs21.5ms inference, only1 diagnosed cut despite10 session cuts; do not invent full30-trial measurements. Automated capture-timestamp regression observed RED100!=420 then GREEN.
