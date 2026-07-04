import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <p className="section-label text-accent-blue">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{title}</h2>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {description}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
