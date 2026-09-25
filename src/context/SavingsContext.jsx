import { createContext, useContext, useEffect, useState } from "react";
import { ShieldCheck, Palmtree, Laptop, Home, GraduationCap, Target } from "lucide-react";
import { useAuth } from "./AuthContext";

const BASE_KEY = "denari_savings_goals";

export const GOAL_ICONS = {
  emergency: { icon: ShieldCheck, iconBg: "#FFE1C4", iconColor: "#F2760C", label: "Emergency Fund" },
  vacation: { icon: Palmtree, iconBg: "#FFE1C4", iconColor: "#F2760C", label: "Vacation / Trip" },
  gadget: { icon: Laptop, iconBg: "#FFE1C4", iconColor: "#DC2626", label: "Gadget / Tech" },
  home: { icon: Home, iconBg: "#DCFCE7", iconColor: "#16A34A", label: "Home / Property" },
  education: { icon: GraduationCap, iconBg: "#DBEAFE", iconColor: "#2563EB", label: "Education" },
  other: { icon: Target, iconBg: "#F3E8FF", iconColor: "#9333EA", label: "Other" },
};

const SavingsContext = createContext({
  goals: [],
  addGoal: () => {},
  addFunds: () => {},
  totalSaved: 0,
});

export function SavingsProvider({ children }) {
  const { currentUser, authLoading } = useAuth();
  const uid = currentUser?.uid;
  const [goals, setGoals] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!uid) {
      setGoals([]);
      setLoaded(false);
      return;
    }
    try {
      const raw = localStorage.getItem(`${BASE_KEY}:${uid}`);
      setGoals(raw ? JSON.parse(raw) : []);
    } catch {
      setGoals([]);
    }
    setLoaded(true);
  }, [uid, authLoading]);

  useEffect(() => {
    if (!uid || !loaded) return;
    localStorage.setItem(`${BASE_KEY}:${uid}`, JSON.stringify(goals));
  }, [goals, uid, loaded]);

  const addGoal = ({ title, target, iconKey, initialSaved = 0 }) => {
    const goal = {
      id: crypto.randomUUID(),
      title,
      target: Number(target) || 0,
      saved: Number(initialSaved) || 0,
      iconKey: iconKey || "other",
      createdAt: new Date().toISOString(),
    };
    setGoals((prev) => [goal, ...prev]);
    return goal;
  };

  const addFunds = (id, amount) =>
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, saved: g.saved + (Number(amount) || 0) } : g))
    );

  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);

  return (
    <SavingsContext.Provider value={{ goals, addGoal, addFunds, totalSaved }}>
      {children}
    </SavingsContext.Provider>
  );
}

export function useSavings() {
  return useContext(SavingsContext);
}