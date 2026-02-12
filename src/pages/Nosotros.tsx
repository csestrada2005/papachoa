import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Heart, Home, Sparkles } from "lucide-react";
import { usePrefetchRoutes } from "@/hooks/usePrefetch";

const Nosotros = () => {
  // Prefetch key routes after initial render
  usePrefetchRoutes();
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main>
        {/* Hero section */}
        <section className="pt-32 md:pt-40 pb-12 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-papachoa-blush/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-papachoa-sky/20 rounded-full blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                Sobre <span className="italic text-papachoa-blush-dark">nosotros</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                No hacemos solo pijamas. Hacemos{" "}
                <span className="text-papachoa-blush-dark font-semibold">momentos de calma</span>, rituales de
                descanso y espacios donde la familia se siente{" "}
                <span className="text-papachoa-blush-dark font-semibold">acunada</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Mission section */}
        <section className="py-16 md:py-24 bg-papachoa-cream">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="mb-12">
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8">
                  Nuestra promesa
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6">
                  En Papachoa creemos que el descanso es un acto de amor. Cada pijama, cada cobijo, cada detalle está pensado para que tu familia se sienta envuelta en suavidad, seguridad y apapacho.
                </p>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  No queremos vender. Queremos que tu hogar sea más bonito, más cálido, más tuyo. Que esos momentos antes de dormir sean rituales de paz, no solo rutinas.
                </p>
              </div>

              {/* Three values */}
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-papachoa-blush rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-papachoa-blush-dark" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3">Telas ultra suaves</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Seleccionadas con cuidado para acariciar la piel desde el primer contacto.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-papachoa-sky rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3">Hecho en México</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Confeccionado con manos y corazón de artesanas mexicanas bajo principios de comercio justo.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-papachoa-sage rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3">Pensado para ti</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Diseñado por mamás y papás que entienden lo que tu familia necesita.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Makers section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-10 w-40 h-40 bg-papachoa-peach/30 blob-shape opacity-40" />
            <div className="absolute bottom-20 left-10 w-32 h-32 bg-papachoa-sage/20 rounded-full" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8">
                Quiénes confeccionan
              </h2>
              <div className="bg-papachoa-blush/20 rounded-3xl p-8 md:p-12 border border-papachoa-blush/40">
                <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6">
                  Cada pijama lleva el nombre y el cuidado de artesanas que trabajan desde talleres locales en México. Para nosotros, no son proveedoras. Son colaboradoras. Son las manos que traen nuestros sueños a la realidad.
                </p>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  Cuando compras Papachoa, apoyas a mamás y papás mexicanos que merecen trabajar con dignidad, con tiempo para su familia, y con el reconocimiento de que su trabajo es valioso.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-16 md:py-24 bg-papachoa-cream">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Ser parte de Papachoa
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
                Cada compra es un voto por un hogar más bonito, por la maternidad consciente, por el descanso que todos merecemos.
              </p>
               <Link
                  to="/catalogo"
                  className="cta-premium-terracotta"
                >
                  Ver colección
                  <span className="text-lg">→</span>
                </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Nosotros;
