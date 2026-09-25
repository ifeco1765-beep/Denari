const VARIANT_STYLES = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 disabled:bg-brand-100 disabled:text-brand-300",
  secondary:
    "bg-white text-ink-900 border border-ink-100 hover:border-ink-300",
  ghost: "bg-transparent text-brand-600 hover:bg-brand-50",
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = true,
  className = "",
  ...rest
}) {
  return (
    <button
      className={[
        "h-12 rounded-xl px-6 font-display font-semibold text-[15px]",
        "transition-colors duration-150 disabled:cursor-not-allowed",
        fullWidth ? "w-full" : "",
        VARIANT_STYLES[variant],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
