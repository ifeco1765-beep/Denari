import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, X, Plus } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import Input from "../components/Input";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";
import { useExpenses } from "../context/ExpenseContext";
import { getCurrency, formatMoney } from "../utilities/currency";
import { CATEGORIES } from "../data/categories";

export default function AddExpense() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { addExpense } = useExpenses();
  const symbol = getCurrency(user.currency).symbol;

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [categoryId, setCategoryId] = useState(CATEGORIES[0]?.id ?? "");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const total = items.reduce((sum, i) => sum + Number(i.amount), 0);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemName || !itemAmount) return;
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: itemName, amount: Number(itemAmount), categoryId },
    ]);
    setItemName("");
    setItemAmount("");
  };

  const handleRemoveItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const handleSave = () => {
    if (items.length === 0) return;
    items.forEach((item) => {
      addExpense({
        name: item.name,
        amount: item.amount,
        categoryId: item.categoryId,
        date,
        paymentMethod,
      });
    });
    const count = items.length;
    setItems([]);
    setSavedMessage(`Saved ${count} expense${count > 1 ? "s" : ""} to your records.`);
    setTimeout(() => navigate("/dashboard"), 900);
  };

  const handleClear = () => {
    setItems([]);
    setSavedMessage("");
  };

  return (
    <DashboardShell>
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-ink-900">Add Expense</h1>
          <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-ink-500">
            <ChevronLeft size={16} /> Back
          </button>
        </div>
        <p className="mt-1 text-sm text-ink-500">
          Add as many items as you like and total them up — nothing is saved to your records until you choose to.
        </p>

        <form onSubmit={handleAddItem} className="mt-6 flex flex-col gap-4 rounded-xl border border-ink-100 p-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Item"
              name="itemName"
              placeholder="e.g. Rice and chicken"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Input
              label="Amount"
              name="itemAmount"
              type="text"
              inputMode="decimal"
              placeholder={`${symbol} 0.00`}
              value={itemAmount}
              onChange={(e) => setItemAmount(e.target.value)}
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-ink-700">Category</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryId(c.id)}
                  className={[
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                    categoryId === c.id
                      ? "border-brand-500 bg-brand-50 text-ink-900"
                      : "border-ink-100 text-ink-700 hover:border-ink-300",
                  ].join(" ")}
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ backgroundColor: c.iconBg }}
                  >
                    <c.icon size={11} style={{ color: c.iconColor }} />
                  </span>
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-auto self-start px-5">
            <span className="flex items-center gap-1.5">
              <Plus size={15} /> Add item
            </span>
          </Button>
        </form>

        {items.length > 0 && (
          <div className="mt-6 flex flex-col gap-2">
            {items.map((item) => {
              const meta = CATEGORIES.find((c) => c.id === item.categoryId);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-ink-100 bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: meta?.iconBg }}
                    >
                      {meta && <meta.icon size={14} style={{ color: meta.iconColor }} />}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{item.name}</p>
                      <p className="text-xs text-ink-500">{meta?.title ?? "Uncategorized"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold text-ink-900">
                      {formatMoney(item.amount, user.currency)}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="text-ink-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-500 to-[#9F5819] p-6 text-white shadow-card">
          <p className="text-sm font-medium text-white/90">Total</p>
          <p className="mt-1 text-2xl font-bold">{formatMoney(total, user.currency)}</p>
          <p className="mt-1 text-xs text-white/80">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>

        {items.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            <Input label="Date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Input
              label="Payment method (optional)"
              name="paymentMethod"
              placeholder="e.g. GTB.............8785"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
        )}

        {savedMessage && <p className="mt-3 text-sm font-medium text-emerald-600">{savedMessage}</p>}

        <div className="mt-6 flex gap-3">
          <Button type="button" onClick={handleSave} disabled={items.length === 0} className="max-w-xs">
            Save to My Expenses
          </Button>
          <Button
            type="button"
            onClick={handleClear}
            disabled={items.length === 0}
            className="max-w-xs border border-ink-200 bg-white text-ink-900 hover:bg-ink-50"
          >
            Clear (Don't Save)
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}