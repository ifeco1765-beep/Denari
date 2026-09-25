import { useRef } from "react";

export default function PinInput({
  length = 4,
  masked = false,
  theme = "light",
  shape = "square",
  tone = "neutral",
  value,
  onChange,
}) {
  const inputsRef = useRef([]);

  const handleChange = (index, e) => {
    const digit = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    const chars = value.split("");
    chars[index] = digit;
    onChange(chars.join("").slice(0, length));
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

 
  if (shape === "dot") {
    return (
      <div className="relative flex justify-center gap-4">
        {Array.from({ length }).map((_, i) => (
          <span
            key={i}
            className={[
              "h-3 w-3 rounded-full border transition-colors",
              value[i]
                ? "border-white bg-white"
                : "border-white/60 bg-transparent",
            ].join(" ")}
          />
        ))}
        <input
          type="tel"
          inputMode="numeric"
          maxLength={length}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, "").slice(0, length))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={`Enter your ${length}-digit PIN`}
        />
      </div>
    );
  }

  const boxTheme =
    theme === "dark"
      ? "border-white/50 bg-transparent text-white focus:border-white"
      : tone === "brand"
        ? "border-brand-100 bg-white text-ink-900 focus:border-brand-500"
        : "border-ink-100 bg-white text-ink-900 focus:border-brand-500";

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type={masked ? "password" : "text"}
          inputMode="numeric"
          maxLength={1}
          placeholder={masked ? "•" : ""}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={`h-14 w-12 rounded-xl border-2 text-center text-lg font-semibold placeholder:text-brand-300 focus:outline-none ${boxTheme}`}
        />
      ))}
    </div>
  );
}
