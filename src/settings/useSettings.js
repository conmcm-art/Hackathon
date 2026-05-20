import { useContext } from "react";
import { SettingsContext } from "./SettingsProvider";

export default function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return context;
}
