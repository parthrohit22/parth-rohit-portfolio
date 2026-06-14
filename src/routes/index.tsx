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
    <section className="relative overflow-hidden pb-20 pt-16 sm:pt-24">
      <div className="absolute inset-0 -z-10 grid-bg" />
      <div className="absolute inset-0 -z-10 hero-glow" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="animate-reveal">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue" />
              </span>
              Available for graduate & new-grad roles · Sep 2026
            </div>

            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Portfolio · v2026
            </div>
            <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              <span className="name-mark">Parth Rohit</span>
            </h1>
            <div className="mt-3 text-xl font-medium text-foreground/85 sm:text-2xl">
              Software Engineer
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[12px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Cloud className="h-3.5 w-3.5 text-accent-blue" /> Cloud Platforms</span>
              <span className="text-border">/</span>
              <span className="inline-flex items-center gap-1.5"><Network className="h-3.5 w-3.5 text-accent-blue" /> Distributed Systems</span>
              <span className="text-border">/</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-accent-violet" /> Open Source Security</span>
            </div>

            <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
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
          Credibility & featured work
        </div>
      </div>
    </section>
  );
}

function Credibility() {
  const badges = [
    { icon: <Award className="h-3.5 w-3.5 text-accent-blue" />, label: "Dean's List ×2 — Year 1 & Year 2" },
    { icon: <ShieldCheck className="h-3.5 w-3.5 text-accent-violet" />, label: "OWASP OpenShield Contributor" },
    { icon: <Server className="h-3.5 w-3.5 text-accent-blue" />, label: "5 Engineering Systems Built" },
    { icon: <Briefcase className="h-3.5 w-3.5 text-accent-blue" />, label: "BSc (Hons) Computing Systems" },
    { icon: <MapPin className="h-3.5 w-3.5 text-muted-foreground" />, label: "Ulster University, London" },
    { icon: <Sparkles className="h-3.5 w-3.5 text-accent-violet" />, label: "Graduation · Sep 2026" },
    { icon: <ArrowRight className="h-3.5 w-3.5 text-accent-blue" />, label: "Open to Graduate Opportunities" },
  ];
  const focus = [
    { icon: <Server className="h-3.5 w-3.5" />, label: "Backend Engineering" },
    { icon: <Cloud className="h-3.5 w-3.5" />, label: "Cloud Platforms" },
    { icon: <Network className="h-3.5 w-3.5" />, label: "Distributed Systems" },
    { icon: <Lock className="h-3.5 w-3.5" />, label: "Security-Focused Systems" },
  ];
  return (
    <section className="relative -mt-4 scroll-mt-24 pb-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="section-divider mb-10" />
        <div className="card-premium relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 -z-10 dotted-bg opacity-40" />
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Credibility
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span key={b.label} className="badge-premium">
                    {b.icon}
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:border-l lg:border-border lg:pl-6">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Engineering focus
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {focus.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-2 text-[12px] font-medium text-foreground"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded bg-gradient-to-br from-accent-blue/15 to-accent-violet/15 text-accent-blue">
                      {f.icon}
                    </span>
                    {f.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OpenSource() {
  return (
    <Section
      id="open-source"
      eyebrow="Open Source"
      title="Contributing to security tooling in the open."
      description="I contribute to OpenShield, an OWASP-affiliated open-source Cloud Security Posture Management platform for Microsoft Azure. My work focuses on the scanner, compliance mappings, and platform validation."
    >
      <div className="card-premium relative overflow-hidden p-8 sm:p-10">
        <div className="absolute inset-0 -z-10 opacity-60 hero-glow" />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-premium">
                <ShieldCheck className="h-3.5 w-3.5 text-accent-violet" /> OWASP Project
              </span>
              <span className="badge-premium">
                <Cloud className="h-3.5 w-3.5 text-accent-blue" /> Azure CSPM
              </span>
              <span className="badge-premium">
                <GitMerge className="h-3.5 w-3.5 text-accent-blue" /> Contributor
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">OpenShield</h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-foreground/80">
              Open-source Azure Cloud Security Posture Management platform —
              security scan rules, remediation playbooks, and compliance
              mappings against CIS Azure, NIST CSF, ISO 27001, and SOC 2.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                "Security scan rules",
                "Compliance mappings",
                "Azure validation testing",
                "Platform validation workflows",
              ].map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-violet" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/openshield-org/openshield"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
              >
                <Github className="h-3.5 w-3.5" /> openshield-org/openshield
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-gradient-to-b from-surface to-background p-5">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Compliance coverage
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["CIS Azure", "NIST CSF", "ISO 27001", "SOC 2"].map((f) => (
                <div
                  key={f}
                  className="rounded-md border border-border bg-card px-3 py-3 text-center font-mono text-[11px] text-foreground/80"
                >
                  {f}
                </div>
              ))}
            </div>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Stack
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Python", "Azure", "Flask", "PostgreSQL"].map((t) => (
                <span key={t} className="rounded-md bg-foreground/5 px-2 py-0.5 font-mono text-[11px] text-foreground/70">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CurrentlySeeking() {
  const roles = [
    "Graduate Software Engineer",
    "Backend Engineer",
    "Platform Engineer",
    "Cloud Engineer",
    "Infrastructure Engineer",
    "Technology Graduate Programmes",
  ];
  return (
    <section id="seeking" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="card-premium relative overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-0 -z-10 hero-glow opacity-70" />
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Currently Seeking
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Roles where I can build serious systems.
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                Targeting graduate and new-grad opportunities — September 2026.
                Open to UK-based and remote-friendly engineering teams.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {roles.map((r) => (
                <div
                  key={r}
                  className="flex items-center gap-2.5 rounded-md border border-border bg-card px-3 py-2.5 text-sm font-medium"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                  {r}
                </div>
              ))}
            </div>
          </div>
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
                href="/Parth_Rohit_Resume.pdf"
                target="_blank"
                rel="noreferrer"
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
