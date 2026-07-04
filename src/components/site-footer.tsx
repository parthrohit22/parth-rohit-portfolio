import { profile } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-surface-muted">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-md border border-border bg-gradient-to-br from-surface-elevated to-surface-muted font-mono text-xs font-semibold text-accent-blue shadow-sm"
            >
              PR
            </span>
            <div>
              <p className="text-base font-semibold tracking-tight">{profile.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Software Engineer · {profile.location}
              </p>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground/80">
                Built with intention · {new Date().getFullYear()}
              </p>
            </div>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-1 gap-y-2 text-xs text-muted-foreground"
          >
            <a href={`mailto:${profile.email}`} className="footer-link px-2 py-1">
              Email
            </a>
            <span aria-hidden="true" className="text-border">·</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="footer-link px-2 py-1"
            >
              GitHub
            </a>
            <span aria-hidden="true" className="text-border">·</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="footer-link px-2 py-1"
            >
              LinkedIn
            </a>
            <span aria-hidden="true" className="text-border">·</span>
            <a href="/Parth_Rohit_Resume.pdf" className="footer-link px-2 py-1">
              Resume
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
