import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Store, Truck, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/Pill";
import cx from "@/utils/cx";
import { deliverySteps } from "@/data";

function Delivery({ setScreen, setStatusMessage, setMinigameContext }) {
  const [step, setStep] = useState(3);
  const isRouteSimulationComplete = step === deliverySteps.length - 1;
  return (
    <div className="space-y-8">
      <div>
        <Pill tone="blue">Delivery Partner View</Pill>
        <h2 className="mt-3 text-4xl font-black text-slate-950">Route and handover simulation</h2>
        <p className="mt-2 max-w-2xl text-slate-600">The route agent selects a time window that protects food safety while keeping the delivery cost low.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[2rem] border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-black text-slate-950">Recommended Route A</h3>
            <div className="mt-5 rounded-[2rem] bg-slate-950 p-5 text-white">
              <div className="relative h-64 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/30 via-sky-500/30 to-slate-700">
                <div className="absolute left-8 top-10 rounded-2xl bg-white p-3 text-slate-950 shadow-xl"><Store className="h-6 w-6" /></div>
                <div className="absolute bottom-10 right-8 rounded-2xl bg-white p-3 text-slate-950 shadow-xl"><Utensils className="h-6 w-6" /></div>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 260">
                  <path d="M70 70 C150 90, 170 170, 310 195" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 12" opacity="0.85" />
                </svg>
                <motion.div animate={{ x: [80, 150, 230], y: [80, 130, 175] }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }} className="absolute left-0 top-0 rounded-full bg-emerald-400 p-3 shadow-lg">
                  <Truck className="h-5 w-5 text-white" />
                </motion.div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm">
              {[
                ["Pickup", "Checkers Pietermaritzburg"],
                ["Drop-off", "Hope Kitchen"],
                ["Distance", "3.2 km"],
                ["Estimated Time", "25 minutes"],
                ["Delivery Cost", "R85"],
                ["Food Safety Risk", "Low if delivered on schedule"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="font-bold text-slate-500">{label}</span>
                  <span className="font-semibold text-slate-950">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-black text-slate-950">Delivery status</h3>
            <div className="mt-5 space-y-3">
              {deliverySteps.map((label, index) => (
                <button
                  key={label}
                  onClick={() => setStep(index)}
                  className={cx(
                    "flex w-full items-center gap-4 rounded-3xl border p-4 text-left transition",
                    index <= step ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"
                  )}
                >
                  <div className={cx("flex h-10 w-10 items-center justify-center rounded-2xl", index <= step ? "bg-emerald-600 text-white" : "bg-white text-slate-400")}>
                    {index <= step ? <Check className="h-5 w-5" /> : index + 1}
                  </div>
                  <div>
                    <div className="font-black text-slate-950">{label}</div>
                    <div className="text-xs text-slate-500">Tap to simulate progress</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-3xl bg-amber-50 p-5 text-amber-950">
              <div className="mb-2 font-black">Driver instructions</div>
              Keep sealed. Do not delay delivery. Deliver directly to kitchen entrance. Recipient must confirm receipt before 17:15.
            </div>

            <Button
              onClick={() => {
                setMinigameContext?.({
                  deliveryId: "route-a-001",
                  destinationLabel: "Hope Kitchen",
                  routeName: "Recommended Route A",
                  difficultySeed: "low-risk",
                });
                setStatusMessage("Delivery confirmed by recipient");
                setScreen("minigame");
              }}
              className="mt-5 w-full rounded-2xl bg-emerald-600 py-6 hover:bg-emerald-700"
            >
              Confirm Delivery And Start Minigame
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Delivery;
