import { ArrowUpRight, Github } from "lucide-react";
import { ProjectDiagram } from "@/components/project-diagram";
import type { EngineeringCaseStudy } from "@/lib/portfolio-data";

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

  return (
    <article
      id={caseStudy.id}
      aria-labelledby={headingId}
      className="card-elevated scroll-mt-24 p-6 sm:p-10 lg:p-12"
    >
      <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0 max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-border bg-surface-elevated px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-blue">
            Case Study {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <h3
            id={headingId}
            className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
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
              className="w-0.5 shrink-0 rounded-full bg-accent-blue"
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
          {caseStudy.evidence.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-border bg-surface-elevated p-4 text-sm leading-6 text-foreground/80 transition-colors hover:border-accent-blue/40"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <section>
          <h4 className="section-label">Problem</h4>
          <p className="mt-4 text-[15px] leading-7 text-foreground/80">{caseStudy.problem}</p>
        </section>
        <section>
          <h4 className="section-label">Why it matters</h4>
          <p className="mt-4 text-[15px] leading-7 text-foreground/80">{caseStudy.significance}</p>
        </section>
      </div>

      <section className="mt-14">
        <h4 className="section-label">Architecture</h4>
        <div className="mt-5">
          <ProjectDiagram caseStudy={caseStudy} />
        </div>
      </section>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
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

      <section className="mt-14">
        <h4 className="section-label">Supporting technologies</h4>
        <ul className="mt-5 flex flex-wrap gap-2">
          {caseStudy.technologies.map((tech) => (
            <li key={tech} className="tech-chip">
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-label={`${caseStudy.name} engineering decisions`}>
        <h4 className="section-label">Engineering Decision Highlights</h4>
        <div
          className={`mt-5 grid gap-4 ${caseStudy.decisions.length > 1 ? "lg:grid-cols-2" : ""}`}
        >
          {caseStudy.decisions.map((decision, decisionIndex) => (
            <div
              key={decision.choice}
              className="rounded-lg border border-border bg-surface-elevated p-6 transition-colors hover:border-accent-blue/40"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                  {String(decisionIndex + 1).padStart(2, "0")}
                </span>
                <h5 className="text-base font-semibold tracking-tight">{decision.choice}</h5>
              </div>
              <dl className="mt-6 space-y-5 text-sm leading-6">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-blue">
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
    </article>
  );
}
