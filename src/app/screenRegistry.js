import Landing from "@/features/landing/Landing";
import Roles from "@/features/roles/Roles";
import Supermarket from "@/features/supermarket/Supermarket";
import Processing from "@/features/processing/Processing";
import Marketplace from "@/features/marketplace/Marketplace";
import Match from "@/features/match/Match";
import Delivery from "@/features/delivery/Delivery";
import Receipt from "@/features/receipt/Receipt";
import Impact from "@/features/impact/Impact";
import Admin from "@/features/admin/Admin";
import Minigame from "@/features/minigame/Minigame";
import ProtectedScreen from "@/security/ProtectedScreen";
import { PERMISSIONS } from "@/security/permissions";

const screenRegistry = {
  landing: Landing,
  roles: Roles,
  supermarket: Supermarket,
  processing: Processing,
  marketplace: Marketplace,
  match: Match,
  delivery: Delivery,
  receipt: Receipt,
  impact: Impact,
  admin: Admin,
  minigame: Minigame,
};

export function renderScreen(screen, sharedProps) {
  const ScreenComponent = screenRegistry[screen] ?? screenRegistry.landing;
  const permission = PERMISSIONS[screen] ?? "public";

  return (
    <ProtectedScreen permission={permission} fallback={<Landing {...sharedProps} />}>
      <ScreenComponent {...sharedProps} />
    </ProtectedScreen>
  );
}

export default screenRegistry;
