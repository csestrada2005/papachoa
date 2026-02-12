import { useEffect, useRef, useCallback } from "react";

/**
 * useScrollDisarrange — Organic scroll-driven "disarrange" effect
 * 
 * Elements start arranged (when section is centered in viewport),
 * and organically shift/rotate/scale as the user scrolls away.
 * When scrolling back, they smoothly rearrange.
 * 
 * Each child with [data-disarrange] gets a unique organic transform
 * based on its index and the scroll distance from center.
 */

interface DisarrangeOptions {
  /** Max rotation in degrees (default: 4) */
  maxRotate?: number;
  /** Max translation in px (default: 20) */
  maxTranslate?: number;
  /** Max scale deviation from 1 (default: 0.03) */
  maxScale?: number;
  /** How far (in vh fraction 0-1) from center to reach full effect (default: 0.6) */
  range?: number;
  /** CSS transition for smoothness (default provided) */
  transition?: string;
}

// Seeded pseudo-random for deterministic per-element variation
function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function useScrollDisarrange(options: DisarrangeOptions = {}) {
  const {
    maxRotate = 12,
    maxTranslate = 45,
    maxScale = 0.07,
    range = 1.2,
    transition = "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  const update = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewH = window.innerHeight;
    const sectionCenter = rect.top + rect.height / 2;
    const viewCenter = viewH / 2;

    // Progress: 0 = section centered, 1 = fully away
    const distance = Math.abs(sectionCenter - viewCenter);
    const maxDistance = viewH * range;
    const progress = Math.min(distance / maxDistance, 1);

    // Smooth easing (ease-out cubic)
    const eased = 1 - Math.pow(1 - progress, 3);

    const children = container.querySelectorAll<HTMLElement>("[data-disarrange]");
    children.forEach((child, i) => {
      const seed = i + 1;
      // Deterministic but varied per element
      const rotDir = seededRandom(seed) > 0.5 ? 1 : -1;
      const xDir = seededRandom(seed * 2) > 0.5 ? 1 : -1;
      const yDir = seededRandom(seed * 3) > 0.5 ? 1 : -1;

      const rotate = rotDir * seededRandom(seed * 5) * maxRotate * eased;
      const tx = xDir * seededRandom(seed * 7) * maxTranslate * eased;
      const ty = yDir * seededRandom(seed * 11) * maxTranslate * 0.6 * eased;
      const scale = 1 - seededRandom(seed * 13) * maxScale * eased;

      child.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(4)})`;

      if (!child.style.transition) {
        child.style.transition = transition;
      }
    });
  }, [maxRotate, maxTranslate, maxScale, range, transition]);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        update();
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial position
    requestAnimationFrame(update);

    return () => window.removeEventListener("scroll", onScroll);
  }, [update]);

  return containerRef;
}
