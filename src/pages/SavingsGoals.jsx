import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { useUser } from "../context/UserContext";
import { useSavings, GOAL_ICONS } from "../context/SavingsContext";
import { formatMoney } from "../utilities/Currency";

export default function SavingsGoals() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { goals, totalSaved } = useSavings();

  return (
    <DashboardShell>
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="text-ink-700">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-ink-900">Savings Goals</h1>
          </div>
          <Button className="w-auto px-5" onClick={() => navigate("/savings/new")}>
            +New Goal
          </Button>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-6 text-white shadow-card">
          <div>
            <p className="text-sm text-white/90">Total Saved</p>
            <p className="mt-1 text-3xl font-bold">{formatMoney(totalSaved, user.currency)}</p>
          </div>
          <span aria-hidden="true">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path
                d="M22 10c-5 4-9 4-9 4s1 5 4 7c-3 2-6 6-6 10 0 6 5 9 11 9s11-3 11-9c0-4-3-8-6-10 3-2 4-7 4-7s-4 0-9-4Z"
                fill="#FFD9A8"
                stroke="#fff"
                strokeWidth="1.5"
              />
              <circle cx="22" cy="30" r="6" fill="#fff" />
              <text x="22" y="34" textAnchor="middle" fontSize="9" fontWeight="700" fill="#F2760C">
                $
              </text>
            </svg>
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {goals.length === 0 && (
            <p className="text-sm text-ink-500">
              No savings goals yet — tap "+New Goal" to create one.
            </p>
          )}
          {goals.map((g) => {
            const meta = GOAL_ICONS[g.iconKey] || GOAL_ICONS.other;
            const Icon = meta.icon;
            const percent = g.target > 0 ? Math.min(100, Math.round((g.saved / g.target) * 100)) : 0;
            return (
              <div key={g.id} className="rounded-xl border border-ink-100 bg-white px-4 py-3">
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: meta.iconBg }}
                  >
                    <Icon size={16} style={{ color: meta.iconColor }} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink-900">{g.title}</p>
                    <p className="text-xs text-ink-500">
                      {formatMoney(g.saved, user.currency)}/{formatMoney(g.target, user.currency)}.
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-ink-900">{percent}%</p>
                </div>
                <div className="mt-2">
                  <ProgressBar percent={percent} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}