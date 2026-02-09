import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const STORAGE_KEY = "papachoa_newsletter_subscribers";

type Status = "idle" | "loading" | "success" | "error";

function getSubscribers(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = email.trim();

      if (!EMAIL_RE.test(trimmed)) {
        setStatus("error");
        setMessage("Por favor, escribe un correo válido.");
        return;
      }

      setStatus("loading");
      setMessage("");

      // Simulate async registration
      await new Promise((r) => setTimeout(r, 800));

      const subs = getSubscribers();
      if (subs.includes(trimmed)) {
        setStatus("success");
        setMessage("Ya estás en la lista 💛");
        setEmail("");
        toast({ title: "Ya estás suscrito/a", description: "Este correo ya está en nuestra lista 💛" });
        return;
      }

      subs.push(trimmed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));

      setStatus("success");
      setMessage("¡Listo! Te avisaremos con novedades suaves. 💛");
      setEmail("");
      toast({ title: "¡Suscripción exitosa!", description: "Recibirás noticias suaves en tu correo ✨" });
    },
    [email],
  );

  const isLoading = status === "loading";

  return (
    <section className="py-24 md:py-32 bg-papachoa-blush/40 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-papachoa-sky/40 blob-shape pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-papachoa-sage/40 blob-shape-2 pointer-events-none" />

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
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setMessage("");
                }
              }}
              disabled={isLoading}
              className="flex-1 bg-card border-0 rounded-full px-6 py-6 text-foreground placeholder:text-muted-foreground shadow-sm focus:ring-2 focus:ring-papachoa-blush-dark disabled:opacity-60"
              required
              aria-describedby="newsletter-msg"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-papachoa-warm-brown text-card hover:bg-papachoa-warm-brown/90 rounded-full px-8 py-6 font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? "Suscribiendo…" : "Suscribirme"}
            </Button>
          </form>

          {/* Feedback message */}
          <div id="newsletter-msg" className="h-6 mt-4" aria-live="polite">
            {message && (
              <p
                className={`text-sm font-medium animate-fade-in ${
                  status === "error"
                    ? "text-papachoa-warm-brown"
                    : "text-papachoa-sage-dark"
                }`}
              >
                {message}
              </p>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            Sin spam. Solo apapacho. ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
