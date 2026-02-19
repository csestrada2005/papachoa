import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpacedTitleProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  className?: string;
  /** Animate each letter on mount with stagger */
  stagger?: boolean;
  /** Base delay before the first letter animates (ms) */
  baseDelay?: number;
  /** Delay between each letter (ms) */
  letterDelay?: number;
  /** Animate only when element enters viewport */
  onScroll?: boolean;
}

/**
 * SpacedTitle — editorial title with generous letter-spacing.
 * Optionally staggers each character in on mount or on scroll entry.
 */
const SpacedTitle = ({
  text,
  tag: Tag = "h2",
  className,
  stagger = false,
  baseDelay = 0,
  letterDelay = 55,
  onScroll = false,
}: SpacedTitleProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(!onScroll);

  useEffect(() => {
    if (!onScroll) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onScroll]);

  if (!stagger) {
    return (
      <Tag
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className={cn("tracking-[0.15em]", className)}
      >
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={cn("tracking-[0.15em] inline-block", className)}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(22px)",
            transition: visible
              ? `opacity 0.7s cubic-bezier(.22,1,.36,1) ${baseDelay + i * letterDelay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${baseDelay + i * letterDelay}ms`
              : "none",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
};

export default SpacedTitle;
