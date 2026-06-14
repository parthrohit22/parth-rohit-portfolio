import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Award, Briefcase, Cloud, Download, Github, GitMerge, Linkedin, Lock, Mail, MapPin, Network, Phone, Server, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroVisual } from "@/components/hero-visual";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { Journey } from "@/components/journey";
import { experience, profile, projects, stack } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Parth Rohit — Software Engineer · Cloud, Distributed Systems, Security" },
      {
        name: "description",
        content:
          "Parth Rohit — Software Engineer building cloud-native, distributed, and security-focused systems. Featured work: LYTA, OpenShield, KALYX, FieldSight, Payment Routing.",
      },
      { property: "og:title", content: "Parth Rohit — Software Engineer" },
      {
        property: "og:description",
        content:
          "Backend, cloud platforms, distributed systems, and security-focused software engineering.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Credibility />
      <FeaturedWork />
      <Journey />
      <WorkingStack />
      <OpenSource />
      <Experience />
      <CurrentlySeeking />
      <ResumeStrip />
      <Contact />
      <SiteFooter />
    </div>
  );
}


function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-20 sm:pt-28">
      <div className="absolute inset-0 -z-10 grid-bg" />
      <div className="absolute inset-0 -z-10 hero-glow" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="animate-reveal">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue" />
              </span>
              Available for graduate & new-grad roles · Sep 2026
            </div>

            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Software <span className="text-gradient">Engineer</span>
            </h1>

            <p className="mt-6 max-w-xl text-balance text-lg font-medium text-foreground/85 sm:text-xl">
              {profile.statement}
            </p>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              {profile.supporting}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-sm transition-opacity hover:opacity-90"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/Parth_Rohit_Resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> London, UK
              </span>
              <span>·</span>
              <span>BSc Computing Systems</span>
              <span>·</span>
              <span>Ulster University</span>
            </div>
          </div>

          <div className="animate-reveal [animation-delay:120ms]">
            <HeroVisual />
          </div>
        </div>

        <div className="mt-20 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ArrowDown className="h-3 w-3 animate-bounce" />
          Featured work
        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  return (
    <Section
      id="work"
      eyebrow="Featured Engineering Work"
      title="Systems built end-to-end."
      description="A selection of projects spanning edge computing, cloud security, backend reliability, and platform engineering. Each is open-source and shipped."
    >
      <div className="grid gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}

function WorkingStack() {
  return (
    <section className="scroll-mt-24 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="card-premium p-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Working stack
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              day-to-day
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {Object.entries(stack).map(([k, v]) => (
              <div key={k}>
                <div className="text-xs font-semibold tracking-wide text-foreground">{k}</div>
                <ul className="mt-2 space-y-1">
                  {v.map((x) => (
                    <li key={x} className="font-mono text-[12px] text-muted-foreground">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Professional Experience"
      title="Work history."
    >
      <div className="grid gap-6">
        {experience.map((e) => (
          <div key={e.company} className="card-premium p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{e.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {e.company} · {e.location}
                </p>
              </div>
              <span className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                {e.period}
              </span>
            </div>
            <ul className="mt-5 space-y-2">
              {e.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-blue" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="card-premium p-8">
          <h3 className="text-lg font-semibold tracking-tight">
            {profile.education.degree}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.education.school} · {profile.education.graduation}
          </p>
          <ul className="mt-4">
            {profile.education.achievements.map((a) => (
              <li key={a} className="text-sm text-foreground/80">
                · {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function ResumeStrip() {
  return (
    <section id="resume" className="scroll-mt-24 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="card-premium relative overflow-hidden p-10 sm:p-12">
          <div className="absolute inset-0 -z-10 opacity-60 hero-glow" />
          <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Resume
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                A condensed, recruiter-ready overview.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Full summary, projects, skills, experience, and education — on a
                single page.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/resume"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
              >
                View Resume <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="/Parth_Rohit_Resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-sm transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Open to graduate & new-grad opportunities."
      description="Reach out about backend, cloud, platform, or security-focused engineering roles."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <ContactCard icon={<Mail className="h-4 w-4" />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
        <ContactCard icon={<Phone className="h-4 w-4" />} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
        <ContactCard icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" value="linkedin.com/in/parthrohit" href={profile.linkedin} />
        <ContactCard icon={<Github className="h-4 w-4" />} label="GitHub" value="github.com/parthrohit22" href={profile.github} />
      </div>
    </Section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="card-premium card-premium-hover group flex items-center justify-between gap-4 p-6"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-surface text-muted-foreground">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
          <div className="mt-0.5 truncate text-sm font-medium">{value}</div>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
    </a>
  );
}
