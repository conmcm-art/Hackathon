# Sound Design Guidelines

Sound should reinforce feedback, never distract.

## Principles
- Keep sounds short, subtle, and informative.
- Provide full user control: mute, volume, and on/off.
- Never block core actions if audio fails to load.

## Event mapping
- Success tone: completed step/confirmation.
- Alert tone: risk, blocked action, or important warning.
- Neutral click: optional lightweight UI feedback.

## Accessibility
- Do not rely on sound alone for meaning.
- Pair sound cues with visual text/icon feedback.
- Respect reduced-motion and user sound preferences.

## Technical constraints
- Prefer compressed formats.
- Lazy-load sound assets when practical.
- Normalize audio levels so no clip is unexpectedly loud.
