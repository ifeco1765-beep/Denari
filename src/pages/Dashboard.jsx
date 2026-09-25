// src/pages/Dashboard.jsx — full file with additions

import { Bell, Wallet, HandCoins, TrendingUp, MoreHorizontal, Send, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "../components/DashboardShell";
import BalanceCard from "../components/BalanceCard";
import QuickAction from "../components/QuickAction";
import TransactionRow from "../components/TransactionRow";
import CurrencySwitcher from "../components/CurrencySwitcher";
import MoreSheet from "../components/MoreSheet";
import ConfirmModal from "../components/ConfirmModal";
import { useUser } from "../context/UserContext";
import { useSavings } from "../context/SavingsContext";
import { useBudget } from "../context/BudgetContext";
import { useExpenses } from "../context/ExpenseContext";
import { useNotifications } from "../context/NotificationsContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { CATEGORIES } from "../data/categories";

function formatTxTime(dateStr) {
  const date = new Date(dateStr);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return "Today";
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { budget } = useBudget();
  const { expenses, totalSpent } = useExpenses();
  const { totalSaved } = useSavings();
  const { unreadCount } = useNotifications();
  const { logOut } = useAuth();
  const firstName = user.fullName?.trim().split(" ")[0] || "there";
  const [imageError, setImageError] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const balance = budget.income - totalSpent - totalSaved;

  const handleMoreSelect = (action) => {
    setShowMore(false);
    if (action === "settings") navigate("/settings");
    if (action === "profile") navigate("/profile");
    if (action === "logout") setConfirmingLogout(true);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      setConfirmingLogout(false);
      navigate("/login");
    } catch (err) {
      console.error("Log out failed:", err);
    }
  };

  return (
    <DashboardShell>
      {/* Header stays full-width, NOT centered — Hello/name pinned left. */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">HELLO!</h1>
          <p className="text-lg font-semibold text-ink-900">{firstName}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/notifications")}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ink-100 text-ink-700"
            aria-label={unreadCount > 0 ? `Notifications (${unreadCount} unread)` : "Notifications"}
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>
          <CurrencySwitcher />
          <button
            type="button"
            onClick={() => navigate("/profile")}
            aria-label="Profile"
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-brand-100"
          >
            {user.avatar && !imageError ? (
              <img
                src={user.avatar}
                alt=""
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <User size={16} className="text-brand-600" />
            )}
          </button>
        </div>
      </div>

      {/* Everything below the header is centered, like Budget. */}
      <div className="mx-auto max-w-2xl">
        <div className="mt-6">
          <BalanceCard balance={balance} changePercent={0} goalPercent={0} currency={user.currency} />
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-base font-bold text-ink-900">Quick Actions</h2>
          <div className="flex gap-6 overflow-x-auto pb-1">
            <QuickAction icon={Send} label="Add expenses" to="/add-expense" />
            <QuickAction icon={Wallet} label="Budget" to="/budget" />
            <QuickAction icon={HandCoins} label="Savings" to="/savings" />
            <QuickAction icon={TrendingUp} label="Analytics" to="/analytics" />
            <QuickAction icon={MoreHorizontal} label="More" onClick={() => setShowMore(true)} />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-1 text-base font-bold text-ink-900">Recent transactions</h2>
          {expenses.length === 0 ? (
            <p className="mt-3 text-sm text-ink-500">
              No transactions yet — add an expense to see it here.
            </p>
          ) : (
            <div className="divide-y divide-ink-100">
              {expenses.slice(0, 5).map((e) => {
                const meta = CATEGORIES.find((c) => c.id === e.categoryId);
                return (
                  <TransactionRow
                    key={e.id}
                    name={e.name || e.paymentMethod || meta?.title || "Expense"}
                    category={meta?.title ?? "Uncategorized"}
                    amount={e.amount}
                    time={formatTxTime(e.date)}
                    icon={
                      meta ? (
                        <meta.icon size={16} style={{ color: meta.iconColor }} />
                      ) : (
                        <Wallet size={16} className="text-brand-600" />
                      )
                    }
                    iconBg={meta?.iconBg ?? "#FFE4D1"}
                    currency={user.currency}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showMore && (
        <MoreSheet onClose={() => setShowMore(false)} onSelect={handleMoreSelect} />
      )}

      {confirmingLogout && (
        <ConfirmModal
          title="Log Out"
          message="Are you sure you want to log out?"
          confirmLabel="Log Out"
          onConfirm={handleLogOut}
          onCancel={() => setConfirmingLogout(false)}
        />
      )}
    </DashboardShell>
  );
}