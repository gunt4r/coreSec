const CENTER = { x: 280, y: 260 };

function ring(count: number, radius: number, offsetDeg: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = ((i * (360 / count) + offsetDeg) * Math.PI) / 180;
    return {
      x: CENTER.x + radius * Math.cos(angle),
      y: CENTER.y + radius * Math.sin(angle),
    };
  });
}

const outerNodes = ring(6, 168, -30);
const innerNodes = ring(3, 100, 0);
const hexPoints = ring(6, 62, -30)
  .map((p) => `${p.x},${p.y}`)
  .join(" ");

export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 560 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      {Array.from({ length: 14 }, (_, r) =>
        Array.from({ length: 10 }, (_, c) => (
          <circle key={`g${r}-${c}`} cx={8 + c * 62} cy={8 + r * 38} r="1.2" fill="white" fillOpacity="0.06" />
        )),
      )}

      {[120, 200, 280, 360, 440].map((y) => (
        <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="white" strokeOpacity="0.03" strokeWidth="1" />
      ))}

      <circle cx={CENTER.x} cy={CENTER.y} r="226" stroke="white" strokeOpacity="0.04" strokeWidth="1" />
      <circle cx={CENTER.x} cy={CENTER.y} r="168" stroke="white" strokeOpacity="0.07" strokeWidth="1" />
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="108"
        stroke="white"
        strokeOpacity="0.1"
        strokeWidth="1"
        strokeDasharray="6 8"
      />

      {outerNodes.map((n, i) => (
        <line
          key={`spoke${i}`}
          x1={CENTER.x}
          y1={CENTER.y}
          x2={n.x}
          y2={n.y}
          stroke="white"
          strokeOpacity="0.05"
          strokeWidth="1"
        />
      ))}

      {outerNodes.map((n, i) => {
        const next = outerNodes[(i + 1) % outerNodes.length];
        return (
          <line
            key={`edge${i}`}
            x1={n.x}
            y1={n.y}
            x2={next.x}
            y2={next.y}
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        );
      })}

      {innerNodes.map((n, i) => {
        const next = innerNodes[(i + 1) % innerNodes.length];
        return (
          <line
            key={`tri${i}`}
            x1={n.x}
            y1={n.y}
            x2={next.x}
            y2={next.y}
            stroke="#18A058"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        );
      })}

      {outerNodes.map((n, i) => (
        <g key={`node${i}`}>
          <circle cx={n.x} cy={n.y} r="10" fill="white" fillOpacity="0.04" />
          <circle cx={n.x} cy={n.y} r="4.5" fill="white" fillOpacity="0.2" />
          <circle cx={n.x} cy={n.y} r="2" fill="white" fillOpacity="0.7" />
        </g>
      ))}

      {innerNodes.map((n, i) => (
        <circle key={`inner${i}`} cx={n.x} cy={n.y} r="2.5" fill="#18A058" fillOpacity="0.7" />
      ))}

      <polygon points={hexPoints} fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" />

      <path
        d="M266 252 L266 240 Q280 226 294 240 L294 252"
        stroke="white"
        strokeOpacity="0.65"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <rect
        x="257"
        y="250"
        width="46"
        height="38"
        rx="7"
        fill="white"
        fillOpacity="0.08"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      <circle cx="280" cy="267" r="5.5" fill="white" fillOpacity="0.5" />
      <rect x="277.5" y="269" width="5" height="9" rx="2.5" fill="white" fillOpacity="0.5" />

      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="80"
        stroke="#18A058"
        strokeOpacity="0.12"
        strokeWidth="1"
        fill="none"
        className="origin-[280px_260px] animate-pulse-ring"
      />

      <g opacity="0.18">
        <line x1="20" y1="18" x2="52" y2="18" stroke="white" strokeWidth="1" />
        <line x1="20" y1="18" x2="20" y2="50" stroke="white" strokeWidth="1" />
        <line x1="540" y1="502" x2="508" y2="502" stroke="white" strokeWidth="1" />
        <line x1="540" y1="502" x2="540" y2="470" stroke="white" strokeWidth="1" />
        <line x1="540" y1="18" x2="508" y2="18" stroke="white" strokeWidth="1" />
        <line x1="540" y1="18" x2="540" y2="50" stroke="white" strokeWidth="1" />
      </g>

      <text
        x="20"
        y="502"
        fontSize="9"
        fill="white"
        fillOpacity="0.25"
        fontFamily="monospace"
        letterSpacing="2"
      >
        SECURE · ENCRYPTED
      </text>
    </svg>
  );
}
