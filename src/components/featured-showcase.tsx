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
    accent: "oklch(0.66 0.19 245)",
    tagline: "Stateful edge workspace",
    signal: "Distributed · Edge-native",
    hint: "Purpose-specific Durable Objects own account, workspace, and conversation state.",
  },
  kalyx: {
    accent: "oklch(0.66 0.19 290)",
    tagline: "Deterministic evidence integrity",
    signal: "Verification · Trust boundary",
    hint: "Recomputes hash-linked ledger and reports the first untrusted record.",
  },
  "payment-routing": {
    accent: "oklch(0.68 0.15 165)",
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
      className="relative scroll-mt-24 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="section-number">Featured Systems</p>
            <h2
              id="featured-heading"
              className="display-lg mt-3 max-w-2xl text-balance"
            >
              Three systems worth studying.
            </h2>
          </div>
          <Magnetic>
            <a href="#work" className="action-link hidden sm:inline-flex">
              All work <ArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
        </div>

        <div
          ref={rootRef}
          className="reveal grid gap-5 md:grid-cols-2 md:grid-rows-[auto_auto] md:[&>*:first-child]:row-span-2"
        >
          {/* Hero tile */}
          <Tilt max={4} lift={6} className="h-full">
            <FeaturedTile caseStudy={hero} meta={heroMeta} size="hero" />
          </Tilt>
          {supporting.map((cs) => (
            <Tilt key={cs.id} max={5} lift={5} className="h-full">
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
      className="featured-tile group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
      style={{ ["--project-accent" as string]: meta.accent }}
      aria-label={`${caseStudy.name} — ${meta.tagline}`}
    >
      <TileBackdrop hero={isHero} />
      <span aria-hidden="true" className="tile-sheen" />

      <header className="relative flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{
            borderColor: "color-mix(in oklab, var(--project-accent) 40%, var(--border))",
            background: "color-mix(in oklab, var(--project-accent) 8%, transparent)",
            color: "var(--project-accent)",
          }}
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--project-accent)" }}
          />
          {meta.signal}
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          aria-hidden="true"
        />
      </header>

      <div className={`relative ${isHero ? "mt-8" : "mt-6"}`}>
        <h3
          className={
            isHero
              ? "display-lg tracking-[-0.04em]"
              : "text-2xl font-semibold tracking-[-0.02em] sm:text-3xl"
          }
        >
          {caseStudy.name}
        </h3>
        <p
          className={`mt-3 text-foreground/80 ${isHero ? "text-lg leading-8" : "text-[15px] leading-7"}`}
        >
          {meta.tagline}
        </p>
        <p className="mt-4 font-mono text-[11px] leading-5 text-muted-foreground">{meta.hint}</p>
      </div>

      {isHero && (
        <ul className="relative mt-8 grid gap-2.5 border-t border-border pt-6 text-[13px] leading-6 text-foreground/75">
          {caseStudy.evidence.slice(0, 3).map((e, i) => (
            <li key={e} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-1 w-3 shrink-0 rounded-full"
                style={{ background: "var(--project-accent)", opacity: 1 - i * 0.25 }}
              />
              <span>{e}</span>
            </li>
          ))}
        </ul>
      )}

      <footer className="relative mt-auto flex flex-wrap items-center gap-2 pt-8">
        <span
          className="action-link pointer-events-none"
          style={{
            borderColor: "color-mix(in oklab, var(--project-accent) 55%, var(--border))",
            color: "var(--foreground)",
          }}
        >
          Read case study <ArrowUpRight className="h-4 w-4" />
        </span>
        {caseStudy.repository && (
          <span
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
          >
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
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 100% at 0% 0%, color-mix(in oklab, var(--project-accent) 18%, transparent), transparent 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, var(--project-accent), color-mix(in oklab, var(--project-accent) 35%, transparent) 60%, transparent)",
        }}
      />
      {hero && (
        <svg
          viewBox="0 0 400 240"
          className="pointer-events-none absolute -right-8 -top-8 h-56 w-64 opacity-40 mix-blend-screen"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="tile-ring" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="var(--project-accent)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--project-accent)" stopOpacity="0.35" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="120" r="90" fill="none" stroke="var(--project-accent)" strokeWidth="0.6" opacity="0.5" />
          <circle cx="200" cy="120" r="60" fill="none" stroke="var(--project-accent)" strokeWidth="0.6" opacity="0.35" />
          <circle cx="200" cy="120" r="30" fill="url(#tile-ring)" />
        </svg>
      )}
    </>
  );
}
