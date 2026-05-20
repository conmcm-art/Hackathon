import { AlertTriangle, Home, ShoppingBasket, Store, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/Pill";
import StatCard from "@/components/ui/StatCard";
import { supermarkets } from "@/data";

function Admin({ setScreen }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <Pill tone="violet">Admin Dashboard</Pill>
          <h2 className="mt-3 text-4xl font-black text-slate-950">Food-rescue command centre</h2>
          <p className="mt-2 max-w-2xl text-slate-600">Monitor active rescues, urgent stock, platform activity and community impact.</p>
        </div>
        <Button onClick={() => setScreen("landing")} variant="outline" className="rounded-2xl px-5 py-5"><Home className="mr-2 h-5 w-5" /> Return Home</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={ShoppingBasket} label="Food rescued today" value="146 kg" tone="green" />
        <StatCard icon={Utensils} label="Estimated meals" value="584" tone="green" />
        <StatCard icon={Store} label="Active supermarkets" value={String(supermarkets.length)} tone="blue" />
        <StatCard icon={AlertTriangle} label="Urgent unclaimed" value="3" tone="amber" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="rounded-[2rem] border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-black text-slate-950">Today’s rescues</h3>
            <div className="mt-5 space-y-3">
              {[
                ["Roast Chicken Portions", "Hope Kitchen", "72 meals", "Completed"],
                ["Bread rolls and muffins", "Community Breakfast Programme", "80 meals", "In transit"],
                ["Mixed vegetables", "PMB Community Table", "100 meals", "Reserved"],
                ["Yoghurt tubs", "Masakhane Shelter Kitchen", "40 meals", "Cold-chain required"],
              ].map(([item, ngo, meals, status], index) => (
                <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-black text-slate-950">{item}</div>
                      <div className="mt-1 text-sm text-slate-600">{ngo} · {meals}</div>
                    </div>
                    <Pill tone={index === 0 ? "green" : index === 3 ? "amber" : "blue"}>{status}</Pill>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-black text-slate-950">System intelligence</h3>
            <div className="mt-5 grid gap-4">
              {[
                ["Average delivery cost per meal", "R1.42", "blue"],
                ["Completed rescues", "21", "green"],
                ["Failed collections", "1", "red"],
                ["Active NGOs", "14", "blue"],
              ].map(([label, value, tone]) => (
                <div key={label} className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                  <div className="font-bold text-slate-700">{label}</div>
                  <Pill tone={tone}>{value}</Pill>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-3xl bg-emerald-50 p-5 text-emerald-950">
              <div className="mb-2 font-black">Judging narrative</div>
              Food waste and hunger are not separate problems. They are connected by a logistics gap. FoodBridge AI closes that gap.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Admin;
