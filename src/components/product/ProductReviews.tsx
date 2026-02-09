import { useState } from "react";
import { Star } from "lucide-react";

const initialReviews = [
  {
    id: 1,
    name: "María G.",
    rating: 5,
    text: "La suavidad es increíble. Mi bebé duerme más tranquilo desde que usamos las pijamas Papachoa. ¡Las amo!",
  },
  {
    id: 2,
    name: "Andrea L.",
    rating: 5,
    text: "Compramos el set familiar y las fotos quedaron hermosas. La calidad es muy buena y se nota el cuidado en cada detalle.",
  },
  {
    id: 3,
    name: "Carolina R.",
    rating: 4,
    text: "Regalé una cobija para un baby shower y la mamá quedó encantada. El empaque es precioso y la tela es divina.",
  },
];

const extraReviews = [
  {
    id: 4,
    name: "Fernanda M.",
    rating: 5,
    text: "Pedí dos pijamas y llegaron en perfectas condiciones. La tela se siente premium y los colores son preciosos.",
  },
  {
    id: 5,
    name: "Lucía P.",
    rating: 5,
    text: "Mi esposo y yo las usamos a juego. Son comodísimas para las mañanas de domingo en familia.",
  },
  {
    id: 6,
    name: "Daniela S.",
    rating: 4,
    text: "Excelente calidad, las he lavado varias veces y siguen como nuevas. Muy recomendables.",
  },
];

const ReviewCard = ({ review }: { review: (typeof initialReviews)[0] }) => (
  <div className="bg-card rounded-2xl p-5 border border-border/30 shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3.5 w-3.5 ${
              star <= review.rating
                ? "fill-papachoa-peach text-papachoa-peach"
                : "text-border"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-foreground">{review.name}</span>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">
      {review.text}
    </p>
  </div>
);

const ProductReviews = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-xl md:text-2xl text-foreground mb-2">
        Reseñas
      </h2>

      {/* Summary */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="h-4 w-4 fill-papachoa-peach text-papachoa-peach"
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">4.9 de 5 (24 reseñas)</span>
      </div>

      {/* Review cards */}
      <div className="space-y-4">
        {initialReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}

        {expanded && (
          <div className="space-y-4 animate-fade-in">
            {extraReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-5 text-sm font-semibold text-papachoa-warm-brown hover:underline active:scale-95 transition-transform"
      >
        {expanded ? "Ocultar reseñas ↑" : "Ver todas las reseñas →"}
      </button>
    </div>
  );
};

export default ProductReviews;
