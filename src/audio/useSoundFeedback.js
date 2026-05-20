import soundManifest from "@/audio/soundManifest";

export default function useSoundFeedback() {
  const play = (eventName) => {
    const eventConfig = soundManifest[eventName];
    if (!eventConfig || !eventConfig.src) return;

    const audio = new Audio(eventConfig.src);
    audio.volume = eventConfig.volume ?? 0.3;
    audio.play().catch(() => {
      // Silent fallback placeholder until real audio assets are added.
    });
  };

  return { play };
}
