export default function IncomeRing({ amount, caption }) {
  const r = 54;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#FFE1C4" strokeWidth="9" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#FF8E28"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${c * 0.52} ${c}`}
        />
      </svg>
      <div className="absolute flex flex-col items-center text-center">
        <span className="text-lg font-bold text-ink-900">{amount}</span>
        <span className="text-xs text-ink-500">{caption}</span>
      </div>
    </div>
  );
}
