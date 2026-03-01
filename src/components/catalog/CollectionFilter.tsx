import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { collections, type Collection } from "@/data/products";

interface CollectionFilterProps {
  selected: Collection;
  onSelect: (collection: Collection) => void;
}

/* Pastel tones matching the category cards */
const chipColors: Record<Collection, { bg: string; bgActive: string; border: string; borderActive: string }> = {
  todos: {
    bg: "hsl(35 40% 92%)",
    bgActive: "hsl(35 48% 86%)",
    border: "hsl(35 30% 84%)",
    borderActive: "hsl(35 38% 76%)",
  },
  hija: {
    bg: "hsl(331 28% 92%)",
    bgActive: "hsl(331 38% 84%)",
    border: "hsl(331 22% 84%)",
    borderActive: "hsl(331 30% 76%)",
  },
  hijo: {
    bg: "hsl(216 22% 90%)",
    bgActive: "hsl(216 30% 80%)",
    border: "hsl(216 18% 82%)",
    borderActive: "hsl(216 26% 74%)",
  },
  bebe: {
    bg: "hsl(14 38% 90%)",
    bgActive: "hsl(14 44% 82%)",
    border: "hsl(14 28% 82%)",
    borderActive: "hsl(14 34% 74%)",
  },
  adulto: {
    bg: "hsl(162 16% 88%)",
    bgActive: "hsl(162 22% 78%)",
    border: "hsl(162 12% 80%)",
    borderActive: "hsl(162 18% 72%)",
  },
  familia: {
    bg: "hsl(47 40% 90%)",
    bgActive: "hsl(47 48% 80%)",
    border: "hsl(47 30% 82%)",
    borderActive: "hsl(47 38% 74%)",
  },
};

const CollectionFilter = ({ selected, onSelect }: CollectionFilterProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setButtonRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) buttonRefs.current.set(id, el);
    else buttonRefs.current.delete(id);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    const activeBtn = buttonRefs.current.get(selected);
    if (!container || !activeBtn) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    if (btnRect.left < containerRect.left || btnRect.right > containerRect.right) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [selected]);

  return (
    <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-2 md:gap-3 md:justify-center min-w-max pb-2">
        {collections.map((collection) => {
          const isActive = selected === collection.id;
          const colors = chipColors[collection.id];

          return (
            <button
              key={collection.id}
              ref={(el) => setButtonRef(collection.id, el)}
              onClick={() => onSelect(collection.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap border",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "transition-all duration-200 ease-out"
              )}
              style={{
                backgroundColor: isActive ? colors.bgActive : colors.bg,
                borderColor: isActive ? colors.borderActive : colors.border,
                color: isActive ? "hsl(14 20% 28%)" : "hsl(25 12% 42%)",
                boxShadow: isActive
                  ? `inset 0 1px 3px rgba(60, 30, 20, 0.08), 0 1px 2px rgba(60, 30, 20, 0.06)`
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const t = e.currentTarget;
                  t.style.backgroundColor = colors.bgActive;
                  t.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const t = e.currentTarget;
                  t.style.backgroundColor = colors.bg;
                  t.style.transform = "translateY(0)";
                }
              }}
            >
              {collection.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionFilter;
