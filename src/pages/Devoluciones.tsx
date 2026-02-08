import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Devoluciones = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Política de devolución
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Queremos que estés completamente feliz con tu compra. Si algo no salió como esperabas, estamos aquí para ayudarte.
              </p>
            </div>

            {/* Content */}
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border/30 space-y-10">
              
              {/* Nuestra promesa */}
              <section className="bg-papachoa-blush/30 rounded-2xl p-6 -mx-2 md:mx-0">
                <p className="text-foreground leading-relaxed text-center font-medium">
                  💛 Nuestra promesa: si no estás satisfecho con tu producto, haremos todo lo posible para solucionarlo.
                </p>
              </section>

              {/* Plazo para devoluciones */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  Plazo para devoluciones
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Tienes <strong className="text-foreground">30 días naturales</strong> a partir de la fecha de entrega para solicitar una devolución o cambio. Pasado este plazo, lamentablemente no podremos procesar tu solicitud.
                  </p>
                </div>
              </section>

              {/* Condiciones del producto */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  Condiciones del producto
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Para que podamos aceptar tu devolución, el producto debe cumplir con estas condiciones:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-blush-dark mt-1">•</span>
                      <span>Estar sin usar y en su empaque original</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-blush-dark mt-1">•</span>
                      <span>Conservar todas las etiquetas originales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-blush-dark mt-1">•</span>
                      <span>No presentar signos de uso, lavado o alteraciones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-blush-dark mt-1">•</span>
                      <span>Incluir el comprobante de compra</span>
                    </li>
                  </ul>
                  <p>
                    Entendemos que necesitas ver y tocar el producto para asegurarte de que es perfecto. Puedes probarlo con cuidado, siempre y cuando no lo uses de manera prolongada.
                  </p>
                </div>
              </section>

              {/* Proceso de devolución */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  ¿Cómo hago una devolución?
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    El proceso es muy sencillo:
                  </p>
                  <ol className="space-y-3 ml-4">
                    <li className="flex items-start gap-3">
                      <span className="bg-papachoa-blush text-foreground font-display text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                      <span>Contáctanos por correo o WhatsApp indicando tu número de pedido y el motivo de la devolución.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-papachoa-blush text-foreground font-display text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                      <span>Te enviaremos una guía prepagada para que puedas enviar el producto sin costo adicional.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-papachoa-blush text-foreground font-display text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                      <span>Una vez que recibamos y verifiquemos el producto, procesaremos tu reembolso o cambio en un plazo de 5 a 10 días hábiles.</span>
                    </li>
                  </ol>
                </div>
              </section>

              {/* Cambios */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  Cambios de talla o modelo
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Si necesitas cambiar la talla o el modelo, con gusto te ayudamos. El proceso es el mismo que para devoluciones. Si el nuevo producto tiene un precio diferente, te indicaremos cómo proceder con la diferencia.
                  </p>
                </div>
              </section>

              {/* Reembolsos */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  Reembolsos
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Los reembolsos se realizan al mismo método de pago que utilizaste en tu compra original. El tiempo en que verás reflejado el dinero puede variar según tu banco o institución financiera, generalmente entre 5 y 15 días hábiles.
                  </p>
                  <p>
                    El costo de envío original no es reembolsable, excepto en casos donde el producto llegó dañado o con algún defecto de fábrica.
                  </p>
                </div>
              </section>

              {/* Productos dañados */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  Productos dañados o defectuosos
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Si recibiste un producto dañado o con algún defecto, por favor contáctanos de inmediato. Envíanos fotos del problema y lo resolveremos lo más pronto posible, ya sea con un reemplazo o un reembolso completo incluyendo los gastos de envío.
                  </p>
                </div>
              </section>

              {/* Cierre */}
              <section className="pt-6 border-t border-border/50">
                <p className="text-foreground leading-relaxed">
                  Tu satisfacción es muy importante para nosotros. Si tienes cualquier duda o inquietud sobre tu compra, no dudes en contactarnos. Estamos aquí para ayudarte con una sonrisa.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Última actualización: Febrero 2026
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Devoluciones;
