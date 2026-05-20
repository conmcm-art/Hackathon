import cx from "@/utils/cx";
import { toneTokens } from "@/theme/designTokens";

function Pill({ children, tone = "green" }) {
  return <span className={cx("rounded-full px-3 py-1 text-xs font-semibold", toneTokens.pill[tone])}>{children}</span>;
}

export default Pill;
