import { profile } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-sm font-medium">{profile.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Software Engineer · {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <a className="hover:text-foreground" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="hover:text-foreground" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="hover:text-foreground" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
