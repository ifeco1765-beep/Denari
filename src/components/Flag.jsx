
const FLAGS = {
  NG: (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" fill="#fff" />
      <rect width="6.67" height="14" fill="#008751" />
      <rect x="13.33" width="6.67" height="14" fill="#008751" />
    </svg>
  ),
  US: (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" fill="#B22234" />
      <rect y="1.08" width="20" height="1.08" fill="#fff" />
      <rect y="3.23" width="20" height="1.08" fill="#fff" />
      <rect y="5.38" width="20" height="1.08" fill="#fff" />
      <rect y="7.54" width="20" height="1.08" fill="#fff" />
      <rect y="9.69" width="20" height="1.08" fill="#fff" />
      <rect y="11.85" width="20" height="1.08" fill="#fff" />
      <rect width="8" height="7.54" fill="#3C3B6E" />
    </svg>
  ),
  EU: (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" fill="#003399" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 2 * Math.PI;
        const cx = 10 + 5 * Math.sin(angle);
        const cy = 7 - 5 * Math.cos(angle);
        return <circle key={i} cx={cx} cy={cy} r="0.6" fill="#FFCC00" />;
      })}
    </svg>
  ),
  GB: (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" fill="#00247D" />
      <path d="M0 0L20 14M20 0L0 14" stroke="#fff" strokeWidth="2" />
      <path d="M0 0L20 14M20 0L0 14" stroke="#CF142B" strokeWidth="0.8" />
      <rect x="8.5" width="3" height="14" fill="#fff" />
      <rect y="5.5" width="20" height="3" fill="#fff" />
      <rect x="9.2" width="1.6" height="14" fill="#CF142B" />
      <rect y="6.2" width="20" height="1.6" fill="#CF142B" />
    </svg>
  ),
};

export default function Flag({ code, className = "" }) {
  const svg = FLAGS[code];
  if (!svg) return null;
  return <span className={["inline-block overflow-hidden rounded-sm", className].join(" ")}>{svg}</span>;
}
