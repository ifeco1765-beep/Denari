import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";


export default function Input({
  label,
  type = "text",
  isPassword = false,
  className = "",
  ...rest
}) {
  const [visible, setVisible] = useState(false);
  const resolvedType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-[15px] font-semibold text-ink-900">
          {label}
        </span>
      )}
      <span className="relative flex items-center">
        <input
          type={resolvedType}
          className={[
            "h-12 w-full rounded-xl border border-ink-100 bg-white",
            "px-4 text-[15px] text-ink-900 placeholder:text-ink-300",
            "focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500",
            isPassword ? "pr-11" : "",
            className,
          ].join(" ")}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-4 text-ink-500 hover:text-ink-900"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        )}
      </span>
    </label>
  );
}
