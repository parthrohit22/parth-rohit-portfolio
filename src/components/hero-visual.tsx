import { useEffect, useRef, useState } from "react";

type Node = { id: string; label: string; x: number; y: number; group: "edge" | "core" | "data" };
type Edge = { from: string; to: string };

const NODES: Node[] = [
  { id: "b", label: "browser", x: 60, y: 200, group: "edge" },
  { id: "r", label: "router", x: 210, y: 200, group: "core" },
  { id: "a", label: "auth", x: 360, y: 110, group: "core" },
  { id: "w", label: "workspace", x: 360, y: 200, group: "core" },
  { id: "c", label: "conversation", x: 360, y: 290, group: "core" },
  { id: "ai1", label: "workers ai", x: 520, y: 155, group: "data" },
  { id: "ai2", label: "workers ai", x: 520, y: 245, group: "data" },
];

const EDGES: Edge[] = [
  { from: "b", to: "r" },
  { from: "r", to: "a" },
  { from: "r", to: "w" },
  { from: "r", to: "c" },
  { from: "w", to: "ai1" },
  { from: "c", to: "ai2" },
];

/**
 * A subtle, cursor-reactive constellation echoing distributed-system
 * ownership. Purely decorative and reduced-motion aware.
 */
export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      setPointer({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      });
    };
    const onLeave = () => setPointer((p) => ({ ...p, active: false }));
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const byId = new Map(NODES.map((n) => [n.id, n]));
  const spotlightX = pointer.x * 600;
  const spotlightY = pointer.y * 400;

  return (
    <div
      ref={wrapRef}
      className="hero-visual relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border"
      style={{
        background:
          "radial-gradient(ellipse at 20% 15%, color-mix(in oklab, var(--accent-blue) 26%, transparent), transparent 55%), radial-gradient(ellipse at 85% 90%, color-mix(in oklab, var(--accent-violet) 22%, transparent), transparent 55%), linear-gradient(180deg, oklch(0.22 0.04 258), oklch(0.18 0.03 258))",
      }}
      aria-hidden="true"
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: pointer.active ? 1 : 0.5,
          background: `radial-gradient(240px circle at ${pointer.x * 100}% ${pointer.y * 100}%, color-mix(in oklab, var(--accent-blue) 34%, transparent), transparent 65%)`,
        }}
      />
      {/* Grid */}
      <svg
        viewBox="0 0 600 400"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="hv-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="color-mix(in oklab, var(--accent-blue) 18%, transparent)"
              strokeWidth="0.6"
            />
          </pattern>
          <radialGradient id="hv-mask" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hv-grid-mask">
            <rect width="600" height="400" fill={`url(#hv-mask)`} />
          </mask>
          <linearGradient id="hv-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--accent-blue)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <rect
          width="600"
          height="400"
          fill="url(#hv-grid)"
          mask="url(#hv-grid-mask)"
          opacity="0.9"
        />

        {/* Edges */}
        <g strokeLinecap="round">
          {EDGES.map((e, i) => {
            const from = byId.get(e.from)!;
            const to = byId.get(e.to)!;
            const dashLen = 6 + (i % 3);
            return (
              <g key={`${e.from}-${e.to}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="url(#hv-line)"
                  strokeWidth="1.4"
                  opacity="0.9"
                />
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="var(--accent-blue)"
                  strokeWidth="1"
                  strokeDasharray={`${dashLen} ${dashLen + 4}`}
                  opacity="0.7"
                  className="hv-flow"
                  style={{ animationDelay: `${i * 240}ms` }}
                />
              </g>
            );
          })}
        </g>

        {/* Traveling packets */}
        <g className="hv-packets">
          {EDGES.map((e, i) => {
            const from = byId.get(e.from)!;
            const to = byId.get(e.to)!;
            const dur = 2.4 + (i % 3) * 0.6;
            const delay = -(i * 0.5);
            return (
              <circle
                key={`p-${e.from}-${e.to}`}
                r="2.6"
                fill="var(--accent-blue)"
                opacity="0.95"
                style={{
                  filter:
                    "drop-shadow(0 0 6px color-mix(in oklab, var(--accent-blue) 75%, transparent))",
                }}
              >
                <animateMotion
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${delay}s`}
                  path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.9;1"
                  dur={`${dur}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </g>


        {/* Nodes */}
        <g>
          {NODES.map((n, i) => {
            const dx = spotlightX - n.x;
            const dy = spotlightY - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const magnet = pointer.active ? Math.max(0, 60 - dist) / 60 : 0;
            const shift = magnet * 6;
            const tx = n.x + (dx / (dist || 1)) * shift;
            const ty = n.y + (dy / (dist || 1)) * shift;
            const glow = 0.35 + magnet * 0.6;
            return (
              <g
                key={n.id}
                transform={`translate(${tx} ${ty})`}
                className="hv-node"
                style={{ animationDelay: `${i * 160}ms` }}
              >
                <circle
                  r={24}
                  fill="var(--card)"
                  stroke={
                    n.group === "core"
                      ? "var(--accent-blue)"
                      : n.group === "data"
                        ? "var(--accent-violet)"
                        : "color-mix(in oklab, var(--foreground) 55%, var(--border))"
                  }
                  strokeWidth={1.8}
                  opacity={0.98}
                />
                <circle
                  r={7}
                  fill="var(--accent-blue)"
                  opacity={glow}
                  style={{
                    filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--accent-blue) 60%, transparent))",
                  }}
                />
                <circle
                  r={12}
                  fill="none"
                  stroke="var(--accent-blue)"
                  strokeWidth={1}
                  opacity={0}
                >
                  <animate
                    attributeName="r"
                    values="10;22"
                    dur="2.6s"
                    begin={`${i * 0.35}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.55;0"
                    dur="2.6s"
                    begin={`${i * 0.35}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  y={42}
                  textAnchor="middle"
                  fontFamily="ui-monospace, monospace"
                  fontSize="10.5"
                  fontWeight="500"
                  fill="color-mix(in oklab, var(--foreground) 85%, transparent)"
                  style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Corner meta */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="status-dot" /> systems.live
        </span>
        <span>ownership · integrity · authority</span>
      </div>
    </div>
  );
}
