import { Check } from "lucide-react";

export default function CurrencyOption({ flag, name, subtitle, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors",
        selected ? "bg-brand-100" : "border border-ink-100 bg-white",
      ].join(" ")}
    >
      <span className="flex items-center gap-3">
        {flag}
        <span>
          <span className="block text-sm font-semibold text-ink-900">{name}</span>
          <span className="block text-xs text-ink-500">{subtitle}</span>
        </span>
      </span>
      <span
        className={[
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
          selected ? "bg-white" : "border border-ink-100",
        ].join(" ")}
      >
        {selected && <Check size={14} strokeWidth={3} className="text-brand-500" />}
      </span>
    </button>
  );
}
