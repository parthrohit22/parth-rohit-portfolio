import type {
  ArchitectureEdge,
  ArchitectureNode,
  EngineeringCaseStudy,
} from "@/lib/portfolio-data";

const NODE_WIDTH = 172;
const NODE_HEIGHT = 60;

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
    labelY: Math.abs(dy) < 10 ? from.y - NODE_HEIGHT / 2 - 8 : (from.y + to.y) / 2 - 8,
  };
}

export function ProjectDiagram({ caseStudy }: { caseStudy: EngineeringCaseStudy }) {
  const { architecture } = caseStudy;
  const nodes = new Map(architecture.nodes.map((node) => [node.id, node]));
  const markerId = `${caseStudy.id}-architecture-arrow`;
  const titleId = `${caseStudy.id}-architecture-title`;
  const descriptionId = `${caseStudy.id}-architecture-description`;

  return (
    <figure className="border border-border bg-surface-muted/55 p-4 sm:p-6">
      <figcaption className="mb-5 max-w-3xl text-sm leading-6 text-muted-foreground">
        {architecture.caption}
      </figcaption>

      <div className="sm:hidden">
        <ol className="space-y-2" aria-label={`${caseStudy.name} architecture flow`}>
          {architecture.edges.map((edge, index) => {
            const from = nodes.get(edge.from);
            const to = nodes.get(edge.to);
            if (!from || !to) return null;

            return (
              <li
                key={`${edge.from}-${edge.to}`}
                className="grid grid-cols-[1.5rem_1fr] gap-2 border-l border-border py-1 pl-3 text-sm"
              >
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong className="font-medium text-foreground">{from.label}</strong>
                  <span className="mx-2 text-accent-blue" aria-hidden="true">
                    →
                  </span>
                  <strong className="font-medium text-foreground">{to.label}</strong>
                  {edge.label && (
                    <span className="ml-2 text-xs text-muted-foreground">{edge.label}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <svg
        viewBox="0 0 1000 340"
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
        </defs>

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
                  strokeWidth="1.5"
                  markerEnd={`url(#${markerId})`}
                />
                {edge.label && (
                  <text
                    x={coordinates.labelX}
                    y={coordinates.labelY}
                    textAnchor="middle"
                    fontFamily="ui-monospace, monospace"
                    fontSize="10"
                    fill="currentColor"
                    stroke="var(--surface-muted)"
                    strokeWidth="4"
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
              rx="6"
              fill="var(--card)"
              stroke="var(--border)"
            />
            <circle cx={node.x - 67} cy={node.y} r="3" fill="var(--accent-blue)" />
            <text
              x={node.x - 56}
              y={node.y - 4}
              fontFamily="Inter, ui-sans-serif, sans-serif"
              fontSize="12"
              fontWeight="600"
              fill="var(--foreground)"
            >
              {node.label}
            </text>
            <text
              x={node.x - 56}
              y={node.y + 13}
              fontFamily="ui-monospace, monospace"
              fontSize="9.5"
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
