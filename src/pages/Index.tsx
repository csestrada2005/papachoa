import { lazy, Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroPapacho from "@/components/sections/HeroPapacho";
import BrandMarquee from "@/components/sections/BrandMarquee";
import AboutPapachoa from "@/components/sections/AboutPapachoa";
import Filosofia from "@/components/sections/Filosofia";
import ColeccionesEditorial from "@/components/sections/ColeccionesEditorial";
import ApatachoItems from "@/components/sections/ApatachoItems";
import HistoriasHilo from "@/components/sections/HistoriasHilo";
import Suavidad from "@/components/sections/Suavidad";
import MexicoAmor from "@/components/sections/MexicoAmor";
import { usePrefetchRoutes } from "@/hooks/usePrefetch";

// Below-fold lazy sections
const Newsletter = lazy(() => import("@/components/sections/Newsletter"));

const Index = () => {
  usePrefetchRoutes();
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

        {/* 3 · Filosofía */}
        <Filosofia />

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
