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
    <section id={id} className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <hr className="hairline mb-16 sm:mb-20" />
        <header className="mb-14 max-w-3xl sm:mb-20">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display-lg mt-5">{title}</h2>
          {description && <p className="body-lg mt-6 max-w-2xl">{description}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
