import { useState } from "react";
import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import { ProjectDiagram } from "@/components/project-diagram";
import type { EngineeringCaseStudy } from "@/lib/portfolio-data";

const projectAccents: Record<string, { accent: string; label: string }> = {
  lyta: { accent: "oklch(0.82 0.16 155)", label: "Edge · Stateful" },
  kalyx: { accent: "oklch(0.72 0.17 300)", label: "Integrity · Verification" },
  "payment-routing": { accent: "oklch(0.82 0.13 200)", label: "Backend · Authorization" },
  fieldsight: { accent: "oklch(0.78 0.14 235)", label: "Cloud · Azure" },
  "find-job-api": { accent: "oklch(0.83 0.14 85)", label: "API · Contracts" },
  openshield: { accent: "oklch(0.75 0.17 35)", label: "Security · Compliance" },
};

const defaultAccent = { accent: "oklch(0.78 0.14 245)", label: "Systems" };

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
  const [open, setOpen] = useState(false);
  const highlights = caseStudy.evidence.slice(0, 3);

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

      <div className="p-6 sm:p-8 lg:p-10">
        {/* Header row */}
        <header className="flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]"
                style={{
                  borderColor: "color-mix(in oklab, var(--project-accent) 40%, var(--border))",
                  background: "color-mix(in oklab, var(--project-accent) 8%, var(--surface-elevated))",
                  color: "var(--project-accent)",
                }}
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--project-accent)" }} />
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {meta.label}
              </span>
            </div>
            <h3
              id={headingId}
              className="mt-4 font-sans text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {caseStudy.name}
            </h3>
            <p className="mt-3 text-[15px] leading-6 text-foreground/75 max-w-2xl">
              {caseStudy.positioning}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a href={caseStudy.repository} target="_blank" rel="noreferrer" className="action-link">
              <Github className="h-4 w-4" /> Repository
            </a>
            {caseStudy.demo && (
              <a href={caseStudy.demo} target="_blank" rel="noreferrer" className="action-link action-link-primary">
                Live system <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </header>

        {/* Body — two-column: diagram + highlights */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <h4 className="section-label">Architecture</h4>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {caseStudy.domains.slice(0, 2).join(" · ")}
              </span>
            </div>
            <ProjectDiagram caseStudy={caseStudy} />
          </div>

          <div>
            <h4 className="section-label">Engineering highlights</h4>
            <ol className="mt-4 space-y-2.5">
              {highlights.map((item, i) => (
                <li
                  key={item}
                  className="group relative flex gap-3 rounded-md border border-border bg-surface-elevated/60 p-3.5 text-[13.5px] leading-6 text-foreground/85 transition-colors hover:border-[color:var(--project-accent)]/60"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 font-mono text-[10px] tracking-[0.16em]"
                    style={{ color: "var(--project-accent)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Deep-dive CTA — full-width interactive row */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${caseStudy.id}-deepdive`}
          className="group mt-8 flex w-full items-center justify-between gap-6 rounded-lg border border-border bg-surface-elevated/50 px-5 py-4 text-left transition-all hover:border-[color:var(--project-accent)]/60 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--project-accent)]"
        >
          <div className="min-w-0">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "var(--project-accent)" }}
            >
              {open ? "Collapse" : "Explore engineering decisions"}
            </p>
            <p className="mt-1 text-sm text-foreground/70">
              Problem framing, tradeoffs, decision rationale, and supporting technologies.
            </p>
          </div>
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all group-hover:scale-110"
            style={{
              borderColor: "color-mix(in oklab, var(--project-accent) 55%, var(--border))",
              background: "color-mix(in oklab, var(--project-accent) 12%, transparent)",
              color: "var(--project-accent)",
            }}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </span>
        </button>

        {/* Deep dive — animated expansion */}
        <div
          id={`${caseStudy.id}-deepdive`}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-8 space-y-12">
              {caseStudy.contribution && (
                <div className="rounded-lg border border-border bg-surface-muted p-5">
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

              <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                <section>
                  <h4 className="section-label">Problem</h4>
                  <p className="mt-4 text-[15px] leading-7 text-foreground/80">{caseStudy.problem}</p>
                </section>
                <section>
                  <h4 className="section-label">Why it matters</h4>
                  <p className="mt-4 text-[15px] leading-7 text-foreground/80">{caseStudy.significance}</p>
                </section>
              </div>

              <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                <section>
                  <h4 className="section-label">Technical challenges</h4>
                  <ul className="mt-5 space-y-3.5">
                    {caseStudy.challenges.map((c) => (
                      <li key={c} className="detail-list-item">
                        {c}
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h4 className="section-label">Tradeoffs</h4>
                  <ul className="mt-5 space-y-3.5">
                    {caseStudy.tradeoffs.map((t) => (
                      <li key={t} className="detail-list-item">
                        {t}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {caseStudy.evidence.length > 3 && (
                <section>
                  <h4 className="section-label">Additional implementation evidence</h4>
                  <ul className="mt-5 grid gap-3 lg:grid-cols-2">
                    {caseStudy.evidence.slice(3).map((item, i) => (
                      <li
                        key={item}
                        className="rounded-md border border-border bg-surface-elevated/60 p-3.5 text-[13.5px] leading-6 text-foreground/80"
                      >
                        <span className="mb-1.5 block font-mono text-[10px] text-muted-foreground">
                          {String(i + 4).padStart(2, "0")}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section aria-label={`${caseStudy.name} engineering decisions`}>
                <h4 className="section-label">Engineering decision highlights</h4>
                <div
                  className={`mt-5 grid gap-4 ${caseStudy.decisions.length > 1 ? "lg:grid-cols-2" : ""}`}
                >
                  {caseStudy.decisions.map((decision, decisionIndex) => (
                    <div
                      key={decision.choice}
                      className="relative rounded-lg border border-border bg-surface-elevated p-6 transition-colors hover:border-[color:var(--project-accent)]/60"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-6 h-8 w-0.5 rounded-r"
                        style={{ background: "var(--project-accent)" }}
                      />
                      <div className="flex items-baseline gap-3">
                        <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          {String(decisionIndex + 1).padStart(2, "0")}
                        </span>
                        <h5
                          className="text-lg font-semibold leading-tight tracking-[-0.01em] text-foreground"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {decision.choice}
                        </h5>
                      </div>
                      <dl className="mt-5 space-y-4 text-sm leading-6">
                        <div>
                          <dt className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--project-accent)" }}>
                            Why this fits
                          </dt>
                          <dd className="mt-1.5 text-foreground/80">{decision.rationale}</dd>
                        </div>
                        <div>
                          <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                            Why not the obvious alternative
                          </dt>
                          <dd className="mt-1.5 text-foreground/80">{decision.rejectedAlternative}</dd>
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
          </div>
        </div>
      </div>
    </article>
  );
}
