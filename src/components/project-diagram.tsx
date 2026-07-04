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

  return (
    <figure
      className="overflow-hidden rounded-xl border border-border"
      style={{ background: "var(--gradient-diagram-bg)" }}
    >
      <figcaption className="border-b border-border/70 px-5 py-4 text-sm leading-6 text-muted-foreground sm:px-6">
        {architecture.caption}
      </figcaption>

      <div className="p-5 sm:hidden">
        <ol
          className="relative space-y-3 border-l border-border pl-6"
          aria-label={`${caseStudy.name} architecture flow`}
        >
          {architecture.edges.map((edge, index) => {
            const from = nodes.get(edge.from);
            const to = nodes.get(edge.to);
            if (!from || !to) return null;

            return (
              <li key={`${edge.from}-${edge.to}`} className="relative text-sm">
                <span
                  aria-hidden="true"
                  className="absolute -left-[27px] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-border bg-card font-mono text-[9px] text-accent-blue"
                >
                  {index + 1}
                </span>
                <div>
                  <strong className="font-medium text-foreground">{from.label}</strong>
                  <span className="mx-2 text-accent-blue" aria-hidden="true">
                    →
                  </span>
                  <strong className="font-medium text-foreground">{to.label}</strong>
                </div>
                {edge.label && (
                  <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    {edge.label}
                  </div>
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
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-blue)" />
          </marker>
          <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.75" fill="var(--border)" opacity="0.7" />
          </pattern>
        </defs>

        <rect width="1000" height="380" fill={`url(#${patternId})`} />

        <g className="text-accent-blue">
          {architecture.edges.map((edge) => {
            const coordinates = edgeCoordinates(edge, nodes);
            if (!coordinates) return null;

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line
                  x1={coordinates.x1}
                  y1={coordinates.y1}
                  x2={coordinates.x2}
                  y2={coordinates.y2}
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  markerEnd={`url(#${markerId})`}
                  opacity="0.85"
                />
                {edge.label && (
                  <text
                    x={coordinates.labelX}
                    y={coordinates.labelY}
                    textAnchor="middle"
                    fontFamily="ui-monospace, monospace"
                    fontSize="10.5"
                    fill="currentColor"
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

        {architecture.nodes.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x - NODE_WIDTH / 2}
              y={node.y - NODE_HEIGHT / 2}
              width={NODE_WIDTH}
              height={NODE_HEIGHT}
              rx="8"
              fill="var(--card)"
              stroke="var(--border)"
            />
            <rect
              x={node.x - NODE_WIDTH / 2}
              y={node.y - NODE_HEIGHT / 2}
              width="3"
              height={NODE_HEIGHT}
              rx="1.5"
              fill="var(--accent-blue)"
            />
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
        ))}
      </svg>
    </figure>
  );
}
