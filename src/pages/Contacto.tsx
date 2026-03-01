import { useState } from "react";
import { useSeo } from "@/hooks/useSeo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { brand } from "@/data/brand";

const Contacto = () => {
  useSeo({
    title: "Contacto | Papachoa México",
    description:
      "¿Tienes dudas sobre nuestros pijamas? Escríbenos. Estamos para ayudarte.",
    path: "/contacto",
  });
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast({
      title: "¡Mensaje enviado! 💌",
      description: "Te responderemos pronto. Gracias por escribirnos.",
    });
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main>
        <section
          className="relative overflow-hidden"
          style={{
            paddingTop: "clamp(7rem, 14vw, 11rem)",
            paddingBottom: "clamp(5rem, 10vw, 9rem)",
          }}
        >
          {/* Subtle decorative blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl"
              style={{ background: "hsl(var(--papachoa-magenta) / 0.08)" }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-2xl"
              style={{ background: "hsl(var(--papachoa-coral) / 0.06)" }}
            />
          </div>

          <div className="container relative z-10">
            <div className="max-w-[600px] mx-auto">
              {/* Heading */}
              <div className="text-center mb-10 md:mb-14">
                <h1
                  className="font-display text-foreground mb-4 leading-tight"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  }}
                >
                  ¿Tienes dudas? Escríbenos
                </h1>
                <p
                  className="text-muted-foreground font-light leading-relaxed mx-auto"
                  style={{
                    fontSize: "clamp(0.95rem, 1.4vw, 1.08rem)",
                    maxWidth: "480px",
                  }}
                >
                  Estamos aquí para ayudarte con tallas, envíos, pedidos
                  especiales o cualquier pregunta.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Nombre
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    maxLength={100}
                    className="bg-card border-border/50 rounded-xl px-4 py-3 h-auto focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                    maxLength={255}
                    className="bg-card border-border/50 rounded-xl px-4 py-3 h-auto focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    maxLength={1000}
                    rows={4}
                    className="bg-card border-border/50 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full py-6 text-base font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                  }}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar mensaje
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* WhatsApp CTA */}
              <div className="mt-10 text-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-sm text-muted-foreground font-light">
                    o
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <a
                  href={brand.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-foreground hover:text-primary transition-colors duration-200"
                  style={{ fontSize: "0.95rem" }}
                >
                  <MessageCircle
                    className="h-5 w-5"
                    style={{ color: "#25D366" }}
                  />
                  <span className="font-light">
                    O escríbenos directo por{" "}
                    <span className="font-medium underline underline-offset-2">
                      WhatsApp
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;
