import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Heart, Home, Sparkles } from "lucide-react";
import { usePrefetchRoutes } from "@/hooks/usePrefetch";

const Nosotros = () => {
  usePrefetchRoutes();
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main>
        {/* Hero section */}
        <section className="pt-36 md:pt-44 pb-16 md:pb-28 relative overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-block mb-8">
                <div
                  className="px-6 py-2.5"
                  style={{
                    border: "1.5px dashed hsl(14 52% 46% / 0.25)",
                    borderRadius: "2px",
                  }}
                >
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary font-medium">
                    Nuestra historia
                  </span>
                </div>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
                Sobre <em className="text-primary">nosotros</em>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
                No hacemos solo pijamas. Hacemos{" "}
                <span className="text-primary font-semibold">momentos de calma</span>, rituales de
                descanso y espacios donde la familia se siente{" "}
                <span className="text-primary font-semibold">acunada</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Mission section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-[900px] mx-auto">
              <div className="mb-16 text-center md:text-left">
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">
                  Nuestra promesa
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6">
                  En Papachoa creemos que el descanso es un acto de amor. Cada pijama, cada cobijo, cada detalle está pensado para que tu familia se sienta envuelta en suavidad, seguridad y apapacho.
                </p>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  No queremos vender. Queremos que tu hogar sea más bonito, más cálido, más tuyo. Que esos momentos antes de dormir sean rituales de paz, no solo rutinas.
                </p>
              </div>

              {/* Three values – editorial pastel cards */}
              <div className="grid md:grid-cols-3 gap-10 mt-16">
                <div
                  className="text-center p-10"
                  style={{
                    background: "#E8B8A6",
                    borderRadius: "16px",
                    border: "1.5px dashed hsl(14 52% 46% / 0.18)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                  }}
                >
                  <Sparkles className="h-8 w-8 mx-auto mb-5" style={{ color: "hsl(14 52% 36%)" }} />
                  <h3 className="font-display text-xl text-foreground mb-3">Telas ultra suaves</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    Seleccionadas con cuidado para acariciar la piel desde el primer contacto.
                  </p>
                </div>

                <div
                  className="text-center p-10"
                  style={{
                    background: "#BFC8E6",
                    borderRadius: "16px",
                    border: "1.5px dashed hsl(230 30% 60% / 0.25)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                  }}
                >
                  <Home className="h-8 w-8 mx-auto mb-5" style={{ color: "hsl(230 30% 40%)" }} />
                  <h3 className="font-display text-xl text-foreground mb-3">Hecho en México</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    Confeccionado con manos y corazón de artesanas mexicanas bajo principios de comercio justo.
                  </p>
                </div>

                <div
                  className="text-center p-10"
                  style={{
                    background: "#BFDAD2",
                    borderRadius: "16px",
                    border: "1.5px dashed hsl(162 22% 50% / 0.25)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                  }}
                >
                  <Heart className="h-8 w-8 mx-auto mb-5" style={{ color: "hsl(162 22% 35%)" }} />
                  <h3 className="font-display text-xl text-foreground mb-3">Pensado para ti</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    Diseñado por mamás y papás que entienden lo que tu familia necesita.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Makers section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-[900px] mx-auto">
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10 text-center">
                Quiénes confeccionan
              </h2>
              <div
                className="p-10 md:p-14"
                style={{
                  background: "#F4EDE6",
                  borderRadius: "16px",
                  border: "1.5px dashed hsl(30 30% 60% / 0.3)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                }}
              >
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
        <section className="py-20 md:py-32">
          <div className="container">
            <div
              className="max-w-[900px] mx-auto text-center p-12 md:p-16"
              style={{
                background: "#E8B8A6",
                borderRadius: "16px",
                border: "1.5px dashed hsl(14 52% 46% / 0.18)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
              }}
            >
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
