import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Heart, Home, Sparkles } from "lucide-react";
import { usePrefetchRoutes } from "@/hooks/usePrefetch";

const cardBase: React.CSSProperties = {
  borderRadius: "14px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.035)",
  transition: "transform 0.24s ease, box-shadow 0.24s ease",
};

const Nosotros = () => {
  usePrefetchRoutes();

  const hoverProps = (e: React.MouseEvent<HTMLDivElement>, active: boolean) => {
    const el = e.currentTarget;
    el.style.transform = active ? "translateY(-2px)" : "translateY(0)";
    el.style.boxShadow = active
      ? "0 10px 28px rgba(0,0,0,0.06)"
      : "0 6px 20px rgba(0,0,0,0.035)";
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main>
        {/* Hero section */}
        <section className="pt-32 md:pt-40 pb-8 md:pb-14 relative overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-block mb-5">
                <div
                  className="px-5 py-2"
                  style={{
                    border: "1.5px dashed hsl(14 52% 46% / 0.22)",
                    borderRadius: "2px",
                  }}
                >
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary font-medium">
                    Nuestra historia
                  </span>
                </div>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-5 leading-tight">
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
        <section className="py-11 md:py-[72px]">
          <div className="container">
            <div className="max-w-[900px] mx-auto">
              <div className="mb-10 text-center md:text-left">
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                  Nuestra promesa
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed mb-4">
                  En Papachoa creemos que el descanso es un acto de amor. Cada pijama, cada cobijo, cada detalle está pensado para que tu familia se sienta envuelta en suavidad, seguridad y apapacho.
                </p>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  No queremos vender. Queremos que tu hogar sea más bonito, más cálido, más tuyo. Que esos momentos antes de dormir sean rituales de paz, no solo rutinas.
                </p>
              </div>

              {/* Three values */}
              <div className="grid md:grid-cols-3 gap-5 md:gap-7 mt-10">
                {/* Card 1 */}
                <div
                  className="relative text-center cursor-default"
                  style={{ ...cardBase, background: "#E8B8A6" }}
                  onMouseEnter={(e) => hoverProps(e, true)}
                  onMouseLeave={(e) => hoverProps(e, false)}
                >
                  <div className="absolute inset-[4px] pointer-events-none" style={{
                    border: "1.5px dashed hsl(14 52% 46% / 0.18)",
                    borderRadius: "2px"
                  }} />
                  <div className="relative p-8 md:p-10">
                    
                    <Sparkles className="h-7 w-7 mx-auto mb-4" style={{ color: "hsl(14 52% 36%)" }} />
                    <h3 className="font-display text-xl text-foreground mb-2">Telas ultra suaves</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      Seleccionadas con cuidado para acariciar la piel desde el primer contacto.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  className="relative text-center cursor-default"
                  style={{ ...cardBase, background: "#BFC8E6" }}
                  onMouseEnter={(e) => hoverProps(e, true)}
                  onMouseLeave={(e) => hoverProps(e, false)}
                >
                  <div className="absolute inset-[4px] pointer-events-none" style={{
                    border: "1.5px dashed hsl(230 30% 60% / 0.22)",
                    borderRadius: "2px"
                  }} />
                  <div className="relative p-8 md:p-10">
                    
                    <Home className="h-7 w-7 mx-auto mb-4" style={{ color: "hsl(230 30% 40%)" }} />
                    <h3 className="font-display text-xl text-foreground mb-2">Hecho en México</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      Confeccionado con manos y corazón de artesanas mexicanas bajo principios de comercio justo.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div
                  className="relative text-center cursor-default"
                  style={{ ...cardBase, background: "#BFDAD2" }}
                  onMouseEnter={(e) => hoverProps(e, true)}
                  onMouseLeave={(e) => hoverProps(e, false)}
                >
                  <div className="absolute inset-[4px] pointer-events-none" style={{
                    border: "1.5px dashed hsl(162 22% 50% / 0.22)",
                    borderRadius: "2px"
                  }} />
                  <div className="relative p-8 md:p-10">
                    
                    <Heart className="h-7 w-7 mx-auto mb-4" style={{ color: "hsl(162 22% 35%)" }} />
                    <h3 className="font-display text-xl text-foreground mb-2">Pensado para ti</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      Diseñado por mamás y papás que entienden lo que tu familia necesita.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Makers section */}
        <section className="py-11 md:py-[72px]">
          <div className="container">
            <div className="max-w-[900px] mx-auto">
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-7 text-center">
                Quiénes confeccionan
              </h2>
              <div
                className="relative"
                style={{ ...cardBase, background: "#F4EDE6" }}
                onMouseEnter={(e) => hoverProps(e, true)}
                onMouseLeave={(e) => hoverProps(e, false)}
              >
                <div className="absolute inset-[4px] pointer-events-none" style={{
                  border: "1.5px dashed hsl(30 30% 60% / 0.25)",
                  borderRadius: "2px"
                }} />
                <div className="relative p-8 md:p-12">
                  
                  <p className="text-lg text-muted-foreground font-light leading-relaxed mb-4">
                    Cada pijama lleva el nombre y el cuidado de artesanas que trabajan desde talleres locales en México. Para nosotros, no son proveedoras. Son colaboradoras. Son las manos que traen nuestros sueños a la realidad.
                  </p>
                  <p className="text-lg text-muted-foreground font-light leading-relaxed">
                    Cuando compras Papachoa, apoyas a mamás y papás mexicanos que merecen trabajar con dignidad, con tiempo para su familia, y con el reconocimiento de que su trabajo es valioso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-11 md:py-[72px]">
          <div className="container">
            <div
              className="relative max-w-[900px] mx-auto"
              style={{ ...cardBase, background: "#E8B8A6" }}
              onMouseEnter={(e) => hoverProps(e, true)}
              onMouseLeave={(e) => hoverProps(e, false)}
            >
              <div className="absolute inset-[4px] pointer-events-none" style={{
                border: "1.5px dashed hsl(14 52% 46% / 0.18)",
                borderRadius: "2px"
              }} />
              <div className="relative text-center p-10 md:p-14">
                
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                  Ser parte de Papachoa
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Nosotros;
