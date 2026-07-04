import { useEffect, useState } from "react";

const PHRASES = [
  "Software Engineer",
  "Building Distributed Systems",
  "Designing Reliable Backend Platforms",
  "Cloud-Native Applications",
  "Security Engineering",
  "State Management",
  "System Design",
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

  return (
    <span
      className="rotating-text relative inline-block align-baseline"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Invisible longest phrase to reserve width */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        Designing Reliable Backend Platforms
      </span>
      {PHRASES.map((p, idx) => (
        <span
          key={p}
          aria-hidden={idx !== i}
          className="rotating-text__item"
          data-active={idx === i}
        >
          {p}
        </span>
      ))}
    </span>
  );
}
