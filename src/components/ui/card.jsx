import cx from "@/utils/cx";

export function Card({ className, ...props }) {
  return <div className={cx("rounded-3xl border border-slate-200 bg-white shadow-sm", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cx("p-6", className)} {...props} />;
}
