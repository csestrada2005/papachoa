import React, { lazy, Suspense, useEffect, useState, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroPapacho from "@/components/sections/HeroPapacho";
import { useIsMobile } from "@/hooks/use-mobile";

import { usePrefetchRoutes } from "@/hooks/usePrefetch";
import { useSeo } from "@/hooks/useSeo";

const AboutPapachoa         = lazy(() => import("@/components/sections/AboutPapachoa"));
const ColeccionesEditorial  = lazy(() => import("@/components/sections/ColeccionesEditorial"));
const ProductosDestacados   = lazy(() => import("@/components/sections/ProductosDestacados"));
const ResenasSection        = lazy(() => import("@/components/sections/ResenasSection"));
const ComplementaLook       = lazy(() => import("@/components/sections/ComplementaLook"));
const ApatachoItems         = lazy(() => import("@/components/sections/ApatachoItems"));
const MexicoAmor            = lazy(() => import("@/components/sections/MexicoAmor"));
const Newsletter            = lazy(() => import("@/components/sections/Newsletter"));

const Index = () => {
  usePrefetchRoutes();
  useSeo({ title: "Papachoa México — Pijamas que abrazan", description: "Pijamas ultra suaves hechos en México para mamá, papá e hijos. Telas certificadas, estampados únicos y amor en cada costura. Envíos a todo México.", path: "/" });
  const isMobile = useIsMobile();

  const [heroComplete, setHeroComplete] = useState(false);
  const autoScrollDone = React.useRef(false);

  // Auto-scroll — desktop only (no touch devices)
  useEffect(() => {
    if (isMobile) { autoScrollDone.current = true; return; }
    if (window.scrollY > 0) window.scrollTo(0, 0);

    const targetY = Math.round(window.innerHeight * 2);
    const duration = 3200;
    let startTime: number | null = null;
    let rafId: number;
    let cancelled = false;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (cancelled) return;
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, easeInOutCubic(progress) * targetY);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        autoScrollDone.current = true;
      }
    };

    const startScroll = () => {
      if (cancelled) return;
      rafId = requestAnimationFrame(step);
    };

    const cancelOnTouch = () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
    window.addEventListener("touchstart", cancelOnTouch, { passive: true, once: true });

    const initialDelay = 1000;
    let probeId: number | null = null;
    let fallbackId: ReturnType<typeof setTimeout> | number | null = null;

    const armWithImage = (img: HTMLImageElement) => {
      if (img.complete) {
        const delay = setTimeout(startScroll, initialDelay);
        fallbackId = delay;
      } else {
        img.addEventListener("load", () => {
          if (!cancelled) fallbackId = window.setTimeout(startScroll, initialDelay);
        }, { once: true });
        fallbackId = window.setTimeout(startScroll, initialDelay + 2500);
      }
    };

    const existingHeroImg = document.querySelector<HTMLImageElement>("#hero-main-image");
    if (existingHeroImg) {
      armWithImage(existingHeroImg);
    } else {
      probeId = window.setInterval(() => {
        const lateHeroImg = document.querySelector<HTMLImageElement>("#hero-main-image");
        if (!lateHeroImg) return;
        if (probeId) { window.clearInterval(probeId); probeId = null; }
        armWithImage(lateHeroImg);
      }, 120);
      fallbackId = window.setTimeout(startScroll, initialDelay + 2500);
    }

    return () => {
      cancelled = true;
      if (probeId) window.clearInterval(probeId);
      if (fallbackId) clearTimeout(fallbackId);
      cancelAnimationFrame(rafId);
      window.removeEventListener("touchstart", cancelOnTouch);
    };
  }, []);

  // heroComplete listener — desktop only
  useEffect(() => {
    if (isMobile) return;
    const onWheel = () => {
      if (autoScrollDone.current && !heroComplete) {
        setHeroComplete(true);
        window.removeEventListener("wheel", onWheel);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [heroComplete]);

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Header transparent />
      <main>
        <div id="hero">
          <HeroPapacho />
        </div>

        <div
          className="relative bg-white"
          style={{
            zIndex: 10,
            transform: (!isMobile && heroComplete) ? `translateY(calc(var(--vh, 1vh) * -100))` : "translateY(0)",
            transition: !isMobile ? "transform 700ms ease-out" : "none",
            marginBottom: (!isMobile && heroComplete) ? `calc(var(--vh, 1vh) * -100)` : undefined,
          }}
        >
        <Suspense fallback={null}>
          <div id="about">
            <AboutPapachoa />
          </div>
          <div id="colecciones">
            <ColeccionesEditorial />
          </div>
          <div id="productos">
            <ProductosDestacados />
          </div>
          <div id="mexico-amor">
            <MexicoAmor />
          </div>
          <div className="hidden">
            <ComplementaLook />
            <ResenasSection />
            <ApatachoItems />
            <Newsletter />
          </div>
          <Footer />
        </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Index;
