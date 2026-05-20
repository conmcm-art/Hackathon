import { Loader2 } from "lucide-react";

function LoadingState({
  title = "Loading",
  message = "Please wait while we prepare your results.",
}) {
  return (
    <div className="rounded-3xl border border-sky-200 bg-sky-50 p-5 text-sky-950">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-white p-2 text-sky-700">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
        <div>
          <div className="font-bold">{title}</div>
          <p className="mt-1 text-sm text-sky-900/90">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingState;
