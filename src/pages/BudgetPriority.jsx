import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import Button from "../components/Button";
import PriorityOption from "../components/PriorityOption";
import { CATEGORIES } from "../data/categories";
import { useBudget } from "../context/BudgetContext";

const DEFAULT_UNCHECKED = new Set(["entertainment"]);

export default function BudgetPriority() {
  const navigate = useNavigate();
  const { setPriorities } = useBudget();
  const [checked, setChecked] = useState(
    Object.fromEntries(CATEGORIES.map((c) => [c.id, !DEFAULT_UNCHECKED.has(c.id)]))
  );

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSubmit = () => {
    setPriorities(checked);
    navigate("/budget");
  };

  return (
    <DashboardShell>
      <div className="mx-auto flex max-w-xl flex-col">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="text-ink-700">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-ink-900">Let&apos;s create your budget</h1>
        </div>

        <p className="mt-6 text-center text-[15px] text-ink-900">What&apos;s your spending priority ?</p>

        <div className="mt-6 flex flex-col gap-3">
          {CATEGORIES.map((c) => (
            <PriorityOption
              key={c.id}
              icon={<c.icon size={18} style={{ color: c.iconColor }} />}
              iconBg={c.iconBg}
              title={c.title}
              subtitle={c.subtitle}
              checked={checked[c.id]}
              onToggle={() => toggle(c.id)}
            />
          ))}
        </div>

        <Button onClick={handleSubmit} className="mt-6 self-center max-w-xs">
          Continue
        </Button>
      </div>
    </DashboardShell>
  );
}