# Accessibility Checklist

Use this checklist before merging UI changes.

## Keyboard and focus
- [ ] Every interactive element can be reached with `Tab`.
- [ ] Focus order is logical (top-to-bottom, left-to-right).
- [ ] Focus indicator is clearly visible on all controls.
- [ ] `Enter`/`Space` activate buttons and custom controls.
- [ ] `Escape` behavior is predictable for dialogs/overlays.

## Semantics and labels
- [ ] Buttons, links, and inputs have clear accessible names.
- [ ] Form fields are associated with labels.
- [ ] Headings follow a clear hierarchy (`h1` -> `h2` -> `h3`).
- [ ] Landmark regions exist where useful (`header`, `main`, `nav`, `footer`).

## Color and readability
- [ ] Text contrast passes WCAG AA (normal and large text).
- [ ] Important state is not shown by color alone.
- [ ] Body text remains readable at 200% zoom.
- [ ] Line length and spacing remain comfortable on mobile and desktop.

## Motion and feedback
- [ ] Reduced motion mode is respected.
- [ ] Auto-advancing content can be paused/stopped.
- [ ] Status updates are announced with ARIA live regions when needed.

## Touch and mobile
- [ ] Tap targets are large enough (roughly 44x44 px minimum).
- [ ] Controls have enough spacing to avoid accidental taps.
- [ ] Orientation changes do not hide critical actions.

## Media
- [ ] Images have useful alt text (or empty alt when decorative).
- [ ] Audio feedback has mute/volume controls.
- [ ] Any video has captions/transcript (if added later).

## Manual checks
- [ ] Keyboard-only smoke test passes.
- [ ] Screen reader quick pass (VoiceOver/NVDA) for key user flow.
- [ ] Mobile accessibility pass on at least one small-screen device.
