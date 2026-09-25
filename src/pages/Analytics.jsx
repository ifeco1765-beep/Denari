import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import DashboardShell from "../components/DashboardShell";
import { useUser } from "../context/UserContext";
import { useExpenses } from "../context/ExpenseContext";
import { CATEGORIES } from "../data/categories";
import { formatMoney } from "../utilities/currency";

function buildMonthlyTrend(expenses) {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      month: d.toLocaleString("default", { month: "short" }),
      value: 0,
    });
  }
  expenses.forEach((e) => {
    const d = new Date(e.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = months.find((m) => m.key === key);
    if (bucket) bucket.value += Math.abs(e.amount);
  });
  return months;
}

function buildCategoryBreakdown(expenses, totalSpent) {
  if (totalSpent === 0) return [];
  const totals = {};
  expenses.forEach((e) => {
    const amt = Math.abs(e.amount);
    totals[e.categoryId] = (totals[e.categoryId] || 0) + amt;
  });
  return Object.entries(totals)
    .map(([categoryId, amount]) => {
      const meta = CATEGORIES.find((c) => c.id === categoryId);
      return {
        id: categoryId,
        name: meta?.title ?? "Uncategorized",
        color: meta?.iconColor ?? "#9CA3AF",
        value: Math.round((amount / totalSpent) * 100),
      };
    })
    .sort((a, b) => b.value - a.value);
}

export default function Analytics() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { expenses, totalSpent } = useExpenses();
  const trend = buildMonthlyTrend(expenses);
  const breakdown = buildCategoryBreakdown(expenses, totalSpent);

  return (
    <DashboardShell>
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="text-ink-700">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-ink-900">Analytics</h1>
        </div>

        <div className="mt-6 rounded-xl border border-ink-100 p-5">
          <p className="text-sm text-ink-500">Overall spent</p>
          <p className="mt-1 text-2xl font-bold text-ink-900">
            {formatMoney(totalSpent, user.currency)}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold text-ink-900">Spending by Category</p>
            {breakdown.length === 0 ? (
              <p className="text-sm text-ink-500">No expenses logged yet.</p>
            ) : (
              <div className="h-40 w-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={breakdown} dataKey="value" innerRadius={45} outerRadius={75} strokeWidth={0}>
                      {breakdown.map((entry) => (
                        <Cell key={entry.id} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {breakdown.length > 0 && (
            <ul className="flex flex-col gap-2">
              {breakdown.map((c) => (
                <li key={c.id} className="flex items-center gap-2 text-sm text-ink-700">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                  <span className="ml-auto pl-4 text-ink-500">{c.value}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold text-ink-900">Monthly Trend</p>
          {expenses.length === 0 ? (
            <p className="text-sm text-ink-500">No expenses logged yet.</p>
          ) : (
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B6C77" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B6C77" }} />
                  <Bar dataKey="value" fill="#FF8E28" radius={[3, 3, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}