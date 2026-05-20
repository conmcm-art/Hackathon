import { CheckCircle2 } from "lucide-react";

function ConfirmationState({
  title = "Success",
  message = "Your action was completed.",
  action,
  actionLabel = "Continue",
}) {
  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950" role="status" aria-live="polite">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-white p-2 text-emerald-700">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <div className="font-bold">{title}</div>
          <p className="mt-1 text-sm text-emerald-900/90">{message}</p>
          {action && (
            <button
              onClick={action}
              className="mt-3 rounded-2xl border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-900"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmationState;
