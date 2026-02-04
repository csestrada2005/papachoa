import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-24 md:py-32 bg-papachoa-blush/40 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-papachoa-sky/40 blob-shape" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-papachoa-sage/40 blob-shape-2" />

      <div className="container relative">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-block bg-card px-4 py-2 rounded-full mb-8 shadow-sm">
            <span className="text-2xl">💌</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Recibe noticias <span className="italic">suaves</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Como nuestros productos. Nuevos lanzamientos, colecciones especiales
            y consejos para el descanso familiar.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-card border-0 rounded-full px-6 py-6 text-foreground placeholder:text-muted-foreground shadow-sm focus:ring-2 focus:ring-papachoa-blush-dark"
              required
            />
            <Button
              type="submit"
              className="bg-papachoa-warm-brown text-card hover:bg-papachoa-warm-brown/90 rounded-full px-8 py-6 font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Suscribirme
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-6">
            Sin spam. Solo apapacho. ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
