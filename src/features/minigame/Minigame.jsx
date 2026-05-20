import minigameConfig from "@/features/minigame/minigame.config";

function Minigame({ minigameContext }) {
  const destinationLabel = minigameContext?.destinationLabel || "your destination";
  const routeName = minigameContext?.routeName || "Standard Route";
  const difficultySeed = minigameContext?.difficultySeed || "normal";
  const deliveryId = minigameContext?.deliveryId || "no-delivery-id";

  return (
    <section className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Deliver to {destinationLabel}</p>
      <p className="mt-1 text-xs text-slate-500">{routeName} · Difficulty: {difficultySeed} · Ref: {deliveryId}</p>
      <h2 className="text-3xl font-black text-slate-900">{minigameConfig.title}</h2>
      <p className="mt-3 text-slate-600">{minigameConfig.description}</p>
    </section>
  );
}

export default Minigame;
