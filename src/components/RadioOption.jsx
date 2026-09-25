export default function RadioOption({ leading, title, subtitle, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors",
        selected ? "border-brand-500 bg-brand-50" : "border-ink-100 bg-white hover:border-ink-300",
      ].join(" ")}
    >
      <span className="flex items-center gap-3">
        {leading && <span className="flex items-center">{leading}</span>}
        <span>
          <span className="block text-sm font-semibold text-ink-900">{title}</span>
          {subtitle && <span className="block text-xs text-ink-500">{subtitle}</span>}
        </span>
      </span>
      <span
        className={[
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-brand-500" : "border-ink-100",
        ].join(" ")}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />}
      </span>
    </button>
  );
}
