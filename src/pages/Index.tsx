import React, { lazy, Suspense, useEffect, useState } from "react"; // refresh
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroPapacho from "@/components/sections/HeroPapacho";

import { usePrefetchRoutes } from "@/hooks/usePrefetch";
import { useSeo } from "@/hooks/useSeo";

// Lazy load below-fold sections to keep initial bundle lean
const BarraConfianza        = lazy(() => import("@/components/sections/BarraConfianza"));
const AboutPapachoa         = lazy(() => import("@/components/sections/AboutPapachoa"));
const ColeccionesEditorial  = lazy(() => import("@/components/sections/ColeccionesEditorial"));
const ProductosDestacados   = lazy(() => import("@/components/sections/ProductosDestacados"));
const ResenasSection        = lazy(() => import("@/components/sections/ResenasSection"));
const ComplementaLook       = lazy(() => import("@/components/sections/ComplementaLook"));
const ApatachoItems         = lazy(() => import("@/components/sections/ApatachoItems"));
const HistoriasHilo         = lazy(() => import("@/components/sections/HistoriasHilo"));
const Suavidad              = lazy(() => import("@/components/sections/Suavidad"));
const MexicoAmor            = lazy(() => import("@/components/sections/MexicoAmor"));
const CTAWhatsApp           = lazy(() => import("@/components/sections/CTAWhatsApp"));
const Newsletter            = lazy(() => import("@/components/sections/Newsletter"));

const Index = () => {
  usePrefetchRoutes();
  useSeo({ title: "Papachoa México — Pijamas que abrazan", description: "Pijamas ultra suaves hechos en México para mamá, papá e hijos. Telas certificadas, estampados únicos y amor en cada costura. Envíos a todo México.", path: "/" });

  const [heroComplete, setHeroComplete] = useState(false);
  const autoScrollDone = React.useRef(false);

  // Auto-scroll to hero assembled state — wait for hero image load to avoid flicker
  useEffect(() => {
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
        // Mark auto-scroll done; overlap activates on next user scroll
        autoScrollDone.current = true;
      }
    };

    const startScroll = () => {
      if (cancelled) return;
      rafId = requestAnimationFrame(step);
    };

    // Wait 1.5s after load before starting the auto-scroll
    const initialDelay = 1500;

    const heroImg = document.querySelector<HTMLImageElement>("img[fetchpriority='high']");
    if (heroImg && !heroImg.complete) {
      heroImg.addEventListener("load", () => {
        if (!cancelled) setTimeout(startScroll, initialDelay);
      }, { once: true });
      const fallback = setTimeout(startScroll, initialDelay + 2000);
      return () => { cancelled = true; clearTimeout(fallback); cancelAnimationFrame(rafId); };
    } else {
      const delay = setTimeout(startScroll, initialDelay);
      return () => { cancelled = true; clearTimeout(delay); cancelAnimationFrame(rafId); };
    }
  }, []);

  // Activate overlap only when user scrolls AFTER auto-scroll finishes
  useEffect(() => {
    const onWheel = () => {
      if (autoScrollDone.current && !heroComplete) setHeroComplete(true);
    };
    window.addEventListener("wheel", onWheel, { passive: true, once: true });
    window.addEventListener("touchmove", onWheel, { passive: true, once: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onWheel);
    };
  }, [heroComplete]);
  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Header transparent />
      <main>
        {/* 1 · Hero */}
        <div id="hero">
          <HeroPapacho />
        </div>


        {/* Wrapper so everything after hero overlaps it */}
        <div className="relative z-10 bg-white transition-[margin] duration-700 ease-out" style={{ marginTop: heroComplete ? "-100vh" : 0 }}>
        <Suspense fallback={null}>
          <BarraConfianza />
          <div id="about">
            <AboutPapachoa />
          </div>
          <ColeccionesEditorial />
          <div id="productos">
            <ProductosDestacados />
          </div>

          {/* Hidden sections — accessible via hamburger menu scroll */}
          <div id="coleccion-completa" className="hidden">
            <ComplementaLook />
          </div>
          <div id="para-pintar" className="hidden">
            <ResenasSection />
          </div>
          <div className="hidden">
            <ApatachoItems />
            <HistoriasHilo />
            <Suavidad />
            <MexicoAmor />
          </div>

          <div id="contacto">
            <CTAWhatsApp />
            <Newsletter />
          </div>
        </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
