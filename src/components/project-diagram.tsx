/**
 * Compact architecture diagram per project.
 * Each renders 4 labeled nodes connected with animated data flow.
 */
type Node = { label: string; sub?: string };

const diagrams: Record<string, { nodes: Node[]; accent: "blue" | "violet" }> = {
  LYTA: {
    nodes: [
      { label: "User", sub: "browser" },
      { label: "Durable Object", sub: "workspace" },
      { label: "Storage", sub: "state · files" },
      { label: "Workers AI", sub: "inference" },
    ],
    accent: "blue",
  },
  OpenShield: {
    nodes: [
      { label: "Azure", sub: "resources" },
      { label: "Scanner", sub: "rules" },
      { label: "Compliance", sub: "engine" },
      { label: "Dashboard", sub: "findings" },
    ],
    accent: "violet",
  },
  KALYX: {
    nodes: [
      { label: "Input", sub: "events" },
      { label: "Hash Chain", sub: "ledger" },
      { label: "Verification", sub: "deterministic" },
      { label: "Audit Trail", sub: "tamper-evident" },
    ],
    accent: "blue",
  },
  FieldSight: {
    nodes: [
      { label: "API", sub: "App Service" },
      { label: "Cosmos DB", sub: "metadata" },
      { label: "Blob Storage", sub: "media" },
      { label: "Telemetry", sub: "App Insights" },
    ],
    accent: "violet",
  },
  "Payment Routing System": {
    nodes: [
      { label: "Client", sub: "Angular" },
      { label: "Auth", sub: "JWT · RBAC" },
      { label: "Routing", sub: "engine" },
      { label: "Analytics", sub: "merchant" },
    ],
    accent: "blue",
  },
};

export function ProjectDiagram({ name }: { name: string }) {
  const data = diagrams[name];
  if (!data) return null;
  const accent = data.accent === "violet" ? "oklch(0.58 0.2 290)" : "oklch(0.6 0.18 255)";

  return (
    <div className="rounded-xl border border-border bg-gradient-to-b from-surface to-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          architecture
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          {name.toLowerCase().replace(/\s+/g, "-")}.flow
        </span>
      </div>
      <svg viewBox="0 0 520 120" className="h-auto w-full" role="img" aria-label={`${name} architecture`}>
        <defs>
          <linearGradient id={`flow-${name.replace(/\s+/g, "")}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
            <stop offset="50%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* connectors */}
        {[0, 1, 2].map((i) => {
          const x1 = 35 + 120 + i * 120;
          const x2 = x1 + 35;
          return (
            <g key={i}>
              <line x1={x1} y1="60" x2={x2} y2="60" stroke={`url(#flow-${name.replace(/\s+/g, "")})`} strokeWidth="1.25" />
              <polygon points={`${x2},60 ${x2 - 5},57 ${x2 - 5},63`} fill={accent} opacity="0.7" />
              <circle r="2.5" fill={accent}>
                <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} path={`M ${x1} 60 L ${x2} 60`} />
              </circle>
            </g>
          );
        })}

        {/* nodes */}
        {data.nodes.map((n, i) => {
          const x = 35 + i * 120;
          return (
            <g key={n.label}>
              <rect
                x={x}
                y="35"
                width="120"
                height="50"
                rx="8"
                fill="oklch(1 0 0)"
                stroke="oklch(0.92 0.008 255)"
              />
              <circle cx={x + 12} cy="60" r="3" fill={accent}>
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </circle>
              <text x={x + 22} y="57" fontSize="11" fontFamily="ui-monospace, monospace" fill="oklch(0.18 0.02 260)" fontWeight="600">
                {n.label}
              </text>
              {n.sub && (
                <text x={x + 22} y="71" fontSize="9" fontFamily="ui-monospace, monospace" fill="oklch(0.5 0.02 260)">
                  {n.sub}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
