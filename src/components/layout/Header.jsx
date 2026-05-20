import { Volume2, VolumeX } from "lucide-react";
import LogoLockup from "@/components/ui/LogoLockup";
import { ariaLabels } from "@/accessibility/ariaLabels";
import DesktopNav from "@/components/layout/DesktopNav";

export default function Header({ screen, setScreen, role, setRole, soundEnabled, setSoundEnabled, muted, setMuted, volume, setVolume, progress }) {
  return (
    <div className="sticky top-0 z-30 border-b border-white/60 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <button onClick={() => setScreen("landing")} aria-label={ariaLabels.appHome} className="flex min-h-11 items-center gap-3 text-left">
          <LogoLockup />
        </button>

        <DesktopNav screen={screen} setScreen={setScreen} setRole={setRole} progress={progress} />

        <div className="flex items-center gap-2">
          <button aria-label={ariaLabels.soundToggle} onClick={() => setSoundEnabled(!soundEnabled)} className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-semibold">{soundEnabled ? "Sound on" : "Sound off"}</button>
          <button aria-label={ariaLabels.muteToggle} onClick={() => setMuted(!muted)} className="flex min-h-11 items-center rounded-xl border border-slate-200 px-3">{muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}</button>
          <input aria-label={ariaLabels.volumeControl} type="range" min="0" max="100" step="10" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="h-11" />
        </div>
      </div>
    </div>
  );
}
