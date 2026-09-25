function FlagBase({ children }) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      className="shrink-0 overflow-hidden rounded-sm"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function NigeriaFlag() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#ffffff" />
      <rect width="6.67" height="14" fill="#008751" />
      <rect x="13.33" width="6.67" height="14" fill="#008751" />
    </FlagBase>
  );
}

export function USFlag() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#B22234" />
      {[0, 2.15, 4.3, 6.45, 8.6, 10.75, 12.9].map((y) => (
        <rect key={y} y={y} width="20" height="1.08" fill="#ffffff" />
      ))}
      <rect width="8" height="7.5" fill="#3C3B6E" />
    </FlagBase>
  );
}

export function EuroFlag() {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 2 * Math.PI;
    return { cx: 10 + 4 * Math.sin(angle), cy: 7 - 4 * Math.cos(angle) };
  });
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#003399" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="0.6" fill="#FFCC00" />
      ))}
    </FlagBase>
  );
}

export function UKFlag() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0L20 14M20 0L0 14" stroke="#ffffff" strokeWidth="2.4" />
      <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1" />
      <path d="M10 0V14M0 7H20" stroke="#ffffff" strokeWidth="4" />
      <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="2.4" />
    </FlagBase>
  );
}
