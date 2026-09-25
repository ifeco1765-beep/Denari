import { Home, Wallet, Send, PiggyBank, BarChart3, User } from "lucide-react";

export const NAV_ITEMS = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/budget", label: "Budget", icon: Wallet },
  { to: "/add-expense", label: "Add expenses", icon: Send },
  { to: "/savings", label: "Savings", icon: PiggyBank },
  { to: "/analytics", label: "Analytics", icon: BarChart3, mobile: false },
  { to: "/profile", label: "Profile", icon: User },
];