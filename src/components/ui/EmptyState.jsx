import { Inbox } from "lucide-react";

function EmptyState({
  title = "Nothing here yet",
  message = "There is no data to show right now.",
  action,
  actionLabel = "Go back",
  icon: Icon = Inbox,
}) {
  return (
    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-white/80 p-2 text-amber-700">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="font-bold">{title}</div>
          <p className="mt-1 text-sm text-amber-900/90">{message}</p>
          {action && (
            <button
              onClick={action}
              className="mt-3 rounded-2xl border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
