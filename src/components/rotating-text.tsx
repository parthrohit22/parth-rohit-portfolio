import { useEffect, useState } from "react";

const PHRASES = [
  "distributed systems",
  "reliable backends",
  "cloud-native platforms",
  "security tooling",
  "stateful edge workspaces",
  "verifiable data systems",
];

export function RotatingText({ interval = 2400 }: { interval?: number }) {
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((n) => (n + 1) % PHRASES.length), interval);
    return () => clearInterval(id);
  }, [interval, reduced]);

  const longest = PHRASES.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <span
      className="rotating-text relative inline-flex align-baseline"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Invisible longest phrase reserves exact width — no layout shift */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {longest}
      </span>
      {PHRASES.map((p, idx) => (
        <span
          key={p}
          aria-hidden={idx !== i}
          className="rotating-text__item whitespace-nowrap"
          data-active={idx === i}
        >
          {p}
        </span>
      ))}
    </span>
  );
}
