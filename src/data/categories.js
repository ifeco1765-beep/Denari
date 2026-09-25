import { Car, Home, Utensils, Clapperboard, HandCoins } from "lucide-react";

export const CATEGORIES = [
  {
    id: "needs",
    title: "Needs",
    subtitle: "Rent, groceries, bills",
    icon: Home,
    iconBg: "#FFE1C4",
    iconColor: "#DC2626",
  },
  {
    id: "transport",
    title: "Transport",
    subtitle: "Fuel, public transport",
    icon: Car,
    iconBg: "#FFE1C4",
    iconColor: "#F2760C",
  },
  {
    id: "food",
    title: "Foods & Dining",
    subtitle: "Meals, Restaurant",
    icon: Utensils,
    iconBg: "#FFE1C4",
    iconColor: "#EF4444",
  },
  {
    id: "entertainment",
    title: "Entertainment",
    subtitle: "Movies, games, subscription",
    icon: Clapperboard,
    iconBg: "#EDE7FB",
    iconColor: "#9747FF",
  },
  {
    id: "savings",
    title: "Savings & Investment",
    subtitle: "Build your future",
    icon: HandCoins,
    iconBg: "#DCEAFE",
    iconColor: "#2563EB",
  },
];
