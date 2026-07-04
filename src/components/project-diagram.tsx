import { useState } from "react";
import type {
  ArchitectureEdge,
  ArchitectureNode,
  EngineeringCaseStudy,
} from "@/lib/portfolio-data";

const NODE_WIDTH = 172;
const NODE_HEIGHT = 64;

function edgeCoordinates(edge: ArchitectureEdge, nodes: Map<string, ArchitectureNode>) {
  const from = nodes.get(edge.from);
  const to = nodes.get(edge.to);
  if (!from || !to) return null;

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const halfWidth = NODE_WIDTH / 2;
  const halfHeight = NODE_HEIGHT / 2;
  const xScale = dx === 0 ? Number.POSITIVE_INFINITY : halfWidth / Math.abs(dx);
  const yScale = dy === 0 ? Number.POSITIVE_INFINITY : halfHeight / Math.abs(dy);
  const scale = Math.min(xScale, yScale);

  return {
    x1: from.x + dx * scale,
    y1: from.y + dy * scale,
    x2: to.x - dx * scale,
    y2: to.y - dy * scale,
    labelX: (from.x + to.x) / 2,
    labelY: Math.abs(dy) < 10 ? from.y - NODE_HEIGHT / 2 - 10 : (from.y + to.y) / 2 - 8,
  };
}

export function ProjectDiagram({ caseStudy }: { caseStudy: EngineeringCaseStudy }) {
  const { architecture } = caseStudy;
  const nodes = new Map(architecture.nodes.map((node) => [node.id, node]));
  const markerId = `${caseStudy.id}-architecture-arrow`;
  const patternId = `${caseStudy.id}-architecture-grid`;
  const titleId = `${caseStudy.id}-architecture-title`;
  const descriptionId = `${caseStudy.id}-architecture-description`;

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // If a node is hovered, highlight edges touching it. Otherwise all edges pulse gently.
  const isEdgeHot = (edge: ArchitectureEdge) =>
    hoveredNode !== null && (edge.from === hoveredNode || edge.to === hoveredNode);

  return (
    <figure
      className="overflow-hidden rounded-xl border border-border shadow-[var(--shadow-card)]"
      style={{ background: "var(--gradient-diagram-bg, linear-gradient(180deg, var(--surface), var(--surface-muted)))" }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-surface-elevated/60 px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: "color-mix(in oklab, var(--project-accent) 60%, transparent)" }} />
          <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: "color-mix(in oklab, var(--project-accent) 35%, transparent)" }} />
          <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: "var(--project-accent)" }} />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            architecture.svg
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          {architecture.nodes.length} nodes · {architecture.edges.length} edges
        </span>
      </div>
      <figcaption className="border-b border-border/70 px-4 py-3 text-[13px] leading-6 text-muted-foreground sm:px-5">
        {architecture.caption}
      </figcaption>

      {/* Mobile flow list */}
      <div className="p-4 sm:hidden">
        <ol className="relative space-y-3 border-l border-border pl-6" aria-label={`${caseStudy.name} architecture flow`}>
          {architecture.edges.map((edge, index) => {
            const from = nodes.get(edge.from);
            const to = nodes.get(edge.to);
            if (!from || !to) return null;

            return (
              <li key={`${edge.from}-${edge.to}`} className="relative text-sm">
                <span
                  aria-hidden="true"
                  className="absolute -left-[27px] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-border bg-card font-mono text-[9px]"
                  style={{ color: "var(--project-accent)" }}
                >
                  {index + 1}
                </span>
                <div>
                  <strong className="font-medium text-foreground">{from.label}</strong>
                  <span className="mx-2" aria-hidden="true" style={{ color: "var(--project-accent)" }}>→</span>
                  <strong className="font-medium text-foreground">{to.label}</strong>
                </div>
                {edge.label && (
                  <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">{edge.label}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <svg
        viewBox="0 0 1000 380"
        className="hidden h-auto w-full sm:block"
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
      >
        <title id={titleId}>{`${caseStudy.name} architecture`}</title>
        <desc id={descriptionId}>{architecture.caption}</desc>
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--project-accent, var(--accent-blue))" />
          </marker>
          <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.75" fill="var(--border)" opacity="0.7" />
          </pattern>
          <radialGradient id={`${caseStudy.id}-node-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--project-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--project-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1000" height="380" fill={`url(#${patternId})`} />

        {/* Edges */}
        <g>
          {architecture.edges.map((edge) => {
            const c = edgeCoordinates(edge, nodes);
            if (!c) return null;
            const hot = isEdgeHot(edge);
            return (
              <g key={`e-${edge.from}-${edge.to}`}>
                {hot && (
                  <line
                    x1={c.x1}
                    y1={c.y1}
                    x2={c.x2}
                    y2={c.y2}
                    stroke="var(--project-accent)"
                    strokeWidth={5}
                    opacity={0.22}
                    strokeLinecap="round"
                    style={{ filter: "blur(3px)" }}
                  />
                )}
                <line
                  x1={c.x1}
                  y1={c.y1}
                  x2={c.x2}
                  y2={c.y2}
                  stroke="var(--project-accent, var(--accent-blue))"
                  strokeWidth={hot ? 2.2 : 1.5}
                  strokeLinecap="round"
                  markerEnd={`url(#${markerId})`}
                  opacity={hot ? 1 : 0.7}
                  style={{ transition: "opacity 240ms ease, stroke-width 240ms ease" }}
                />
                {edge.label && (
                  <text
                    x={c.labelX}
                    y={c.labelY}
                    textAnchor="middle"
                    fontFamily="ui-monospace, monospace"
                    fontSize="10.5"
                    fill="var(--project-accent, var(--accent-blue))"
                    stroke="var(--surface-elevated)"
                    strokeWidth="5"
                    paintOrder="stroke"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Traveling packets on each edge */}
        <g>
          {architecture.edges.map((edge, i) => {
            const c = edgeCoordinates(edge, nodes);
            if (!c) return null;
            const hot = isEdgeHot(edge);
            const dur = hot ? 1.1 : 3.4 + (i % 3) * 0.4;
            return (
              <circle
                key={`p-${edge.from}-${edge.to}`}
                r={hot ? 3.4 : 2.4}
                fill="var(--project-accent, var(--accent-blue))"
                opacity={hot ? 1 : 0.75}
                style={{
                  filter: `drop-shadow(0 0 ${hot ? 8 : 4}px color-mix(in oklab, var(--project-accent) 70%, transparent))`,
                }}
              >
                <animateMotion
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${-(i * 0.35)}s`}
                  path={`M ${c.x1} ${c.y1} L ${c.x2} ${c.y2}`}
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

        {/* Nodes */}
        {architecture.nodes.map((node) => {
          const hot = hoveredNode === node.id;
          return (
            <g
              key={node.id}
              onPointerEnter={() => setHoveredNode(node.id)}
              onPointerLeave={() => setHoveredNode((h) => (h === node.id ? null : h))}
              style={{ cursor: "pointer" }}
            >
              {hot && (
                <rect
                  x={node.x - NODE_WIDTH / 2 - 6}
                  y={node.y - NODE_HEIGHT / 2 - 6}
                  width={NODE_WIDTH + 12}
                  height={NODE_HEIGHT + 12}
                  rx="12"
                  fill="none"
                  stroke="var(--project-accent)"
                  strokeWidth={1}
                  opacity={0.55}
                  style={{ filter: "drop-shadow(0 0 12px color-mix(in oklab, var(--project-accent) 60%, transparent))" }}
                />
              )}
              <rect
                x={node.x - NODE_WIDTH / 2}
                y={node.y - NODE_HEIGHT / 2}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx="8"
                fill="var(--card)"
                stroke={hot ? "var(--project-accent)" : "var(--border)"}
                strokeWidth={hot ? 1.4 : 1}
                style={{ transition: "stroke 240ms ease, stroke-width 240ms ease" }}
              />
              <rect
                x={node.x - NODE_WIDTH / 2}
                y={node.y - NODE_HEIGHT / 2}
                width="3"
                height={NODE_HEIGHT}
                rx="1.5"
                fill="var(--project-accent, var(--accent-blue))"
              />
              {/* Pulse dot */}
              <circle
                cx={node.x + NODE_WIDTH / 2 - 10}
                cy={node.y - NODE_HEIGHT / 2 + 10}
                r={hot ? 3 : 2.2}
                fill="var(--project-accent)"
                opacity={hot ? 1 : 0.6}
              >
                <animate
                  attributeName="opacity"
                  values={hot ? "1;0.4;1" : "0.6;0.2;0.6"}
                  dur={hot ? "1s" : "2.4s"}
                  repeatCount="indefinite"
                />
              </circle>
              <text
                x={node.x - NODE_WIDTH / 2 + 14}
                y={node.y - 5}
                fontFamily="Inter, ui-sans-serif, sans-serif"
                fontSize="12.5"
                fontWeight="600"
                fill="var(--foreground)"
              >
                {node.label}
              </text>
              <text
                x={node.x - NODE_WIDTH / 2 + 14}
                y={node.y + 14}
                fontFamily="ui-monospace, monospace"
                fontSize="10"
                fill="var(--muted-foreground)"
              >
                {node.detail}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
