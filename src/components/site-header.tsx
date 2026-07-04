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
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <a
          href="#top"
          className="text-sm font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
          <a
            href="/Parth_Rohit_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-link ml-1 border border-border bg-card text-foreground"
          >
            Resume
          </a>
        </nav>

        <details className="mobile-menu relative md:hidden">
          <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center border border-border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="sr-only">Open navigation</span>
            <Menu className="h-4 w-4" aria-hidden="true" />
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-12 w-56 border border-border bg-card p-2 shadow-sm"
          >
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="mobile-nav-link">
                {item.label}
              </a>
            ))}
            <a
              href="/Parth_Rohit_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mobile-nav-link border-t border-border"
            >
              Resume
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
