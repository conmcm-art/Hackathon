import { useEffect } from "react";

export function useEscapeToGoHome(onEscape) {
  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape") onEscape();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onEscape]);
}
