import { useEffect, useRef, type ReactNode } from "react";

/**
 * Magnetic — wraps a single interactive child (button / anchor) and gently
 * pulls it toward the cursor on fine pointers. Uses transform only, so
 * layout is untouched and it never triggers scroll. No-op on touch and
 * reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.28,
  radius = 90,
}: {
  children: ReactNode;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    const target = wrap.firstElementChild as HTMLElement | null;
    if (!target) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    target.style.willChange = "transform";
    target.style.transition = "transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1)";

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let active = false;

    const apply = () => {
      target.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = target.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const halfW = r.width / 2;
      const halfH = r.height / 2;
      // distance from cursor to nearest edge of the button rect
      const edgeX = Math.max(0, Math.abs(dx) - halfW);
      const edgeY = Math.max(0, Math.abs(dy) - halfH);
      const edgeDist = Math.hypot(edgeX, edgeY);
      if (edgeDist > radius) {
        if (!active) return;
        active = false;
        tx = 0;
        ty = 0;
      } else {
        active = true;
        const falloff = 1 - edgeDist / radius;
        tx = dx * strength * falloff;
        ty = dy * strength * falloff;
      }
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      active = false;
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      target.style.transform = "";
      target.style.transition = "";
      target.style.willChange = "";
    };
  }, [radius, strength]);

  return (
    <span ref={ref} className="magnetic-zone inline-flex">
      {children}
    </span>
  );
}
