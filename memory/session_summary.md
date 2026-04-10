---
name: Session Summary
description: Latest session state for resuming work
type: project
updated: 2026-04-10
---

## What happened

Russell pivoted the makobytes.com hero from a static 3D robot (Spline + Meshy .glb) to a talking robot explainer video. After ~2 hours exploring interactive 3D (merged materials, no rig, blinking workaround complexity), decided video sells the product better than decoration. Locked full 4-step production workflow: script → voice (ElevenLabs) → video animation (Hedra/HeyGen/D-ID) → embed mp4 in hero. Created `project_hero_direction.md` documenting the pivot and workflow.

## What's now in place

- **Hero pivot decision finalized**: Talking video explainer > decorative 3D model
- **3-script options drafted** (cheerful 30s, short 15s, funny 20s) — Russell to pick vibe
- **Production workflow locked**: ElevenLabs (voice), Hedra (video animation), HTML5 `<video>` embed
- **Fallback preserved**: Meshy `.glb` and R3F code kept until video is ready
- **Team structure clear**: Russell handles tools (script voice, Hedra animation), Claude handles code (video embed, captions, bundle cleanup)

## Next step when Russell returns

1. **Pick script vibe**: Cheerful, funny, or techy? Reply with which of the 3 options
2. **Generate voice**: ElevenLabs free tier → pick voice → generate mp3 from final script
3. **Animate robot**: Hedra (recommended) → upload 2D robot PNG from earlier Meshy run → upload mp3 → generate mp4 (takes ~2-5 min)
4. **Drop video in public/**: Place `whobee.mp4` in `public/` folder, reply with filename
5. **I embed in hero**: Remove R3F, swap HTML5 video, add captions, optimize bundle

## Important context

- 2D robot PNG: Should still exist from earlier Meshy Text-to-Image run (generated ~2026-04-09). If lost, regenerate via Meshy in 30 seconds
- Video tools all free tier: ElevenLabs 10k chars/month (enough for 30s script), Hedra 1 generation free, worst case $10-20 one-time
- Whobee (robot mascot) is now a talking character, not a 3D asset — product narrative > 3D eye candy
- R3F bundle bloat: three.js dependencies (~500 KB) can delete once video is live
