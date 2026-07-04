import { ArrowUpRight, Github } from "lucide-react";
import { caseStudies } from "@/lib/portfolio-data";
import { useReveal } from "@/hooks/use-reveal";
import { Tilt } from "@/components/tilt";
import { Magnetic } from "@/components/magnetic";

const FEATURED_META: Record<
  string,
  {
    accent: string;
    tagline: string;
    signal: string;
    hint: string;
  }
> = {
  lyta: {
    accent: "oklch(0.84 0.18 155)",
    tagline: "Stateful edge workspace",
    signal: "Distributed · Edge-native",
    hint: "Purpose-specific Durable Objects own account, workspace, and conversation state.",
  },
  kalyx: {
    accent: "oklch(0.72 0.17 300)",
    tagline: "Deterministic evidence integrity",
    signal: "Verification · Trust boundary",
    hint: "Recomputes hash-linked ledger and reports the first untrusted record.",
  },
  "payment-routing": {
    accent: "oklch(0.82 0.12 200)",
    tagline: "Role-scoped payment authority",
    signal: "Backend · Authorization",
    hint: "Flask API enforces identity, role, and merchant scope on every mutation.",
  },
};

const FEATURED_IDS = ["lyta", "kalyx", "payment-routing"] as const;

export function FeaturedShowcase() {
  const featured = FEATURED_IDS.map((id) => caseStudies.find((c) => c.id === id)!).filter(Boolean);
  const [hero, ...supporting] = featured;
  const heroMeta = FEATURED_META[hero.id];

  const rootRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="relative scroll-mt-24 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="ledger mb-14">
          <span className="ledger-num">§ 02</span>
          <span className="ledger-title">Featured Systems</span>
          <span className="ledger-dash" aria-hidden="true" />
          <span className="ledger-meta">3 OF 6 · WORTH STUDYING</span>
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="featured-heading" className="display-lg lg:col-span-8">
            Three systems worth{" "}
            <span className="text-[color:var(--accent-blue)] font-mono text-3xl align-middle">
              →
            </span>{" "}
            <span className="text-foreground">studying.</span>
          </h2>
          <div className="lg:col-span-4 lg:pb-2 lg:text-right">
            <Magnetic>
              <a href="#work" className="action-link">
                All work <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
          </div>
        </div>

        <div
          ref={rootRef}
          className="reveal grid gap-4 md:grid-cols-12 md:auto-rows-[minmax(220px,auto)]"
        >
          {/* Hero tile — spans 7 cols, 2 rows */}
          <Tilt max={4} lift={6} className="md:col-span-7 md:row-span-2">
            <FeaturedTile caseStudy={hero} meta={heroMeta} size="hero" />
          </Tilt>
          {supporting.map((cs) => (
            <Tilt key={cs.id} max={5} lift={5} className="md:col-span-5">
              <FeaturedTile caseStudy={cs} meta={FEATURED_META[cs.id]} size="compact" />
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedTile({
  caseStudy,
  meta,
  size,
}: {
  caseStudy: (typeof caseStudies)[number];
  meta: (typeof FEATURED_META)[string];
  size: "hero" | "compact";
}) {
  const isHero = size === "hero";
  return (
    <a
      href={`#${caseStudy.id}`}
      className="featured-tile group relative flex h-full flex-col overflow-hidden rounded-lg border border-border p-8 sm:p-10"
      style={{ ["--project-accent" as string]: meta.accent }}
      aria-label={`${caseStudy.name} — ${meta.tagline}`}
    >
      <TileBackdrop hero={isHero} />
      <span aria-hidden="true" className="tile-sheen" />

      <header className="relative flex items-start justify-between gap-3">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--project-accent)" }}
        >
          # {meta.signal}
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          style={{ color: "var(--project-accent)" }}
          aria-hidden="true"
        />
      </header>

      <div className={`relative ${isHero ? "mt-10" : "mt-8"}`}>
        <h3
          style={{ fontFamily: "var(--font-display)" }}
          className={
            isHero
              ? "text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-6xl"
              : "text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl"
          }
        >
          {caseStudy.name}
        </h3>
        <p
          className={`mt-4 font-light text-foreground/70 ${isHero ? "text-lg leading-8" : "text-base leading-7"}`}
        >
          {meta.tagline}
        </p>
        <p className="mt-5 max-w-md font-mono text-[11px] leading-5 text-muted-foreground">
          {meta.hint}
        </p>
      </div>

      {isHero && (
        <ul className="relative mt-10 grid gap-3 border-t border-border pt-8 text-[13px] leading-6 text-foreground/75">
          {caseStudy.evidence.slice(0, 3).map((e, i) => (
            <li key={e} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-2.5 h-px w-4 shrink-0"
                style={{ background: "var(--project-accent)", opacity: 1 - i * 0.25 }}
              />
              <span>{e}</span>
            </li>
          ))}
        </ul>
      )}

      <footer className="relative mt-auto flex flex-wrap items-center gap-3 pt-10">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--project-accent)" }}
        >
          Read case study →
        </span>
        {caseStudy.repository && (
          <span className="ml-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <Github className="h-3 w-3" aria-hidden="true" />
            {caseStudy.repository.replace(/^https?:\/\//, "").replace(/^github\.com\//, "")}
          </span>
        )}
      </footer>
    </a>
  );
}

function TileBackdrop({ hero }: { hero: boolean }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 100% at 0% 0%, color-mix(in oklab, var(--project-accent) 15%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, var(--project-accent), color-mix(in oklab, var(--project-accent) 35%, transparent) 60%, transparent)",
        }}
      />
      {hero && (
        <svg
          viewBox="0 0 400 240"
          className="pointer-events-none absolute -right-12 -top-12 h-64 w-72 opacity-30 mix-blend-screen"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="tile-ring" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="var(--project-accent)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--project-accent)" stopOpacity="0.35" />
            </radialGradient>
          </defs>
          <circle
            cx="200"
            cy="120"
            r="90"
            fill="none"
            stroke="var(--project-accent)"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <circle
            cx="200"
            cy="120"
            r="60"
            fill="none"
            stroke="var(--project-accent)"
            strokeWidth="0.5"
            opacity="0.35"
          />
          <circle cx="200" cy="120" r="30" fill="url(#tile-ring)" />
        </svg>
      )}
    </>
  );
}
