import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/Pill";
import EmptyState from "@/components/ui/EmptyState";

function Marketplace({ setScreen, donationCreated, decisionResult }) {
  const top = decisionResult?.recommendedNgo;
  const topRankedNgo = decisionResult?.rankedNgos?.find((ngo) => ngo.recommended) || decisionResult?.rankedNgos?.[0];
  const urgencySubtotal = decisionResult?.urgency?.score ?? 0;
  const safetySubtotal = decisionResult?.safety?.score ?? 0;
  const ngoSubtotal = top?.matchScore ?? 0;
  const impactSubtotal = Math.max(0, Math.min(100, Math.round((urgencySubtotal + safetySubtotal + ngoSubtotal) / 3)));
  const hasMatchBreakdown = Boolean(decisionResult && topRankedNgo && (topRankedNgo.reasons?.length || topRankedNgo.concerns?.length));
  return <div className="space-y-6">
    <div className="flex justify-between"><div><Pill tone="green">NGO / Food Kitchen View</Pill><h2 className="mt-2 text-4xl font-black">Available food nearby</h2></div><div className="relative max-w-sm"><Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" /><input className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4" placeholder="Search" /></div></div>
    {!donationCreated && <EmptyState title="No active donation created yet" message="Run the supermarket flow first." action={() => setScreen("supermarket")} actionLabel="Go To Supermarket View" />}
    {decisionResult && <Card className="rounded-[2rem]"><CardContent className="p-6"><h3 className="text-2xl font-black">AI recommends {top?.name}</h3><p>Match score: {top?.matchScore}%</p><p>Urgency: {decisionResult.urgency.label}</p><p>Safety: {decisionResult.safety.handlingDecision}</p><p>Source: {decisionResult.source === "python-backend" ? "Python backend" : "Local fallback"}</p>
      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <h4 className="font-black">Why This Match?</h4>
        {hasMatchBreakdown ? <>
          <ul className="mt-2 space-y-1 text-sm">
            {(topRankedNgo.reasons || []).map((reason) => <li key={reason}>+8 {reason}</li>)}
            {(topRankedNgo.concerns || []).map((concern) => <li key={concern}>-25 {concern}</li>)}
          </ul>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <p><span className="font-semibold">Urgency:</span> {urgencySubtotal}</p>
            <p><span className="font-semibold">Safety:</span> {safetySubtotal}</p>
            <p><span className="font-semibold">NGO Match:</span> {ngoSubtotal}</p>
            <p><span className="font-semibold">Impact:</span> {impactSubtotal}</p>
          </div>
        </> : <p className="mt-2 text-sm text-slate-600">Breakdown details are not available yet. Open details to see the full recommendation summary.</p>}
      </div>
      <Button disabled={!donationCreated} onClick={() => setScreen("match")} className="mt-4 rounded-2xl bg-emerald-600">View Details</Button></CardContent></Card>}
  </div>;
}

export default Marketplace;
