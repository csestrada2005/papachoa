import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/data/products";

interface ProductAccordionProps {
  product: Product;
}

const ProductAccordion = ({ product }: ProductAccordionProps) => {
  const items = [
    {
      id: "descripcion",
      title: "Descripción",
      content: <p className="text-muted-foreground leading-relaxed font-light">{product.longDescription}</p>,
    },
    {
      id: "material",
      title: "Material",
      content: <p className="text-muted-foreground leading-relaxed font-light">{product.material}</p>,
    },
    {
      id: "cuidados",
      title: "Cuidados",
      content: (
        <ul className="list-disc list-inside space-y-2 text-muted-foreground font-light">
          {product.care.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "envios",
      title: "Envíos",
      content: <p className="text-muted-foreground leading-relaxed font-light">{product.shippingSummary}</p>,
    },
    {
      id: "devoluciones",
      title: "Cambios y devoluciones",
      content: <p className="text-muted-foreground leading-relaxed font-light">{product.returnSummary}</p>,
    },
  ];

  return (
    <div className="max-w-3xl">
      <div className="bg-card rounded-xl p-5 md:p-8 border border-border/30">
        <Accordion type="single" collapsible className="space-y-2">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-background/50 rounded-lg border border-border/30 px-5 data-[state=open]:bg-papachoa-cream/30 transition-colors"
            >
              <AccordionTrigger className="py-4 md:py-5 hover:no-underline">
                <span className="font-display text-base md:text-lg text-foreground text-left pr-4">
                  {item.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ProductAccordion;
