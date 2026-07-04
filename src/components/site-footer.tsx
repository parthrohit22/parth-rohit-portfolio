import { profile } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-base font-semibold tracking-tight">{profile.name}</p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Software Engineer · {profile.location}
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-1 gap-y-2 text-xs text-muted-foreground"
          >
            <a href={`mailto:${profile.email}`} className="footer-link px-2 py-1">
              Email
            </a>
            <span aria-hidden="true" className="text-border">
              ·
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="footer-link px-2 py-1"
            >
              GitHub
            </a>
            <span aria-hidden="true" className="text-border">
              ·
            </span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="footer-link px-2 py-1"
            >
              LinkedIn
            </a>
            <span aria-hidden="true" className="text-border">
              ·
            </span>
            <span className="px-2 py-1">© {new Date().getFullYear()}</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
