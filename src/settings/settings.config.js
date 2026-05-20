const SETTINGS_DEFAULTS = {
  soundFeedback: "off",
  reducedMotion: "system",
  highContrast: false,
  textSize: "normal",
  layoutDensity: "comfortable",
  autoAdvanceDemo: false,
  showJudgeNotesInDemo: true,
};

export const SETTING_OPTIONS = {
  soundFeedback: ["off", "low"],
  reducedMotion: ["system", "on", "off"],
  highContrast: [false, true],
  textSize: ["normal", "large"],
  layoutDensity: ["comfortable", "compact"],
  autoAdvanceDemo: [false, true],
  showJudgeNotesInDemo: [false, true],
};

export default SETTINGS_DEFAULTS;
