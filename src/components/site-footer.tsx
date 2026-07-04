import { profile } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="min-w-0">
            <p className="font-display text-4xl italic leading-none text-foreground">
              Parth Rohit<span className="text-[color:var(--aurora-green)]">.</span>
            </p>
            <p className="mt-3 mono-label">Software Engineer · {profile.location}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
              Portfolio Vol. 03 · © {new Date().getFullYear()}
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={`mailto:${profile.email}`} className="footer-link">
              Email
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="footer-link">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="footer-link">
              LinkedIn
            </a>
            <a href="/Parth_Rohit_Resume.pdf" className="footer-link">
              Resume
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
