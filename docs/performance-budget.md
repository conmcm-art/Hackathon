# Performance Budget

Budgets help keep the app responsive as features grow.

## Budget targets
- Initial JavaScript (gzipped): **<= 250 KB**
- Initial CSS (gzipped): **<= 75 KB**
- Largest image on first screen: **<= 150 KB**
- Web fonts: **max 2 families, max 2 weights each**
- Main-thread long tasks (>50ms): keep rare during startup

## Runtime goals
- First screen should feel interactive quickly on mid-range phones.
- Avoid layout shifts for key UI (buttons, headers, nav).
- Lazy-load optional/secondary modules (e.g., minigame or heavy panels).

## Guardrails for changes
- Prefer SVG for logos/icons.
- Compress audio and keep clips short.
- Do not auto-play heavy media.
- Reuse existing dependencies before adding new ones.

## Check process
1. Run build and inspect bundle output.
2. Verify critical route on mobile viewport.
3. Compare with previous baseline before merging.
