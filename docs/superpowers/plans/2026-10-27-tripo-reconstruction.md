# Tripo direct API reconstruction plan

User chose the independent Tripo website/API after considering Tencent and HuggingFace. Tencent work is suspended before any dependency installation or request. Use private TRIPO_API_KEY, never the DashScope key. V2 stops accepting requests2026-11-01 per official platform banner, so use V3.

- [ ] Verify V3 image generation, task query and upload documentation.
- [ ] Test provider parsing, authorization privacy, unknown usage and no-retry semantics before implementation.
- [ ] Add resumable submit/query/download CLI. Reserve a checkpoint before submit; preserve task_id immediately. Ambiguous submit requires manual reconciliation rather than another automatic paid task.
- [ ] Use model v3.1-20260211 with texture=false,pbr=false for first untextured geometry acceptance. Source is the actual fused portrait. No head/hair likeness guarantees.
- [ ] After actual artifact acceptance, implement hair separation and editing of that reconstructed model, then webcam pinch validation. An unrelated overlay groom fails acceptance.

Credentials and account quota remain the current external dependency. No chargeable task is created by installing/configuring/running offline tests. No publication or commits. Preserve existing unrelated work and keep the rejected local portrait prototype disabled.
