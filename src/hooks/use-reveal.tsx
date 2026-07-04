import { useEffect, useRef } from "react";

/**
 * Adds a data-revealed="true" attribute to the target element when it enters
 * the viewport. Pair with the .reveal utility in styles.css.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = options ?? {};

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.setAttribute("data-revealed", "true");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).setAttribute("data-revealed", "true");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            (entry.target as HTMLElement).removeAttribute("data-revealed");
          }
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
