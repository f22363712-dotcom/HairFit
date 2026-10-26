# HairFit asset provenance

Updated 2026-10-24 after the learner pointed to the expanded asset inventory in handoff-to-codex.md.

| Asset | Confirmed facts | Origin / public-use evidence |
| --- | --- | --- |
| test-assets/person.jpg | 1024x1024 JPEG; frontal portrait used as the sample personal input. Listed at handoff-to-codex.md:28. | Learner confirmed on 2026-10-24 that this input image was AI-generated specifically for HairFit. Exact generator/job was not supplied; no external stock-photo source is asserted. |
| test-assets/hairstyle.jpg | 1024x1024 JPEG; textured-curly-crop reference used as the sample target input. Listed at handoff-to-codex.md:29. | Learner confirmed on 2026-10-24 that this input image was AI-generated specifically for HairFit. Exact generator/job was not supplied; no external stock-photo source is asserted. |
| test-assets/last-generated-preview.png | 1024x1024 PNG. Handoff line 30 identifies it as an actual Qwen-Image output from the two sample inputs. Prior request records exist in logs/model-usage.jsonl. | Generated-output origin is documented. Learner also confirmed both input images were AI-generated specifically for this project. |
| public/test-assets/ | Static mirror of the local sample files, documented at handoff-to-codex.md:31. | Contains copies of the project-specific AI sample assets above. |

## Learner confirmation

On 2026-10-24 the learner wrote: “是的，这两张图也是为项目用 AI 生成的，记录好后继续实现真正的双指开合剪发。” This resolves the unknown origin of person.jpg and hairstyle.jpg as project-specific AI-generated examples. It does not establish a particular generation provider or a blanket legal determination about generated assets.

No further source question is pending for development. Label bundled examples as AI-generated demonstration assets. Keep this record with eventual attribution notices.

## Anatomical template added 2026-10-25

The generic head/shoulders derive from MakeHuman hm08 base.obj and the core asian-male-young graphical target. Eyes are fitted through the corresponding high-poly.mhclo asset. The core young_asian_male skin and brown-eye textures use native UVs, with no user-face projection. These are licensed CC0-1.0, not AI-generated HairFit people. No MakeHuman program source is included.

The official license distinguishes graphical assets from program code at https://github.com/makehumancommunity/makehuman/blob/master/LICENSE.md . The system asset-pack listing explicitly marks these materials CC0 at https://static.makehumancommunity.org/assets/assetpacks/makehuman_system_assets.html . Exact members, sources and SHA-256 hashes are in public/models/head-template-provenance.json. The full asset license is public/models/LICENSE.MAKEHUMAN.ASSETS.txt. Processing is reproducible with scripts/prepare-head-template.py after obtaining the listed source assets. These generic features do not establish an individual's head shape or identity.

## Public pinch validation images added2026-10-26

These are local test fixtures, not user webcam captures and not hairstyle assets. No raw public-hand joints were added to production or persisted in numeric reports.

- test-assets/hand-check/pinch-cc0.jpg: Wikimedia File:OK Hand Gesture (cropped).jpg, faceofwiki, uploaded crop by Morganfitzp. CC0-1.0. Source https://commons.wikimedia.org/wiki/File:OK_Hand_Gesture_(cropped).jpg ; unchanged downloaded pixels.
- test-assets/hand-check/pinch-keys.jpg: Wikimedia File:OK Sign.jpg, original author Steven H. Keys / keysphotography.com. CC-BY2.5 https://creativecommons.org/licenses/by/2.5 . Source https://commons.wikimedia.org/wiki/File:OK_Sign.jpg ; this project's copy unchanged. The source page itself records background edits predating this download. Retained as a known failed back-of-hand detection challenge.

## Real three-view stock references added2026-10-27

Local set test-assets/public-portraits/inverted-bob contains unchanged2304x2304front/side/rear photographs by Thirteen Of Clubs (Flickr74163253@N00), shot2010-07-18. Commons imageinfo extmetadata returned CC BY-SA2.0 for all three exact files. Each image was visually inspected for suitable framing and session consistency, without identity recognition. Source URLs, SHA256 and an English credit are in the set's manifest.json and ATTRIBUTION.md. The ZIP includes all three originals plus those records.

Source pages https://commons.wikimedia.org/wiki/File:Inverted_bob_haircut_(front).jpeg ; https://commons.wikimedia.org/wiki/File:Inverted_bob_haircut_(side).jpeg ; https://commons.wikimedia.org/wiki/File:Inverted_bob_haircut_(rear).jpeg . License https://creativecommons.org/licenses/by-sa/2.0/ permits sharing/adaptation including commercial use subject to attribution and ShareAlike conditions; adapted public images need appropriate license/changes notice. No separate model release was established. Do not imply the subject is a user or endorser. These images are locally collected candidates, not automatically included in the public app or sent to Qwen. Existing test-assets ignore rule remains.


## Selected pixie reference2026-10-27
Bernie's haircut by Marc Majcher, CC BY-SA2.0,1200x1600originalJPEG. Source https://commons.wikimedia.org/wiki/File:Bernie%27s_haircut.jpg . Metadata and SHA256 recorded in test-assets/public-portraits/reference-pixie-bernie.json; attribution terms in REFERENCE-ATTRIBUTION.md. Visually inspected and selected in local app with the learner-authorized three-view bob portraits. No Generate click/API call by assistant.

## Tripo image-conditioned geometry experiment 2026-10-27

Generated one untextured segmented GLB with Tripo CN V3(v3.1-20260211) from the Qwen-fused public-stock portrait, not a stock head template. Original sources retain the credits documented above. Input PNG/source hash and output SHA256/usage are in docs/reviews/2026-10-27-tripo-real-generation.json. Artifact test-assets/tripo-proof/model.glb is local/ignored, pending likeness and editing acceptance; no public redistribution performed. Provider output terms and source adaptation attribution must accompany any eventual published sample. Side/back geometry is model inference, not captured ground truth.
