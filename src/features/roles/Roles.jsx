import { motion } from "framer-motion";
import { ArrowRight, Bike, Building2, Store, Utensils } from "lucide-react";
import Pill from "@/components/ui/Pill";

function Roles({ setScreen, setRole }) {
  const roles = [
    { name: "Supermarket Staff", icon: Store, description: "List surplus food and trigger AI assessment.", target: "supermarket" },
    { name: "NGO / Food Kitchen", icon: Utensils, description: "Browse available food and reserve a matched donation.", target: "marketplace" },
    { name: "Delivery Partner", icon: Bike, description: "View route, handling notes and delivery timeline.", target: "delivery" },
    { name: "Admin Dashboard", icon: Building2, description: "Monitor rescues, impact and urgent stock.", target: "admin" },
  ];

  return (
    <div>
      <div className="mb-8 text-center">
        <Pill tone="blue">Choose demo role</Pill>
        <h2 className="mt-4 text-4xl font-black text-slate-950">Experience the same rescue from four sides</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">No login is needed. Each role opens a simulated view of the food-rescue network.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {roles.map(({ name, icon: Icon, description, target }) => (
          <motion.button
            key={name}
            whileHover={{ y: -6 }}
            onClick={() => {
              setRole(name);
              setScreen(target);
            }}
            className="group rounded-[2rem] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-emerald-200 hover:shadow-xl"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
              <Icon className="h-7 w-7" />
            </div>
            <div className="text-xl font-black text-slate-950">{name}</div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-700">
              Open view <ArrowRight className="h-4 w-4" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default Roles;
