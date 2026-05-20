import { useMemo, useState } from "react";
import { Home, Menu, RotateCcw } from "lucide-react";
import routes from "@/app/routes";
import StatusBanner from "@/components/ui/StatusBanner";
import cx from "@/utils/cx";

const FLOW_STEPS = ["List", "Process", "Match", "Deliver", "Confirm", "Impact"];

const SCREEN_STEP_INDEX = {
  landing: 0,
  supermarket: 0,
  processing: 1,
  match: 2,
  delivery: 3,
  receipt: 4,
  impact: 5,
  marketplace: 2,
  admin: 5,
};

export default function MobileNav({ screen, setScreen, role, setRole, setDonationCreated }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const currentStep = useMemo(() => SCREEN_STEP_INDEX[screen] ?? 0, [screen]);
  const nextRoute = useMemo(() => {
    const currentIndex = routes.findIndex((item) => item.id === screen);
    if (currentIndex === -1) return routes[0];
    return routes[(currentIndex + 1) % routes.length];
  }, [screen]);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <button onClick={() => setScreen("landing")} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-2 text-sm font-semibold">
            <Home className="h-4 w-4" /> Home
          </button>
          <div className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-2 text-xs font-semibold text-emerald-800">
            Role: {role}
          </div>
          <button
            onClick={() => {
              setScreen(nextRoute.id);
              if (nextRoute.role) setRole(nextRoute.role);
            }}
            className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-slate-200 px-2 text-sm font-semibold"
          >
            Next
          </button>
          <button onClick={() => setMenuOpen(true)} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-2 text-sm font-semibold">
            <Menu className="h-4 w-4" /> Menu
          </button>
        </div>
        <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-xs font-semibold text-slate-700">Progress: {FLOW_STEPS[currentStep]}</p>
          <div className="mt-2 grid grid-cols-6 gap-1">
            {FLOW_STEPS.map((step, index) => (
              <div key={step} className={cx("h-1.5 rounded-full", index <= currentStep ? "bg-emerald-500" : "bg-slate-200")} />
            ))}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/45 p-4 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="mx-auto mt-20 max-w-md rounded-2xl bg-white p-4 shadow-xl" onClick={(event) => event.stopPropagation()}>
            <h2 className="text-base font-bold text-slate-900">Screen navigation</h2>
            <div className="mt-3 grid gap-2">
              {routes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setScreen(item.id);
                    if (item.role) setRole(item.role);
                    setMenuOpen(false);
                  }}
                  className={cx(
                    "min-h-11 rounded-xl border px-3 text-left text-sm font-medium",
                    screen === item.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-700"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setDonationCreated(false);
                setScreen("landing");
                setMenuOpen(false);
              }}
              className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700"
            >
              <RotateCcw className="h-4 w-4" /> Restart demo
            </button>
            <div className="mt-3">
              <StatusBanner>Demo role: {role}</StatusBanner>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
