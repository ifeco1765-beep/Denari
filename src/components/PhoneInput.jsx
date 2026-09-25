import Flag from "./Flag";

export default function PhoneInput({ label = "Phone number", countryCode = "+234", ...rest }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-900">{label}</span>
      <span className="flex h-12 w-full items-center rounded-xl border border-ink-100 bg-white focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
        <span className="flex items-center gap-2 border-r border-ink-100 px-3 text-[15px] text-ink-700">
          <Flag code="NG" /> {countryCode}
        </span>
        <input
          type="tel"
          className="h-full w-full rounded-r-xl px-3 text-[15px] text-ink-900 placeholder:text-ink-300 focus:outline-none"
          {...rest}
        />
      </span>
    </label>
  );
}
