import { useState, useCallback, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import SectionReveal from "@/components/ui/SectionReveal";
import { toast } from "@/hooks/use-toast";

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const STORAGE_KEY = "papachoa_newsletter_subscribers";

type Status = "idle" | "loading" | "success" | "error";

function getSubscribers(): string[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}

// Confetti
const Confetti = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const colors = ["hsl(331,48%,45%)", "hsl(47,90%,60%)", "hsl(14,100%,71%)", "hsl(216,44%,46%)"];
    interface Particle { x: number; y: number; vx: number; vy: number; w: number; h: number; rot: number; vr: number; color: string; life: number; }
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 100, y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 8, vy: -Math.random() * 10 - 3,
      w: Math.random() * 8 + 4, h: Math.random() * 4 + 2,
      rot: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)], life: 1,
    }));
    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.rot += p.vr; p.life -= 0.012;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      });
      if (alive) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active]);
  if (!active) return null;
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" style={{ width: "100%", height: "100%" }} />;
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) { setStatus("error"); setMessage("Por favor, escribe un correo válido."); return; }
    setStatus("loading"); setMessage("");
    await new Promise((r) => setTimeout(r, 800));
    const subs = getSubscribers();
    if (subs.includes(trimmed)) {
      setStatus("success"); setMessage("Ya estás en la lista."); setEmail("");
      toast({ title: "Ya estás suscrito/a", description: "Este correo ya está en nuestra lista." }); return;
    }
    subs.push(trimmed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
    setStatus("success"); setMessage("¡Bienvenida al club! Tu código: APAPACHO10"); setEmail(""); setShowConfetti(true);
    toast({ title: "¡Bienvenida al club de mamás apapacho!", description: "Usa el código APAPACHO10 para un 10% en tu primer pedido." });
    setTimeout(() => setShowConfetti(false), 3000);
  }, [email]);

  const isLoading = status === "loading";

  return (
    <section className="py-24 md:py-36 relative overflow-hidden" style={{ background: "#FDF6F0" }}>
      <Confetti active={showConfetti} />

      <div className="container relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <SectionReveal>
            <p className="font-display text-3xl md:text-4xl text-primary mb-3">
              Recibe nuestros cuentos nocturnos
            </p>
          </SectionReveal>
          <SectionReveal delay={60}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Únete a nuestra familia
            </h2>
          </SectionReveal>
          <SectionReveal delay={120}>
            <p className="text-muted-foreground mb-2 text-base font-light leading-relaxed">
              Te enviaremos historias y descuentos que abrigan.
            </p>
            <p className="text-sm font-bold text-primary mb-8">
              10% de descuento en tu primer pedido al suscribirte
            </p>
          </SectionReveal>

          <SectionReveal delay={200}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === "error") { setStatus("idle"); setMessage(""); } }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  disabled={isLoading}
                  className="w-full bg-white px-5 py-5 text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 disabled:opacity-60 transition-all duration-300"
                  style={{ borderRadius: 8, border: "1px solid #F2BCC8", boxShadow: isFocused ? "0 0 20px hsl(331 48% 45% / 0.1)" : "none" }}
                  required
                  aria-describedby="newsletter-msg"
                />
              </div>
              <button type="submit" disabled={isLoading} className="disabled:opacity-70 whitespace-nowrap font-semibold px-6 py-3 transition-colors duration-300" style={{ borderRadius: 8, backgroundColor: "#ac3c72", color: "#fff" }}>
                {isLoading ? "Suscribiendo…" : "Suscribirme"}
              </button>
            </form>

            <div id="newsletter-msg" className="h-8 mt-4" aria-live="polite">
              {message && (
                <p className={`text-sm font-bold animate-fade-in ${status === "error" ? "text-red-500" : "text-emerald-600"}`}>
                  {message}
                </p>
              )}
            </div>

            <p className="text-xs mt-2 text-muted-foreground/60 tracking-wide">
              Sin spam. Solo apapacho.
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;