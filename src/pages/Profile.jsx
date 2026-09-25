import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Settings as SettingsIcon, LogOut, User, Link2, Landmark, Shield, HelpCircle, Users } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import ConfirmModal from "../components/ConfirmModal";
import { useUser } from "../context/UserContext";
import { useBudget } from "../context/BudgetContext";
import { useExpenses } from "../context/ExpenseContext";
import { useSavings } from "../context/SavingsContext";
import { useAuth } from "../context/AuthContext";
import { formatMoney } from "../utilities/currency";

const ITEMS = [
  { label: "Personal information", icon: User, path: "/personal-information" },
  { label: "Linked device", icon: Link2 },
  { label: "Bank accounts", icon: Landmark },
  { label: "security", icon: Shield },
  { label: "Help & support", icon: HelpCircle },
  { label: "Invite friends", icon: Users },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { budget } = useBudget();
  const { totalSpent } = useExpenses();
  const { totalSaved } = useSavings();
  const { logOut } = useAuth();
  const [confirmingLogout, setConfirmingLogout] = useState(false);
const balance = budget.income - totalSpent - totalSaved;

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
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-ink-900">Profile</h1>
          <div className="flex items-center gap-4 text-ink-700">
            <button type="button" onClick={() => navigate("/settings")} aria-label="Settings">
              <SettingsIcon size={19} />
            </button>
            <button
              type="button"
              onClick={() => setConfirmingLogout(true)}
              aria-label="Log out"
              className="text-red-600 hover:text-red-700"
            >
              <LogOut size={19} />
            </button>
            <button type="button" onClick={() => navigate(-1)} aria-label="Back">
              <ChevronLeft size={19} />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-ink-900">
            {user.avatar ? (
              <img src={user.avatar} alt="" className="h-full w-full object-cover" />
            ) : (
              <User size={34} className="text-ink-900" />
            )}
          </span>
          {user.fullName && (
            <p className="mt-3 text-base font-semibold text-ink-900">{user.fullName}</p>
          )}
          {user.email && <p className="text-sm text-ink-500">{user.email}</p>}
        </div>

        <p className="mt-8 text-sm font-semibold text-ink-900">Account Overview</p>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-ink-100 px-4 py-3">
    <p className="text-xs text-ink-500">Total balance</p>
    <p className="mt-1 text-lg font-bold text-ink-900">
      {formatMoney(balance, user.currency)}
    </p>
  </div>
  <div className="rounded-xl border border-ink-100 px-4 py-3">
    <p className="text-xs text-ink-500">Total savings</p>
    <p className="mt-1 text-lg font-bold text-ink-900">
      {formatMoney(totalSaved, user.currency)}
    </p>
  </div>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {ITEMS.map(({ label, icon: Icon, path }) => (
  <button
    key={label}
    type="button"
    onClick={() => path && navigate(path)}
    className="flex items-center justify-between rounded-xl border border-ink-100 bg-white px-4 py-3 text-left"
  >
    <span className="flex items-center gap-3">
      <Icon size={17} className="text-ink-700" />
      <span className="text-sm text-ink-900">{label}</span>
    </span>

    <ChevronRight size={16} className="text-ink-300" />
  </button>
))}
        </div>
      </div>

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