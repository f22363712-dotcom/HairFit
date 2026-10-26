# Real reconstructed model haircut implementation plan

User approved execution in order: fused portrait -> actual reconstructed GLB -> edit that model's hair -> webcam pinch validation. This is not a template/photo overlay feature.

## Phase 1

Implement durable Tripo CN jobs in server/reconstruction-jobs.js and HTTP routes. Source is a validated PNG/JPEG data URL prepared with intact RGB face; hash the source and reserve a record before any submit. Never recreate an ambiguous task or auto-retry paid submission. Save task ID and download GLB locally, with HTTP URLs owned by this server. Secrets stay private.env. The existing paid experiment can be offered as an explicitly labelled no-cost example, not silently substituted for arbitrary input. Persist reconstruction state in the browser independently of original image quota fallback. Polling only queries saved tasks. Source changes invalidate browser selection without deleting old server jobs.

## Phase 2

Create a dedicated reconstructed-scene component and mesh cut worker, reusing existing Three.js, CameraSession, HandTracker, PinchGesture and GesturePipeline. Load actual GLB and identify the editable hair component. For unlabelled new models require visible part selection/confirmation before enabling cutting. Only selected hair geometry reaches the worker. Use closed mesh CSG subtraction and detached intersection for local virtual cuts; this is hair-shell editing, not individual strand simulation. Untouched head meshes must remain byte-identical. Save original geometry for reset, gate pending cuts and discard stale results after reset/disposal. Keep views, mouse trimming and consultation export.

## Phase 3

Connect webcam pinch to the same mesh cutting entry point; one accepted closure queues one cut. Camera/worker teardown and reset must be tested. Test actual experiment GLB locally without paid regeneration. Independent code review and real browser inspection; human physical pinch acceptance remains a human task. No webcam screenshots/recordings. Do not claim face likeness quality improved beyond the existing7.2/10 geometry review.

## File ownership

Backend implementer owns server/reconstruction-jobs.js, server/index.js and backend tests only. Root owns session store/result/main UI, new reconstructed scene and worker, package scripts and frontend tests. Existing legacy haircut scene remains an explicitly preset demo. Reuse checked-out uncommitted dependencies; no commits, publication, or new paid model requests during development. Preserve working copies and secrets. A prior service restart was auto-review rejected; do not evade it via another process mechanism. Activation may require user to restart the service if approval review still blocks the necessary restart.
