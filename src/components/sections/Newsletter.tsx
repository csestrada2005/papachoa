import { useState, useCallback, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useParallax } from "@/hooks/useParallax";
import { useDrawOnScroll } from "@/hooks/useDrawOnScroll";

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

// Confetti particle component
const Confetti = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = [
      "hsl(14, 52%, 46%)",   // terracotta
      "hsl(38, 60%, 52%)",   // marigold
      "hsl(162, 22%, 42%)",  // jade
      "hsl(348, 28%, 68%)",  // rose
      "hsl(38, 30%, 90%)",   // cream
    ];

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      w: number; h: number; rot: number; vr: number;
      color: string; life: number;
    }

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 100,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 8,
      vy: -Math.random() * 10 - 3,
      w: Math.random() * 8 + 4,
      h: Math.random() * 4 + 2,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    }));

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.rot += p.vr;
        p.life -= 0.012;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (alive) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const parallaxRef = useParallax(0.15);
  const stitchRef = useDrawOnScroll(0.4);

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
        setMessage("Ya estás en la lista.");
        setEmail("");
        toast({ title: "Ya estás suscrito/a", description: "Este correo ya está en nuestra lista." });
        return;
      }

      subs.push(trimmed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));

      setStatus("success");
      setMessage("🎉 ¡Bienvenida al club! Tu código: APAPACHO10");
      setEmail("");
      setShowConfetti(true);
      toast({
        title: "¡Bienvenida al club de mamás apapacho!",
        description: "Usa el código APAPACHO10 para un 10% en tu primer pedido.",
      });

      setTimeout(() => setShowConfetti(false), 3000);
    },
    [email],
  );

  const isLoading = status === "loading";

  return (
    <section className="py-24 md:py-32 section-indigo relative overflow-hidden texture-linen texture-woven">
      <Confetti active={showConfetti} />

      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-[0.04]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="60" fill="none" stroke="hsl(38 60% 62%)" strokeWidth="0.6" strokeDasharray="3 5" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(38 60% 62%)" strokeWidth="0.4" strokeDasharray="4 7" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: "hsl(38 60% 62%)" }}>
            Club exclusivo
          </p>

          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Únete al club de mamás <em style={{ color: "hsl(38 60% 62%)" }}>apapacho</em>
          </h2>
          <p className="mb-2 text-base font-light leading-relaxed" style={{ color: "hsl(38 20% 72%)" }}>
            Nuevos lanzamientos, colecciones especiales
            y consejos para el descanso familiar.
          </p>
          <p className="mb-6 text-sm font-medium" style={{ color: "hsl(38 60% 62%)" }}>
            ✨ 10% de descuento en tu primer pedido al suscribirte
          </p>

          <div ref={stitchRef} className="embroidery-line w-16 mx-auto mb-8" />

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
            <div className="relative flex-1">
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
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isLoading}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/15 rounded-sm px-5 py-5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 focus:border-white/30 disabled:opacity-60 transition-all duration-300"
                style={{
                  boxShadow: isFocused
                    ? "0 0 20px hsl(38 60% 52% / 0.2), 0 0 40px hsl(38 60% 52% / 0.1), inset 0 0 15px hsl(38 60% 52% / 0.05)"
                    : "none",
                }}
                required
                aria-describedby="newsletter-msg"
              />
              {/* Glow border effect */}
              {isFocused && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-sm animate-fade-in"
                  style={{
                    border: "1px solid hsl(38 60% 52% / 0.3)",
                    boxShadow: "0 0 15px hsl(38 60% 52% / 0.15)",
                  }}
                />
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-artisan disabled:opacity-70 disabled:hover:translate-y-0 whitespace-nowrap"
            >
              {isLoading ? "Suscribiendo…" : "Suscribirme"}
            </button>
          </form>

          <div id="newsletter-msg" className="h-8 mt-4" aria-live="polite">
            {message && (
              <p className={`text-sm font-medium animate-fade-in ${
                status === "error" ? "text-red-400" : "text-emerald-400"
              }`}>
                {message}
              </p>
            )}
          </div>

          <p className="text-xs mt-2 tracking-wide" style={{ color: "hsl(38 20% 55%)" }}>
            Sin spam. Solo apapacho. 💛
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
