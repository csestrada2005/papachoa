import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Privacidad = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Aviso de privacidad
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Tu privacidad es tan importante para nosotros como el cuidado que ponemos en cada producto. Aquí te explicamos cómo protegemos tu información.
              </p>
            </div>

            {/* Content */}
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border/30 space-y-10">
              
              {/* Compromiso */}
              <section className="bg-papachoa-sage/30 rounded-2xl p-6 -mx-2 md:mx-0">
                <p className="text-foreground leading-relaxed text-center font-medium">
                  🔒 Nos comprometemos a proteger y respetar tu información personal en todo momento.
                </p>
              </section>

              {/* Responsable */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  ¿Quién es responsable de tus datos?
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Papachoa México es responsable del tratamiento de tus datos personales. Este aviso de privacidad se emite en cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) vigente en México.
                  </p>
                </div>
              </section>

              {/* Datos que recopilamos */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  ¿Qué datos recopilamos?
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Para brindarte una experiencia de compra cálida y personalizada, podemos recopilar los siguientes datos:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-sage-mid mt-1">•</span>
                      <span><strong className="text-foreground">Datos de identificación:</strong> nombre completo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-sage-mid mt-1">•</span>
                      <span><strong className="text-foreground">Datos de contacto:</strong> correo electrónico, teléfono, dirección de envío</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-sage-mid mt-1">•</span>
                      <span><strong className="text-foreground">Datos de facturación:</strong> RFC y domicilio fiscal (solo si solicitas factura)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-sage-mid mt-1">•</span>
                      <span><strong className="text-foreground">Datos de navegación:</strong> información sobre cómo usas nuestro sitio (cookies)</span>
                    </li>
                  </ul>
                  <p>
                    No recopilamos datos sensibles como información de salud, religión, origen étnico u orientación sexual.
                  </p>
                </div>
              </section>

              {/* Finalidades */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  ¿Para qué usamos tus datos?
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Utilizamos tu información para los siguientes propósitos:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-2">Finalidades principales:</h3>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-papachoa-sage-mid mt-1">•</span>
                          <span>Procesar y entregar tu pedido</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-papachoa-sage-mid mt-1">•</span>
                          <span>Enviarte confirmaciones y actualizaciones de tu compra</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-papachoa-sage-mid mt-1">•</span>
                          <span>Atender tus preguntas y solicitudes de soporte</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-papachoa-sage-mid mt-1">•</span>
                          <span>Gestionar devoluciones o cambios</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-papachoa-sage-mid mt-1">•</span>
                          <span>Emitir facturas cuando las solicites</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-2">Finalidades secundarias (opcionales):</h3>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-papachoa-sage-mid mt-1">•</span>
                          <span>Enviarte nuestro newsletter con novedades y ofertas especiales</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-papachoa-sage-mid mt-1">•</span>
                          <span>Personalizar tu experiencia de compra</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-papachoa-sage-mid mt-1">•</span>
                          <span>Realizar encuestas de satisfacción</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p>
                    Puedes oponerte a las finalidades secundarias en cualquier momento sin que esto afecte tu relación con nosotros.
                  </p>
                </div>
              </section>

              {/* Compartir datos */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  ¿Compartimos tus datos?
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Solo compartimos tu información cuando es estrictamente necesario para brindarte nuestro servicio:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-sage-mid mt-1">•</span>
                      <span><strong className="text-foreground">Servicios de pago:</strong> para procesar tu compra de forma segura</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-sage-mid mt-1">•</span>
                      <span><strong className="text-foreground">Servicios de paquetería:</strong> para entregar tu pedido en tu domicilio</span>
                    </li>
                  </ul>
                  <p>
                    Nunca vendemos, alquilamos ni compartimos tu información con terceros para fines publicitarios ajenos a Papachoa.
                  </p>
                </div>
              </section>

              {/* Protección */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  ¿Cómo protegemos tus datos?
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información contra acceso no autorizado, pérdida o alteración. Nuestro sitio utiliza conexiones seguras (HTTPS) y trabajamos con proveedores de pago certificados.
                  </p>
                </div>
              </section>

              {/* Derechos ARCO */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  Tus derechos (ARCO)
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    De acuerdo con la ley mexicana, tienes derecho a:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-sage-mid mt-1">•</span>
                      <span><strong className="text-foreground">Acceder</strong> a tus datos personales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-sage-mid mt-1">•</span>
                      <span><strong className="text-foreground">Rectificar</strong> datos incorrectos o incompletos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-sage-mid mt-1">•</span>
                      <span><strong className="text-foreground">Cancelar</strong> tus datos cuando ya no sean necesarios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-papachoa-sage-mid mt-1">•</span>
                      <span><strong className="text-foreground">Oponerte</strong> al uso de tus datos para ciertos fines</span>
                    </li>
                  </ul>
                  <p>
                    Para ejercer cualquiera de estos derechos, simplemente contáctanos. Responderemos tu solicitud en un plazo máximo de 20 días hábiles.
                  </p>
                </div>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  Uso de cookies
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Utilizamos cookies para mejorar tu experiencia de navegación, recordar tus preferencias y entender cómo usas nuestro sitio. Puedes configurar tu navegador para rechazar cookies, aunque esto podría afectar algunas funcionalidades.
                  </p>
                </div>
              </section>

              {/* Cambios al aviso */}
              <section>
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                  Cambios a este aviso
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Podemos actualizar este aviso de privacidad ocasionalmente. Cualquier cambio importante será comunicado a través de nuestro sitio web o por correo electrónico.
                  </p>
                </div>
              </section>

              {/* Cierre */}
              <section className="pt-6 border-t border-border/50">
                <p className="text-foreground leading-relaxed">
                  Tu confianza es fundamental para nosotros. Si tienes cualquier pregunta sobre cómo manejamos tu información, no dudes en contactarnos. Estamos comprometidos con tu tranquilidad.
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

export default Privacidad;
