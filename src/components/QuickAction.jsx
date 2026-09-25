import { Link } from "react-router-dom";

export default function QuickAction({ icon: Icon, label, to, onClick }) {
  const content = (
    <>
      <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-ink-100 text-ink-900">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <span className="text-xs text-ink-500">{label}</span>
    </>
  );

  const className = "flex flex-col items-center gap-2";

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
