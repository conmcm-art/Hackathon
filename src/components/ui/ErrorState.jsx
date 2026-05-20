import { AlertTriangle, Ban, ShieldAlert, WifiOff, RotateCcw } from "lucide-react";

const toneMap = {
  warning: {
    title: "Attention needed",
    message: "Food safety risk detected.",
    icon: ShieldAlert,
    classes: "border-amber-200 bg-amber-50 text-amber-950",
  },
  error: {
    title: "Something went wrong",
    message: "Upload failed. Please try again.",
    icon: AlertTriangle,
    classes: "border-rose-200 bg-rose-50 text-rose-950",
  },
  blocked: {
    title: "Action blocked",
    message: "Role not allowed for this action.",
    icon: Ban,
    classes: "border-slate-300 bg-slate-100 text-slate-900",
  },
  offline: {
    title: "Offline mode",
    message: "App unavailable. Showing cached demo data.",
    icon: WifiOff,
    classes: "border-indigo-200 bg-indigo-50 text-indigo-950",
  },
  reset: {
    title: "Demo reset",
    message: "The demo has restarted.",
    icon: RotateCcw,
    classes: "border-emerald-200 bg-emerald-50 text-emerald-950",
  },
};

function ErrorState({ variant = "error", title, message }) {
  const preset = toneMap[variant] || toneMap.error;
  const Icon = preset.icon;

  return (
    <div className={`rounded-3xl border p-5 ${preset.classes}`} role="status" aria-live="polite">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-white/80 p-2">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="font-bold">{title || preset.title}</div>
          <p className="mt-1 text-sm opacity-90">{message || preset.message}</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorState;
