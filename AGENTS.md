# AGENTS.md — food-bridge-v.01

Scope: this file applies to the entire repository.

## Stack and structure
- Keep the app in React + Vite.
- Keep styling in the current CSS/Tailwind approach.
- Preserve the existing feature-folder structure under `src/features` unless a change request says otherwise.

## Change policy
- Prefer the smallest safe change that solves the request.
- Do not redesign visuals or interaction flow unless explicitly asked.
- Do not remove existing features unless explicitly asked.
- Avoid adding new dependencies unless truly necessary.

## Quality checks
- After code changes, run (when available):
  1) `npm run lint`
  2) `npm run test`
  3) `npm run build`
- If a command fails, report the failure plainly and fix if possible.

## Documentation
- Keep `README.md` beginner-friendly.
- Keep the live playable GitHub Pages link near the top of `README.md`.
- Update README when app behavior, setup, or deployment details change.
