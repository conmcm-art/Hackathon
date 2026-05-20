# Device Test Matrix

Use this matrix for release checks and big UI changes.

| Device class | Example viewport | Browser | Priority | What to verify |
|---|---:|---|---|---|
| Small phone | 360x780 | Chrome (Android) | P0 | Bottom nav, tap targets, no horizontal scroll |
| Large phone | 430x932 | Safari (iOS) | P0 | Safe-area spacing, gesture comfort, role flow |
| Tablet portrait | 768x1024 | Safari/Chrome | P1 | Layout balance, touch + keyboard support |
| Tablet landscape | 1024x768 | Safari/Chrome | P1 | Toolbar wrapping, panel widths |
| Laptop | 1366x768 | Chrome | P0 | Main demo flow, performance, accessibility |
| Desktop HD | 1920x1080 | Chrome/Firefox | P1 | Spacing, readability, no oversized empty gaps |

## Test scenarios (minimum)
1. Open app and start demo.
2. Complete one full role flow.
3. Restart/reset flow.
4. Navigate with keyboard only.
5. Toggle reduced motion and sound settings.
6. Refresh page and verify recovery behavior.

## Result template
- Date:
- Tester:
- Commit:
- Devices covered:
- Issues found:
- Pass/Fail:
