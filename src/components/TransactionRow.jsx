import { formatMoney } from "../utilities/Currency";

export default function TransactionRow({ icon, iconBg, name, category, amount, time, currency = "NGN" }) {
  const isCredit = amount > 0;

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold text-ink-900">{name}</p>
          <p className="text-xs text-ink-500">{category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${isCredit ? "text-emerald-600" : "text-ink-900"}`}>
          {isCredit ? "+" : "-"}
          {formatMoney(amount, currency)}
        </p>
        <p className="text-xs text-ink-500">{time}</p>
      </div>
    </div>
  );
}