import { lazy, Suspense, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroPapacho from "@/components/sections/HeroPapacho";
import { usePrefetchRoutes } from "@/hooks/usePrefetch";
import { useSeo } from "@/hooks/useSeo";

// Lazy load ALL below-fold sections to keep initial bundle lean
const BrandMarquee       = lazy(() => import("@/components/sections/BrandMarquee"));
const AboutPapachoa      = lazy(() => import("@/components/sections/AboutPapachoa"));
// const Filosofia       = lazy(() => import("@/components/sections/Filosofia"));
const ColeccionesEditorial = lazy(() => import("@/components/sections/ColeccionesEditorial"));
const ApatachoItems      = lazy(() => import("@/components/sections/ApatachoItems"));
const HistoriasHilo      = lazy(() => import("@/components/sections/HistoriasHilo"));
const Suavidad           = lazy(() => import("@/components/sections/Suavidad"));
const MexicoAmor         = lazy(() => import("@/components/sections/MexicoAmor"));
const Newsletter         = lazy(() => import("@/components/sections/Newsletter"));

const Index = () => {
  usePrefetchRoutes();
  useSeo({ title: "Papachoa México — Pijamas que abrazan", description: "Pijamas ultra suaves hechos en México para mamá, papá e hijos. Telas certificadas, estampados únicos y amor en cada costura. Envíos a todo México.", path: "/" });

  // Auto-scroll to hero assembled state — wait for hero image load to avoid flicker
  useEffect(() => {
    const targetY = Math.round(window.innerHeight * 2);
    const duration = 2400;
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
      if (progress < 1) rafId = requestAnimationFrame(step);
    };

    const startScroll = () => {
      if (cancelled) return;
      rafId = requestAnimationFrame(step);
    };

    // Wait for the hero image to be ready before scrolling
    const heroImg = document.querySelector<HTMLImageElement>("img[fetchpriority='high']");
    if (heroImg && !heroImg.complete) {
      heroImg.addEventListener("load", startScroll, { once: true });
      // Safety fallback: start after 1.5s even if image isn't ready
      const fallback = setTimeout(startScroll, 1500);
      return () => {
        cancelled = true;
        clearTimeout(fallback);
        cancelAnimationFrame(rafId);
      };
    } else {
      // Image already cached — small delay for first paint
      const delay = setTimeout(startScroll, 200);
      return () => {
        cancelled = true;
        clearTimeout(delay);
        cancelAnimationFrame(rafId);
      };
    }
  }, []);
  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Header transparent />
      <main>
        {/* 1 · Hero */}
        <HeroPapacho />

        {/* Wrapper so everything after hero overlaps it */}
        <div className="relative z-10 bg-white" style={{ marginTop: "-100vh" }}>
        {/* Marquee strip */}
        <BrandMarquee />

        {/* 2 · About */}
        <AboutPapachoa />

        {/* 3 · Filosofía — oculta */}

        {/* 4 · Colecciones editorial */}
        <ColeccionesEditorial />

        {/* 5 · ¿Qué apapacho necesitas? */}
        <ApatachoItems />

        {/* 6 · Historias en cada hilo */}
        <HistoriasHilo />

        {/* 7 · La prueba de suavidad */}
        <Suavidad />

        {/* 8 · Hecho en México */}
        <MexicoAmor />

        {/* Newsletter + footer */}
        <Suspense fallback={null}>
          <div id="contacto">
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
