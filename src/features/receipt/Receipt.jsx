import { useState } from "react";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/Pill";
import cx from "@/utils/cx";

function Receipt({ setScreen }) {
  const [checked, setChecked] = useState({ received: true, quantity: true, packaging: true, prepared: true });
  return (
    <div className="mx-auto max-w-4xl">
      <Card className="rounded-[2rem] border-slate-200 shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="mb-6">
            <Pill tone="green">NGO Receipt Confirmation</Pill>
            <h2 className="mt-4 text-4xl font-black text-slate-950">Complete the rescue loop</h2>
            <p className="mt-2 text-slate-600">Hope Kitchen confirms condition, quantity and same-day preparation plan.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["received", "Food received?"],
              ["quantity", "Quantity correct?"],
              ["packaging", "Packaging intact?"],
              ["prepared", "Prepared for same-day service?"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setChecked({ ...checked, [key]: !checked[key] })}
                className={cx("flex items-center gap-4 rounded-3xl border p-5 text-left", checked[key] ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50")}
              >
                <div className={cx("flex h-10 w-10 items-center justify-center rounded-2xl", checked[key] ? "bg-emerald-600 text-white" : "bg-white text-slate-400")}>
                  <Check className="h-5 w-5" />
                </div>
                <div className="font-black text-slate-950">{label}</div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
            <div className="grid gap-3 md:grid-cols-2">
              <div><span className="font-bold text-slate-500">Received by:</span> Hope Kitchen</div>
              <div><span className="font-bold text-slate-500">Time:</span> 17:08</div>
              <div><span className="font-bold text-slate-500">Quantity received:</span> 24 portions</div>
              <div><span className="font-bold text-slate-500">Condition:</span> Good</div>
              <div><span className="font-bold text-slate-500">Meal service planned:</span> 18:00</div>
              <div><span className="font-bold text-slate-500">Issue report:</span> None</div>
            </div>
          </div>

          <Button onClick={() => setScreen("impact")} className="mt-6 w-full rounded-2xl bg-emerald-600 py-6 hover:bg-emerald-700">Confirm Receipt And Generate Impact Report</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Receipt;
