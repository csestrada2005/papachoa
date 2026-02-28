import SectionReveal from "@/components/ui/SectionReveal";

const ITEMS = [
  { icon: "📦", text: "Envío a todo México" },
  { icon: "⭐", text: "Calidad garantizada" },
  { icon: "💕", text: "Hecho con amor" },
];

const BarraConfianza = () => (
  <SectionReveal>
    <div className="w-full bg-white border-b border-gray-100">
      <div className="container flex flex-wrap items-center justify-center gap-8 py-4">
        {ITEMS.map((item) => (
          <span key={item.text} className="flex items-center gap-2 text-sm text-gray-600">
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  </SectionReveal>
);

export default BarraConfianza;
