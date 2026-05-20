import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/Pill";
import PythonTerminalTrace from "@/components/PythonTerminalTrace";

function Processing({ setScreen, decisionResult }) {
  const [complete, setComplete] = useState(false);
  const trace = decisionResult?.decisionTrace ?? [];
  return <div className="mx-auto max-w-5xl space-y-5"><div className="text-center"><Pill tone="blue">AI decision trace</Pill><h2 className="mt-3 text-4xl font-black text-slate-950">Python decision worker calculation</h2></div>
    <PythonTerminalTrace replay={decisionResult?.terminalReplay ?? []} source={decisionResult?.source} onComplete={() => setComplete(true)} />
    <Card className="rounded-[2rem]"><CardContent className="p-6"><h3 className="text-xl font-black">Calculation trace</h3><div className="mt-4 space-y-3">{trace.map((step)=><div key={step.agent} className="rounded-2xl bg-slate-50 p-3"><div className="font-bold">{step.agent}</div><div className="text-sm text-slate-600">{step.message}</div></div>)}</div></CardContent></Card>
    {complete && <Button onClick={() => setScreen("match")} className="rounded-2xl bg-emerald-600 px-6 py-6">View recommendation <ArrowRight className="ml-2 h-5 w-5" /></Button>}
  </div>;
}

export default Processing;
