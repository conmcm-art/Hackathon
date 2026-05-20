import cx from "@/utils/cx";

const variants = {
  default: "bg-slate-900 text-white hover:bg-slate-700 border-transparent",
  outline: "bg-white text-slate-900 hover:bg-slate-100 border-slate-300",
};

export function Button({ className, variant = "default", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={cx(
        "inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant] ?? variants.default,
        className
      )}
      {...props}
    />
  );
}
