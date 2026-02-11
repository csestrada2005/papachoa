import { useEffect, useRef, useCallback } from "react";

/**
 * Triggers a CSS class when the element enters the viewport.
 * Used for embroidery-line "draw" animations.
 */
export function useDrawOnScroll(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  const setupObserver = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.style.clipPath = "inset(0 100% 0 0)";
    el.style.transition = "clip-path 1.2s cubic-bezier(.22,1,.36,1)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.clipPath = "inset(0 0% 0 0)";
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  useEffect(setupObserver, [setupObserver]);

  return ref;
}
