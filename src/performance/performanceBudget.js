export const PERFORMANCE_BUDGET = {
  initialJavaScriptKbCompressed: 250,
  initialCssKbCompressed: 75,
  fonts: {
    maxFamilies: 2,
    maxWeightsPerFamily: 2,
  },
  logo: {
    preferredFormat: 'svg',
  },
  audio: {
    guidance: 'Use short, compressed files and lazy load when needed.',
  },
  minigame: {
    loadStrategy: 'lazy',
    note: 'Load only when the player opens the minigame.',
  },
  images: {
    largestImageRule:
      'Use responsive image sources. Avoid sending full desktop images to mobile devices.',
  },
  webVitals: {
    lcpSecondsTarget: 2.5,
    inpMillisecondsTarget: 200,
    clsTarget: 0.1,
  },
};

export const PERFORMANCE_BUDGET_SUMMARY = [
  'Initial JavaScript: under 250 KB compressed',
  'Initial CSS: under 75 KB compressed',
  'Fonts: max 2 families and max 2 weights each',
  'Logo: prefer SVG where possible',
  'Audio: short, compressed, lazy loaded',
  'Minigame bundle: lazy loaded only when opened',
  'Largest image: responsive for device size',
  'Core Web Vitals targets: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1',
];
