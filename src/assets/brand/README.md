# Brand assets

Use these files for consistent branding.

| Asset | Use |
| --- | --- |
| `logo.svg` | Full app logo |
| `logo-mark.svg` | Small icon in header |
| `logo-horizontal.svg` | Wide header or presentation use |
| `logo-square.svg` | Social preview or app tile |
| `favicon.svg` | Browser tab |

## Image and logo rules

- Avoid one large image that gets used everywhere.
- For future photos or rich images, always use responsive image methods.
- Use `srcset`, `sizes`, and `<picture>` so the browser can choose the right image size.
- This improves performance on different screen sizes and device conditions.

MDN explains that responsive images help performance across devices, and modern browsers support `srcset`, `sizes`, and `<picture>`. MDN also explains that `srcset` and `sizes` help the browser choose a suitable image for screen size, pixel density, zoom, orientation, and network speed.
