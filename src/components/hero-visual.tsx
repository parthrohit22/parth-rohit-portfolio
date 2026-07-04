import { useEffect, useMemo, useRef, useState } from "react";

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

// Auto-cycled activation sequence — mimics an inbound request flowing through the graph.
const AUTO_SEQUENCE = ["b", "r", "w", "ai1", "c", "ai2", "a"];

/**
 * Living topology. Nodes activate in a request-shaped wave; hover any node
 * to route an ad-hoc request from the browser through it and downstream.
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
      const rect = el.getBoundingClientRect();
      setPointer({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      });
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

  // Auto-activation wave (paused on hover)
  useEffect(() => {
    if (hoverId) return;
    const t = setInterval(() => setAutoIdx((i) => (i + 1) % AUTO_SEQUENCE.length), 900);
    return () => clearInterval(t);
  }, [hoverId]);

  const byId = useMemo(() => new Map(NODES.map((n) => [n.id, n])), []);
  const adjacency = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const e of EDGES) {
      if (!m.has(e.from)) m.set(e.from, []);
      m.get(e.from)!.push(e.to);
    }
    return m;
  }, []);

  // Compute the currently "live" path — hovered subtree, or auto wave.
  const liveNodes = useMemo(() => {
    if (hoverId) {
      // Trace from browser → hovered → all downstream
      const path = new Set<string>(["b"]);
      // BFS to hovered (only need to include ancestors along the r → hovered path)
      // simple: mark hovered + all reachable downstream, plus router as bridge.
      path.add("r");
      path.add(hoverId);
      const stack = [hoverId];
      while (stack.length) {
        const cur = stack.pop()!;
        for (const nx of adjacency.get(cur) ?? []) {
          if (!path.has(nx)) {
            path.add(nx);
            stack.push(nx);
          }
        }
      }
      return path;
    }
    return new Set<string>([AUTO_SEQUENCE[autoIdx]]);
  }, [hoverId, autoIdx, adjacency]);

  const liveEdges = useMemo(() => {
    const s = new Set<string>();
    for (const e of EDGES) {
      if (liveNodes.has(e.from) && liveNodes.has(e.to)) s.add(`${e.from}-${e.to}`);
    }
    return s;
  }, [liveNodes]);

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
      <svg
        viewBox="0 0 600 400"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="hv-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="color-mix(in oklab, var(--accent-blue) 18%, transparent)" strokeWidth="0.6" />
          </pattern>
          <radialGradient id="hv-mask" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hv-grid-mask">
            <rect width="600" height="400" fill="url(#hv-mask)" />
          </mask>
          <linearGradient id="hv-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--accent-blue)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="hv-line-hot" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#hv-grid)" mask="url(#hv-grid-mask)" opacity="0.9" />

        {/* Edges */}
        <g strokeLinecap="round">
          {EDGES.map((e, i) => {
            const from = byId.get(e.from)!;
            const to = byId.get(e.to)!;
            const key = `${e.from}-${e.to}`;
            const hot = liveEdges.has(key);
            return (
              <g key={key}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={hot ? "url(#hv-line-hot)" : "url(#hv-line)"}
                  strokeWidth={hot ? 2 : 1.2}
                  opacity={hot ? 1 : 0.55}
                  style={{ transition: "opacity 240ms ease, stroke-width 240ms ease" }}
                />
                {hot && (
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="var(--accent-blue)"
                    strokeWidth={4}
                    opacity={0.18}
                    style={{ filter: "blur(4px)" }}
                  />
                )}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="var(--accent-blue)"
                  strokeWidth="1"
                  strokeDasharray={`${6 + (i % 3)} ${10 + (i % 3)}`}
                  opacity={hot ? 0.9 : 0.35}
                  className="hv-flow"
                  style={{ animationDelay: `${i * 240}ms`, animationDuration: hot ? "1.2s" : "3.2s" }}
                />
              </g>
            );
          })}
        </g>

        {/* Traveling packets — one per edge, faster on live edges */}
        <g>
          {EDGES.map((e, i) => {
            const from = byId.get(e.from)!;
            const to = byId.get(e.to)!;
            const key = `${e.from}-${e.to}`;
            const hot = liveEdges.has(key);
            const dur = hot ? 0.9 : 2.6 + (i % 3) * 0.5;
            return (
              <circle
                key={`p-${key}`}
                r={hot ? 3.4 : 2.4}
                fill={hot ? "var(--accent-violet)" : "var(--accent-blue)"}
                opacity={hot ? 1 : 0.85}
                style={{
                  filter: `drop-shadow(0 0 ${hot ? 10 : 6}px color-mix(in oklab, ${hot ? "var(--accent-violet)" : "var(--accent-blue)"} 75%, transparent))`,
                }}
              >
                <animateMotion
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${-(i * 0.4)}s`}
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
                  begin={`${-(i * 0.4)}s`}
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
            const live = liveNodes.has(n.id);
            const hovered = hoverId === n.id;
            const ring =
              n.group === "core"
                ? "var(--accent-blue)"
                : n.group === "data"
                ? "var(--accent-violet)"
                : "color-mix(in oklab, var(--foreground) 55%, var(--border))";
            return (
              <g
                key={n.id}
                transform={`translate(${tx} ${ty})`}
                className="hv-node"
                style={{ animationDelay: `${i * 160}ms`, cursor: "pointer" }}
                onPointerEnter={() => setHoverId(n.id)}
                onPointerLeave={() => setHoverId((h) => (h === n.id ? null : h))}
              >
                {/* Hit target */}
                <circle r={28} fill="transparent" pointerEvents="all" />
                {/* Outer aura on live */}
                {live && (
                  <circle
                    r={26}
                    fill="none"
                    stroke={ring}
                    strokeWidth={1}
                    opacity={0.55}
                    style={{
                      filter: `drop-shadow(0 0 12px color-mix(in oklab, ${ring} 70%, transparent))`,
                    }}
                  />
                )}
                <circle
                  r={24}
                  fill="color-mix(in oklab, var(--card) 92%, transparent)"
                  stroke={live ? ring : "color-mix(in oklab, var(--foreground) 20%, var(--border))"}
                  strokeWidth={live ? 2 : 1.4}
                  opacity={0.98}
                  style={{ transition: "stroke 220ms ease, stroke-width 220ms ease" }}
                />
                <circle
                  r={hovered ? 9 : 7}
                  fill={ring}
                  opacity={live ? 0.95 : 0.35}
                  style={{
                    filter: `drop-shadow(0 0 ${live ? 10 : 4}px color-mix(in oklab, ${ring} ${live ? 80 : 40}%, transparent))`,
                    transition: "opacity 220ms ease, r 220ms ease",
                  }}
                />
                {/* Activation ripple */}
                {live && (
                  <circle r={12} fill="none" stroke={ring} strokeWidth={1.2} opacity={0}>
                    <animate attributeName="r" values="12;30" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;0" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
                <text
                  y={42}
                  textAnchor="middle"
                  fontFamily="ui-monospace, monospace"
                  fontSize="10.5"
                  fontWeight="500"
                  fill={live ? "var(--foreground)" : "color-mix(in oklab, var(--foreground) 70%, transparent)"}
                  style={{ letterSpacing: "0.1em", textTransform: "uppercase", transition: "fill 220ms ease" }}
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
          <span className="status-dot" />{" "}
          {hoverId ? `routing → ${byId.get(hoverId)?.label ?? ""}` : "systems.live"}
        </span>
        <span>{hoverId ? "hover · trace request" : "hover a node · trace request"}</span>
      </div>
    </div>
  );
}
