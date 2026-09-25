import { Check } from "lucide-react";

export default function PriorityOption({ icon, iconBg, title, subtitle, checked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-xl border border-ink-100 bg-white px-4 py-3 text-left transition-colors hover:border-ink-300"
    >
      <span className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink-900">{title}</span>
          <span className="block text-xs text-ink-500">{subtitle}</span>
        </span>
      </span>

      {checked ? (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600">
          <Check size={13} strokeWidth={3} className="text-white" />
        </span>
      ) : (
        <span className="h-5 w-5 shrink-0 rounded-[4px] border-2 border-ink-100" />
      )}
    </button>
  );
}
