import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Cog, Bell, Lock, ShieldCheck, HelpCircle, RotateCcw } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "../context/AuthContext";
import { resetFinancialData } from "../utilities/resetData";

const ITEMS = [
  { label: "General", subtitle: "Language, currency, theme", icon: Cog },
  { label: "Notifications", subtitle: "Manage notification preferences", icon: Bell },
  { label: "Privacy", subtitle: "Manage your data and privacy", icon: Lock },
  { label: "security", subtitle: "Change Pin and Biometric", icon: ShieldCheck },
  { label: "About DENARI", subtitle: "VERSION 1.0.0", icon: HelpCircle },
];

export default function Settings() {
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth();
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const handleLogout = async () => {
    await logOut();
    setConfirmingLogout(false);
    navigate("/welcome");
  };

  
  const handleReset = () => {
   
    resetFinancialData(currentUser?.uid);
    setConfirmingReset(false);
    window.location.reload();
  };

  return (
    <DashboardShell>
      <div className="mx-auto max-w-xl">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="text-ink-700">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-ink-900">Settings</h1>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {ITEMS.map(({ label, subtitle, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => console.log(`${label} tapped`)}
              className="flex items-center justify-between rounded-xl border border-ink-100 bg-white px-4 py-3 text-left"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-900">
                  <Icon size={16} className="text-white" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink-900">{label}</span>
                  <span className="block text-xs text-ink-500">{subtitle}</span>
                </span>
              </span>
              <ChevronRight size={16} className="text-ink-300" />
            </button>
          ))}

          <button
            type="button"
            onClick={() => setConfirmingReset(true)}
            className="flex items-center justify-between rounded-xl border border-ink-100 bg-white px-4 py-3 text-left"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-900">
                <RotateCcw size={16} className="text-white" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink-900">Reset financial data</span>
                <span className="block text-xs text-ink-500">Clear budget, expenses, and savings goals</span>
              </span>
            </span>
            <ChevronRight size={16} className="text-ink-300" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setConfirmingLogout(true)}
          className="mt-6 h-12 w-full rounded-xl bg-red-50 font-semibold text-red-600 hover:bg-red-100"
        >
          Log out
        </button>
      </div>

      {confirmingLogout && (
        <ConfirmModal
          title="Log Out"
          message="Are you sure you want to log out?"
          confirmLabel="Log Out"
          onConfirm={handleLogout}
          onCancel={() => setConfirmingLogout(false)}
        />
      )}

      {confirmingReset && (
        <ConfirmModal
          title="Reset Financial Data"
          message="This clears your budget, expenses, and savings goals. Your account and login stay unchanged. This can't be undone."
          confirmLabel="Reset"
          onConfirm={handleReset}
          onCancel={() => setConfirmingReset(false)}
        />
      )}
    </DashboardShell>
  );
}