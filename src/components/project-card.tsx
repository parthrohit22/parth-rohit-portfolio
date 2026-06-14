import type { Project } from "@/lib/portfolio-data";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectDiagram } from "@/components/project-diagram";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="card-premium card-premium-hover group relative grid gap-6 p-8 sm:grid-cols-[1fr_auto] sm:p-10">
      <div className="absolute right-6 top-6 font-mono text-[10px] text-muted-foreground sm:right-10 sm:top-10">
        {String(index + 1).padStart(2, "0")} / 05
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
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

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-foreground/80">
          {project.summary}
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-blue" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {project.frameworks && (
          <div className="mt-6">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Compliance
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

        <div className="mt-7 flex flex-wrap items-center gap-3">
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
          <div className="ml-auto flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            )).reduce<React.ReactNode[]>((acc, el, i) => {
              if (i > 0) acc.push(<span key={`s${i}`} className="text-border">·</span>);
              acc.push(el);
              return acc;
            }, [])}
          </div>
        </div>
      </div>
    </article>
  );
}
