import React, { lazy, Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroPapacho from "@/components/sections/HeroPapacho";

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

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Header transparent />
      <main>
        <div id="hero">
          <HeroPapacho />
        </div>

        <div className="relative bg-white" style={{ zIndex: 10 }}>
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
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
