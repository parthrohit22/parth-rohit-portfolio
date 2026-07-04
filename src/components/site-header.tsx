import { useEffect, useState } from "react";
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
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        const dy = y - last;
        if (Math.abs(dy) > 6) {
          setHidden(dy > 0 && y > 120);
          last = y;
        }
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      data-hidden={hidden}
      data-scrolled={scrolled}
      className="site-header fixed inset-x-0 top-3 sm:top-4 z-50 flex justify-center px-3 sm:px-4 transition-all duration-500 ease-out data-[hidden=true]:-translate-y-[130%] data-[hidden=true]:opacity-0"
    >
      <div className="site-header__pill flex h-14 w-full max-w-4xl items-center justify-between gap-3 rounded-full border border-border/70 bg-background/60 pl-4 pr-2 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_40px_-20px_oklch(0_0_0/0.7)]">
        <a
          href="#top"
          className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span
            aria-hidden="true"
            className="font-display text-2xl italic leading-none text-[color:var(--aurora-green)]"
            style={{ transform: "translateY(1px)" }}
          >
            P.
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-foreground sm:inline">
            Parth Rohit
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary navigation">
          {navigation.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link flex items-center gap-2 rounded-full"
            >
              <span className="text-[color:var(--aurora-green)]/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/Parth_Rohit_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="action-link action-link-primary hidden h-10 min-h-10 rounded-full px-4 py-1.5 text-[10px] sm:inline-flex"
          >
            Resume
          </a>

          <details className="mobile-menu relative md:hidden">
            <summary
              className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open navigation menu"
            >
              <span className="sr-only">Open navigation</span>
              <Menu className="h-4 w-4" aria-hidden="true" />
            </summary>
            <nav
              aria-label="Mobile navigation"
              className="absolute right-0 top-12 w-64 rounded-2xl border border-border bg-card/95 p-2 shadow-lg backdrop-blur-xl"
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
      </div>
    </header>
  );
}
