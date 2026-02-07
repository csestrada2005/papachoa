import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BrandMarquee from "@/components/sections/BrandMarquee";
import Emotion from "@/components/sections/Emotion";
import Collections from "@/components/sections/Collections";
import Softness from "@/components/sections/Softness";
import Testimonials from "@/components/sections/Testimonials";
import MadeInMexico from "@/components/sections/MadeInMexico";
import Newsletter from "@/components/sections/Newsletter";
import { usePrefetchRoutes } from "@/hooks/usePrefetch";

const Index = () => {
  // Prefetch key routes after initial render
  usePrefetchRoutes();
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <BrandMarquee />
        <Emotion />
        <Collections />
        <Softness />
        <Testimonials />
        <MadeInMexico />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
