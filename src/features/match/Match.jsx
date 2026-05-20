import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/Pill";

function Match({ setScreen, setStatusMessage, decisionResult }) {
  const [confirmed, setConfirmed] = useState(false);
  const d = decisionResult;
  const ngo = d?.recommendedNgo;
  const topRankedNgo = d?.rankedNgos?.find((n) => n.recommended) || d?.rankedNgos?.[0];
  const urgencySubtotal = d?.urgency?.score ?? 0;
  const safetySubtotal = d?.safety?.score ?? 0;
  const ngoSubtotal = ngo?.matchScore ?? 0;
  const impactSubtotal = Math.max(0, Math.min(100, Math.round((urgencySubtotal + safetySubtotal + ngoSubtotal) / 3)));
  const finalTotalScore = Math.max(0, Math.min(100, Math.round((urgencySubtotal + safetySubtotal + ngoSubtotal + impactSubtotal) / 4)));
  const hasBreakdown = Boolean(topRankedNgo && (topRankedNgo.reasons?.length || topRankedNgo.concerns?.length));
  const confirm = () => {
    setConfirmed(true);
    setStatusMessage(`Human confirmed AI recommendation: ${ngo.name}`);
    setTimeout(() => setScreen("delivery"), 500);
  };
  if (!d) return null;
  return <div className="space-y-6">
    <Card className="rounded-[2rem]"><CardContent className="p-6"><Pill tone="blue">Explainable recommendation</Pill><h2 className="mt-2 text-3xl font-black">{d.foodSummary.name}</h2><p className="text-sm mt-2">{d.foodSummary.quantity} · {d.foodSummary.branch} · Expires {d.foodSummary.expiry}</p></CardContent></Card>
    <div className="grid gap-6 lg:grid-cols-2"><Card className="rounded-[2rem]"><CardContent className="p-6"><h3 className="font-black">Urgency calculation</h3><p>{d.urgency.label} ({d.urgency.score}/100) · {d.urgency.hoursUntilExpiry} hours</p><p className="text-sm">{d.urgency.explanation}</p><h3 className="mt-4 font-black">Safety risk calculation</h3><p>{d.safety.label} ({d.safety.score}/100) · {d.safety.handlingDecision}</p><ul className="list-disc ml-5 text-sm">{d.safety.conditions.map((c)=><li key={c}>{c}</li>)}</ul></CardContent></Card>
    <Card className="rounded-[2rem]"><CardContent className="p-6"><h3 className="font-black">NGO match ranking</h3><div className="space-y-3 mt-3">{d.rankedNgos.map((n)=><div key={n.id} className="rounded-2xl bg-slate-50 p-3"><div className="font-bold">#{n.rank} {n.name} {n.recommended && <span className="text-emerald-700">(Recommended)</span>}</div><div>{n.matchScore}% · {n.fitLabel}</div></div>)}</div></CardContent></Card></div>
    <Card className="rounded-[2rem]"><CardContent className="p-6"><h3 className="font-black">Detailed score card</h3><p className="mt-1 text-sm">Final total score: <span className="font-semibold">{finalTotalScore}/100</span></p><div className="mt-3 grid gap-2 text-sm sm:grid-cols-2"><p><span className="font-semibold">Urgency:</span> {urgencySubtotal}</p><p><span className="font-semibold">Safety:</span> {safetySubtotal}</p><p><span className="font-semibold">NGO Match:</span> {ngoSubtotal}</p><p><span className="font-semibold">Impact:</span> {impactSubtotal}</p></div><h4 className="mt-4 font-black">Per-rule breakdown</h4>{hasBreakdown ? <ul className="mt-2 space-y-1 text-sm">{(topRankedNgo.reasons || []).map((reason) => <li key={reason}>+8 {reason}</li>)}{(topRankedNgo.concerns || []).map((concern) => <li key={concern}>-25 {concern}</li>)}</ul> : <p className="mt-2 text-sm text-slate-600">Detailed rule breakdown is not available for this result yet.</p>}</CardContent></Card>
    <Card className="rounded-[2rem] border-emerald-200 bg-emerald-50"><CardContent className="p-6"><h3 className="font-black">Best NGO recommendation</h3><p className="mt-2">{ngo.name} ({ngo.matchScore}%)</p><p className="text-sm">{ngo.summary}</p><Button onClick={confirm} className="mt-4 rounded-2xl bg-emerald-600">Confirm match with {ngo.name}</Button>{confirmed && <p className="mt-2 text-sm font-semibold text-emerald-700">Human confirmed AI recommendation: {ngo.name}</p>}</CardContent></Card>
  </div>;
}

export default Match;
