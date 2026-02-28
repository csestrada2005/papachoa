import SectionReveal from "@/components/ui/SectionReveal";
import { Package, Star, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ITEMS: { Icon: LucideIcon; text: string }[] = [
  { Icon: Package, text: "Envío a todo México" },
  { Icon: Star, text: "Calidad garantizada" },
  { Icon: Heart, text: "Hecho con amor" },
];

const BarraConfianza = () => (
  <SectionReveal>
    <div className="w-full border-b border-gray-100" style={{ backgroundColor: "#FFF8F5" }}>
      <div className="container flex flex-wrap items-center justify-center gap-8 py-4">
        {ITEMS.map((item) => (
          <span key={item.text} className="flex items-center gap-2 text-sm text-gray-600">
            <item.Icon size={18} strokeWidth={1.5} className="text-current" />
            <span>{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  </SectionReveal>
);

export default BarraConfianza;
