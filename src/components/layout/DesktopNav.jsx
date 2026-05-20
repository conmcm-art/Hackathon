import cx from "@/utils/cx";
import routes from "@/app/routes";

export default function DesktopNav({ screen, setScreen, setRole, progress }) {
  return (
    <div className="hidden flex-1 flex-col gap-2 md:flex">
      <div className="flex flex-wrap items-center gap-2">
        {progress.breadcrumbs.map((step, index) => (
          <span key={step.id} className="text-xs text-slate-500">
            {index > 0 ? "› " : ""}{step.label}
          </span>
        ))}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress.percentage}%` }} />
      </div>
      <div className="flex items-center gap-2">
        {routes.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setScreen(item.id);
              if (item.role) setRole(item.role);
            }}
            className={cx(
              "rounded-full px-3 py-2 text-sm font-medium transition",
              screen === item.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
