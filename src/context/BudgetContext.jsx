import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const BASE_KEY = "denari_budget";

const DEFAULT_BUDGET = {
  income: 0,
  period: "monthly",
  priorities: {},
};

const BudgetContext = createContext({
  budget: DEFAULT_BUDGET,
  setIncome: () => {},
  setPriorities: () => {},
});

export function BudgetProvider({ children }) {
  const { currentUser, authLoading } = useAuth();
  const uid = currentUser?.uid;
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!uid) {
      setBudget(DEFAULT_BUDGET);
      setLoaded(false);
      return;
    }
    try {
      const raw = localStorage.getItem(`${BASE_KEY}:${uid}`);
      setBudget(raw ? { ...DEFAULT_BUDGET, ...JSON.parse(raw) } : DEFAULT_BUDGET);
    } catch {
      setBudget(DEFAULT_BUDGET);
    }
    setLoaded(true);
  }, [uid, authLoading]);

  useEffect(() => {
    if (!uid || !loaded) return;
    localStorage.setItem(`${BASE_KEY}:${uid}`, JSON.stringify(budget));
  }, [budget, uid, loaded]);

  const setIncome = (amount, period) =>
    setBudget((prev) => ({ ...prev, income: amount, period }));

  const setPriorities = (priorities) =>
    setBudget((prev) => ({ ...prev, priorities }));

  return (
    <BudgetContext.Provider value={{ budget, setIncome, setPriorities }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  return useContext(BudgetContext);
}