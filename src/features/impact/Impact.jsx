import { useMemo, useState } from "react";
import { Download, Leaf, ShieldCheck, ShoppingBasket, Truck, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/Pill";
import StatCard from "@/components/ui/StatCard";
import { impactMetrics } from "@/data";

const SAFETY_DISCLAIMER =
  "FoodBridge AI provides a simulated decision-support workflow. Final food safety decisions must be made by trained humans according to local regulations.";

function Impact({ setScreen }) {
  const [reportStatus, setReportStatus] = useState("");
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const reportPayload = useMemo(() => {
    const generatedAt = new Date().toISOString();

    return {
      handoverId: impactMetrics.handoverId,
      metrics: {
        mealsCreated: impactMetrics.mealsCreated,
        foodRescued: impactMetrics.foodRescued,
        costPerMeal: impactMetrics.costPerMeal,
        co2eAvoided: impactMetrics.co2eAvoided,
      },
      generatedAt,
      safetyEthicsDisclaimer: SAFETY_DISCLAIMER,
    };
  }, []);

  const reportSummaryLines = [
    `Handover ID: ${reportPayload.handoverId}`,
    `Meals Created: ${reportPayload.metrics.mealsCreated}`,
    `Food Rescued: ${reportPayload.metrics.foodRescued}`,
    `Cost Per Meal: ${reportPayload.metrics.costPerMeal}`,
    `CO2e Avoided: ${reportPayload.metrics.co2eAvoided}`,
    `Timestamp: ${reportPayload.generatedAt}`,
    "",
    "Safety & Ethics Disclaimer:",
    reportPayload.safetyEthicsDisclaimer,
  ];

  const handleReportAction = () => {
    setReportStatus("");

    try {
      const fileName = `foodbridge-impact-report-${reportPayload.handoverId}.txt`;
      const fileBody = reportSummaryLines.join("\n");
      const blob = new Blob([fileBody], { type: "text/plain;charset=utf-8" });
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(downloadUrl);
      setReportStatus("Report downloaded as a plain text file.");
    } catch {
      setIsSummaryOpen(true);
      setReportStatus("Download is unavailable here. Showing an on-screen summary instead.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <Pill tone="green">Impact Report</Pill>
          <h2 className="mt-3 text-4xl font-black text-slate-950">FoodBridge AI rescue completed</h2>
          <p className="mt-2 max-w-2xl text-slate-600">A clear, auditable donation record proves social value, delivery efficiency and food rescued.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-5 py-5" onClick={handleReportAction}>
            <Download className="mr-2 h-5 w-5" /> Download Report
          </Button>
          <Button onClick={() => setScreen("admin")} className="rounded-2xl bg-emerald-600 px-5 py-5 hover:bg-emerald-700">View Dashboard</Button>
        </div>
      </div>

      {reportStatus ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">{reportStatus}</div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={Utensils} label="Meals Created" value={impactMetrics.mealsCreated} tone="green" />
        <StatCard icon={ShoppingBasket} label="Food Rescued" value={impactMetrics.foodRescued} tone="green" />
        <StatCard icon={Truck} label="Cost Per Meal" value={impactMetrics.costPerMeal} tone="blue" />
        <StatCard icon={Leaf} label="CO₂e Avoided" value={impactMetrics.co2eAvoided} tone="green" />
      </div>

      {isSummaryOpen ? (
        <Card className="rounded-[2rem] border-amber-200 bg-amber-50 shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-slate-950">Report Summary</h3>
                <p className="mt-1 text-sm text-slate-700">Download is unavailable in this environment, so here is the full report summary.</p>
              </div>
              <Button variant="outline" className="rounded-xl" onClick={() => setIsSummaryOpen(false)}>
                Close
              </Button>
            </div>
            <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-white p-4 text-sm text-slate-800">{reportSummaryLines.join("\n")}</pre>
          </CardContent>
        </Card>
      ) : null}

      <Card className="rounded-[2rem] border-slate-200 shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-bold uppercase tracking-wide text-slate-500">Handover ID</div>
              <h3 className="mt-1 text-3xl font-black text-slate-950">{impactMetrics.handoverId}</h3>
            </div>
            <Pill tone="green">Completed</Pill>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {impactMetrics.summary.map(([label, value]) => (
              <div key={label} className="rounded-3xl bg-slate-50 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</div>
                <div className="mt-1 text-lg font-black text-slate-950">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-sky-50 p-5 text-sky-950">
            <div className="mb-2 flex items-center gap-2 font-black"><ShieldCheck className="h-5 w-5" /> Food safety and ethics note</div>
            {SAFETY_DISCLAIMER}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Impact;
