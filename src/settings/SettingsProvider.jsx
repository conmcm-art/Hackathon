import { createContext, useEffect, useMemo, useState } from "react";
import SETTINGS_DEFAULTS from "./settings.config";

export const SettingsContext = createContext(null);

function getSystemReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(SETTINGS_DEFAULTS);
  const [systemReducedMotion, setSystemReducedMotion] = useState(getSystemReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = (event) => setSystemReducedMotion(event.matches);

    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  const setSetting = (key, value) => {
    setSettings((previous) => ({ ...previous, [key]: value }));
  };

  const updateSettings = (updates) => {
    setSettings((previous) => ({ ...previous, ...updates }));
  };

  const reducedMotionEnabled = settings.reducedMotion === "system"
    ? systemReducedMotion
    : settings.reducedMotion === "on";

  const value = useMemo(() => ({
    settings,
    setSetting,
    updateSettings,
    reducedMotionEnabled,
    systemReducedMotion,
  }), [reducedMotionEnabled, settings, systemReducedMotion]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
