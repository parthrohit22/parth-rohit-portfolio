import { profile } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 text-sm sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Software Engineer · {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <a href={`mailto:${profile.email}`} className="footer-link">
            Email
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="footer-link">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="footer-link">
            LinkedIn
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
