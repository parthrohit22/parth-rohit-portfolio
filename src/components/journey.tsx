import { Section } from "@/components/section";
import {
  Boxes,
  Brain,
  Cloud,
  Code2,
  Lock,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Domain = {
  id: string;
  label: string;
  caption: string;
  items: string[];
  Icon: React.ComponentType<{ className?: string }>;
  accent: "blue" | "violet" | "indigo" | "core";
};

const domains: Domain[] = [
  {
    id: "foundations",
    label: "Foundations",
    caption: "The fundamentals every engineer is built on.",
    items: ["Problem Solving", "Programming", "Databases", "Mathematics"],
    Icon: Code2,
    accent: "blue",
  },
  {
    id: "application",
    label: "Application Development",
    caption: "Building, shipping, and delivering real software.",
    items: [
      "Frontend Systems",
      "Backend Systems",
      "REST APIs",
      "Software Delivery",
      "Agile Development",
    ],
    Icon: Boxes,
    accent: "blue",
  },
  {
    id: "connected",
    label: "Connected Systems",
    caption: "How services, networks, and data come together.",
    items: [
      "Networking",
      "Distributed Communication",
      "System Integration",
      "Data Analytics",
    ],
    Icon: Network,
    accent: "indigo",
  },
  {
    id: "security",
    label: "Security & Reliability",
    caption: "Engineering systems that can be trusted.",
    items: [
      "Authentication",
      "Encryption",
      "Systems Security",
      "Operational Quality",
    ],
    Icon: ShieldCheck,
    accent: "violet",
  },
  {
    id: "intelligent",
    label: "Intelligent & Cloud Systems",
    caption: "Working at the cloud, edge, and intelligence layers.",
    items: [
      "Cloud Native Development",
      "Computer Vision",
      "AI Systems",
      "Edge Computing",
      "Embedded Intelligence",
    ],
    Icon: Cloud,
    accent: "indigo",
  },
];

const currentFocus = [
  "Backend Engineering",
  "Cloud Platforms",
  "Distributed Systems",
  "Platform Engineering",
  "Open Source Security",
];

function accentBg(a: Domain["accent"]) {
  if (a === "violet")
    return "from-accent-violet/15 to-accent-violet/0 text-accent-violet";
  if (a === "indigo")
    return "from-[oklch(0.52_0.2_268)]/15 to-[oklch(0.52_0.2_268)]/0 text-[oklch(0.52_0.2_268)]";
  return "from-accent-blue/15 to-accent-blue/0 text-accent-blue";
}

function accentEdge(a: Domain["accent"]) {
  if (a === "violet") return "var(--accent-violet)";
  if (a === "indigo") return "var(--accent-indigo)";
  return "var(--accent-blue)";
}

export function Journey() {
  return (
    <Section
      id="journey"
      eyebrow="Engineering Domains Explored"
      title="Breadth before specialisation."
      description="My degree in Computing Systems pushed me through the full surface of the field — from foundations and application development to networking, security, and cloud-native systems. That breadth shaped the engineer I am today, and informed where I chose to specialise."
    >
      {/* Roadmap */}
      <div className="relative">
        {/* vertical spine for desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--accent-blue) 35%, transparent) 8%, color-mix(in oklab, var(--accent-violet) 30%, transparent) 60%, transparent)",
          }}
        />

        <ol className="relative space-y-6 lg:space-y-10">
          {domains.map((d, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <li
                key={d.id}
                className="relative"
                style={{
                  animation: `reveal-up .7s cubic-bezier(.16,1,.3,1) both`,
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* center node (desktop) */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-8 hidden -translate-x-1/2 lg:block"
                >
                  <div
                    className="relative grid h-10 w-10 place-items-center rounded-full border bg-card shadow-sm"
                    style={{ borderColor: accentEdge(d.accent) }}
                  >
                    <span
                      className="absolute inset-0 -z-10 rounded-full opacity-60 blur-md"
                      style={{ background: accentEdge(d.accent) }}
                    />
                    <d.Icon className="h-4 w-4" style={{ color: accentEdge(d.accent) }} />
                  </div>
                  <span className="absolute left-1/2 top-1/2 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card" />
                </div>

                <div
                  className={`grid gap-6 lg:grid-cols-2 ${
                    side === "right" ? "lg:[&>*:first-child]:col-start-2" : ""
                  }`}
                >
                  <div className={side === "right" ? "lg:pl-16" : "lg:pr-16 lg:text-right"}>
                    {/* card */}
                    <div className="card-premium card-premium-hover group relative overflow-hidden p-6 sm:p-7">
                      {/* gradient edge */}
                      <div
                        aria-hidden
                        className={`pointer-events-none absolute inset-y-0 w-[3px] ${
                          side === "right" ? "left-0" : "left-0 lg:left-auto lg:right-0"
                        }`}
                        style={{
                          background: `linear-gradient(to bottom, ${accentEdge(d.accent)}, transparent)`,
                        }}
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl"
                        style={{ background: accentEdge(d.accent) }}
                      />

                      <div
                        className={`flex items-center gap-3 ${
                          side === "left" ? "lg:flex-row-reverse lg:text-right" : ""
                        }`}
                      >
                        <span
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${accentBg(d.accent)} lg:hidden`}
                        >
                          <d.Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                            Domain · 0{i + 1}
                          </div>
                          <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                            {d.label}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground">{d.caption}</p>

                      <div
                        className={`mt-4 flex flex-wrap gap-1.5 ${
                          side === "left" ? "lg:justify-end" : ""
                        }`}
                      >
                        {d.items.map((it) => (
                          <span
                            key={it}
                            className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-[11px] text-foreground/75 transition-colors group-hover:border-accent-blue/30"
                          >
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div aria-hidden className="hidden lg:block" />
                </div>
              </li>
            );
          })}

          {/* Current focus — terminus node */}
          <li
            className="relative"
            style={{
              animation: `reveal-up .7s cubic-bezier(.16,1,.3,1) both`,
              animationDelay: `${domains.length * 80}ms`,
            }}
          >
            <div
              aria-hidden
              className="absolute left-1/2 top-8 hidden -translate-x-1/2 lg:block"
            >
              <div className="relative grid h-12 w-12 place-items-center rounded-full border-2 border-foreground bg-foreground text-background shadow-lg">
                <span className="absolute -inset-2 rounded-full ring-2 ring-accent-blue/40 animate-ping" />
                <Sparkles className="h-4 w-4" />
              </div>
            </div>

            <div className="mx-auto lg:max-w-xl">
              <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-foreground/15 bg-gradient-to-br from-foreground to-[oklch(0.22_0.04_268)] p-7 text-background shadow-[0_30px_80px_-40px_oklch(0.18_0.05_260/0.55)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--accent-blue) 60%, transparent), transparent 70%)",
                  }}
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-background/60">
                    Now · Specialisation
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-background/20 bg-background/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-background/80 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                    Current Focus
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  Backend, cloud, distributed, security.
                </h3>
                <p className="mt-2 max-w-md text-sm text-background/70">
                  Where breadth converged into deliberate specialisation —
                  building reliable, distributed, security-aware systems.
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {currentFocus.map((c) => (
                    <span
                      key={c}
                      className="rounded-md border border-background/15 bg-background/10 px-2.5 py-1 font-mono text-[11px] text-background/90 backdrop-blur"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-background/10 pt-5 font-mono text-[10px] uppercase tracking-wider text-background/60">
                  <div className="flex items-center gap-1.5">
                    <Cloud className="h-3 w-3" /> cloud
                  </div>
                  <div className="flex items-center gap-1.5 justify-center">
                    <Network className="h-3 w-3" /> distributed
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <Lock className="h-3 w-3" /> security
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted-foreground">
        <Brain className="mr-1.5 inline h-3.5 w-3.5 -translate-y-0.5 text-accent-blue" />
        Explored the breadth of computing. Specialised in backend engineering,
        cloud platforms, distributed systems, and security-focused systems.
      </p>
    </Section>
  );
}
