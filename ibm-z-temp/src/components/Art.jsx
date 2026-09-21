// Little generated illustrations for the project tiles. Each `variant`
// draws a different pattern, and `seed` changes the details, so every tile
// looks different without needing image files.
// The colour comes from CSS (`color`), so it follows the theme.

function random(seed) {
  let a = Math.floor(seed * 9973) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 400;
const H = 300;

function grid(rand) {
  const dots = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 14; col++) {
      const size = 1.5 + rand() * rand() * 7;
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={30 + col * 26.5}
          cy={30 + row * 30}
          r={size}
          fill="currentColor"
          opacity={0.35 + rand() * 0.65}
        />
      );
    }
  }
  return dots;
}

function bars(rand) {
  return Array.from({ length: 26 }, (_, i) => {
    const h = 24 + rand() * 210;
    return (
      <rect
        key={i}
        x={14 + i * 14.6}
        y={H - 24 - h}
        width={8}
        height={h}
        rx={3}
        fill="currentColor"
        opacity={0.3 + (h / 234) * 0.7}
      />
    );
  });
}

function arcs() {
  return Array.from({ length: 9 }, (_, i) => (
    <circle
      key={i}
      cx={W}
      cy={H}
      r={50 + i * 44}
      fill="none"
      stroke="currentColor"
      strokeWidth={i % 3 === 0 ? 3 : 1.5}
      strokeDasharray={i % 2 ? "3 9" : undefined}
      opacity={0.95 - i * 0.08}
    />
  ));
}

function rack(rand) {
  return Array.from({ length: 7 }, (_, i) => {
    const y = 20 + i * 39;
    return (
      <g key={i}>
        <rect x={30} y={y} width={340} height={29} rx={5} fill="none" stroke="currentColor" strokeWidth={1.5} opacity={0.6} />
        <line x1={46} x2={46 + 60 + rand() * 120} y1={y + 14.5} y2={y + 14.5} stroke="currentColor" strokeWidth={3} strokeLinecap="round" opacity={0.5} />
        {[0, 1, 2].map((led) => (
          <circle
            key={led}
            cx={318 + led * 16}
            cy={y + 14.5}
            r={3.5}
            fill="currentColor"
            opacity={rand() > 0.45 ? 1 : 0.18}
          />
        ))}
      </g>
    );
  });
}

function lines(rand) {
  return Array.from({ length: 16 }, (_, i) => (
    <line
      key={i}
      x1={40 + i * 26}
      y1={0}
      x2={i * 26 - 130}
      y2={H}
      stroke="currentColor"
      strokeWidth={rand() > 0.7 ? 3 : 1.5}
      opacity={0.25 + rand() * 0.7}
    />
  ));
}

const VARIANTS = { grid, bars, arcs, rack, lines };

export default function Art({ variant = "grid", seed = 1, className = "" }) {
  const draw = VARIANTS[variant] ?? grid;
  const shapes = draw(random(seed));

  return (
    <svg
      className={`art ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {shapes}
    </svg>
  );
}
