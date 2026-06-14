/**
 * Animated systems architecture diagram.
 * Represents: edge → API gateway → services → data layer
 */
export function HeroVisual() {
  return (
    <div className="relative w-full">
      <div className="absolute inset-0 -z-10 hero-glow" />
      <div className="card-premium relative overflow-hidden p-1.5">
        <div className="rounded-[calc(var(--radius-xl)-6px)] border border-border/70 bg-gradient-to-b from-surface to-background p-6">
          {/* window chrome */}
          <div className="mb-5 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="ml-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              system.architecture
            </span>
          </div>

          <svg
            viewBox="0 0 600 360"
            className="h-auto w-full"
            role="img"
            aria-label="Distributed systems architecture"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.6 0.18 255)" stopOpacity="0.1" />
                <stop offset="50%" stopColor="oklch(0.6 0.18 255)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="oklch(0.58 0.2 290)" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(1 0 0)" />
                <stop offset="100%" stopColor="oklch(0.97 0.005 250)" />
              </linearGradient>
              <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* connection lines */}
            <g stroke="url(#lineGrad)" strokeWidth="1.25" fill="none">
              <path d="M 110 80 C 200 80, 220 180, 300 180" />
              <path d="M 110 180 L 300 180" />
              <path d="M 110 280 C 200 280, 220 180, 300 180" />
              <path d="M 360 180 L 470 90" />
              <path d="M 360 180 L 470 180" />
              <path d="M 360 180 L 470 270" />
            </g>

            {/* animated data packets */}
            <g>
              <circle r="3" fill="oklch(0.6 0.18 255)">
                <animateMotion dur="3.2s" repeatCount="indefinite" path="M 110 80 C 200 80, 220 180, 300 180" />
              </circle>
              <circle r="3" fill="oklch(0.58 0.2 290)">
                <animateMotion dur="2.6s" repeatCount="indefinite" begin="0.4s" path="M 110 180 L 300 180" />
              </circle>
              <circle r="3" fill="oklch(0.6 0.18 255)">
                <animateMotion dur="3.4s" repeatCount="indefinite" begin="0.9s" path="M 110 280 C 200 280, 220 180, 300 180" />
              </circle>
              <circle r="2.5" fill="oklch(0.58 0.2 290)">
                <animateMotion dur="2.4s" repeatCount="indefinite" path="M 360 180 L 470 90" />
              </circle>
              <circle r="2.5" fill="oklch(0.6 0.18 255)">
                <animateMotion dur="2.1s" repeatCount="indefinite" begin="0.6s" path="M 360 180 L 470 180" />
              </circle>
              <circle r="2.5" fill="oklch(0.58 0.2 290)">
                <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.3s" path="M 360 180 L 470 270" />
              </circle>
            </g>

            {/* edge nodes left */}
            {[
              { y: 80, label: "Edge · EU" },
              { y: 180, label: "Edge · US" },
              { y: 280, label: "Edge · APAC" },
            ].map((n, i) => (
              <g key={i}>
                <rect x="40" y={n.y - 18} width="140" height="36" rx="8" fill="url(#nodeGrad)" stroke="oklch(0.92 0.008 255)" />
                <circle cx="58" cy={n.y} r="3" fill="oklch(0.6 0.18 255)" />
                <text x="72" y={n.y + 4} fontSize="11" fill="oklch(0.18 0.02 260)" fontFamily="ui-monospace, monospace">
                  {n.label}
                </text>
              </g>
            ))}

            {/* gateway center */}
            <g>
              <rect x="290" y="150" width="80" height="60" rx="10" fill="url(#nodeGrad)" stroke="oklch(0.6 0.18 255 / 0.4)" />
              <text x="330" y="178" fontSize="10" fill="oklch(0.5 0.02 260)" fontFamily="ui-monospace, monospace" textAnchor="middle">
                API
              </text>
              <text x="330" y="194" fontSize="11" fill="oklch(0.18 0.02 260)" fontFamily="ui-monospace, monospace" fontWeight="600" textAnchor="middle">
                Gateway
              </text>
            </g>

            {/* services right */}
            {[
              { y: 90, label: "auth.svc", color: "oklch(0.58 0.2 290)" },
              { y: 180, label: "data.svc", color: "oklch(0.6 0.18 255)" },
              { y: 270, label: "queue.svc", color: "oklch(0.58 0.2 290)" },
            ].map((s, i) => (
              <g key={i}>
                <rect x="460" y={s.y - 18} width="110" height="36" rx="8" fill="url(#nodeGrad)" stroke="oklch(0.92 0.008 255)" />
                <circle cx="478" cy={s.y} r="3" fill={s.color}>
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                </circle>
                <text x="492" y={s.y + 4} fontSize="11" fill="oklch(0.18 0.02 260)" fontFamily="ui-monospace, monospace">
                  {s.label}
                </text>
              </g>
            ))}

            {/* labels */}
            <text x="110" y="40" fontSize="10" fill="oklch(0.5 0.02 260)" fontFamily="ui-monospace, monospace" textAnchor="middle">
              EDGE
            </text>
            <text x="330" y="130" fontSize="10" fill="oklch(0.5 0.02 260)" fontFamily="ui-monospace, monospace" textAnchor="middle">
              ROUTING
            </text>
            <text x="515" y="50" fontSize="10" fill="oklch(0.5 0.02 260)" fontFamily="ui-monospace, monospace" textAnchor="middle">
              SERVICES
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
