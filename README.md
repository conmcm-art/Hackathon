# food-bridge-v.01

## Play the game

Live playable version: https://jedbcov-coder.github.io/food-bridge-v.01/


## New: Python decision-support flow

- Decision engine now uses explicit rule tables for urgency, safety, NGO matching, and impact with score breakdowns for transparent reasoning and safety hard-fail guardrails.
- Supermarket form now drives a real calculation flow: urgency, safety risk, NGO ranking, explainable recommendation, and required human confirmation before delivery.
- Processing screen now shows a Python-style terminal replay + decision trace.
- Works with a local Python backend (`python backend/server.py`) and automatically falls back to local JavaScript when backend is offline.

## Beginner note

- Demo datasets are now split into focused files in `src/data/` (food items, organisations, scenarios, agent flow, delivery flow, and impact metrics) for easier maintenance.
- Brand text now lives in `src/brand/` (so copy updates are in one place).
- Shared visual styles are centralized in common style files/components where applicable, so screens stay consistent.

## Project name

FoodBridge AI

## What this app does

FoodBridge AI is an online playable demo that shows how extra supermarket food can be redirected to community groups and families instead of being wasted.

## Quick start (no install required)

1. Open the live demo link above.
2. Use the on-screen buttons and controls.
3. Follow the guided role flow (supermarket, NGO, delivery, and admin).
4. Explore the processing flow from listing to matching, pickup, and handoff.

You do **not** need to install anything to play this demo.

## Controls

- Start on the landing screen and use the on-screen buttons to enter the demo.
- On mobile, use the bottom action bar (`Home | Role | Next | Menu`) for quick navigation at any time.
- Open the role views to switch between supermarket, NGO, delivery, and admin perspectives.
- Follow the processing screens to move food through each stage.
- Use scenario choices and action buttons to test outcomes.
- Press `Escape` anytime to jump back to the home screen.
- Use `Tab`, `Enter`, and `Space` for full keyboard navigation.
- Check the impact dashboard to see meals, speed, and risk indicators.

## Main features


- **Config-driven brand copy:** Header (`name`, `tagline`), landing hero (`landingHeroHeadline`, `landingHeroIntro`, `landingHeroPitch`), and footer (`footerNote`) now come from `src/brand/brand.config.js` so core text is centralized in one place.
- **Semantic theme utility classes:** Added small semantic surface helpers (soft cards/actions + dark glass/outline) for repeated class clusters in `src/index.css`, then applied them in `App.jsx` and `Landing.jsx` without changing the visual design.
- **Device and accessibility end-to-end tests:** Playwright coverage now includes mobile, tablet, keyboard-only, reduced-motion, touch-target, and flow-reset checks under `tests/e2e/`.
- **Reusable state UI:** New shared Empty, Loading, Error/Warning/Blocked/Offline/Reset, and Success confirmation state components for consistent feedback messages across screens.
- **Role views:** Separate screens for each participant in the workflow.
- **Mobile-first navigation:** Sticky bottom bar with Home, current role badge, Next action, menu, progress steps, and restart demo action.
- **Flow recovery:** Restart demo, go back one step, and keep your current screen after page refresh.
- **Flow guidance:** Desktop breadcrumbs, progress bar, and a “What just happened?” note to explain simulated AI actions.
- **Guided processing flow:** Clear path from surplus listing to verified delivery.
- **Route handover trigger:** Confirming delivery in the Route and handover simulation now transitions directly into the minigame screen.
- **Mission context in minigame:** Confirming delivery now passes lightweight route context (delivery reference, destination, route name, and difficulty seed) so the minigame shows a short mission header with safe defaults if context is missing.
- **Impact dashboard:** Easy-to-read metrics showing outcomes.
- **Downloadable impact report:** The impact screen can now export a plain-text report with handover ID, key metrics, timestamp, and safety/ethics disclaimer (with on-screen summary fallback if downloads are blocked).
- **Canvas-style interface:** Preserved demo look and interaction flow for judging and walkthroughs.
- **Accessibility layer:** Skip link, stronger focus states, ARIA live updates, reduced-motion support, and sound controls (on/off, mute, volume).
- **User settings foundation:** Central settings defaults/provider for sound feedback, reduced motion, high contrast, text size, layout density, demo auto-advance, and judge notes visibility.





## Design documentation

The project now includes a rulebook in `docs/` so each change can point to a clear written standard:

- `docs/accessibility-checklist.md`
- `docs/device-test-matrix.md`
- `docs/design-system.md`
- `docs/performance-budget.md`
- `docs/sound-design.md`
- `docs/content-style-guide.md`

## Branding assets

Brand files are stored in `src/assets/brand/`:

- `logo.svg` (full app logo)
- `logo-mark.svg` (small header icon)
- `logo-horizontal.svg` (wide header/presentation)
- `logo-square.svg` (social preview/app tile)
- `favicon.svg` (browser tab)

Rule: avoid one large image reused everywhere. Use responsive images (`srcset`, `sizes`, and `<picture>`) for photos and rich media so browsers can choose the best size for each device and network condition.

## Styling setup

- This app uses local Tailwind CSS build tooling through Vite (`tailwind.config.js`, `postcss.config.js`, and `src/index.css`).
- `index.html` does **not** load Tailwind from the CDN.
- This keeps styles consistent between local development and production builds.

## Performance budgets

To keep the app fast as we add new assets, use these limits:

- Initial JavaScript: **under 250 KB compressed**
- Initial CSS: **under 75 KB compressed**
- Fonts: **max 2 font families, max 2 weights each**
- Logo: **SVG where possible**
- Sound files: **short, compressed, lazy loaded**
- Minigame bundle: **lazy loaded only when opened**
- Largest image: **responsive image sizing (no full desktop image on mobile)**

Core Web Vitals targets:

- **LCP** (loading speed): **2.5 seconds or less**
- **INP** (interaction speed): **200 ms or less**
- **CLS** (visual stability): **0.1 or less**

## Device optimization plan

Use the device test matrix before release: `docs/device-test-matrix.md`.

Test these viewport widths: **320px, 375px, 430px, 768px, 1024px, 1366px, 1440px+**.

## Deployment notes

- GitHub Actions builds and deploys this app automatically after changes are merged to the configured branch.
- Before deployment, CI now enforces beginner-friendly core checks in this order: `npm run lint`, `npm run test`, and `npm run build`.
- CI installs dependencies with `npm ci` so builds use the exact lockfile versions committed to the repo.
- End-to-end (Playwright) checks stay separate from deploy (`npm run test:e2e`) so deploy remains fast and focused on core safety checks.
- The project owner does **not** need to run deploy commands locally.
- The live GitHub Pages link above is the source of truth.

## Maintenance update (May 19, 2026)

- Cleaned up React import/style usage for current lint rules and removed ESM `__dirname` usage in Vite/Vitest config files to reduce lint noise without changing app behavior.
- Consolidated repeated landing/home visual class clusters into semantic reusable CSS utility classes (buttons, dark panel, and flow control button layout) with no visual redesign.
- Added two tiny semantic helper classes (`.flow-control-action` and `.cta-button-base`) to replace repeated style strings in `App.jsx` and `Landing.jsx` while keeping visuals unchanged.
- Added detailed AI scoring explainers in Marketplace and Match screens, including per-rule lines, grouped subtotals, and safe fallback text when breakdown data is missing.
- Updated Delivery flow gating so Confirm Delivery stays disabled until route simulation is fully completed, with a short helper message, then continues to the minigame once complete.

## Developer maintenance notes

These commands are for maintainers only and are **not** needed to play the demo.

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run check`
- `npm run test:e2e`


## Project guidance file

This project now includes a repository-level `AGENTS.md` file with app-specific guardrails for future vibe-coding sessions (small safe changes, preserve look/flow, keep README updated, and run checks after code edits).


## Architecture notes

- Added future-safe extension points for brand config, routes, screen registry, theme tokens, audio hooks, security placeholders, and hidden minigame registration.
- These changes are internal only and do not change the visible app behavior today.


## Local setup troubleshooting

If `npm run test` says `vitest: not found` or `npm run build` says `Cannot find module tailwindcss`, it usually means your npm packages are not fully installed yet.

1. Run `npm install`
2. Then run:
   - `npm run test`
   - `npm run build`

If install fails with `403 Forbidden`, your network/proxy/npm policy is blocking package downloads and must be fixed in that environment first.

## Responsive design tokens

To keep screen spacing and responsive grid behavior consistent, shared theme token files now live in `src/theme/`:

- `breakpoints.js` for named responsive breakpoints and class prefixes.
- `layoutTokens.js` for shared layout and grid presets.
- `densityTokens.js` for reusable comfy/compact spacing presets.

Use these tokens in screens/components instead of re-creating spacing/grid class strings each time.
