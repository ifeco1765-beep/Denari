import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import Input from "../components/Input";
import Button from "../components/Button";
import { useSavings, GOAL_ICONS } from "../context/SavingsContext";

export default function AddSavingsGoal() {
  const navigate = useNavigate();
  const { addGoal } = useSavings();
  const [formData, setFormData] = useState({ title: "", target: "", initialSaved: "" });
  const [iconKey, setIconKey] = useState("emergency");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.target) return;
    addGoal({ ...formData, iconKey });
    navigate("/savings");
  };

  return (
    <DashboardShell>
      <div className="mx-auto max-w-xl">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="text-ink-700">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-ink-900">New Savings Goal</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <Input
            label="Goal name"
            name="title"
            placeholder="e.g. Emergency Fund"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            label="Target amount"
            name="target"
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={formData.target}
            onChange={handleChange}
            required
          />
          <Input
            label="Already saved (optional)"
            name="initialSaved"
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={formData.initialSaved}
            onChange={handleChange}
          />

          <div>
            <p className="mb-2 text-sm font-medium text-ink-700">Category</p>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(GOAL_ICONS).map(([key, { icon: Icon, iconBg, iconColor, label }]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setIconKey(key)}
                  className={[
                    "flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-center transition-colors",
                    iconKey === key
                      ? "border-brand-500 bg-brand-50"
                      : "border-ink-100 hover:border-ink-300",
                  ].join(" ")}
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{ backgroundColor: iconBg }}
                  >
                    <Icon size={16} style={{ color: iconColor }} />
                  </span>
                  <span className="text-xs font-medium text-ink-900">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="mt-2 max-w-xs">
            Create Goal
          </Button>
        </form>
      </div>
    </DashboardShell>
  );
}