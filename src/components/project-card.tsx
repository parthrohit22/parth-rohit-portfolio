import type { Project } from "@/lib/portfolio-data";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectDiagram } from "@/components/project-diagram";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="card-premium card-premium-hover group relative overflow-hidden p-8 sm:p-10">
      {/* gradient edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in oklab, var(--accent-blue) 50%, transparent), color-mix(in oklab, var(--accent-violet) 50%, transparent), transparent)",
        }}
      />

      <div className="absolute right-6 top-6 font-mono text-[10px] text-muted-foreground sm:right-10 sm:top-10">
        {String(index + 1).padStart(2, "0")} / 05
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.name}</h3>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-accent-blue">
              Overview
            </div>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-foreground/85">
              {project.summary}
            </p>

            <div className="mt-6 font-mono text-[10px] uppercase tracking-wider text-accent-blue">
              System Components
            </div>
            <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-blue" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {project.frameworks && (
              <div className="mt-6">
                <div className="font-mono text-[10px] uppercase tracking-wider text-accent-violet">
                  Compliance Frameworks
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.frameworks.map((f) => (
                    <span
                      key={f}
                      className="rounded-md bg-foreground/5 px-2 py-0.5 text-[11px] font-mono text-foreground/70"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-accent-violet">
              Architecture
            </div>
            <div className="mt-2">
              <ProjectDiagram name={project.name} />
            </div>

            <div className="mt-5 font-mono text-[10px] uppercase tracking-wider text-accent-violet">
              Technology Stack
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-[11px] text-foreground/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
          >
            <Github className="h-3.5 w-3.5" /> Repository
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

