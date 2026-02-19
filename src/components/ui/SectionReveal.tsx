import { useEffect, useRef, useState, type ReactNode } from "react";

/* ─────────────────────────────────────────
   SectionReveal
   Wraps any element and fades+slides it in
   when it enters the viewport. Supports
   per-child stagger via the `delay` prop.
   Respects prefers-reduced-motion.
   ───────────────────────────────────────── */

interface SectionRevealProps {
  children: ReactNode;
  /** Base delay in ms before the animation starts */
  delay?: number;
  /** translateY distance in px (default 14) */
  distance?: number;
  /** Animation duration in ms (default 620) */
  duration?: number;
  className?: string;
  threshold?: number;
}

const SectionReveal = ({
  children,
  delay = 0,
  distance = 14,
  duration = 620,
  className,
  threshold = 0.12,
}: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  /* respect reduced-motion */
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReduced, threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
        transition: prefersReduced
          ? "none"
          : `opacity ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms,
             transform ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default SectionReveal;
