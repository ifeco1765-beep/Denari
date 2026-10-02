
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Pencil, ClipboardCheck } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import ProgressBar from "../components/ProgressBar";
import { CATEGORIES } from "../data/categories";
import { useUser } from "../context/UserContext";
import { useBudget } from "../context/BudgetContext";
import { useExpenses } from "../context/ExpenseContext";
import { formatMoney } from "../utilities/Currency";

export default function BudgetOverview() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { budget } = useBudget();
  const { expenses, totalSpent } = useExpenses();
  const monthLabel = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const overallBudget = budget.income;
  const overallSpent = totalSpent;
  const remaining = overallBudget - overallSpent;
  const percent = overallBudget > 0 ? Math.round((overallSpent / overallBudget) * 100) : 0;

  const checkedCategories = CATEGORIES.filter((c) => budget.priorities[c.id]);

  
  const perCategoryBudget =
    checkedCategories.length > 0 ? overallBudget / checkedCategories.length : 0;

  
  const spentByCategory = expenses.reduce((acc, e) => {
    if (!e.categoryId) return acc;
    acc[e.categoryId] = (acc[e.categoryId] || 0) + Math.abs(e.amount);
    return acc;
  }, {});

  return (
    <DashboardShell>
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-ink-900">Budget</h1>
          <div className="flex items-center gap-2 text-sm text-ink-500">
           {monthLabel}
            <button type="button" onClick={() => navigate(-1)} aria-label="Back">
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/budget/setup")}
            className="flex items-center gap-1.5 rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:border-ink-300"
          >
            <Pencil size={13} />
            Redo budget setup
          </button>
          <button
            type="button"
            onClick={() => navigate("/weekly-review")}
            className="flex items-center gap-1.5 rounded-lg border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:border-ink-300"
          >
            <ClipboardCheck size={13} />
            Weekly Review
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-500 to-[#9F5819] p-6 text-white shadow-card">
          <p className="text-sm font-medium text-white/90">Overall Budget</p>
          <p className="mt-1 text-2xl font-bold">
            {formatMoney(overallSpent, user.currency)}{" "}
            <span className="text-sm font-normal text-white/80">
              of {formatMoney(overallBudget, user.currency)}
            </span>
          </p>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white" style={{ width: `${Math.min(percent, 100)}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-white/80">
            <span>Remaining {formatMoney(remaining, user.currency)}</span>
            <span>{percent}%</span>
          </div>
        </div>

        <h2 className="mb-4 mt-8 text-base font-bold text-ink-900">Category breakdown</h2>
        <div className="flex flex-col gap-3">
          {checkedCategories.length === 0 && (
            <p className="text-sm text-ink-500">
              No categories set yet — run budget setup to choose your priorities.
            </p>
          )}
          {checkedCategories.map((meta) => {
            const Icon = meta.icon;
            const spent = spentByCategory[meta.id] || 0;
            const catPercent =
              perCategoryBudget > 0 ? Math.round((spent / perCategoryBudget) * 100) : 0;
            return (
              <div
                key={meta.id}
                className="flex items-center gap-4 rounded-xl border border-ink-100 bg-white px-4 py-3"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: meta.iconBg }}
                >
                  <Icon size={16} style={{ color: meta.iconColor }} />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-900">{meta.title}</p>
                  <div className="mt-1.5">
                    <ProgressBar percent={Math.min(catPercent, 100)} />
                  </div>
                </div>
                <p className="shrink-0 text-sm text-ink-500">
                  {formatMoney(spent, user.currency)}/{formatMoney(perCategoryBudget, user.currency)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}