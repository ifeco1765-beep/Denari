import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const BASE_KEY = "denari_expenses";

const ExpenseContext = createContext({
  expenses: [],
  addExpense: () => {},
  removeExpense: () => {},
  totalSpent: 0,
});

export function ExpenseProvider({ children }) {
  const { currentUser, authLoading } = useAuth();
  const uid = currentUser?.uid;
  const [expenses, setExpenses] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!uid) {
      setExpenses([]);
      setLoaded(false);
      return;
    }
    try {
      const raw = localStorage.getItem(`${BASE_KEY}:${uid}`);
      setExpenses(raw ? JSON.parse(raw) : []);
    } catch {
      setExpenses([]);
    }
    setLoaded(true);
  }, [uid, authLoading]);

  useEffect(() => {
    if (!uid || !loaded) return;
    localStorage.setItem(`${BASE_KEY}:${uid}`, JSON.stringify(expenses));
  }, [expenses, uid, loaded]);

  const addExpense = ({ name, amount, date, paymentMethod, notes, categoryId }) => {
    const entry = {
      id: crypto.randomUUID(),
      name: name || null,
      amount: -Math.abs(Number(amount) || 0),
      date,
      paymentMethod: paymentMethod || null,
      notes: notes || null,
      categoryId: categoryId || null,
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [entry, ...prev]);
    return entry;
  };

  const removeExpense = (id) =>
    setExpenses((prev) => prev.filter((e) => e.id !== id));

  const totalSpent = expenses.reduce(
    (sum, e) => sum + (e.amount < 0 ? Math.abs(e.amount) : 0),
    0
  );

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, removeExpense, totalSpent }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}