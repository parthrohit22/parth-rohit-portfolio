import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import { ProjectDiagram } from "@/components/project-diagram";
import type { EngineeringCaseStudy } from "@/lib/portfolio-data";

const projectAccents: Record<string, { accent: string; label: string }> = {
  lyta: { accent: "oklch(0.62 0.19 245)", label: "Edge · Stateful" },
  kalyx: { accent: "oklch(0.6 0.18 285)", label: "Integrity · Verification" },
  "payment-routing": { accent: "oklch(0.62 0.16 165)", label: "Backend · Authorization" },
  fieldsight: { accent: "oklch(0.62 0.17 220)", label: "Cloud · Azure" },
  "find-job-api": { accent: "oklch(0.66 0.16 60)", label: "API · Contracts" },
  openshield: { accent: "oklch(0.6 0.19 25)", label: "Security · Compliance" },
};

const defaultAccent = { accent: "oklch(0.56 0.2 260)", label: "Systems" };

export function EngineeringCaseStudyCard({
  caseStudy,
  index,
  total,
}: {
  caseStudy: EngineeringCaseStudy;
  index: number;
  total: number;
}) {
  const headingId = `${caseStudy.id}-title`;
  const meta = projectAccents[caseStudy.id] ?? defaultAccent;

  return (
    <article
      id={caseStudy.id}
      aria-labelledby={headingId}
      className="project-card card-elevated scroll-mt-24 overflow-hidden"
      style={{ ["--project-accent" as string]: meta.accent }}
    >
      <div
        aria-hidden="true"
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--project-accent), color-mix(in oklab, var(--project-accent) 40%, transparent) 60%, transparent)",
        }}
      />

      <div className="p-6 sm:p-10 lg:p-12">
        <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="min-w-0 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]"
                style={{
                  borderColor:
                    "color-mix(in oklab, var(--project-accent) 40%, var(--border))",
                  background:
                    "color-mix(in oklab, var(--project-accent) 8%, var(--surface-elevated))",
                  color: "var(--project-accent)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--project-accent)" }}
                />
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {meta.label}
              </span>
            </div>
            <h3
              id={headingId}
              className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[2.75rem]"
            >
              {caseStudy.name}
            </h3>
            <p className="mt-4 text-lg leading-8 text-foreground/80">{caseStudy.positioning}</p>
            <p className="mt-4 font-mono text-[11px] leading-5 text-muted-foreground">
              {caseStudy.domains.join(" · ")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <a href={caseStudy.repository} target="_blank" rel="noreferrer" className="action-link">
              <Github className="h-4 w-4" /> Repository
            </a>
            {caseStudy.demo && (
              <a
                href={caseStudy.demo}
                target="_blank"
                rel="noreferrer"
                className="action-link action-link-primary"
              >
                Live system <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </header>

        {caseStudy.contribution && (
          <div className="mt-10 rounded-lg border border-border bg-surface-muted p-5 sm:p-6">
            <div className="flex gap-4">
              <div
                aria-hidden="true"
                className="w-0.5 shrink-0 rounded-full"
                style={{ background: "var(--project-accent)" }}
              />
              <p className="text-sm leading-6 text-foreground/80">
                <strong className="font-semibold text-foreground">Contribution boundary.</strong>{" "}
                {caseStudy.contribution}
              </p>
            </div>
          </div>
        )}

        <section aria-label={`${caseStudy.name} implementation evidence`} className="mt-12">
          <h4 className="section-label">Implementation evidence</h4>
          <ul className="mt-5 grid gap-3 lg:grid-cols-3">
            {caseStudy.evidence.map((item, i) => (
              <li
                key={item}
                className="group relative rounded-lg border border-border bg-surface-elevated p-4 text-sm leading-6 text-foreground/80 transition-colors hover:border-[color:var(--project-accent)]/50"
              >
                <span
                  className="mb-2 block font-mono text-[10px] text-muted-foreground"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h4 className="section-label">Architecture</h4>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              System diagram
            </span>
          </div>
          <ProjectDiagram caseStudy={caseStudy} />
        </section>

        <details className="project-details group mt-10 border-t border-border pt-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-2 -mx-2 px-2 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <div className="min-w-0">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.16em]"
                style={{ color: "var(--project-accent)" }}
              >
                Engineering deep dive
              </p>
              <p className="mt-1.5 text-sm text-foreground/80">
                Problem framing, tradeoffs, decisions, and supporting technologies.
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
              <span className="hidden sm:inline">Expand</span>
              <ChevronDown
                className="h-4 w-4 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </span>
          </summary>

          <div className="mt-10 space-y-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <section>
                <h4 className="section-label">Problem</h4>
                <p className="mt-4 text-[15px] leading-7 text-foreground/80">
                  {caseStudy.problem}
                </p>
              </section>
              <section>
                <h4 className="section-label">Why it matters</h4>
                <p className="mt-4 text-[15px] leading-7 text-foreground/80">
                  {caseStudy.significance}
                </p>
              </section>
            </div>

            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <section>
                <h4 className="section-label">Technical challenges</h4>
                <ul className="mt-5 space-y-3.5">
                  {caseStudy.challenges.map((challenge) => (
                    <li key={challenge} className="detail-list-item">
                      {challenge}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h4 className="section-label">Tradeoffs</h4>
                <ul className="mt-5 space-y-3.5">
                  {caseStudy.tradeoffs.map((tradeoff) => (
                    <li key={tradeoff} className="detail-list-item">
                      {tradeoff}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section aria-label={`${caseStudy.name} engineering decisions`}>
              <h4 className="section-label">Engineering Decision Highlights</h4>
              <div
                className={`mt-5 grid gap-4 ${caseStudy.decisions.length > 1 ? "lg:grid-cols-2" : ""}`}
              >
                {caseStudy.decisions.map((decision, decisionIndex) => (
                  <div
                    key={decision.choice}
                    className="relative rounded-lg border border-border bg-surface-elevated p-6 transition-colors hover:border-[color:var(--project-accent)]/50"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-6 h-8 w-0.5 rounded-r"
                      style={{ background: "var(--project-accent)" }}
                    />
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                        {String(decisionIndex + 1).padStart(2, "0")}
                      </span>
                      <h5 className="text-base font-semibold tracking-tight">
                        {decision.choice}
                      </h5>
                    </div>
                    <dl className="mt-6 space-y-5 text-sm leading-6">
                      <div>
                        <dt
                          className="font-mono text-[10px] uppercase tracking-[0.16em]"
                          style={{ color: "var(--project-accent)" }}
                        >
                          Why this fits
                        </dt>
                        <dd className="mt-1.5 text-foreground/80">{decision.rationale}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          Why not the obvious alternative
                        </dt>
                        <dd className="mt-1.5 text-foreground/80">
                          {decision.rejectedAlternative}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          Consequence
                        </dt>
                        <dd className="mt-1.5 text-foreground/80">{decision.consequence}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h4 className="section-label">Supporting technologies</h4>
              <ul className="mt-5 flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech) => (
                  <li key={tech} className="tech-chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </details>
      </div>
    </article>
  );
}
