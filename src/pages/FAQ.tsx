import { useSeo } from "@/hooks/useSeo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "papachoa",
    question: "¿Qué es Papachoa?",
    answer: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Papachoa nació con una misión simple: crear pijamas y cobijos ultra suaves pensados por mamás, para mamás (y para toda la familia).
        </p>
        <p>
          Creemos que la suavidad y la calidad no tienen que ser un lujo inalcanzable. Cada prenda está hecha con cuidado y amor, pensando en esos momentos de descanso, apapacho y conexión en familia que hacen la vida más cálida.
        </p>
      </div>
    ),
  },
  {
    id: "materiales",
    question: "¿De qué materiales están hechas las pijamas?",
    answer: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Usamos telas cuidadosamente seleccionadas por su suavidad, comodidad y durabilidad. Nuestras pijamas están hechas con fibras naturales y mezclas que respetan la piel delicada, especialmente la de los bebés.
        </p>
        <p>
          Cada material es testado para garantizar que sea seguro, hipoalergénico y capaz de mantener su suavidad incluso después de múltiples lavados. No usamos tóxicos ni químicos agresivos.
        </p>
      </div>
    ),
  },
  {
    id: "talla",
    question: "¿Cómo elijo la talla correcta?",
    answer: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Cada prenda incluye una guía de tallas clara con medidas en centímetros. Te recomendamos medir el pecho y la largo del torso de la persona, y comparar con nuestra tabla.
        </p>
        <p>
          Si tienes dudas, siempre puedes escribirnos. Queremos que encuentres la talla perfecta para máxima comodidad. Para bebés, recomendamos talla por edad como referencia, pero la medida es lo más seguro.
        </p>
      </div>
    ),
  },
  {
    id: "familia",
    question: "¿Las pijamas son para toda la familia?",
    answer: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          ¡Sí! Tenemos colecciones para recién nacidos, bebés, niños, adultos y toda la familia. Uno de nuestros favoritos es poder "matching" —usar pijamas iguales todos juntos.
        </p>
        <p>
          Creemos que los momentos de descanso en familia son especiales, y qué mejor que vivirlos vestidos con la misma suavidad y estilo. Es un regalo perfecto para crear esos recuerdos de apapacho.
        </p>
      </div>
    ),
  },
  {
    id: "cuidado",
    question: "¿Cómo debo cuidar mi prenda?",
    answer: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Cada prenda viene con instrucciones de cuidado en la etiqueta. En general, recomendamos:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Lavar con agua tibia en ciclo suave.</li>
          <li>Usar detergentes suaves, sin blanqueadores.</li>
          <li>Secar al aire o a baja temperatura.</li>
          <li>Evitar la secadora de calor alto para prolongar la vida de la prenda.</li>
        </ul>
        <p>
          Con estos cuidados simples, tu pijama Papachoa mantendrá su suavidad y frescura durante años.
        </p>
      </div>
    ),
  },
  {
    id: "envios",
    question: "¿Hacen envíos a toda la República Mexicana?",
    answer: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Sí, realizamos envíos a toda la República Mexicana. Ya sea que vivas en una ciudad grande o en un pueblito, tu pedido de Papachoa puede llegar a ti.
        </p>
        <p>
          Trabajamos con transportistas confiables para garantizar que tu compra llegue en perfecto estado y en el tiempo estimado.
        </p>
      </div>
    ),
  },
  {
    id: "tiempo-entrega",
    question: "¿Cuánto tarda mi pedido en llegar?",
    answer: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Después de que tu pago sea confirmado, tu pedido se prepara con cuidado y es enviado en los siguientes días hábiles.
        </p>
        <p>
          El tiempo de entrega depende de tu ubicación, pero generalmente es entre 3 y 7 días hábiles. Una vez que tu paquete está en camino, recibirás un correo con la guía de rastreo para que puedas seguirlo en todo momento.
        </p>
      </div>
    ),
  },
  {
    id: "regalo",
    question: "¿Puedo regalar Papachoa?",
    answer: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          ¡Claro que sí! Papachoa es un regalo perfecto para cualquier ocasión: baby shower, cumpleaños, Navidad o simplemente "porque te quiero".
        </p>
        <p>
          Nuestras pijamas vienen en presentaciones hermosas y llenas de cuidado. Regalar Papachoa es regalar momentos de suavidad, descanso y apapacho en familia. ¿Hay algo más bonito?
        </p>
      </div>
    ),
  },
  {
    id: "cambios-devoluciones",
    question: "¿Cuál es su política de cambios y devoluciones?",
    answer: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Queremos que estés feliz con tu compra. Si la prenda no es lo que esperabas, tienes 30 días a partir de la recepción para solicitar un cambio o devolución.
        </p>
        <p>
          La prenda debe estar sin usar, en perfecto estado y con su etiqueta intacta. Entendemos que a veces el tamaño no es el correcto o los colores se ven diferentes en persona.
        </p>
        <p>
          Para más detalles, consulta nuestra Política de Devolución completa en el sitio.
        </p>
      </div>
    ),
  },
  {
    id: "contacto",
    question: "¿Cómo puedo contactarlos?",
    answer: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Adoramos hablar con nuestros clientes. Puedes contactarnos a través de:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Nuestras redes sociales: Instagram y Facebook @papachoamx</li>
          <li>Formulario de contacto en la sección Contacto del sitio.</li>
          <li>Correo directo (detalles en la página de Contacto).</li>
        </ul>
        <p>
          Nos esforzamos por responder dentro de 24-48 horas. Tu pregunta es importante para nosotros.
        </p>
      </div>
    ),
  },
];

const FAQ = () => {
  useSeo({ title: "Preguntas Frecuentes | Papachoa México", description: "Resolvemos tus dudas sobre pijamas Papachoa: tallas, materiales, envíos, devoluciones y más.", path: "/faq" });
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Preguntas frecuentes
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Aquí respondemos las dudas más comunes para que te sientas seguro y tranquilo con tu compra en Papachoa.
              </p>
            </div>

            {/* Accordion Content */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-sm border border-border/30">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="bg-background/50 rounded-2xl border border-border/30 px-5 md:px-6 data-[state=open]:bg-papachoa-cream/50 transition-colors"
                  >
                    <AccordionTrigger className="py-5 md:py-6 hover:no-underline group">
                      <span className="font-display text-lg md:text-xl text-foreground text-left pr-4">
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Closing */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-foreground leading-relaxed">
                  ¿No encontraste tu respuesta? No dudes en escribirnos. Estamos aquí para ayudarte a disfrutar de Papachoa al máximo.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Última actualización: Febrero 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
