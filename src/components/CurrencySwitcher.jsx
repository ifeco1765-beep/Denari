import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Flag from "./Flag";
import { CURRENCIES } from "../utilities/Currency";
import { useUser } from "../context/UserContext";

export default function CurrencySwitcher() {
  const { user, updateUser } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = CURRENCIES.find((c) => c.code === user.currency) || CURRENCIES[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-full border border-ink-100 px-2.5 py-1.5 text-xs font-semibold text-ink-700"
        aria-label="Change currency"
        aria-expanded={open}
      >
        <Flag code={current.flagCode} />
        {current.code}
        <ChevronDown size={13} />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-xl border border-ink-100 bg-white p-1.5 shadow-card">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                updateUser({ currency: c.code });
                setOpen(false);
              }}
              className={[
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
                c.code === user.currency
                  ? "bg-brand-50 font-semibold text-ink-900"
                  : "text-ink-700 hover:bg-ink-50",
              ].join(" ")}
            >
              <Flag code={c.flagCode} />
              {c.name}
              <span className="ml-auto text-xs text-ink-500">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}