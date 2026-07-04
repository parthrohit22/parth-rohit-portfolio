import { Menu } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

const navigation = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <a
          href="#top"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        >
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-md border border-border bg-gradient-to-br from-surface-elevated to-surface-muted font-mono text-[11px] font-semibold text-accent-blue shadow-sm"
          >
            PR
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {profile.name}
          </span>
          <span
            aria-hidden="true"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex"
          >
            <span className="status-dot" />
            Available Sept 2026
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
          <a
            href="/Parth_Rohit_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="action-link action-link-primary ml-3 h-9 min-h-9 px-3 py-1.5 text-xs"
          >
            Resume
          </a>
        </nav>

        <details className="mobile-menu relative md:hidden">
          <summary
            className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-md border border-border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open navigation menu"
          >
            <span className="sr-only">Open navigation</span>
            <Menu className="h-4 w-4" aria-hidden="true" />
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-14 w-64 rounded-lg border border-border bg-card p-2 shadow-lg"
          >
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="mobile-nav-link">
                {item.label}
              </a>
            ))}
            <div className="my-1 h-px bg-border" />
            <a
              href="/Parth_Rohit_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mobile-nav-link"
            >
              Resume
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
