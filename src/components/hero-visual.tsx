import { Cloud, Database, GitBranch, Layers, Network, ShieldCheck } from "lucide-react";

/**
 * Engineering ecosystem visual.
 * Central identity node surrounded by the five real projects, connected
 * with animated data paths. Glassmorphism + soft blue/indigo lighting.
 * No fake regions, no generic gateways — only real systems.
 */

type Node = {
  key: string;
  title: string;
  sub: string;
  tag: string;
  Icon: React.ComponentType<{ className?: string }>;
  // polar coordinates around the center
  angle: number; // degrees, 0 = right
  radius: number; // px in viewBox
  accent: "blue" | "violet";
};

const W = 560;
const H = 520;
const CX = W / 2;
const CY = H / 2;

const NODES: Node[] = [
  {
    key: "lyta",
    title: "LYTA",
    sub: "Workers · Durable Objects",
    tag: "edge",
    Icon: Layers,
    angle: -90,
    radius: 175,
    accent: "blue",
  },
  {
    key: "openshield",
    title: "OpenShield",
    sub: "OWASP · Azure CSPM",
    tag: "security",
    Icon: ShieldCheck,
    angle: -30,
    radius: 185,
    accent: "violet",
  },
  {
    key: "kalyx",
    title: "KALYX",
    sub: "Hash-chained ledger",
    tag: "integrity",
    Icon: GitBranch,
    angle: 35,
    radius: 180,
    accent: "blue",
  },
  {
    key: "fieldsight",
    title: "FieldSight",
    sub: "Azure · Cosmos · Blob",
    tag: "cloud",
    Icon: Cloud,
    angle: 130,
    radius: 185,
    accent: "violet",
  },
  {
    key: "payments",
    title: "Payment Routing",
    sub: "RBAC · Analytics",
    tag: "platform",
    Icon: Database,
    angle: -150,
    radius: 180,
    accent: "blue",
  },
];

function polar(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

export function HeroVisual() {
  return (
    <div className="relative w-full">
      {/* ambient glow layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, color-mix(in oklab, var(--accent-blue) 22%, transparent), transparent 70%), radial-gradient(50% 40% at 75% 70%, color-mix(in oklab, var(--accent-violet) 18%, transparent), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="glass-card relative overflow-hidden p-1.5">
        <div className="relative rounded-[calc(var(--radius-xl)-6px)] border border-white/60 bg-gradient-to-br from-white/85 via-white/60 to-white/30 p-5 backdrop-blur-xl">
          {/* window chrome */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent-blue/60" />
              <span className="h-2 w-2 rounded-full bg-accent-violet/60" />
              <span className="h-2 w-2 rounded-full bg-border" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              engineering.ecosystem
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-blue/25 bg-white/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent-blue">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-blue" />
              live
            </span>
          </div>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            role="img"
            aria-label="Parth Rohit engineering ecosystem — LYTA, OpenShield, KALYX, FieldSight, Payment Routing"
          >
            <defs>
              <linearGradient id="lineBlue" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.6 0.18 255)" stopOpacity="0.15" />
                <stop offset="50%" stopColor="oklch(0.6 0.18 255)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="oklch(0.6 0.18 255)" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="lineViolet" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.58 0.2 290)" stopOpacity="0.15" />
                <stop offset="50%" stopColor="oklch(0.58 0.2 290)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="oklch(0.58 0.2 290)" stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.7 0.18 255)" stopOpacity="0.55" />
                <stop offset="60%" stopColor="oklch(0.6 0.18 255)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="oklch(0.6 0.18 255)" stopOpacity="0" />
              </radialGradient>
              <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>

            {/* concentric rings */}
            {[210, 165, 115].map((r, i) => (
              <circle
                key={r}
                cx={CX}
                cy={CY}
                r={r}
                fill="none"
                stroke="oklch(0.6 0.18 255 / 0.12)"
                strokeWidth="1"
                strokeDasharray={i === 0 ? "2 6" : "1 0"}
              />
            ))}

            {/* slowly rotating ring tick */}
            <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: "spin-slow 28s linear infinite" }}>
              <circle cx={CX + 210} cy={CY} r="3" fill="oklch(0.6 0.18 255)" opacity="0.7" />
            </g>
            <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: "spin-slow 40s linear infinite reverse" }}>
              <circle cx={CX + 165} cy={CY} r="2" fill="oklch(0.58 0.2 290)" opacity="0.7" />
            </g>

            {/* core glow */}
            <circle cx={CX} cy={CY} r="90" fill="url(#coreGlow)" filter="url(#softBlur)" />

            {/* connections center -> nodes */}
            {NODES.map((n) => {
              const p = polar(n.angle, n.radius);
              const gradId = n.accent === "violet" ? "lineViolet" : "lineBlue";
              return (
                <g key={`l-${n.key}`}>
                  <line
                    x1={CX}
                    y1={CY}
                    x2={p.x}
                    y2={p.y}
                    stroke={`url(#${gradId})`}
                    strokeWidth="1.25"
                  />
                  <circle r="3" fill={n.accent === "violet" ? "oklch(0.58 0.2 290)" : "oklch(0.6 0.18 255)"}>
                    <animateMotion
                      dur={`${2.2 + (n.radius % 7) * 0.15}s`}
                      repeatCount="indefinite"
                      path={`M ${CX} ${CY} L ${p.x} ${p.y}`}
                    />
                  </circle>
                </g>
              );
            })}

            {/* inter-node lateral arcs (suggests interconnected systems) */}
            {NODES.map((n, i) => {
              const next = NODES[(i + 1) % NODES.length];
              const a = polar(n.angle, n.radius);
              const b = polar(next.angle, next.radius);
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2;
              // pull control point toward center for nice arc
              const cx = mx + (CX - mx) * 0.35;
              const cy = my + (CY - my) * 0.35;
              return (
                <path
                  key={`arc-${n.key}`}
                  d={`M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`}
                  fill="none"
                  stroke="oklch(0.6 0.18 255 / 0.18)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
              );
            })}

            {/* central identity node */}
            <g>
              <circle cx={CX} cy={CY} r="56" fill="white" stroke="oklch(0.6 0.18 255 / 0.45)" strokeWidth="1.25" />
              <circle cx={CX} cy={CY} r="56" fill="none" stroke="oklch(0.6 0.18 255 / 0.18)" strokeWidth="6" />
              <text x={CX} y={CY - 8} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="oklch(0.5 0.02 260)">
                PR · ENGINEER
              </text>
              <text x={CX} y={CY + 8} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="14" fill="oklch(0.18 0.02 260)">
                Parth Rohit
              </text>
              <text x={CX} y={CY + 22} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="oklch(0.55 0.15 255)">
                cloud · distributed · security
              </text>
            </g>

            {/* project nodes */}
            {NODES.map((n, i) => {
              const p = polar(n.angle, n.radius);
              const accentStroke =
                n.accent === "violet" ? "oklch(0.58 0.2 290 / 0.55)" : "oklch(0.6 0.18 255 / 0.55)";
              const accentText =
                n.accent === "violet" ? "oklch(0.45 0.18 290)" : "oklch(0.48 0.16 255)";
              const w = 140;
              const h = 52;
              const rx = p.x - w / 2;
              const ry = p.y - h / 2;
              return (
                <g
                  key={n.key}
                  style={{
                    animation: `node-float 6s ease-in-out ${i * 0.4}s infinite`,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                >
                  {/* glass card */}
                  <rect x={rx} y={ry} width={w} height={h} rx="10" fill="white" opacity="0.95" />
                  <rect x={rx} y={ry} width={w} height={h} rx="10" fill="none" stroke={accentStroke} strokeWidth="1" />
                  {/* accent dot */}
                  <circle cx={rx + 14} cy={p.y} r="4" fill={accentStroke}>
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                  </circle>
                  {/* labels */}
                  <text
                    x={rx + 28}
                    y={p.y - 4}
                    fontFamily="Inter, sans-serif"
                    fontSize="12"
                    fontWeight="600"
                    fill="oklch(0.18 0.02 260)"
                  >
                    {n.title}
                  </text>
                  <text
                    x={rx + 28}
                    y={p.y + 11}
                    fontFamily="ui-monospace, monospace"
                    fontSize="9"
                    fill="oklch(0.5 0.02 260)"
                  >
                    {n.sub}
                  </text>
                  {/* tag */}
                  <rect x={rx + w - 44} y={ry + 6} width="38" height="14" rx="4" fill="oklch(0.6 0.18 255 / 0.08)" />
                  <text
                    x={rx + w - 25}
                    y={ry + 16}
                    textAnchor="middle"
                    fontFamily="ui-monospace, monospace"
                    fontSize="8"
                    fill={accentText}
                  >
                    {n.tag}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* footer caption */}
          <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Network className="h-3 w-3 text-accent-blue" /> 5 systems · interconnected
            </span>
            <span>backend · cloud · security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
