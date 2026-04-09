---
name: Build Progress
description: Running log of completed and pending work
type: project
updated: 2026-04-09
---

## Done

- Designed and implemented PromptPixel.ahk (AutoHotkey v2 script)
- Integrated screenshot capture with Win32 API calls
- Integrated Tesseract OCR via command line
- Integrated Claude API for AI validation and context enrichment
- Implemented clipboard override and timestamp logging
- Tested core functionality (screenshot → OCR → API → clipboard)
- Committed source code to git
- Created build.bat script for .exe compilation
- Tested build process successfully
- Created comprehensive 5-step deployment plan
- Explained AutoHotkey installer behavior to Russell (safe to close running script)
- **AutoHotkey v2 installer completed successfully**
- **Compiled PromptPixel.exe (1.3MB) via Ahk2Exe**
- **Verified .exe survived Windows Defender/ThreatDown scanning**
- **Tested PromptPixel.exe live**: Settings GUI responsive, hotkey (Ctrl+Alt+S) functional, screenshot capture and paste confirmed working in VS Code
- **Designed application icon** (PromptPixel.ico and .png): rounded square, gradient blue, pixel grid "P", chat bubble with dots
- **VirusTotal scanned PromptPixel.exe v1.0.1**: **0/72 detections** — production-ready
- **GitHub CLI authenticated and v1.0.1 Release published** with VirusTotal link and .exe binary
- **v1.1.0 branch reverted entirely**: Rolled back to clean v1.0.1 source from GitHub due to picker positioning bugs, deleted corrupted settings.ini
- **v2.0.0 C# rewrite scaffolded** with WinForms tray icon, hotkey manager, and modular architecture
- **v2.0.0-alpha features complete**: fullscreen capture, region capture, Settings GUI, toast preview, capture history (3 slots), prompt picker (21 default prompts, scrollable), first-launch welcome screen, MakoBytes branding, file logger, crash hooks
- **v2.0.0-alpha r30 locked**: All free-tier features shipped and tested, foundation stable for Pro features
- **Synced private GitHub repo** (PromptPixel-Source): r14–r30 pushed, 1,883 lines added across 9 files
- **Documented public release blockers**: License keys, VirusTotal v2 scan, marketing landing page, pro feature completion
- **Created v2 launch sequence**: 8-step roadmap from features → license → scanning → marketing → public release
- **Shipped r50–r55**: Multi-target hotkeys support added, remove button styling fixed, capture history UI refined
- **Documented Stop hook setup**: Fix provided for "Bash permission denied" error — Russell to add Bash to ~/.claude/settings.json allow-list and restart
- **Code-signing strategy locked**: Azure Trusted Signing ($120/yr, cloud-based, instant SmartScreen) selected over traditional EV/OV certs ($200–500/yr, hardware token)
- **Buy button next step clarified**: Settings-based URL configuration (Option B) is recommended over hardcoding for future flexibility
- **r64 custom license buy URL feature complete**: Added `AppSettings.LicenseBuyUrl` field with Settings UI textbox; `LicenseService.GetBuyUrl()` returns override if set else defaults to `PRICING_URL`; both "Buy" button and tray toast upsell use `GetBuyUrl()`; bonus fix: Settings Save block now preserves all license activation state (`AlphaMode`, `LicenseKey`, `LicenseStatus`, etc.) across form saves
- **Stop hook configuration verified**: settings.json now correctly configured with `defaultMode: "acceptEdits"`, `Write` and `Bash` in allow-list, 45s timeout — hook ready for next resume cycle
- **Payment provider research completed**: Evaluated Paddle, Polar.sh, FastSpring, Keygen, Cryptolens; Polar.sh recommended as best fit (MoR, native license API, responsive support)
- **Polar account review blocker diagnosed**: Found the required Account Review gate (Polar's MoR/anti-fraud compliance step); documented 10-item review form checklist; identified makobytes.com site-live requirement as #1 failure point
- **Polar product creation completed**: Created PromptPixel listing with $25.00 one-time purchase, License Key benefit fully configured, live checkout URL generated and verified
- **Polar customer-portal endpoints verified**: Confirmed validate, activate, deactivate endpoints require **zero authentication** — only organization_id (public UUID) needed in requests
- **License validation architecture simplified**: No proxy, no Cloudflare Worker, no embedded tokens required — pure client-side calls to Polar customer-portal with public org_id
- **r65 refactor plan locked**: Will bump BuildInfo.cs, refactor LicenseService.cs to use customer-portal endpoints, switch FormUrlEncoded→JSON, add org_id field, map response fields
- **r65 built and verified**: Build stamp correct (v2.0.0-alpha · build 2026-04-09-r65), License tab loads, Polar checkout URL displaying, all license buttons (Activate/Deactivate/Buy) present and wired
- **r66 built and verified**: Hardcoded Polar checkout URL in LicenseService.cs, removed BUY URL field from UI, removed stale LemonSqueezy helper text references
- **First real sale completed on Polar**: $25 PromptPixel order processed, invoice generated (MAKO-LOGICS-LLC-TMFPONMMUN-0001), order appears in Polar dashboard with Paid status
- **Created makobytes.com landing page**: Dark premium design with Viktor Oddy style, glassmorphism effects, responsive layout, PromptPixel feature showcase, $25 pricing, Polar buy link integration, updated to blue/silver/grey/white color scheme with Main Logo.png branding, added comprehensive SEO meta tags and structured data, expanded to software catalog with products section, created dedicated PromptPixel product page with features, screenshots, and detailed information
- **Rebuilt makobytes.com as Next.js 14 project**: Full TypeScript + Tailwind + shadcn scaffolding, Spline Whobee robot integrated in hero, inline SVG brand mark, all landing sections ported, 18 files + 1175 lines total, local build verified
- **Committed Next.js rebuild locally**: Commit `0fdc92d` created on main branch with full source code

## In Progress / Next Up

1. **Resolve GitHub email privacy push conflict**: Either disable "Block command line pushes that expose my email" in github.com/settings/emails, OR provide noreply email for re-commit
2. **Re-run push to GitHub**: Once email issue resolved, execute git push to upload makobytes.com rebuild
3. **Verify Vercel integration**: Check if repo already connected to Vercel; if yes, auto-deploy will trigger on push; if no, complete initial setup
4. **Verify live deployment**: Test makobytes.com live URL, confirm DNS + Vercel serving site correctly
5. **Continue PromptPixel licensing flow**: Return to license key delivery verification (Polar benefit grant status)

## Blocked / Waiting On

- **License key delivery clarification** — Investigating Polar dashboard structure to determine if benefit was actually granted; may require product reconfiguration
- **Polar account review** — Paused until license key flow is verified to work end-to-end
- **makobytes.com status** — Site must be live or properly parked before final review submission

## Notes

- v2.0.0-alpha r30 is clean, tested, and ready for feature additions
- Delayed capture recommended for momentum: high value, minimal risk, sets pattern for shipping features
- OCR remains the biggest remaining task (~Windows.Media.Ocr integration)
- All code for r64 is finalized and ready for build
- Stop hook fully operational — no more manual memory saves needed after this session
- Phase 1 can proceed in parallel: Russell builds/scans while Claude scaffolds landing page
- License key validation required before actual paid selling (LemonSqueezy handles this)
