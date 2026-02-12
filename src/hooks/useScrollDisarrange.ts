import { useEffect, useRef, useCallback } from "react";

/**
 * useScrollDisarrange — Organic scroll-driven "disarrange" effect
 * 
 * Elements start arranged (when section is centered in viewport),
 * and organically shift/rotate/scale as the user scrolls away.
 * Uses linear interpolation for buttery smooth updates.
 */

interface DisarrangeOptions {
  maxRotate?: number;
  maxTranslate?: number;
  maxScale?: number;
  range?: number;
  /** Lerp factor 0-1 — lower = smoother/laggier (default 0.08) */
  smoothing?: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface ElementState {
  currentTx: number;
  currentTy: number;
  currentRot: number;
  currentScale: number;
}

export function useScrollDisarrange(options: DisarrangeOptions = {}) {
  const {
    maxRotate = 12,
    maxTranslate = 45,
    maxScale = 0.07,
    range = 2.0,
    smoothing = 0.08,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const statesRef = useRef<Map<HTMLElement, ElementState>>(new Map());
  const runningRef = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const tick = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewH = window.innerHeight;
    const sectionCenter = rect.top + rect.height / 2;
    const viewCenter = viewH / 2;

    const distance = Math.abs(sectionCenter - viewCenter);
    const maxDistance = viewH * range;
    const progress = Math.min(distance / maxDistance, 1);

    // Smooth easing
    const eased = 1 - Math.pow(1 - progress, 3);

    const children = container.querySelectorAll<HTMLElement>("[data-disarrange]");
    let needsMore = false;

    children.forEach((child, i) => {
      const seed = i + 1;
      const rotDir = seededRandom(seed) > 0.5 ? 1 : -1;
      const xDir = seededRandom(seed * 2) > 0.5 ? 1 : -1;
      const yDir = seededRandom(seed * 3) > 0.5 ? 1 : -1;

      const targetRot = rotDir * seededRandom(seed * 5) * maxRotate * eased;
      const targetTx = xDir * seededRandom(seed * 7) * maxTranslate * eased;
      const targetTy = yDir * seededRandom(seed * 11) * maxTranslate * 0.6 * eased;
      const targetScale = 1 - seededRandom(seed * 13) * maxScale * eased;

      let state = statesRef.current.get(child);
      if (!state) {
        state = { currentTx: 0, currentTy: 0, currentRot: 0, currentScale: 1 };
        statesRef.current.set(child, state);
      }

      state.currentTx = lerp(state.currentTx, targetTx, smoothing);
      state.currentTy = lerp(state.currentTy, targetTy, smoothing);
      state.currentRot = lerp(state.currentRot, targetRot, smoothing);
      state.currentScale = lerp(state.currentScale, targetScale, smoothing);

      child.style.transform = `translate3d(${state.currentTx.toFixed(2)}px, ${state.currentTy.toFixed(2)}px, 0) rotate(${state.currentRot.toFixed(2)}deg) scale(${state.currentScale.toFixed(4)})`;
      child.style.willChange = "transform";

      // Check if still converging
      const diff =
        Math.abs(state.currentTx - targetTx) +
        Math.abs(state.currentTy - targetTy) +
        Math.abs(state.currentRot - targetRot) +
        Math.abs(state.currentScale - targetScale);
      if (diff > 0.01) needsMore = true;
    });

    if (needsMore) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      runningRef.current = false;
    }
  }, [maxRotate, maxTranslate, maxScale, range, smoothing]);

  const startLoop = useCallback(() => {
    if (!runningRef.current) {
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    const onScroll = () => startLoop();

    window.addEventListener("scroll", onScroll, { passive: true });
    startLoop();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [startLoop]);

  return containerRef;
}
