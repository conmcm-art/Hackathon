import { ShoppingBasket } from "lucide-react";
import brandConfig from "@/brand/brand.config";

function LogoLockup() {
  return (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
        <ShoppingBasket className="h-5 w-5" />
      </div>
      <div>
        <div className="text-lg font-bold text-slate-900">{brandConfig.name}</div>
        <div className="text-xs text-slate-500">{brandConfig.tagline}</div>
      </div>
    </>
  );
}

export default LogoLockup;
