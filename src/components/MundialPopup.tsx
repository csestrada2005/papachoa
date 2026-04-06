import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

const MundialPopup = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data: products = [] } = useShopifyProducts();

  const mundialProduct = products.find((p) => p.collection === "mundial");
  const heroImage = mundialProduct?.image;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Por favor ingresa un correo válido");
      return;
    }
    if (!accepted) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("subscribers").insert({
      email,
      accepted_terms: true,
    } as any);
    setSubmitting(false);
    if (error) {
      if (error.code === "23505") {
        toast.info("Ya estás suscrito 🎉");
        setSuccess(true);
      } else {
        toast.error("Ocurrió un error. Intenta de nuevo.");
      }
      return;
    }
    setSuccess(true);
    toast.success("¡Gracias por suscribirte! Pronto tendrás noticias de Papachoa 🎉");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ pointerEvents: "auto" }}>
      <div
        className="absolute inset-0"
        style={{ background: "rgba(253,246,240,0.7)", backdropFilter: "blur(6px)" }}
        onClick={() => setVisible(false)}
      />

      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden border border-border/20"
        style={{
          background: "hsl(var(--card))",
          boxShadow: "0 20px 60px -10px rgba(0,0,0,0.15)",
          animation: "mundial-pop 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
        }}
      >
        {/* Animated footballs background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${10 + i * 15}%`,
                top: `${-10 + (i % 3) * 30}%`,
                animation: `float-ball ${3 + i * 0.5}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.4}s`,
                opacity: 0.15,
              }}
            >
              ⚽
            </span>
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full border border-border/30 bg-background/80 backdrop-blur-sm"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4 text-foreground/60" />
        </button>

        {/* Hero image */}
        {heroImage && (
          <div className="w-full h-44 overflow-hidden">
            <img
              src={heroImage}
              alt="Colección Mundial Papachoa"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        )}

        <div className="relative z-10 p-6 pt-5">
          {success ? (
            <div className="text-center py-4">
              <p className="text-4xl mb-3">🎉</p>
              <h3 className="font-display text-xl text-foreground mb-2">¡Gracias por suscribirte!</h3>
              <p className="text-sm text-muted-foreground mb-4">Pronto tendrás noticias de Papachoa</p>
              <Link
                to="/catalogo?categoria=mundial"
                onClick={() => setVisible(false)}
                className="inline-block px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all"
                style={{ background: "hsl(160 50% 42%)" }}
              >
                Ver colección Mundial
              </Link>
            </div>
          ) : (
            <>
              <h3 className="font-display text-xl text-foreground mb-1 text-center">
                Nueva Colección Mundial 🌍⚽
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-5">
                Espera descuentos exclusivos y novedades antes que nadie.
              </p>

              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border text-sm bg-background outline-none focus:ring-2 focus:ring-primary/30 mb-3"
                style={{ borderColor: "hsl(var(--border))" }}
              />

              <label className="flex items-start gap-2 mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-0.5 accent-primary"
                />
                <span className="text-xs text-muted-foreground leading-snug">
                  Acepto los{" "}
                  <Link to="/terminos" className="underline text-primary" onClick={() => setVisible(false)}>
                    términos y condiciones
                  </Link>{" "}
                  y el{" "}
                  <Link to="/privacidad" className="underline text-primary" onClick={() => setVisible(false)}>
                    aviso de privacidad
                  </Link>{" "}
                  de Papachoa.
                </span>
              </label>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-60"
                style={{ background: "hsl(var(--primary))" }}
              >
                {submitting ? "Suscribiendo..." : "Suscribirme"}
              </button>

              <div className="flex items-center justify-center gap-4 mt-3">
                <Link
                  to="/catalogo?categoria=mundial"
                  onClick={() => setVisible(false)}
                  className="text-xs text-primary hover:underline"
                >
                  Ver colección →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes mundial-pop {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes float-ball {
          from { transform: translateY(0px) rotate(0deg); }
          to { transform: translateY(20px) rotate(15deg); }
        }
      `}</style>
    </div>
  );
};

export default MundialPopup;
