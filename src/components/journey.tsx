import { Section } from "@/components/section";

type Stage = {
  phase: string;
  title: string;
  caption: string;
  items: string[];
  accent: "blue" | "violet" | "blue-strong";
  current?: boolean;
};

const stages: Stage[] = [
  {
    phase: "01",
    title: "Foundations",
    caption: "Learning to think like an engineer.",
    items: ["Software Engineering", "Object-Oriented Programming", "Java", "Design Patterns", "Testing"],
    accent: "blue",
  },
  {
    phase: "02",
    title: "Full Stack & Delivery",
    caption: "Shipping software end-to-end, working in real teams.",
    items: ["Client-side Development", "Server-side Development", "JavaScript", "CSS", "Laravel", "REST APIs", "Agile", "Scrum", "Kanban"],
    accent: "blue",
  },
  {
    phase: "03",
    title: "Networking",
    caption: "Understanding how systems talk to each other.",
    items: ["Network Design", "Routing & Switching", "Cisco Packet Tracer", "Regional Connectivity"],
    accent: "blue",
  },
  {
    phase: "04",
    title: "Data & Intelligence",
    caption: "Exploring data, analytics, and applied AI.",
    items: ["Jupyter Notebook", "R Notebook", "NumPy", "Matplotlib", "Computer Vision", "Machine Learning Fundamentals"],
    accent: "violet",
  },
  {
    phase: "05",
    title: "Physical Systems",
    caption: "Computing at the boundary of hardware and software.",
    items: ["Embedded Systems", "Physical Computing", "Hardware Integration", "Python Scripting"],
    accent: "violet",
  },
  {
    phase: "06",
    title: "Innovation & Technology Strategy",
    caption: "Placing technology decisions in a wider context.",
    items: ["Innovation & Society", "Technology Strategy", "PESTLE Analysis", "Digital Transformation"],
    accent: "violet",
  },
  {
    phase: "07",
    title: "Infrastructure & Security",
    caption: "Where the work started to feel like home.",
    items: ["Cloud Platforms", "Azure", "Cloud-Native Development", "Encryption", "Decryption", "Authentication", "Security Principles"],
    accent: "blue-strong",
  },
  {
    phase: "08",
    title: "Current Focus",
    caption: "What I build, contribute to, and want to do next.",
    items: [
      "Backend Engineering",
      "Cloud Platforms",
      "Distributed Systems",
      "Platform Engineering",
      "Security-Focused Systems",
      "Open Source Security",
    ],
    accent: "blue-strong",
    current: true,
  },
];

function accentDot(a: Stage["accent"]) {
  if (a === "violet") return "bg-accent-violet";
  if (a === "blue-strong") return "bg-foreground";
  return "bg-accent-blue";
}
function accentRing(a: Stage["accent"]) {
  if (a === "violet") return "ring-accent-violet/30";
  if (a === "blue-strong") return "ring-foreground/30";
  return "ring-accent-blue/30";
}

export function Journey() {
  return (
    <Section
      id="journey"
      eyebrow="Engineering Journey"
      title="From the breadth of computing to a deliberate focus."
      description="My degree in Computing Systems exposed me to the full spectrum of the field — software, networks, data, hardware, and strategy. Over time, that exploration converged on the work I care about most: backend, cloud, distributed systems, and security-focused engineering."
    >
      <div className="relative">
        {/* spine */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-transparent via-border to-transparent sm:block"
        />

        <ol className="space-y-5">
          {stages.map((s, i) => (
            <li
              key={s.phase}
              className="group relative grid grid-cols-1 gap-4 sm:grid-cols-[40px_1fr]"
              style={{ animation: `reveal-up .6s cubic-bezier(.16,1,.3,1) both`, animationDelay: `${i * 60}ms` }}
            >
              {/* node */}
              <div className="relative hidden sm:block">
                <div
                  className={`absolute left-2 top-3 h-5 w-5 rounded-full bg-card ring-4 ${accentRing(s.accent)} transition-transform group-hover:scale-110`}
                >
                  <div className={`m-1 h-3 w-3 rounded-full ${accentDot(s.accent)}`} />
                  {s.current && (
                    <span className="absolute -inset-2 rounded-full ring-2 ring-accent-blue/40 animate-ping" />
                  )}
                </div>
              </div>

              {/* card */}
              <div className="card-premium card-premium-hover relative overflow-hidden p-6 sm:p-7">
                {/* gradient edge */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[3px] opacity-80"
                  style={{
                    background:
                      s.accent === "violet"
                        ? "linear-gradient(to bottom, var(--accent-violet), transparent)"
                        : s.accent === "blue-strong"
                          ? "linear-gradient(to bottom, var(--foreground), transparent)"
                          : "linear-gradient(to bottom, var(--accent-blue), transparent)",
                  }}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Phase {s.phase}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                      {s.title}
                    </h3>
                  </div>
                  {s.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-blue">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                      Now
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.caption}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className={`rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-[11px] ${
                        s.current ? "text-foreground" : "text-muted-foreground"
                      } transition-colors group-hover:border-accent-blue/30`}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
        The projects below are evidence of this trajectory — each one explores a
        different facet of building reliable, distributed, security-aware
        systems.
      </p>
    </Section>
  );
}
