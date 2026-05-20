import { Card, CardContent } from "@/components/ui/card";
import cx from "@/utils/cx";
import { toneTokens } from "@/theme/designTokens";

function StatCard({ icon: Icon, label, value, tone = "green" }) {
  return (
    <Card className={cx("border shadow-sm", toneTokens.statCard[tone])}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/80 p-2 shadow-sm">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-bold leading-tight">{value}</div>
            <div className="text-xs font-medium uppercase tracking-wide opacity-80">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
