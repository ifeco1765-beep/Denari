function LogoMark({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <path
        d="M19 4a16 16 0 1 1 -10.6 28"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
      />
      <circle cx="10.5" cy="12.5" r="3.4" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ variant = "dark", size = "text-2xl", withMark = false }) {
  const color = variant === "light" ? "text-white" : "text-brand-500";
  const markSize = {
    "text-xl": "h-6 w-6",
    "text-2xl": "h-7 w-7",
    "text-3xl": "h-9 w-9",
    "text-4xl": "h-11 w-11",
  }[size] || "h-7 w-7";

  return (
    <span className={["inline-flex items-center gap-1.5", color].join(" ")}>
      {withMark && <LogoMark className={markSize} />}
      <span className={["font-display font-extrabold tracking-tight", size].join(" ")}>
        DENARI
      </span>
    </span>
  );
}
