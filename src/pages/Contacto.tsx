import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast({
      title: "¡Mensaje enviado! 💌",
      description: "Te responderemos pronto. Gracias por escribirnos.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const whatsappNumber = "5215512345678"; // Replace with actual number
  const whatsappMessage = encodeURIComponent(
    "¡Hola! Me gustaría saber más sobre Papachoa."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main>
        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-12 md:pb-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-papachoa-sky/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-papachoa-blush/20 rounded-full blur-2xl" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 leading-tight">
                ¿Platicamos?
              </h1>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Estamos aquí para ayudarte. Escríbenos y te contestamos pronto, con calma y con gusto.
              </p>
            </div>
          </div>
        </section>

        {/* Contact options */}
        <section className="pb-16 md:pb-24">
          <div className="container">
            <div className="max-w-xl mx-auto">
              {/* Quick contact buttons */}
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {/* WhatsApp - Primary */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-papachoa-sage rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <div className="w-12 h-12 bg-card/60 rounded-xl flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-display text-foreground">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Respuesta rápida</p>
                  </div>
                </a>

                {/* Email - Secondary */}
                <a
                  href="mailto:hola@papachoa.mx"
                  className="flex items-center gap-4 p-5 bg-papachoa-blush/50 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <div className="w-12 h-12 bg-card/60 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-papachoa-blush-dark" />
                  </div>
                  <div>
                    <p className="font-display text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">hola@papachoa.mx</p>
                  </div>
                </a>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-12">
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">o déjanos un mensaje</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Contact form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Tu nombre
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="¿Cómo te llamas?"
                    required
                    maxLength={100}
                    className="bg-card border-border/50 rounded-xl px-4 py-3 h-auto focus:ring-2 focus:ring-papachoa-blush-dark"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Tu email
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
                    className="bg-card border-border/50 rounded-xl px-4 py-3 h-auto focus:ring-2 focus:ring-papachoa-blush-dark"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Tu mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    maxLength={1000}
                    rows={5}
                    className="bg-card border-border/50 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-papachoa-blush-dark"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-papachoa-warm-brown hover:bg-papachoa-warm-brown/90 text-card font-semibold py-6 rounded-full text-base hover:scale-[1.02] active:scale-[0.98] transition-transform"
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

              {/* Footer note */}
              <p className="text-center text-sm text-muted-foreground mt-8">
                Te responderemos con calma. Sin prisas, pero sin pausa. ✨
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;
