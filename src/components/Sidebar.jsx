import { NavLink } from "react-router-dom";
import { Settings } from "lucide-react";
import Logo from "./Logo";
import { NAV_ITEMS } from "../data/Navitems";

export default function Sidebar() {
  return (
   <aside className="hidden h-full w-60 shrink-0 flex-col justify-between border-r border-ink-100 bg-white px-4 py-6 md:flex">
      <div>
        <div className="px-2 pb-8">
          <Logo size="text-xl" />
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-brand-500 text-white"
                    : "text-ink-700 hover:bg-brand-50",
                ].join(" ")
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          [
            "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
            isActive ? "bg-brand-500 text-white" : "text-ink-700 hover:bg-brand-50",
          ].join(" ")
        }
      >
        <Settings size={18} />
        Settings
      </NavLink>
    </aside>
  );
}