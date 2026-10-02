import { useNavigate } from "react-router-dom";
import { ChevronLeft, Target } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import { useUser } from "../context/UserContext";
import { useBudget } from "../context/BudgetContext";
import { useExpenses } from "../context/ExpenseContext";
import { useSavings } from "../context/SavingsContext";
import { CATEGORIES } from "../data/categories";
import { formatMoney } from "../utilities/Currency";
import clipboardImage from "../assets/weekly-review-clipboard.jpg";

export default function WeeklyReview() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { budget } = useBudget();
  const { expenses, totalSpent } = useExpenses();
  const { totalSaved } = useSavings();

  const budgetPercent =
    budget.income > 0 ? Math.min(100, Math.round((totalSpent / budget.income) * 100)) : 0;
  const onTrack = budgetPercent <= 100;

  let topCategory = null;
  if (expenses.length > 0) {
    const totals = {};
    expenses.forEach((e) => {
      totals[e.categoryId] = (totals[e.categoryId] || 0) + Math.abs(e.amount);
    });
    const [topId, topAmount] = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
    const meta = CATEGORIES.find((c) => c.id === topId);
    topCategory = {
      name: meta?.title ?? "Uncategorized",
      amount: topAmount,
      percent: totalSpent > 0 ? Math.round((topAmount / totalSpent) * 100) : 0,
    };
  }

  const STATS = [
    { label: "Total Spent", value: formatMoney(totalSpent, user.currency), caption: "All-time", captionColor: "text-ink-500" },
    { label: "Budget progress", value: `${budgetPercent}%`, caption: onTrack ? "On track" : "Over budget", captionColor: onTrack ? "text-emerald-600" : "text-red-600" },
    {
      label: "Top Category",
      value: topCategory ? topCategory.name : "—",
      caption: topCategory ? `${formatMoney(topCategory.amount, user.currency)} (${topCategory.percent}%)` : "No expenses yet",
      captionColor: "text-ink-500",
    },
    { label: "Savings Added", value: formatMoney(totalSaved, user.currency), caption: "Total across goals", captionColor: "text-ink-500" },
  ];

  return (
    <DashboardShell>
      <div className="mx-auto max-w-xl">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="text-ink-700">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-ink-900">Weekly Review</h1>
        </div>

        <div className="mt-8 flex flex-col items-center text-center">
          <img src={clipboardImage} alt="" className="h-16 w-16 object-contain" />
          <h2 className="mt-3 text-2xl font-bold text-ink-900">Your Weekly Summary</h2>
          <p className="mt-1 text-sm text-ink-500">May 6 - May 12, 2026</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border border-ink-100 p-4">
              <p className="text-xs text-ink-500">{s.label}</p>
              <p className="mt-1 text-lg font-bold text-ink-900">{s.value}</p>
              <p className={`mt-1 text-xs font-medium ${s.captionColor}`}>{s.caption}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#FDF1E6] px-5 py-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100">
            <Target size={16} className="text-brand-600" />
          </span>
          <p className="text-sm font-medium text-ink-900">
            {onTrack
              ? "Great you are on track to meet your goal this month"
              : "You're over budget this period — check your spending in Budget."}
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}