import { useEffect, useMemo, useRef, useState } from "react";

type Domain = {
  id: string;
  label: string;
  short: string;
  angle: number; // degrees, 0 = right, clockwise
  radius: number;
};

// Eight engineering domains arranged around a central "Software Engineering" node.
const DOMAINS: Domain[] = [
  { id: "backend", label: "Backend Systems", short: "backend", angle: -90, radius: 150 },
  { id: "distributed", label: "Distributed Systems", short: "distributed", angle: -45, radius: 155 },
  { id: "cloud", label: "Cloud Platforms", short: "cloud", angle: 0, radius: 150 },
  { id: "api", label: "API Design", short: "api", angle: 45, radius: 155 },
  { id: "observability", label: "Observability", short: "observability", angle: 90, radius: 150 },
  { id: "data", label: "Data Engineering", short: "data", angle: 135, radius: 155 },
  { id: "security", label: "Security Engineering", short: "security", angle: 180, radius: 150 },
  { id: "integrity", label: "Execution Integrity", short: "integrity", angle: 225, radius: 155 },
];

const CENTER = { x: 300, y: 210 };
const CORE_ID = "core";

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
}

/**
 * Engineering-ecosystem topology. A central "Software Engineering" node radiates
 * into eight connected domains. Nodes gently activate in a slow wave; hovering
 * a domain lights its edge and pulses the core.
 */
export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5, active: false });
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [autoIdx, setAutoIdx] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      setPointer({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, active: true });
    };
    const onLeave = () => {
      setPointer((p) => ({ ...p, active: false }));
      setHoverId(null);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (hoverId) return;
    const t = setInterval(() => setAutoIdx((i) => (i + 1) % DOMAINS.length), 1400);
    return () => clearInterval(t);
  }, [hoverId]);

  const positions = useMemo(
    () => DOMAINS.map((d) => ({ ...d, ...polar(CENTER.x, CENTER.y, d.radius, d.angle) })),
    []
  );

  const activeId = hoverId ?? DOMAINS[autoIdx].id;
  const activeDomain = positions.find((p) => p.id === activeId);

  return (
    <div
      ref={wrapRef}
      className="hero-visual relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, color-mix(in oklab, var(--accent-blue) 22%, transparent), transparent 60%), radial-gradient(ellipse at 85% 90%, color-mix(in oklab, var(--accent-violet) 18%, transparent), transparent 55%), linear-gradient(180deg, oklch(0.22 0.04 258), oklch(0.18 0.03 258))",
      }}
      aria-label="Software engineering ecosystem"
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: pointer.active ? 1 : 0.55,
          background: `radial-gradient(280px circle at ${pointer.x * 100}% ${pointer.y * 100}%, color-mix(in oklab, var(--accent-blue) 30%, transparent), transparent 65%)`,
        }}
      />

      <svg viewBox="0 0 600 420" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="hv-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M 26 0 L 0 0 0 26" fill="none" stroke="color-mix(in oklab, var(--accent-blue) 16%, transparent)" strokeWidth="0.6" />
          </pattern>
          <radialGradient id="hv-mask" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hv-grid-mask">
            <rect width="600" height="420" fill="url(#hv-mask)" />
          </mask>
          <radialGradient id="hv-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.95" />
            <stop offset="70%" stopColor="var(--accent-violet)" stopOpacity="0.75" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.15" />
          </radialGradient>
          <linearGradient id="hv-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.15" />
            <stop offset="60%" stopColor="var(--accent-blue)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        <rect width="600" height="420" fill="url(#hv-grid)" mask="url(#hv-grid-mask)" opacity="0.85" />

        {/* Orbit rings */}
        <g fill="none" stroke="color-mix(in oklab, var(--accent-blue) 18%, transparent)" strokeDasharray="2 6">
          <circle cx={CENTER.x} cy={CENTER.y} r={95} opacity="0.55" />
          <circle cx={CENTER.x} cy={CENTER.y} r={152} opacity="0.35" />
          <circle cx={CENTER.x} cy={CENTER.y} r={188} opacity="0.18" />
        </g>

        {/* Spokes */}
        <g strokeLinecap="round">
          {positions.map((d) => {
            const hot = d.id === activeId;
            return (
              <g key={`e-${d.id}`}>
                <line
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={d.x}
                  y2={d.y}
                  stroke="url(#hv-line)"
                  strokeWidth={hot ? 1.8 : 1}
                  opacity={hot ? 1 : 0.45}
                  style={{ transition: "opacity 320ms ease, stroke-width 320ms ease" }}
                />
                {hot && (
                  <line
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={d.x}
                    y2={d.y}
                    stroke="var(--accent-blue)"
                    strokeWidth={4}
                    opacity={0.2}
                    style={{ filter: "blur(4px)" }}
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Traveling packets on every spoke */}
        <g>
          {positions.map((d, i) => {
            const hot = d.id === activeId;
            const dur = hot ? 1.1 : 3.6 + (i % 4) * 0.4;
            return (
              <circle
                key={`p-${d.id}`}
                r={hot ? 3.4 : 2.2}
                fill={hot ? "var(--accent-violet)" : "var(--accent-blue)"}
                opacity={hot ? 1 : 0.7}
                style={{
                  filter: `drop-shadow(0 0 ${hot ? 10 : 5}px color-mix(in oklab, ${hot ? "var(--accent-violet)" : "var(--accent-blue)"} 75%, transparent))`,
                }}
              >
                <animateMotion
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${-(i * 0.35)}s`}
                  path={`M ${CENTER.x} ${CENTER.y} L ${d.x} ${d.y}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.85;1"
                  dur={`${dur}s`}
                  begin={`${-(i * 0.35)}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </g>

        {/* Core node — Software Engineering */}
        <g
          onPointerEnter={() => setHoverId(CORE_ID)}
          onPointerLeave={() => setHoverId((h) => (h === CORE_ID ? null : h))}
          style={{ cursor: "pointer" }}
        >
          <circle cx={CENTER.x} cy={CENTER.y} r={70} fill="url(#hv-core)" opacity="0.35" />
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={54}
            fill="color-mix(in oklab, var(--card) 92%, transparent)"
            stroke="color-mix(in oklab, var(--accent-blue) 70%, var(--border))"
            strokeWidth={1.6}
          />
          <circle cx={CENTER.x} cy={CENTER.y} r={62} fill="none" stroke="var(--accent-blue)" strokeWidth={1} opacity={0}>
            <animate attributeName="r" values="54;78" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.55;0" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <text
            x={CENTER.x}
            y={CENTER.y - 4}
            textAnchor="middle"
            fontFamily="Inter, ui-sans-serif, sans-serif"
            fontSize="12"
            fontWeight="600"
            fill="var(--foreground)"
            style={{ letterSpacing: "0.02em" }}
          >
            Software
          </text>
          <text
            x={CENTER.x}
            y={CENTER.y + 12}
            textAnchor="middle"
            fontFamily="Inter, ui-sans-serif, sans-serif"
            fontSize="12"
            fontWeight="600"
            fill="var(--foreground)"
            style={{ letterSpacing: "0.02em" }}
          >
            Engineering
          </text>
          <text
            x={CENTER.x}
            y={CENTER.y + 30}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="8.5"
            fill="color-mix(in oklab, var(--foreground) 55%, transparent)"
            style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}
          >
            · core ·
          </text>
        </g>

        {/* Domain nodes */}
        <g>
          {positions.map((d) => {
            const hot = d.id === activeId;
            // Compute label anchor: outward-facing text
            const outward = polar(0, 0, 1, d.angle);
            const anchor = outward.x > 0.35 ? "start" : outward.x < -0.35 ? "end" : "middle";
            const labelOffsetX = outward.x * 18;
            const labelOffsetY = outward.y * 18 + (outward.y > 0.5 ? 4 : outward.y < -0.5 ? -2 : 4);
            return (
              <g
                key={d.id}
                onPointerEnter={() => setHoverId(d.id)}
                onPointerLeave={() => setHoverId((h) => (h === d.id ? null : h))}
                style={{ cursor: "pointer" }}
              >
                <circle cx={d.x} cy={d.y} r={22} fill="transparent" pointerEvents="all" />
                {hot && (
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={16}
                    fill="none"
                    stroke="var(--accent-blue)"
                    strokeWidth={1}
                    opacity={0.55}
                    style={{ filter: "drop-shadow(0 0 10px color-mix(in oklab, var(--accent-blue) 70%, transparent))" }}
                  />
                )}
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={hot ? 6.5 : 4.5}
                  fill={hot ? "var(--accent-violet)" : "var(--accent-blue)"}
                  opacity={hot ? 1 : 0.75}
                  style={{
                    filter: `drop-shadow(0 0 ${hot ? 9 : 4}px color-mix(in oklab, ${hot ? "var(--accent-violet)" : "var(--accent-blue)"} 70%, transparent))`,
                    transition: "r 220ms ease, opacity 220ms ease",
                  }}
                />
                {hot && (
                  <circle cx={d.x} cy={d.y} r={8} fill="none" stroke="var(--accent-blue)" strokeWidth={1}>
                    <animate attributeName="r" values="8;22" dur="1.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.65;0" dur="1.4s" repeatCount="indefinite" />
                  </circle>
                )}
                <text
                  x={d.x + labelOffsetX}
                  y={d.y + labelOffsetY}
                  textAnchor={anchor}
                  fontFamily="Inter, ui-sans-serif, sans-serif"
                  fontSize="10.5"
                  fontWeight={hot ? 600 : 500}
                  fill={hot ? "var(--foreground)" : "color-mix(in oklab, var(--foreground) 62%, transparent)"}
                  style={{ letterSpacing: "0.02em", transition: "fill 220ms ease" }}
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Corner meta */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="status-dot" />
          {activeDomain ? `focus · ${activeDomain.short}` : "ecosystem.live"}
        </span>
        <span>8 domains · 1 practice</span>
      </div>
    </div>
  );
}
