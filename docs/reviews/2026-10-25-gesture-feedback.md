# Gesture sensitivity and visible-cut feedback

## Observed evidence

The learner allowed the camera, then reported recognized gestures without enough visible hairstyle change. They subsequently confirmed that some real closures do cut, but response feels insensitive. This is evidence of partial live functionality, not a measured success rate.

Read-only live DOM inspection found playing 640x480 video, readyState 4, changing hand status, and displayed worker inference around 111–129ms per frame. No user webcam frame was saved or transmitted. Cut-count increases alone do not establish input source because mouse cutting shares the scene.

## Diagnosis and changes

The landmark model locates joints; product code interprets an opening/closure and edits hair. No model retraining was done. A brief closure can occupy only one sample at the observed cadence, while the previous rule needed two closed samples. A stable armed opening plus a normalized gap decrease of at least 0.35 now confirms one fresh closed sample. Small changes still require 55ms confirmation. Existing lost-hand, stale-result, hand-switch, pose and focus guards remain.

The original gesture reused one pointer-move trim. That could remove too little for a visible silhouette change or the 0.35-segment falling-fragment threshold. A discrete snip now performs a bounded full trim. Mouse drag increments remain unchanged. The hit test sampled ceil(cut) on the original curve, including previously removed tip positions; it now interpolates the actual visible tip. Detached fragment endpoints are clipped to the real removed section, including fractional boundaries.

The camera panel separately shows recognized closures and successful hair hits. The HUD counts edited strand sections rather than implying one count per physical gesture.

## Controlled browser check

An ignored local test page at test-assets/haircut-check.html imports the real scene and calls the same snipAt operation used by live hand closure. Before and after captures are taken synchronously around that operation; falling fragments are hidden in these captures to show persistent geometry. The AI-generated example portrait is used. This test never opens a camera and does not establish recognition accuracy.

At canvas center x=50%, y=26%, the first snip affected 204 strand sections and removed about 1009.27 virtual curve segments. The front-zone remaining value changed from 100% to 95%; the screenshot shows a shorter central fringe. A second snip at the same point affected 134 sections and removed about 423.22 virtual segments, taking the front-zone value to 93%. Virtual curve lengths are not centimeters and are not individual real hairs.

Before/after screenshot is saved locally at C:/Users/20651/.codex/visualizations/2026/10/23/01a1661f-c5cc-7143-86c9-d0d8917369c8/HairFit-one-snip-comparison.png. The harness remains a local diagnostic, outside the public app flow.

## Verification and remaining check

Regression tests cover a single captured closure at 8fps, small-gap noise requiring confirmation, continuous hold suppression, actual vertex shortening/reset, fractional visible-tip and detached-fragment bounds, repeated shortening and fine mouse increments. Final commands passed: npm test 37/37, npm run build (586.05kB main chunk warning remains), git diff --check exit 0. An independent read-only reviewer also ran 37/37 tests plus 218 geometry boundary checks and found no Critical or Important issue in the final change.

Refresh the main app, aim at visible hair tips, and try ten distinct open/close actions. Compare the two camera-panel counters, then hold closed and take the hand out of frame to check for unintended cuts. Live sensitivity, false-positive rate and device variability remain unmeasured. No final-ready checkbox is checked and no public submission is made.

No new paid model request was made. Camera inference is local, with no third-party API token usage added in this batch.
