# Model improvement audit, 2026-10-26

**Current source is frozen for fresh review.** Crop now uses the user's authorized manual interpretation of the bundled ideal reference. Visual acceptance and production worker/performance acceptance remain open. Neither the old macro experiment nor this groom has a release-quality visual pass.

## Current implementation and provenance

- `src/lib/groom-head.js:6` identifies `hairfit-ideal-swept-c-v1`, current revision `scalp-tangent-curvature-rootpatch-20261026`. Thirty individually named C/S/wave locks follow `test-assets/hairstyle.jpg`; `last-generated-preview.png` is secondary. The rear is explicitly `reasonable-approximation-unobserved`. Arbitrary uploads are not reconstructed into 3D.
- Main locks contribute 30 x 176 fibers; 2300 independent short underhair fibers preserve continuous coverage and side/nape taper. Total crop is **7580 strands x 24 segments x three-sided cross section = 1,091,520 triangles**. The former 241500-triangle ribbon budget was not treated as an absolute limit.
- `src/lib/groom-round-geometry.js:4` preallocates buffers. Its writer updates only dirty strands, including their transported radial normals, tangents and closed fractional tips. Vertex expansion is world-fixed, not camera-facing. `src/lib/groom-material.js:13` retains the asynchronous `hairMat.uniforms.uRoot/uTip` appearance interface.
- `src/components/haircut-scene.js:849` writes dirty strands, including their baked local packing widths, and queues local BufferAttribute ranges. Active draw range excludes unused capacity. Cut indices and falling fragments still consume the real `basePos` curves. Hair does not cast shadows into the static cache. Medium/long preserve their 15-step growth trajectory, resampled to the shared 24-step round writer.

The head remains the generic MakeHuman graphical template (`src/lib/head-anatomy.js:3,14`; `ASSET_PROVENANCE.md:20`). Runtime portrait/generated images reference colors and a coarse crop/lob choice. The manual crop targets the bundled example, not every uploaded ideal image. Parent-owned UI disclosure identifies the generic head and approximated side/rear.

## Geometry evidence and visual history

| Issue | Observed failure | Retained result |
| --- | --- | --- |
| Scalp enumeration stopped after filling its guide budget | Exact old RNG replay accepted 1150 guides after only 1196 candidates. Minimum root-direction y was 0.280534; regression reported zero lower-rear roots. | Complete eligible-pool selection in `src/lib/scalp-sampling.js:2` reached y=-0.530006, with 149 back guides below y=0 in the actual scene mask. It remains in underhair and legacy paths. |
| Child offsets embedded the first vertex | Real template regression measured a 0.00954975 clearance deficit. | First-vertex collision is retained in `src/lib/hair-strand-shape.js:2`; manually baked groom points also collide with the head. |
| Automatic macro gathering destroyed support | v3 retained only 0.22 of root width; its supposed inner layer rose 0.278124 away from the scalp. | v4 was corrected but still looked like wooden strips/rings. Fresh review relayed by the parent scored 5.5 overall, 4 hair, 4.5 frontal similarity. The module/tests were removed from production and archived under `test-assets/model-experiments/crop-clumps-v4/`. |
| Full-head copies inherited the lock prototype's long stems | Actual `groom-head-{front,left,back}-v1.jpg` showed upright columns before the curls. The first-half lateral-spread regression failed on C. | Only head-scale profiles changed: immediate side bending, C local height 0.90 to 0.53, nonnegative local outward depth. The approved isolated lock remains unchanged. Profile regression passed. |

The implementer actually inspected the original, macro v2/v3/v4, isolated lock, integrated-first and head v1/v2 three-view images. The parent approved the isolated three-sided representation after seeing front/side thickness and clicking a real snip that shortened 89 fibers by 1761.15 virtual segments. Screenshots are `pinch-views/lock-round3-{front,side,overlap,after-cut}.jpg`.

Compact head v2 has normal skin/eyes and stable rear coverage, but still exposes regular upright hooked groups and front-root gaps. The parent relayed fresh scores of 5 overall, 4.5 hair and 4 frontal similarity. Review identified a further coordinate defect: local profile Y was world Y, so shortening stems still left upright rods.

The tangent-frame revision constructs flow F from each authored root direction N, turns F around N by the lock's local sweep angle, and constructs orthogonal side S. Profile XY maps to S/F and nonnegative depth maps to N. Crown/front comb directions differ from downward/backward side/rear directions. Profiles use open C and shallow S arcs. RED measured first-control normal cosine 0.9817 on `front-left-edge`; GREEN requires all 30 locks below 0.15, first normal rise below 0.015, total normal lift at most 0.14, whole-head Y at most 1.18 and absolute X/Z at most 0.85/1.05. Material, count, underhair and cutting interfaces were unchanged in that coordinate-system step; subsequent scale and root fixes are recorded below.

### Final scale and follicle corrections

Actual head v3 images removed the upright hooks but still showed front comb teeth and thick oval bundles. Two independent proportions were then corrected without changing lights or counts. Front underhair had measured arc length 0.14020; it now uses a 0.075 side comb projected against the mesh-derived surface normal. Its measured maximum arc is 0.07547 and minimum horizontal XZ displacement/arc is 0.8273. XZ is used because a real side comb wraps around the temples rather than staying on world X. Other underhair paths remain unchanged.

`src/lib/groom-lock.js:84` limits the local bundle radius to one quarter of the sampled control-curve curvature radius. An elliptical area budget of 0.55 caps each fiber's local width for 176 fibers. A known-radius circular-arc regression reproduced old bundle displacement 0.06898 around a radius-0.1 curve; the constrained interior is at most 0.028. Open-spline endpoint tangent regions are excluded from that constant-circle check. Crop's base fiber radius is now 0.0015; nonfront underhair compensates its width scale to preserve its former world radius 0.00198. Legacy presets retain 0.0022. Local width profiles are baked and read by the existing dirty writer, not rebuilt as head-sized arrays during a cut.

Separately, root measurement confirmed one-sided collision left floating main fibers: 5280 root clearances had p95 0.02377 and maximum 0.04362. `src/lib/groom-head.js:98` now places deterministic S/F follicle patches and projects both raised and embedded roots to the mesh-derived scalp plus 0.006. A surface-following path blends into the original body over the first quarter with quintic C2 easing. At step 6/24 and later, the already-authored curl body is unchanged.

Final measured root clearance is min 0.005999961, median 0.006000000, p95 0.006000022, max 0.006000038. First-step clearance rise has p95 0.000784 and max 0.001379. Regression checks all 5280 roots, a first-step rise no greater than 0.010 and unchanged post-quarter curl bodies. This final geometry has not yet received its actual final images, performance acceptance or visual pass.

## Native texture readiness defect, now verified

The first integrated image and `groom-face-colored.jpg` showed a nearly black face; `groom-face-clay.jpg` was normally lit. Parent diagnostics observed image width 0/version 0 before readiness and later 2048 x 2048/version 1 with the native map bound. CPU analysis found 2121 facial template vertices had scalp coverage zero. Skin colors and lighting were not changed to hide the defect.

The cause was binding the TextureLoader placeholder before its native image was ready. `src/lib/head-appearance.js:2` now selects maps only after readiness. Initial head/eyes use a warm fallback/procedural eyes with a visible loading state. `applyNativeAppearance` respects the current clay choice, disposal and resource generation; ready assets request a render. Native texture resolution is preserved.

Actual GREEN evidence is saved in `2026-10-26-groom-appearance-coldload.json`: initial `status=loading`, skin/eyes not ready, `mapPresent=false`; later ready at 2048 x 2048, version 1, native GPU map bound and CPU/GPU uniforms consistent. `2026-10-26-groom-appearance-clay.json` shows ready assets still leave `mapPresent=false` and CPU/GPU `useSkin=0` after choosing clay. `2026-10-26-groom-appearance-ready-before-fix.json` contains the later ready state of the earlier diagnostic, not its missing initial frame.

GPU uniform/binding reads are opt-in through `debugAppearance`; default production rendering does not perform those synchronous reads. Source remains frozen after this verified repair.

## Verification and performance boundaries

The final root-repair command was `node --test tests/groom-head.test.js`, exit 0, **5/5**. The immediately preceding curvature/packing/dirty-width/readiness run passed **14/14** across `groom-head`, `groom-lock`, `groom-round-geometry` and `head-appearance`. These checks cover geometry, provenance and lifecycle contracts; they do not prove aesthetic quality. Scene syntax and affected-file `git diff --check` passed. Source is now frozen; parent owns the final full suite, build and actual worker/falling performance checks.

One explicitly requested Node initialization measurement, before compact-profile revision, gave groom bake 684.9 ms, round-layout allocation 86.2 ms, full writer 628.0 ms, total 1.406 s. RSS was 53.6 to 112.3 MB; layout buffers totaled 50.1 MB. All seven initial attribute updates had one in-bounds range; draw index count was 3,274,560. The installed Three implementation sorts then linearly merges ranges (`node_modules/three/src/renderers/webgl/WebGLAttributes.js:99`). These results do not measure GPU time, live camera cadence or final production frame rate. The long CUA batch timeout did not establish an infinite page loop; later isolated UI operations recovered in under a second.

No paid API requests, new SDKs, commits, pushes or worktrees were created by this agent. No browser was launched by this agent; all actual browser observations came from parent CUA and saved public-sample screenshots. No personal camera frames or joint arrays were saved. Unrelated working changes and parent gesture/view/lifecycle work were preserved.
