import { lazy, Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BrandMarquee from "@/components/sections/BrandMarquee";
import Emotion from "@/components/sections/Emotion";
import Collections from "@/components/sections/Collections";
import { usePrefetchRoutes } from "@/hooks/usePrefetch";

// Below-fold sections – lazy loaded
const ApatachoSelector = lazy(() => import("@/components/sections/ApatachoSelector"));
const StoriesThread = lazy(() => import("@/components/sections/StoriesThread"));
const Softness = lazy(() => import("@/components/sections/Softness"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));
const MadeInMexico = lazy(() => import("@/components/sections/MadeInMexico"));
const Newsletter = lazy(() => import("@/components/sections/Newsletter"));

const Index = () => {
  usePrefetchRoutes();
  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Header transparent />
      <main>
        <Hero />
        <BrandMarquee />
        <Emotion />
        <Collections />
        <Suspense fallback={null}>
          <ApatachoSelector />
          <StoriesThread />
          <Softness />
          <Testimonials />
          <MadeInMexico />
          <Newsletter />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
