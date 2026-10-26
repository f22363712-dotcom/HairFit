---
doc: scope
status: approved
---

# HairFit

One line: Upload a hairstyle you want and your own photo, preview it on yourself, then continue into a physical-feeling 3D haircut before sitting in the barber chair.

## The Unique Kernel

HairFit connects a familiar decision input to a distinctive action. The user begins with a photo of themselves and a hairstyle they already want. A real two-image AI preview shows the direction on their face, then a 3D rehearsal lets them sweep a hand or pointer through hair, see a clump fall, and shape the result directly.

## Who It's For

Someone who is about to get a haircut, already has a target hairstyle image, and wants to know how that direction might look on them. Today they compare another person's reference photo with their own face or ask a stylist to predict the result. They want more confidence before a change that may take weeks or months to grow out.

## The Core Loop

The user uploads their own photo and a hairstyle reference, then generates a realistic preview. The preview becomes the visual target. From there, the user enters a 3D cutting sandbox on a built-in head, moves around it, and cuts hair with a hand gesture or the mouse. A simulated clump visibly falls, and the hairstyle updates. Repeated cuts let the user explore the three-dimensional direction rather than stop at one generated image.

## Inspiration & Identity

HairFit should feel like turning a saved hair inspiration into a playful virtual barber chair. The first result is personal and photographic; the second experience is tactile and exploratory. The mood is curious and stylish without presenting either preview as a guaranteed professional haircut.

## Why This Matters to the Learner

The learner wants to remove the frustration of discovering an unsuitable haircut only after it is too late. The product should let someone start with the hairstyle they already want, visualize that direction on their own face, and then form a clearer judgment through direct manipulation.

## What "Working" Looks Like

A user uploads a clear selfie and an image of a desired hairstyle. HairFit generates a realistic preview that preserves the user's recognizable face while applying the reference hairstyle direction. The user then enters a rotatable 3D cutting sandbox, sweeps a hand or pointer through a hair region, and sees a clump separate and fall while the hairstyle updates. The memorable proof is the two-photo transformation followed by one complete virtual cut with visible falling hair.

## The POC Boundary

The first version performs one real two-image edit from an uploaded selfie and hairstyle reference. It then uses one built-in stylized 3D head for a continuous cut-and-fall interaction with hand gesture and pointer input, visible hair loss, an updating hairstyle, and a way to reset the experiment. The experience must run end to end on a desktop browser and be understandable in a short screen recording. The 3D stage is not presented as a reconstruction of the uploaded person.

## Later

- Revisit personalized 3D representation only if a later technique can support reliable capture and direct hairstyle editing.
- Simulate washing, blow-drying, styling, and hair physics across different hair types.
- Offer automated suitability guidance and explain the recommendation.
- Export the result as a communication card for a stylist.
- Add session history, personal accounts, and multiple hairstyle presets.

## Explicitly Cut

- Personal 3D reconstruction is cut from this POC. The uploaded-person stage uses a real AI image preview while the 3D stage remains a built-in rehearsal head.
- Gaussian-splatting reconstruction through OOOSplat, LAM, FaceLift, or similar tools is excluded because it adds desktop or GPU dependencies and does not provide directly editable hair strands.
- Wash, cut, and blow-dry become later stages because the first version needs one coherent cut interaction instead of three simulation modes.
- Automatic suitability scoring is postponed because a score would not prove that the preview interaction helps a user judge the result.
- Stylist export and sharing are postponed until the preview itself is convincing.
