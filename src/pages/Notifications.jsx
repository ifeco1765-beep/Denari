import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Target, ArrowLeftRight, ClipboardCheck, Sparkles } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import { useUser } from "../context/UserContext";
import { useNotifications } from "../context/NotificationsContext";
import { useBudget } from "../context/BudgetContext";
import { useExpenses } from "../context/ExpenseContext";
import { useSavings } from "../context/SavingsContext";
import { CATEGORIES } from "../data/categories";
import { formatMoney } from "./utilities/Currency";

const TABS = ["All", "Transactions", "Budget", "Goals"];

const ICONS = { sparkles: { icon: Sparkles, iconBg: "#FFE1C4", iconColor: "#F2760C" } };


function buildDerivedNotifications({ budget, expenses, totalSpent, goals, navigate }) {
  const rows = [];

  
  if (budget.income > 0) {
    const percent = Math.round((totalSpent / budget.income) * 100);
    if (percent >= 80) {
      rows.push({
        id: "derived-budget",
        category: "Budget",
        title: percent >= 100 ? "Over Budget" : "Budget Alert",
        body: () => `You have spent ${percent}% of your overall budget`,
        time: "",
        icon: AlertTriangle,
        iconBg: "#FFE1C4",
        iconColor: percent >= 100 ? "#DC2626" : "#F2760C",
      });
    }
  }

  
  goals.forEach((g) => {
    if (g.target <= 0) return;
    const percent = Math.round((g.saved / g.target) * 100);
    if (percent >= 25) {
      rows.push({
        id: `derived-goal-${g.id}`,
        category: "Goals",
        title: percent >= 100 ? "Goal Reached" : "Goal Update",
        body: () => `You have reached ${Math.min(percent, 100)}% of your ${g.title} goal`,
        time: "",
        icon: Target,
        iconBg: "#FFE1C4",
        iconColor: "#F2760C",
        onClick: (nav) => nav("/savings"),
      });
    }
  });

  
  if (expenses.length > 0) {
    const latest = expenses[0]; 
    const meta = CATEGORIES.find((c) => c.id === latest.categoryId);
    rows.push({
      id: `derived-tx-${latest.id}`,
      category: "Transactions",
      title: "Transaction",
      body: (currency) =>
        `${formatMoney(latest.amount, currency)} spent on ${latest.name || meta?.title || "an expense"}`,
      time: "",
      icon: ArrowLeftRight,
      iconBg: "#E7E7EC",
      iconColor: "#6B6C77",
    });
  }

  
  rows.push({
    id: "derived-weekly-review",
    category: "Budget",
    title: "Weekly Review",
    body: () => "Check your weekly summary",
    time: "",
    icon: ClipboardCheck,
    iconBg: "#DCEAFE",
    iconColor: "#2563EB",
    onClick: (nav) => nav("/weekly-review"),
  });

  return rows;
}

export default function Notifications() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { notifications, markAllRead } = useNotifications();
  const { budget } = useBudget();
  const { expenses, totalSpent } = useExpenses();
  const { goals } = useSavings();
  const [tab, setTab] = useState("All");

  useEffect(() => {
    markAllRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dynamicRows = notifications.map((n) => ({
    ...n,
    ...ICONS[n.iconKey],
    body: () => n.body,
  }));

  const derivedRows = buildDerivedNotifications({ budget, expenses, totalSpent, goals, navigate });

  const allRows = [...dynamicRows, ...derivedRows];
  const filtered = tab === "All" ? allRows : allRows.filter((n) => n.category === tab);

  return (
    <DashboardShell>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-xl font-bold text-ink-900">Notifications</h1>

        <div className="mt-5 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={[
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                tab === t
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-ink-100 bg-white text-ink-700 hover:border-ink-300",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {filtered.length === 0 && (
            <p className="text-sm text-ink-500">Nothing here yet.</p>
          )}
          {filtered.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => n.onClick?.(navigate)}
              disabled={!n.onClick}
              className="flex items-start justify-between gap-4 rounded-xl border border-ink-100 bg-white px-4 py-3 text-left disabled:cursor-default"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: n.iconBg }}
                >
                  <n.icon size={16} style={{ color: n.iconColor }} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{n.title}</p>
                  <p className="text-xs text-ink-500">{n.body(user.currency)}</p>
                </div>
              </div>
              {n.time && <span className="shrink-0 text-xs text-ink-300">{n.time}</span>}
            </button>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}