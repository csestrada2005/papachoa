import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sections = [
  {
    id: "uso",
    title: "1. Uso del sitio",
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Al navegar y utilizar este sitio web, aceptas estos términos y condiciones. Nuestro sitio está diseñado para ofrecerte una experiencia de compra cálida y sencilla.
        </p>
        <p>
          Te pedimos que utilices el sitio de manera responsable, respetando las normas de convivencia y sin realizar actividades que puedan dañar el funcionamiento del mismo.
        </p>
      </div>
    ),
  },
  {
    id: "productos",
    title: "2. Productos y precios",
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Todos nuestros productos están hechos con amor y cuidado. Las imágenes y descripciones reflejan fielmente lo que recibirás, aunque pueden existir pequeñas variaciones naturales de color dependiendo de tu pantalla.
        </p>
        <p>
          Los precios están expresados en pesos mexicanos (MXN) e incluyen IVA. Nos reservamos el derecho de modificar precios sin previo aviso, aunque los pedidos confirmados se respetarán al precio vigente en el momento de la compra.
        </p>
      </div>
    ),
  },
  {
    id: "pagos",
    title: "3. Pagos",
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Aceptamos diversos métodos de pago para tu comodidad: tarjetas de crédito y débito (Visa, Mastercard, American Express), así como pagos en efectivo a través de OXXO y transferencias vía SPEI.
        </p>
        <p>
          Tu información de pago se procesa de forma segura a través de plataformas certificadas. Nunca almacenamos los datos de tu tarjeta en nuestros servidores.
        </p>
      </div>
    ),
  },
  {
    id: "envios",
    title: "4. Envíos",
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Realizamos envíos a toda la República Mexicana. El tiempo de entrega varía según tu ubicación, generalmente entre 3 y 7 días hábiles después de confirmar tu pago.
        </p>
        <p>
          Recibirás un correo con la guía de rastreo para que puedas seguir tu paquete en todo momento. Si tienes alguna duda sobre tu envío, estamos aquí para ayudarte.
        </p>
      </div>
    ),
  },
  {
    id: "propiedad",
    title: "5. Propiedad intelectual",
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Todo el contenido de este sitio —imágenes, textos, logotipos, diseños y demás elementos— es propiedad de Papachoa México y está protegido por las leyes de propiedad intelectual aplicables en México.
        </p>
        <p>
          No está permitido reproducir, distribuir o utilizar nuestro contenido sin autorización previa por escrito.
        </p>
      </div>
    ),
  },
  {
    id: "modificaciones",
    title: "6. Modificaciones",
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Podemos actualizar estos términos ocasionalmente para reflejar cambios en nuestras prácticas o por requerimientos legales. Te recomendamos revisar esta página periódicamente.
        </p>
      </div>
    ),
  },
];

const Terminos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Términos y condiciones
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                La transparencia y la confianza son parte de lo que somos. Aquí te explicamos de forma clara cómo funciona nuestra tienda.
              </p>
            </div>

            {/* Accordion Content */}
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-sm border border-border/30">
              <Accordion type="single" collapsible className="space-y-3">
                {sections.map((section) => (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    className="bg-background/50 rounded-2xl border border-border/30 px-5 md:px-6 data-[state=open]:bg-papachoa-cream/50 transition-colors"
                  >
                    <AccordionTrigger className="py-5 md:py-6 hover:no-underline group">
                      <span className="font-display text-lg md:text-xl text-foreground text-left pr-4">
                        {section.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      {section.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Cierre */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-foreground leading-relaxed">
                  Gracias por confiar en Papachoa. Cada compra nos ayuda a seguir creando productos suaves, seguros y llenos de cariño para tu familia. Si tienes cualquier pregunta, no dudes en contactarnos.
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

export default Terminos;
