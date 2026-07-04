import { useEffect, useRef, type ReactNode } from "react";

/**
 * Tilt — wraps a card and adds a subtle 3D tilt + lift on hover, driven by
 * the cursor's position over the element. Transform-only, so layout is
 * untouched and it never triggers scroll. No-op on touch / reduced-motion.
 *
 * Also writes CSS custom properties (--tilt-mx / --tilt-my as 0..1) on the
 * element so children can render a spotlight sheen that tracks the cursor.
 */
export function Tilt({
  children,
  max = 6,
  lift = 4,
  scale = 1.01,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  lift?: number;
  scale?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    const target = wrap.firstElementChild as HTMLElement | null;
    if (!target) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    target.style.willChange = "transform";
    target.style.transformStyle = "preserve-3d";
    target.style.transition =
      "transform 420ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 320ms ease";

    let raf = 0;
    let rx = 0;
    let ry = 0;
    let tz = 0;
    let s = 1;

    const apply = () => {
      target.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0, ${-tz}px, 0) scale(${s})`;
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = target.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const nx = Math.min(1, Math.max(0, px));
      const ny = Math.min(1, Math.max(0, py));
      target.style.setProperty("--tilt-mx", nx.toFixed(3));
      target.style.setProperty("--tilt-my", ny.toFixed(3));
      // rotate so top-left tilts back and bottom-right dips forward slightly
      ry = (nx - 0.5) * 2 * max;
      rx = -(ny - 0.5) * 2 * max;
      tz = lift;
      s = scale;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onEnter = () => {
      target.style.transition =
        "transform 260ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 260ms ease";
    };

    const onLeave = () => {
      rx = 0;
      ry = 0;
      tz = 0;
      s = 1;
      target.style.setProperty("--tilt-mx", "0.5");
      target.style.setProperty("--tilt-my", "0.5");
      target.style.transition =
        "transform 520ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 420ms ease";
      if (!raf) raf = requestAnimationFrame(apply);
    };

    target.addEventListener("pointerenter", onEnter);
    target.addEventListener("pointermove", onMove, { passive: true });
    target.addEventListener("pointerleave", onLeave);
    return () => {
      target.removeEventListener("pointerenter", onEnter);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      target.style.transform = "";
      target.style.transition = "";
      target.style.willChange = "";
      target.style.transformStyle = "";
    };
  }, [max, lift, scale]);

  return (
    <div ref={ref} className={`tilt-zone ${className}`}>
      {children}
    </div>
  );
}
