# Design System (Lightweight)

This is a practical rulebook for consistent UI decisions.

## Core principles
1. **Clarity first**: UI should explain the next action clearly.
2. **Consistency over novelty**: reuse existing patterns before adding new ones.
3. **Accessible by default**: keyboard, contrast, and readable copy are non-negotiable.
4. **Mobile-first**: confirm behavior on small screens before desktop polish.

## Layout rules
- Reuse existing page shell, section spacing, and card styles.
- Keep key actions visible without scrolling when possible.
- Avoid introducing new layout systems unless needed.

## Components
- Prefer existing shared state components (`Empty`, `Loading`, `Error`, `Success`, etc.).
- Reuse existing button styles and sizes.
- Use one primary action per section; secondary actions should be visually quieter.

## Typography
- Keep headings short and plain.
- Use sentence case for labels and buttons.
- Avoid dense paragraphs in critical flows; prefer short blocks/bullets.

## Color and states
- Keep current palette and semantic state colors.
- Each state (success/warning/error/info) should include icon/text, not color alone.

## Interaction
- Keep interaction flow unchanged unless explicitly requested.
- Use progressive disclosure: show advanced details only when needed.
- Confirm destructive or irreversible actions.
