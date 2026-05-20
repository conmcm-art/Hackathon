import { Volume2, VolumeX } from "lucide-react";
import cx from "@/utils/cx";
import routes from "@/app/routes";
import LogoLockup from "@/components/ui/LogoLockup";
import StatusBanner from "@/components/ui/StatusBanner";
import { ariaLabels } from "@/accessibility/ariaLabels";

function Header({ screen, setScreen, role, setRole, soundEnabled, setSoundEnabled, muted, setMuted, volume, setVolume }) {
  return (
    <div className="sticky top-0 z-30 border-b border-white/60 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <button onClick={() => setScreen("landing")} aria-label={ariaLabels.appHome} className="flex min-h-11 items-center gap-3 text-left">
          <LogoLockup />
        </button>
        <div className="hidden items-center gap-2 md:flex">
          {routes.map((item) => (
            <button key={item.id} onClick={() => { setScreen(item.id); if (item.role) setRole(item.role); }} className={cx("rounded-full px-3 py-2 text-sm font-medium transition", screen === item.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100")}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button aria-label={ariaLabels.soundToggle} onClick={() => setSoundEnabled(!soundEnabled)} className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-semibold">{soundEnabled ? "Sound on" : "Sound off"}</button>
          <button aria-label={ariaLabels.muteToggle} onClick={() => setMuted(!muted)} className="flex min-h-11 items-center rounded-xl border border-slate-200 px-3">{muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}</button>
          <input aria-label={ariaLabels.volumeControl} type="range" min="0" max="100" step="10" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="h-11" />
        </div>
        <StatusBanner>Demo role: {role}</StatusBanner>
      </div>
    </div>
  );
}

export default Header;
