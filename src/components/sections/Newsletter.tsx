import { useState, useCallback } from "react";
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
        setMessage("Por favor, escribe un correo v\u00e1lido.");
        return;
      }

      setStatus("loading");
      setMessage("");

      await new Promise((r) => setTimeout(r, 800));

      const subs = getSubscribers();
      if (subs.includes(trimmed)) {
        setStatus("success");
        setMessage("Ya est\u00e1s en la lista.");
        setEmail("");
        toast({ title: "Ya est\u00e1s suscrito/a", description: "Este correo ya est\u00e1 en nuestra lista." });
        return;
      }

      subs.push(trimmed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));

      setStatus("success");
      setMessage("Listo. Te avisaremos con novedades suaves.");
      setEmail("");
      toast({ title: "Suscripci\u00f3n exitosa", description: "Recibir\u00e1s noticias en tu correo." });
    },
    [email],
  );

  const isLoading = status === "loading";

  return (
    <section className="py-24 md:py-32 section-indigo relative overflow-hidden texture-linen texture-woven">
      {/* Embroidered sun — subtle */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-[0.04]" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="60" fill="none" stroke="hsl(38 60% 62%)" strokeWidth="0.6" strokeDasharray="3 5" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(38 60% 62%)" strokeWidth="0.4" strokeDasharray="4 7" />
      </svg>

      <div className="container relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: "hsl(38 60% 62%)" }}>
            Newsletter
          </p>

          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Recibe noticias <em style={{ color: "hsl(38 60% 62%)" }}>suaves</em>
          </h2>
          <p className="mb-4 text-base font-light leading-relaxed" style={{ color: "hsl(38 20% 72%)" }}>
            Nuevos lanzamientos, colecciones especiales
            y consejos para el descanso familiar.
          </p>

          <div className="embroidery-line w-16 mx-auto mb-8" />

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
              className="flex-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-sm px-5 py-5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 focus:border-white/30 disabled:opacity-60"
              required
              aria-describedby="newsletter-msg"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn-artisan disabled:opacity-70 disabled:hover:translate-y-0 whitespace-nowrap"
            >
              {isLoading ? "Suscribiendo\u2026" : "Suscribirme"}
            </button>
          </form>

          {/* Feedback */}
          <div id="newsletter-msg" className="h-6 mt-4" aria-live="polite">
            {message && (
              <p className={`text-sm font-medium animate-fade-in ${
                status === "error" ? "text-red-400" : "text-emerald-400"
              }`}>
                {message}
              </p>
            )}
          </div>

          <p className="text-xs mt-2 tracking-wide" style={{ color: "hsl(38 20% 55%)" }}>
            Sin spam. Solo apapacho.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
