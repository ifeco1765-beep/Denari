export default function ProgressBar({ percent }) {
  const clamped = Math.max(0, Math.min(percent, 100));
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
      <div className="h-full rounded-full bg-[#2F5DFF]" style={{ width: `${clamped}%` }} />
    </div>
  );
}
