import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import Button from "../components/Button";
import IncomeRing from "../components/IncomeRing";
import { useBudget } from "../context/BudgetContext";
import { useUser } from "../context/UserContext";
import { formatMoney } from "./utilities/Currency";

const PRESETS = {
  monthly: ["₦250k", "₦500k", "₦750k", "Other"],
  weekly: ["₦50k", "₦100k", "₦250k", "Other"],
};

const PRESET_VALUES = {
  monthly: { "₦250k": 250000, "₦500k": 500000, "₦750k": 750000, Other: 0 },
  weekly: { "₦50k": 50000, "₦100k": 100000, "₦250k": 250000, Other: 0 },
};

const DEFAULT_SELECTION = { monthly: "₦500k", weekly: "₦100k" };

export default function BudgetIncome() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { setIncome } = useBudget();
  const [period, setPeriod] = useState("monthly");
  const [selected, setSelected] = useState(DEFAULT_SELECTION.monthly);

  const togglePeriod = () => {
    const next = period === "monthly" ? "weekly" : "monthly";
    setPeriod(next);
    setSelected(DEFAULT_SELECTION[next]);
  };

  const amount = PRESET_VALUES[period][selected];

  const handleSubmit = () => {
    setIncome(amount, period);
    navigate("/budget/setup/priority");
  };

  return (
    <DashboardShell>
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold text-ink-900">Let&apos;s create your budget</h1>
          <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="text-ink-700">
            <ChevronLeft size={20} />
          </button>
        </div>

        <p className="mt-8 text-[15px] text-ink-900">What&apos;s your {period} income ?</p>

        <div className="mt-6">
          <IncomeRing amount={formatMoney(amount, user.currency)} caption="Monthly income" />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {PRESETS[period].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setSelected(label)}
              className={[
                "rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors",
                selected === label
                  ? "bg-brand-300 text-ink-900"
                  : "bg-brand-50 text-ink-700 hover:bg-brand-100",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={togglePeriod}
          className="mt-3 text-sm font-semibold text-brand-500 hover:underline"
        >
          or {period === "monthly" ? "weekly" : "monthly"}?
        </button>

        <Button onClick={handleSubmit} className="mt-8 max-w-xs">
          Continue
        </Button>
      </div>
    </DashboardShell>
  );
}