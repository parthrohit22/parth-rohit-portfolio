import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { EngineeringCaseStudyCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { capabilities, caseStudies, experience, principles, profile } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Parth Rohit — Software Engineer",
      },
      {
        name: "description",
        content:
          "Evidence-led engineering portfolio covering explicit state ownership, deterministic verification, backend authorization, cloud architecture, and open-source security contributions.",
      },
      {
        property: "og:title",
        content: "Parth Rohit — Software Engineer",
      },
      {
        property: "og:description",
        content:
          "Selected engineering work across stateful edge systems, verification, cloud platforms, backend authorization, and security tooling.",
      },
      {
        name: "twitter:title",
        content: "Parth Rohit — Software Engineer",
      },
      {
        name: "twitter:description",
        content:
          "Selected engineering work across stateful edge systems, verification, cloud platforms, backend authorization, and security tooling.",
      },
    ],
  }),
  component: Index,
});

const proofPoints = [
  {
    href: "#lyta",
    label: "Explicit edge-state ownership",
    evidence:
      "LYTA separates account, workspace, and conversation state across purpose-specific Durable Objects.",
  },
  {
    href: "#kalyx",
    label: "Deterministic evidence verification",
    evidence: "KALYX recomputes canonical hashes and reports the first untrusted ledger boundary.",
  },
  {
    href: "#payment-routing",
    label: "Backend-enforced authorization",
    evidence:
      "Payment Routing scopes merchant data and role-controlled mutations inside the Flask API.",
  },
  {
    href: "#openshield",
    label: "Merged cloud-security work",
    evidence:
      "OpenShield contributions connect Azure Key Vault rules to remediation, mappings, and validation.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <SelectedWork />
        <EngineeringApproach />
        <CapabilityMap />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28 lg:py-36">
      <div aria-hidden="true" className="hero-backdrop" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start lg:gap-20">
          <div className="reveal-up">
            <p className="eyebrow">
              <span>{profile.role}</span>
              <span aria-hidden="true" className="opacity-40">/</span>
              <span>{profile.location}</span>
            </p>
            <h1 className="display-xl mt-6 max-w-4xl text-balance">{profile.statement}</h1>
            <p className="body-lg mt-7 max-w-2xl">{profile.supporting}</p>

            <div className="mt-10 flex flex-wrap gap-2.5">
              <a href="#work" className="action-link action-link-primary">
                Selected Engineering Work <ArrowRight className="h-4 w-4" />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="action-link">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="/Parth_Rohit_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="action-link"
              >
                <FileText className="h-4 w-4" /> Resume
              </a>
            </div>

            <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border text-xs text-muted-foreground sm:grid-cols-2">
              <div className="flex items-center gap-2 bg-surface-elevated px-4 py-3.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-blue" aria-hidden="true" />
                <dt className="sr-only">Location</dt>
                <dd className="truncate">{profile.location}</dd>
              </div>
              <div className="flex items-center gap-2 bg-surface-elevated px-4 py-3.5">
                <span className="status-dot shrink-0" aria-hidden="true" />
                <dt className="sr-only">Availability</dt>
                <dd className="truncate">{profile.availability}</dd>
              </div>
              <div className="bg-surface-elevated px-4 py-3.5">
                <dt className="sr-only">Education</dt>
                <dd className="truncate">{profile.education.degree}</dd>
              </div>
              <div className="bg-surface-elevated px-4 py-3.5">
                <dt className="sr-only">Graduation</dt>
                <dd className="truncate">{profile.education.graduation}</dd>
              </div>
            </dl>
          </div>

          <aside
            aria-labelledby="evidence-heading"
            className="card-elevated card-glow p-6 sm:p-7"
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 id="evidence-heading" className="section-label">
                Evidence before claims
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground">01—04</span>
            </div>
            <ol className="divide-y divide-border">
              {proofPoints.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group -mx-2 grid grid-cols-[2rem_1fr_auto] gap-3 rounded-md px-2 py-4 transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <span className="font-mono text-[10px] text-accent-blue">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <strong className="block text-sm font-semibold tracking-tight">
                        {item.label}
                      </strong>
                      <span className="mt-1.5 block text-xs leading-5 text-muted-foreground">
                        {item.evidence}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="mt-0.5 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-xs leading-5 text-muted-foreground">
              Each case study links to the implementation and source documentation behind its
              claims.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  return (
    <Section
      id="work"
      eyebrow="Selected Engineering Work"
      title="Architecture, constraints, and decisions—not feature inventories."
      description="Six systems examined through the problem they address, the boundaries they establish, and the tradeoffs their repositories make visible."
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

function EngineeringApproach() {
  return (
    <Section
      id="approach"
      eyebrow="Engineering Approach"
      title="Make the important boundaries visible."
      description="These principles recur in the implementation choices above; they are not claims detached from the work."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {principles.map((principle, index) => (
          <article key={principle.title} className="card-elevated p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent-blue" />
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">{principle.title}</h3>
            <p className="mt-3 text-sm leading-6 text-foreground/80">{principle.description}</p>
            <p className="mt-6 border-t border-border pt-4 font-mono text-[10px] leading-5 text-muted-foreground">
              Evidence: {principle.evidence}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function CapabilityMap() {
  return (
    <Section
      id="capabilities"
      eyebrow="Engineering Capabilities"
      title="What the work demonstrates."
      description="Tools appear as supporting evidence. The organizing layer is the engineering capability they enable."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability) => (
          <article
            key={capability.title}
            className="card-elevated relative overflow-hidden p-6 pt-7"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-0.5 bg-accent-blue"
            />
            <h3 className="text-base font-semibold tracking-tight">{capability.title}</h3>
            <p className="mt-3 text-sm leading-6 text-foreground/80">{capability.description}</p>
            <p className="mt-5 font-mono text-[10px] leading-5 text-muted-foreground">
              {capability.evidence.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience & Education"
      title="Engineering habits formed in operational work."
      description="The role combined workflow improvement with practical responsibility for the systems people depended on each day."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)]">
        <article className="card-elevated p-7 sm:p-9">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{experience.role}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {experience.company} · {experience.location}
              </p>
            </div>
            <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface-elevated px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
              {experience.period}
            </span>
          </div>
          <div className="mt-8 grid gap-8 border-t border-border pt-8 sm:grid-cols-3 sm:gap-6">
            {experience.contributions.map((contribution) => (
              <section key={contribution.title}>
                <h4 className="section-label text-accent-blue">{contribution.title}</h4>
                <p className="mt-3 text-sm leading-6 text-foreground/80">
                  {contribution.description}
                </p>
              </section>
            ))}
          </div>
        </article>

        <article className="card-elevated p-7 sm:p-9">
          <p className="section-label text-accent-blue">Education</p>
          <h3 className="mt-4 text-xl font-semibold tracking-tight">{profile.education.degree}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {profile.education.school}
            <br />
            {profile.education.graduation}
          </p>
          <p className="mt-6 border-t border-border pt-5 text-sm leading-6 text-foreground/80">
            {profile.education.achievements[0]}
          </p>
        </article>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Continue the technical conversation."
      description="Open to UK graduate and new-grad software engineering opportunities from September 2026."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          <ContactLink
            href={`mailto:${profile.email}`}
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={profile.email}
          />
          <ContactLink
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            icon={<Phone className="h-4 w-4" />}
            label="Phone"
            value={profile.phone}
          />
          <ContactLink
            href={profile.linkedin}
            icon={<Linkedin className="h-4 w-4" />}
            label="LinkedIn"
            value="linkedin.com/in/parthrohit"
            external
          />
          <ContactLink
            href={profile.github}
            icon={<Github className="h-4 w-4" />}
            label="GitHub"
            value="github.com/parthrohit22"
            external
          />
        </div>

        <aside className="card-elevated p-7 sm:p-8">
          <p className="section-label text-accent-blue">Resume</p>
          <h3 className="mt-4 text-xl font-semibold tracking-tight">
            Concise background and selected work.
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The PDF remains the single source of truth for education, experience, capabilities, and
            contact details.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <a
              href="/Parth_Rohit_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="action-link action-link-primary"
            >
              View resume <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="/Parth_Rohit_Resume.pdf" download className="action-link">
              <Download className="h-4 w-4" /> Download PDF
            </a>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function ContactLink({
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
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="card-elevated group flex min-w-0 items-center gap-4 p-5"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-border bg-surface-elevated text-accent-blue">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="section-label block">{label}</span>
        <span className="mt-1 block truncate text-sm font-medium">{value}</span>
      </span>
      <ArrowUpRight
        className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
        aria-hidden="true"
      />
    </a>
  );
}
