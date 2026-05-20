# Remediation Plan: From Demo Flow to Credible Decision Prototype

## What this plan targets
This plan addresses the issues in the assessment report while keeping changes small, beginner-friendly, and aligned with the current React + Vite structure.

## Quick assessment of current state
- The app currently re-exports fixed demo datasets through `src/data/demoData.js`, so much of the flow starts from static values.
- The supermarket form already captures user edits and sends them to the decision step, but downstream screens still use fixed wording and fixed impact metrics in places.
- Role protection is a placeholder: all screens are marked `public`, and access check only allows `public`.
- Sound controls exist, but audio sources are empty in the manifest.
- Settings include a strong foundation, but several options are not visibly applied across screens.

## Prioritized targeted actions

### Priority 1 — Ensure user-submitted donation drives the whole journey
**Goal:** make the app feel genuinely data-driven.

1. **Create a single “active donation” object in central app state** (in the top-level flow state, not local component-only state).
2. **Populate it from the supermarket submit action** and persist it until reset.
3. **Update all downstream screens** (match, receipt, impact) to read from active donation first, with demo fallback only if no donation exists.
4. **Add a flow reset path** that clears active donation and derived outputs.

**Success check:** if user changes food name/quantity/expiry/branch, those same values appear later in Match, Receipt, and Impact.

---

### Priority 2 — Add a simple deterministic match scoring engine
**Goal:** make recommendations feel earned, not prewritten.

1. **Implement a small scoring module** (e.g., in `src/lib/`) with explicit factor weights:
   - Distance
   - Expiry urgency
   - Storage compatibility
   - Food type suitability
   - Capacity fit
   - Reliability
2. **Return both total score and factor breakdown** for each NGO.
3. **Sort NGOs by computed score** and choose top as recommendation.
4. **Show the score breakdown in Match UI** using simple labels (“Distance: 18/20”, etc.).

**Success check:** changing donation details produces a different ranking and recommendation.

---

### Priority 3 — Make impact report computed from donation + decision result
**Goal:** replace fixed end-state metrics with traceable outputs.

1. **Replace `impactMetrics`-only rendering with computed metrics** derived from:
   - donation quantity / estimated weight
   - selected NGO
   - route distance/time assumption
2. **Compute core values with clear rules** (simple formulas, documented in code comments):
   - Meals created
   - Food rescued
   - Estimated value
   - Cost per meal
   - CO₂e avoided
3. **Show the assumptions block** in Impact so judges/reviewers understand calculations.

**Success check:** changing quantity or weight changes meals/cost/value in final report.

---

### Priority 4 — Make “Download Report” a real action
**Goal:** provide a meaningful completion step.

1. **Generate a basic report payload** from active donation + selected NGO + impact metrics.
2. **Support one beginner-friendly export first:**
   - JSON download (`foodbridge-report-<handoverId>.json`) as first milestone.
3. **Optional next:** add print-friendly HTML/PDF-style view using browser print.

**Success check:** clicking download produces a file with real values from the run.

---

### Priority 5 — Resolve sound-control mismatch
**Goal:** avoid “looks enabled but does nothing.”

Recommended beginner-safe path:
1. **Short-term (fast):** label sound as “planned” in UI while no assets are wired.
2. **Then enable minimal working sounds:** add at least click/success files and connect manifest paths.

**Success check:** either honest “planned” messaging is visible, or audible feedback works when setting is on.

---

### Priority 6 — Clarify security state (planned vs active)
**Goal:** prevent false confidence.

1. **Add explicit mode flag** (e.g., `securityMode: 'demo' | 'active'`).
2. In demo mode, **show a banner**: “Role access simulated; restrictions not enforced.”
3. If moving to active mode, **define minimal role map** and lock at least one admin-only screen.

**Success check:** reviewers can clearly tell whether role controls are real or simulated.

## Settings follow-through plan (cross-cutting)
Apply existing settings visibly in small increments:
1. High contrast: apply root class and token overrides.
2. Text size: apply root font-size multiplier.
3. Layout density: adjust spacing scale in shared layout components.
4. Reduced motion + auto-advance + judge notes visibility: ensure every relevant screen reads these flags.

**Success check:** toggling each setting causes a visible, predictable UI change.

## Implementation sequence (recommended)
1. Central active donation state.
2. Scoring engine + match breakdown.
3. Computed impact report.
4. Download report action.
5. Sound status cleanup.
6. Security mode clarity.
7. Remaining settings visibility polish.

## Validation checklist after each milestone
Run:
1. `npm run lint`
2. `npm run test`
3. `npm run build`

Then manual checks:
- Change donation fields and confirm downstream updates.
- Verify ranking changes when expiry/quantity/storage changes.
- Confirm Download produces a populated file.
- Confirm settings toggles visibly alter UI.
- Confirm security banner/behavior matches configured mode.
