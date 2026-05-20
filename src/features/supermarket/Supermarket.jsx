import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Barcode, Camera, FileText, Leaf, Mic, PackageCheck, Sparkles, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/Pill";
import StatCard from "@/components/ui/StatCard";
import { demoFood, ngos } from "@/data";
import { analyseDonationWithPython } from "@/lib/pythonDecisionClient";

function Supermarket({ setScreen, setDonationCreated, setStatusMessage, setSubmittedFood, setDecisionResult }) {
  const [form, setForm] = useState(demoFood);
  const [multimodal, setMultimodal] = useState(null);

  const runDemoUpload = async () => {
    setDonationCreated(true);
    setSubmittedFood(form);
    setStatusMessage("Processing update: calculating urgency, safety and NGO match");
    const result = await analyseDonationWithPython(form, ngos);
    setDecisionResult(result);
    setScreen("processing");
  };
  const simulateInput = (type) => { setMultimodal(type); setTimeout(() => setForm(demoFood), 600); };
  return <div className="space-y-8">{/* unchanged layout */}
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><Pill tone="green">Supermarket Staff View</Pill><h2 className="mt-3 text-4xl font-black text-slate-950">Add surplus food</h2></div><Button onClick={runDemoUpload} className="rounded-2xl bg-emerald-600 px-6 py-6 hover:bg-emerald-700">Run AI Analysis <Sparkles className="ml-2 h-5 w-5" /></Button></div>
    <div className="grid gap-4 md:grid-cols-5"><StatCard icon={FileText} label="Items listed today" value="12" tone="blue" /><StatCard icon={PackageCheck} label="Items claimed" value="8" tone="green" /><StatCard icon={Utensils} label="Meals enabled" value="324" tone="green" /><StatCard icon={Leaf} label="Waste avoided" value="81 kg" tone="green" /><StatCard icon={AlertTriangle} label="Urgent items" value="3" tone="amber" /></div>
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">{/* cards */}
      <Card className="rounded-[2rem] border-slate-200 shadow-sm"><CardContent className="p-6"><h3 className="mb-4 text-xl font-black text-slate-950">Simulated multimodal input</h3><div className="grid gap-3 sm:grid-cols-2">{[[Camera, "Photo upload"], [Barcode, "Barcode scan"], [Mic, "Voice note"], [FileText, "CSV stock sheet"]].map(([Icon, label]) => <button key={label} onClick={() => simulateInput(label)} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-emerald-200 hover:bg-emerald-50"><Icon className="mb-3 h-6 w-6 text-emerald-700" /><div className="font-bold text-slate-900">{label}</div></button>)}</div><AnimatePresence>{multimodal && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-3xl bg-sky-50 p-4 text-sm text-sky-900">Detected item: Roast Chicken Portions...</motion.div>}</AnimatePresence></CardContent></Card>
      <Card className="rounded-[2rem] border-slate-200 shadow-sm"><CardContent className="p-6"><div className="grid gap-4 md:grid-cols-2">{[["Food Name", "name"],["Category", "category"],["Quantity", "quantity"],["Unit", "unit"],["Expiry Date", "expiryDate"],["Expiry Time", "expiryTime"],["Storage Type", "storageType"],["Packaging", "packaging"],["Allergens", "allergens"],["Pickup Window", "pickupWindow"],["Supermarket Branch", "branch"],["Estimated Kg", "estimatedKg"]].map(([label, key]) => <label key={key}><span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span><input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" /></label>)}</div><Button onClick={runDemoUpload} className="mt-6 w-full rounded-2xl bg-emerald-600 py-6 text-base hover:bg-emerald-700">Submit Surplus Food To AI Agent Loop</Button></CardContent></Card>
    </div></div>;
}

export default Supermarket;
