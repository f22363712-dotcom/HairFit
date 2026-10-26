# Fresh scoped Task3 review

Reviewer task3_review used a fresh context and current working files. Read-only. Focused tests 67/67.

## Important finding

Camera-only modest fixed V plus near perspective and changing yaw emitted closed-confirmed without articulation. Reproduction in tests/scissors-geometry.test.js, test "a modest fixed V cannot cut while camera-only yaw changes under near perspective". Opening fingertip x .43/.53, world:false, perspective:true, tz:1.8, pitch:-70, yaw -10-80*i/7 at 67ms intervals. RED observed rigid frame4 true !== false before fix.

## Fix verification

Camera normalized XY and wrist-relative Z are not a rigid Euclidean space under perspective. Lock the opening palm basis for the camera fallback; disarm if its normalized vector displacement exceeds .15. Baseline stays anchored to the initial arming sample, so gradual rotation cannot drift the reference. World metric remains unchanged. Fresh opening is required after cancellation. No new joints enter numeric diagnostic recording.

GREEN focused gesture tests44/44, then full113/113 after adding a 300-sequence varying pitch/yaw and near-threshold opening matrix plus a small-wrist-drift natural positive. Each sequence has40 frames; no synthetic rigid cuts. Browser regression runs through actual production scene. This bounds tested conditions; it does not establish physical camera sensitivity or universal model correctness.

Critical findings none. Important finding fixed with failing-first regression. Minor findings none. No second reviewer dispatched per executing-plans workflow.

## Declined to judge and executor rulings

- Physical camera accuracy stays pending the learner trial. No automated result is substituted for it.
- Public-image model, browser and falling performance evidence supplied by executor in stage3 JSON artifacts.
- Task1/2 retained as accepted; scoped review checked their wiring for Task3 regressions.
- Product visuals, montage and submission readiness remain outside this repair and open.

## Quality tradeoff

Ruling: require a stable opening palm basis only in camera-coordinate fallback. Large wrist rotation can cancel an intended cut and require reopening. Accept this conservative behavior over a demonstrated false cut; actual-user effect remains pending.
