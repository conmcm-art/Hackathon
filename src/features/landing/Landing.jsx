import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, HeartHandshake, Leaf, ShieldCheck, Sparkles, Store, Truck, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/Pill";
import brandConfig from "@/brand/brand.config";

function Landing({ setScreen }) {
  const { landingHeroHeadline, landingHeroIntro, landingHeroPitch } = brandConfig;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Pill tone="green">Food Systems Challenge</Pill>
          <Pill tone="blue">Simulated AI agents</Pill>
          <Pill tone="amber">South African context</Pill>
        </div>
        <h1 className="text-5xl font-black leading-tight tracking-tight text-slate-950 md:text-7xl">
          {landingHeroHeadline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {landingHeroIntro}
        </p>
        <div className="info-card-emerald mt-7 rounded-3xl p-5">
          <div className="mb-2 flex items-center gap-2 font-bold">
            <Sparkles className="h-5 w-5" /> One-sentence pitch
          </div>
          <p className="text-sm leading-6">
            {landingHeroPitch}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            onClick={() => setScreen("roles")}
            className="brand-primary-btn cta-button-base"
          >
            Start Demo <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setScreen("admin")}
            className="cta-button-base"
          >
            View Impact Dashboard
          </Button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.1 }}>
        <Card className="brand-dark-panel">
          <CardContent className="p-0">
            <div className="brand-accent-gradient p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-widest text-white/80">Live demo scenario</div>
                  <div className="mt-1 text-2xl font-black">Supermarket Supper Rescue</div>
                </div>
                <div className="rounded-full bg-white/20 p-3 backdrop-blur">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="space-y-4 p-6">
              {[
                [Store, "Checkers Pietermaritzburg lists 24 roast chicken portions"],
                [ShieldCheck, "AI agents assess urgency, safety and handling conditions"],
                [HeartHandshake, "Hope Kitchen receives a 96% recommended match"],
                [Truck, "Delivery is arranged at cost price only"],
                [Leaf, "Impact report shows 72 meals rescued"],
              ].map(([Icon, text], index) => (
                <div key={text} className="surface-dark-glass flex items-center gap-4 p-4">
                  <div className="brand-dark-step-icon">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm leading-5 text-white/90">{text}</div>
                  {index < 4 && <ChevronRight className="ml-auto h-4 w-4 text-white/40" />}
                </div>
              ))}
              <div className="surface-dark-outline p-4 text-sm text-white/75">
                Prototype note: all AI results are simulated with rules, demo data and loading states. No paid AI backend is required.
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Landing;
