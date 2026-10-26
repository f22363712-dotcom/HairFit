# Tencent genuine reconstruction implementation plan

User selected Tencent Cloud Hunyuan3D instead of Tripo. The rejected photo/template prototype stays disabled. No claim of visual similarity or editable reconstructed hair before an actual artifact passes acceptance.

First slice is a real, resumable reconstruction job through the official China ai3d SDK, API2025-05-13. Image input comes from the actual fused portrait, not the unrelated preset. Model3.1, Geometry mode,100000faces, no PBR for the first geometry acceptance. Credentials remain private.env; do not infer them from DashScope credentials. No new task without explicitly invoking submit.

- [ ] Verify official SDK request/result definitions; test submit, query, timeout, log failure and duplicate prevention with mocked paid network boundary.
- [ ] Implement a small provider adapter with actual request accounting and no automatic submit retries.
- [ ] Add a CLI with submit/query/download commands. Persist JobId immediately and reserve a checkpoint before submit; ambiguous submission must block recreation. Query must never create jobs.
- [ ] Document local credentials, service activation, geometry acceptance and pending hair segmentation/cutting. Run tests/build and leave real generation pending until credentials/access exist.

Final integration into browser follows actual GLB geometry acceptance, head/hair separation and editing verification. Camera pinch and OBS recording remain pending. Existing unrelated changes stay intact; no publication or git commit.
