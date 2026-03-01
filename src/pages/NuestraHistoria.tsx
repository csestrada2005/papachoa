import { useSeo } from "@/hooks/useSeo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionReveal from "@/components/ui/SectionReveal";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import texturaImg from "@/assets/textura-tela.png";
import texturaDoodle from "@/assets/textura-doodle.png";
import pijamaRosa3 from "@/assets/pijama-rosa-3-jugando.jpg";
import pijamaBlanca4 from "@/assets/pijama-blanca-4-abrazo.jpg";
import pijamadinosaurio3 from "@/assets/pijama-dinosaurio-3-papa-upside.jpg";
import pijamaRosa9 from "@/assets/pijama-rosa-9-acostados.jpg";

const stories = [
  {
    num: "01",
    title: "Primeros pasos juntos",
    body: "Una pijama que crece contigo. Desde su primera noche en casa hasta sus primeras travesuras, cada hilo los acompaña.",
    accentColor: "hsl(var(--papachoa-coral))",
    img: pijamaRosa3,
    imgAlt: "Mamá e hija jugando en pijama",
  },
  {
    num: "02",
    title: "Complicidad de dos",
    body: "Papá y su aventurera favorita. Pijamas que cuentan la historia de noches de cuentos, cosquillas y mundos inventados.",
    accentColor: "hsl(var(--papachoa-yellow))",
    img: pijamadinosaurio3,
    imgAlt: "Papá jugando con su hija en pijama de dinosaurios",
  },
  {
    num: "03",
    title: "Ritual de calma",
    body: "Cuando la casa se queda quieta y todos respiran al mismo ritmo. Ese momento antes de dormir donde solo importa estar juntos.",
    accentColor: "hsl(var(--papachoa-blue))",
    img: pijamaBlanca4,
    imgAlt: "Abrazo familiar antes de dormir",
  },
];

const qualities = [
  { text: "Telas seleccionadas pieza por pieza — sin atajos.", offset: "0%" },
  { text: "Ultra suaves desde el primer lavado, sin ablandar.", offset: "8%" },
  { text: "Sin químicos agresivos. Aptas para piel de bebé.", offset: "2%" },
  { text: "Diseñadas para abrazar sin apretar. Sin rigidez.", offset: "10%" },
  { text: "Respiran con tu cuerpo toda la noche.", offset: "5%" },
];

const NuestraHistoria = () => {
  useSeo({
    title: "Nuestra Historia | Papachoa México",
    description: "Conoce la historia detrás de Papachoa: materiales, procesos y el amor que ponemos en cada prenda hecha en México.",
    path: "/nuestra-historia",
  });

  const { data: shopifyProducts } = useShopifyProducts();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-8 md:pb-14">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-block mb-5">
                <div className="px-5 py-2" style={{ border: "1.5px dashed hsl(14 52% 46% / 0.22)", borderRadius: "2px" }}>
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary font-medium">
                    De hilo en hilo
                  </span>
                </div>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-5 leading-tight">
                Nuestra <em className="text-primary">historia</em>
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

        {/* Stories */}
        <section className="py-16 md:py-24" style={{ background: "#F5F0FF" }}>
          <div className="container">
            <SectionReveal>
              <h2 className="font-bold text-foreground leading-none mb-16" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
                Historias en cada hilo
              </h2>
            </SectionReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {stories.map((story, i) => (
                <SectionReveal key={story.num} delay={100 + i * 100}>
                  <div>
                    <span className="block font-bold leading-none mb-3 select-none" style={{ fontSize: "3rem", color: story.accentColor, opacity: 0.2 }} aria-hidden="true">
                      {story.num}
                    </span>
                    <h3 className="font-display text-foreground mb-2" style={{ fontSize: "1.4rem", letterSpacing: "0.05em" }}>
                      {story.title}
                    </h3>
                    <p className="font-light text-muted-foreground leading-relaxed mb-4">{story.body}</p>
                    <div className="overflow-hidden rounded-xl mx-auto" style={{ aspectRatio: "3/4", maxWidth: "80%" }}>
                      <img src={story.img} alt={story.imgAlt} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Materiales */}
        <section id="materiales" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="flex items-start justify-between mb-16 gap-8">
              <SectionReveal>
                <div>
                  <p className="font-display text-primary mb-3" style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}>
                    La diferencia que se siente
                  </p>
                  <h2 className="font-bold text-foreground leading-none" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
                    La prueba de suavidad
                  </h2>
                </div>
              </SectionReveal>
              <SectionReveal delay={80} className="hidden lg:block flex-shrink-0">
                <div className="overflow-hidden opacity-40" style={{ width: "clamp(80px, 10vw, 140px)", aspectRatio: "1/1" }}>
                  <img src={texturaDoodle} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </SectionReveal>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
              <SectionReveal delay={60} className="lg:col-span-5">
                <div className="relative mx-auto" style={{ maxWidth: "80%" }}>
                  <div className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <img src={pijamaRosa9} alt="Detalle de suavidad de tela Papachoa" className="w-full h-full object-cover" loading="lazy" width={480} height={640} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}>
                    <p className="font-display text-white leading-snug" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}>
                      "Tan suave como un apapacho."
                    </p>
                  </div>
                </div>
              </SectionReveal>

              <div className="lg:col-span-6 lg:col-start-7">
                {qualities.map((q, i) => (
                  <SectionReveal key={i} delay={100 + i * 80}>
                    <div className="flex items-start gap-5 py-5 border-b border-border/20" style={{ paddingLeft: q.offset }}>
                      <span className="flex-shrink-0 font-bold text-foreground/10 select-none" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.1, minWidth: "2rem" }} aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 pt-1">
                        <span className="text-primary mr-2" style={{ fontSize: "0.65rem" }} aria-hidden="true">★</span>
                        <span className="text-foreground font-light leading-relaxed" style={{ fontSize: "clamp(0.93rem, 1.4vw, 1.02rem)" }}>
                          {q.text}
                        </span>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products from Shopify */}
        {shopifyProducts && shopifyProducts.length > 0 && (
          <section className="py-16 md:py-24 bg-background">
            <div className="container">
              <SectionReveal>
                <h2 className="font-bold text-foreground leading-none mb-4 text-center" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                  Nuestros productos
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
                  Cada prenda tiene una historia. Conoce los materiales y detalles que hacen especial a cada producto.
                </p>
              </SectionReveal>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {shopifyProducts.filter(p => p.image !== "/placeholder.svg").slice(0, 6).map((product, i) => (
                  <SectionReveal key={product.id} delay={i * 80}>
                    <div className="bg-card rounded-2xl border border-border/30 overflow-hidden">
                      <div className="aspect-video overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-lg text-foreground mb-2">{product.name}</h3>
                        {product.longDescription && (
                          <div
                            className="text-sm text-muted-foreground leading-relaxed line-clamp-4 prose prose-sm max-w-none [&>p]:mb-2"
                            dangerouslySetInnerHTML={{ __html: product.longDescription }}
                          />
                        )}
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default NuestraHistoria;
