import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  number,
  children,
  meta,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  number?: string;
  children: ReactNode;
  meta?: string;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="ledger mb-14 sm:mb-16">
          {number && <span className="ledger-num">§ {number}</span>}
          <span className="ledger-title">{eyebrow}</span>
          <span className="ledger-dash" aria-hidden="true" />
          <span className="ledger-meta">{meta ?? "PARTH ROHIT / 2026"}</span>
        </div>
        <header className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display-lg lg:col-span-8">{title}</h2>
          {description && (
            <p className="body-lg max-w-md lg:col-span-4 lg:pb-2">{description}</p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
