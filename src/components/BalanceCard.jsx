// src/components/BalanceCard.jsx — full file

import { useState } from "react";
import { Eye, EyeOff, TrendingUp, TrendingDown } from "lucide-react";
import { formatMoney, getCurrency } from "../utilities/currency";

export default function BalanceCard({ balance, changePercent = null, goalPercent = 0, currency = "NGN" }) {
  const [hidden, setHidden] = useState(false);
  const symbol = getCurrency(currency).symbol;


  const hasComparison = changePercent !== null;
  const spentMore = hasComparison && changePercent > 0;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-6 text-white shadow-card">
      <button
        type="button"
        onClick={() => setHidden((h) => !h)}
        className="flex items-center gap-2 text-sm font-medium text-white/90"
      >
        Total Balance
        {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>

      <p className="mt-2 text-3xl font-bold tracking-tight">
        {hidden ? `${symbol}••••••` : formatMoney(balance, currency)}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${Math.min(goalPercent, 100)}%` }}
          />
        </div>
        <span className="text-sm font-semibold">{goalPercent}%</span>
      </div>

      {hasComparison ? (
        <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
          {spentMore ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(changePercent)}% {spentMore ? "more" : "less"} spending vs last month
        </p>
      ) : (
        <p className="mt-1 text-xs text-white/60">No spending data from last month yet</p>
      )}
    </div>
  );
}