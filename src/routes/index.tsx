import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { EngineeringCaseStudyCard } from "@/components/project-card";
import { FeaturedShowcase } from "@/components/featured-showcase";
import { HeroVisual } from "@/components/hero-visual";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CursorGlow } from "@/components/cursor-glow";
import { Magnetic } from "@/components/magnetic";
import { capabilities, caseStudies, experience, principles, profile } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Parth Rohit — Software Engineer" },
      {
        name: "description",
        content:
          "Evidence-led engineering portfolio covering explicit state ownership, deterministic verification, backend authorization, cloud architecture, and open-source security contributions.",
      },
      { property: "og:title", content: "Parth Rohit — Software Engineer" },
      {
        property: "og:description",
        content:
          "Selected engineering work across stateful edge systems, verification, cloud platforms, backend authorization, and security tooling.",
      },
      { name: "twitter:title", content: "Parth Rohit — Software Engineer" },
      {
        name: "twitter:description",
        content:
          "Selected engineering work across stateful edge systems, verification, cloud platforms, backend authorization, and security tooling.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <CursorGlow />
      <SiteHeader />
      <main id="main-content" className="pt-24 sm:pt-28">
        <Hero />
        <FeaturedShowcase />
        <AllSystems />
        <EngineeringApproach />
        <CapabilityMap />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ─── HERO ─────────────────────────────── */

function Hero() {
  return (
    <section
      id="top"
      className="relative scroll-mt-24 overflow-hidden pb-28 pt-6 sm:pb-36"
    >
      {/* Living atmosphere */}
      <div className="hero-canvas" aria-hidden="true">
        <div className="hero-orb hero-orb--a" />
        <div className="hero-orb hero-orb--b" />
        <div className="hero-orb hero-orb--c" />
        <div className="hero-grid" />
        <div className="hero-noise" />
        <div className="hero-scanline" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        {/* Colophon rule */}
        <div className="ledger mb-14 sm:mb-16">
          <span className="ledger-num">§ 01</span>
          <span className="ledger-title">Portfolio · 2026</span>
          <span className="ledger-dash" aria-hidden="true" />
          <span className="ledger-meta inline-flex items-center gap-2">
            <span className="status-dot" aria-hidden="true" /> Open to graduate roles · UK
          </span>
        </div>

        <div className="reveal-up grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-8">Software Engineer · {profile.location}</p>

            <h1 className="display-xl text-balance">
              I build software that stays{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-text)" }}
              >
                reliable
              </span>{" "}
              as systems <span className="text-[color:var(--accent-violet)]">grow.</span>
            </h1>

            <p className="body-lg mt-8 max-w-xl">
              A software engineer working across{" "}
              <span className="text-foreground">backend services</span>,{" "}
              <span className="text-foreground">cloud infrastructure</span>, and
              the{" "}
              <span className="text-foreground">APIs</span> that hold them
              together. I care about clear state ownership, secure boundaries,
              and systems that keep behaving well as they scale — with recent
              work in distributed edge platforms and cloud-security tooling.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#featured" className="action-link action-link-hero">
                  Explore my work <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="action-link"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="action-link">
                  <Mail className="h-3.5 w-3.5" /> Get in touch
                </a>
              </Magnetic>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <div>
                <dt className="opacity-60">Focus</dt>
                <dd className="mt-2 font-sans text-[13px] normal-case tracking-normal text-foreground/85">
                  Backend · Cloud · Security
                </dd>
              </div>
              <div>
                <dt className="opacity-60">Studying</dt>
                <dd className="mt-2 font-sans text-[13px] normal-case tracking-normal text-foreground/85">
                  {profile.education.degree}
                </dd>
              </div>
              <div>
                <dt className="opacity-60">Status</dt>
                <dd className="mt-2 font-sans text-[13px] normal-case tracking-normal text-foreground/85">
                  {profile.availability}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[color:var(--accent-blue)]/20 via-transparent to-[color:var(--accent-violet)]/20 blur-2xl" />
              <div className="glass-panel relative overflow-hidden rounded-2xl p-2 sm:p-3">
                <HeroVisual />
              </div>
              <p className="mono-label mt-4 flex items-center justify-between">
                <span>Fig. I / Live topology</span>
                <span className="opacity-60">requests · ownership · authority</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─── ALL SYSTEMS ─────────────────────────────── */

function AllSystems() {
  return (
    <Section
      id="work"
      number="03"
      eyebrow="All Systems"
      title="Six systems, in depth."
      description="Each case study opens with the problem and boundary it makes explicit. Deeper tradeoffs, decisions, and technologies expand progressively."
      meta="6 CASE STUDIES · READ ALL"
    >
      <div className="space-y-10 sm:space-y-14">
        {caseStudies.map((caseStudy, index) => (
          <EngineeringCaseStudyCard
            key={caseStudy.id}
            caseStudy={caseStudy}
            index={index}
            total={caseStudies.length}
          />
        ))}
      </div>
    </Section>
  );
}

/* ─── PRINCIPLES ─────────────────────────────── */

function EngineeringApproach() {
  return (
    <Section
      id="approach"
      number="04"
      eyebrow="Engineering Approach"
      title="Make the important boundaries visible."
      description="Recurring principles behind the implementation choices above — not claims detached from the work."
      meta="04 PRINCIPLES"
    >
      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
        {principles.map((principle, index) => (
          <article
            key={principle.title}
            className="group relative bg-background p-8 transition-colors hover:bg-surface-muted sm:p-10"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--aurora-green)]">
                / {String(index + 1).padStart(3, "0")}
              </span>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[color:var(--aurora-green)]"
              />
            </div>
            <h3 className="mt-8 font-display text-3xl italic leading-tight tracking-[-0.015em]">
              {principle.title}
            </h3>
            <p className="mt-5 text-[15px] leading-7 text-foreground/75">
              {principle.description}
            </p>
            <p className="mt-8 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Evidence · {principle.evidence}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ─── CAPABILITY MATRIX ─────────────────────────────── */

function CapabilityMap() {
  return (
    <Section
      id="capabilities"
      number="05"
      eyebrow="Capabilities & Stack"
      title="What the work demonstrates."
      description="Tools appear as supporting evidence. The organizing layer is the engineering capability they enable."
      meta="6 DISCIPLINES"
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, i) => (
          <article key={capability.title} className="group relative">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--aurora-green)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <h3 className="mt-4 font-display text-2xl italic leading-tight tracking-[-0.01em]">
              {capability.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-foreground/70">
              {capability.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {capability.evidence.map((tech) => (
                <li key={tech} className="tech-chip">
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ─── EXPERIENCE ─────────────────────────────── */

function Experience() {
  return (
    <Section
      id="experience"
      number="06"
      eyebrow="Experience & Education"
      title="Engineering habits, formed in operational work."
      description="The role combined workflow improvement with practical responsibility for systems people depended on each day."
      meta="2021 — PRESENT"
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <article className="lg:col-span-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="font-display text-3xl italic leading-tight tracking-[-0.01em] sm:text-4xl">
              {experience.role}
            </h3>
            <span className="mono-label whitespace-nowrap">
              {experience.period}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {experience.company} · {experience.location}
          </p>
          <div className="mt-10 grid gap-10 border-t border-border pt-10 sm:grid-cols-3 sm:gap-6">
            {experience.contributions.map((contribution, i) => (
              <section key={contribution.title}>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--aurora-green)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="section-label !text-foreground/85">
                    {contribution.title}
                  </h4>
                </div>
                <p className="mt-3 text-sm leading-6 text-foreground/75">
                  {contribution.description}
                </p>
              </section>
            ))}
          </div>
        </article>

        <article className="lg:col-span-4">
          <span className="mono-label">Education</span>
          <h3 className="mt-4 font-display text-3xl italic leading-tight tracking-[-0.01em]">
            {profile.education.degree}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {profile.education.school}
            <br />
            {profile.education.graduation}
          </p>
          <p className="mt-6 border-t border-border pt-5 text-sm leading-6 text-foreground/75">
            {profile.education.achievements[0]}
          </p>
        </article>
      </div>
    </Section>
  );
}

/* ─── CONTACT ─────────────────────────────── */

function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 py-32 sm:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="ledger mb-16">
          <span className="ledger-num">§ 07</span>
          <span className="ledger-title">Collaborate</span>
          <span className="ledger-dash" aria-hidden="true" />
          <span className="ledger-meta">Available · Sept 2026</span>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="display-lg">
              Let's talk{" "}
              <em className="font-display italic text-[color:var(--aurora-green)]">
                infrastructure
              </em>
              , verification, and{" "}
              <em className="font-display italic text-[color:var(--aurora-violet)]">
                boundaries
              </em>
              .
            </h2>
            <p className="body-lg mt-8 max-w-xl">
              Open to UK graduate and new-grad software engineering opportunities
              from September 2026. Best reached by email — the resume is the
              single source of truth for background, experience, and capabilities.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <a href={`mailto:${profile.email}`} className="action-link action-link-primary">
                  <Mail className="h-3.5 w-3.5" /> Write to me
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="/Parth_Rohit_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="action-link"
                >
                  <FileText className="h-3.5 w-3.5" /> View resume
                </a>
              </Magnetic>
              <Magnetic>
                <a href="/Parth_Rohit_Resume.pdf" download className="action-link">
                  <Download className="h-3.5 w-3.5" /> Download PDF
                </a>
              </Magnetic>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <ul className="divide-y divide-border border-y border-border">
              <ContactRow
                href={`mailto:${profile.email}`}
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={profile.email}
              />
              <ContactRow
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                icon={<Phone className="h-4 w-4" />}
                label="Phone"
                value={profile.phone}
              />
              <ContactRow
                href={profile.linkedin}
                icon={<Linkedin className="h-4 w-4" />}
                label="LinkedIn"
                value="linkedin.com/in/parthrohit"
                external
              />
              <ContactRow
                href={profile.github}
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
                value="github.com/parthrohit22"
                external
              />
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  href,
  icon,
  label,
  value,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="editorial-row group flex items-center gap-5 py-5"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border text-[color:var(--aurora-green)]">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <span className="mono-label block">{label}</span>
          <span className="mt-1 block truncate text-[15px] font-medium">{value}</span>
        </div>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--aurora-green)]"
          aria-hidden="true"
        />
      </a>
    </li>
  );
}
