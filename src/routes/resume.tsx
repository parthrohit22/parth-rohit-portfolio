import { createFileRoute } from "@tanstack/react-router";
import { Download, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { experience, profile, projects, stack } from "@/lib/portfolio-data";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Parth Rohit" },
      {
        name: "description",
        content:
          "Resume of Parth Rohit — Software Engineer. Summary, projects, skills, experience, education.",
      },
      { property: "og:title", content: "Resume — Parth Rohit" },
      {
        property: "og:description",
        content: "Summary, projects, skills, experience, education.",
      },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </a>
          <a
            href="/Parth_Rohit_Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>

        <article className="card-premium p-10 sm:p-14">
          <header className="border-b border-border pb-6">
            <h1 className="text-4xl font-semibold tracking-tight">{profile.name}</h1>
            <p className="mt-1 text-base text-muted-foreground">
              Software Engineer · {profile.location}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <a href={`mailto:${profile.email}`} className="hover:text-foreground">{profile.email}</a>
              <span>{profile.phone}</span>
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-foreground">github.com/parthrohit22</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">linkedin.com/in/parthrohit</a>
            </div>
          </header>

          <Block title="Summary">
            <p className="text-[15px] leading-relaxed text-foreground/85">
              {profile.statement} {profile.supporting}
            </p>
          </Block>

          <Block title="Featured Projects">
            <ul className="space-y-4">
              {projects.map((p) => (
                <li key={p.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold">{p.name}</h3>
                    <div className="font-mono text-[11px] text-muted-foreground">
                      {p.tech.join(" · ")}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-foreground/80">{p.summary}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Highlights: {p.highlights.slice(0, 4).join(", ")}.
                  </p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Skills">
            <dl className="grid gap-3 sm:grid-cols-2">
              {Object.entries(stack).map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="font-mono text-[13px] text-foreground/85">{v.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Experience">
            {experience.map((e) => (
              <div key={e.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">
                    {e.role} — {e.company}
                  </h3>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {e.period}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{e.location}</p>
                <ul className="mt-2 space-y-1.5">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-foreground/85">
                      <span className="text-muted-foreground">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Block>

          <Block title="Education">
            <h3 className="font-semibold">{profile.education.degree}</h3>
            <p className="text-sm text-muted-foreground">
              {profile.education.school} · {profile.education.graduation}
            </p>
            <ul className="mt-2 space-y-1">
              {profile.education.achievements.map((a) => (
                <li key={a} className="text-sm text-foreground/85">· {a}</li>
              ))}
            </ul>
          </Block>
        </article>
      </div>

      <SiteFooter />
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 border-t border-border pt-6 first-of-type:mt-8">
      <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}
