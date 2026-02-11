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
    <section className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(15 50% 90%) 0%, hsl(195 50% 90%) 50%, hsl(145 35% 88%) 100%)" }}>
      {/* Fun doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-8 right-8 w-28 h-28 bg-papachoa-sky/30 blob-shape animate-float" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-papachoa-sage/30 blob-shape-2" />
        <span className="absolute top-12 left-12 text-3xl opacity-30 animate-wiggle hidden md:block">💌</span>
        <span className="absolute bottom-16 right-12 text-2xl opacity-25 animate-float hidden md:block">✨</span>
        <span className="absolute top-1/2 right-8 text-xl opacity-20 hidden md:block">⭐</span>
      </div>

      <div className="container relative">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center bg-card w-16 h-16 rounded-full mb-8 shadow-md border-2 border-papachoa-blush/30 animate-wiggle">
            <span className="text-3xl">💌</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Recibe noticias{" "}
            <span className="italic text-papachoa-blush-dark relative inline-block">
              suaves
              <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0 6 Q12 0 25 6 Q37 12 50 6 Q62 0 75 6 Q87 12 100 6" fill="none" stroke="hsl(15 40% 60%)" strokeWidth="2.5" />
              </svg>
            </span>
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Como nuestros productos. Nuevos lanzamientos, colecciones especiales
            y consejos para el descanso familiar. ✨
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
              className="flex-1 bg-card border-2 border-papachoa-blush/30 rounded-full px-6 py-6 text-foreground placeholder:text-muted-foreground shadow-sm focus:ring-2 focus:ring-papachoa-blush-dark focus:border-papachoa-blush-mid disabled:opacity-60"
              required
              aria-describedby="newsletter-msg"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-papachoa-warm-brown text-card hover:bg-papachoa-warm-brown/90 rounded-full px-8 py-6 font-bold shadow-lg hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? "Suscribiendo…" : "Suscribirme 💛"}
            </Button>
          </form>

          {/* Feedback message */}
          <div id="newsletter-msg" className="h-6 mt-4" aria-live="polite">
            {message && (
              <p
                className={`text-sm font-medium animate-fade-in ${
                  status === "error"
                    ? "text-papachoa-warm-brown"
                    : "text-accent-foreground"
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
