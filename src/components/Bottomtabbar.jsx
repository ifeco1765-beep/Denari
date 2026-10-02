import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./data/Navitems";

export default function BottomTabBar() {
  const tabs = NAV_ITEMS.filter((item) => item.mobile !== false);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-ink-100 bg-white py-2 md:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            [
              "flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold",
              isActive ? "text-brand-500" : "text-ink-500",
            ].join(" ")
          }
        >
          <Icon size={20} />
          <span className="max-w-[52px] truncate">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}