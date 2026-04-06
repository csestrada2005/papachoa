import { useEffect, useRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { collections, type Collection } from "@/data/products";
import { Filter, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  flores: {
    bg: "hsl(331 28% 92%)",
    bgActive: "hsl(331 38% 84%)",
    border: "hsl(331 22% 84%)",
    borderActive: "hsl(331 30% 76%)",
  },
  changos: {
    bg: "hsl(14 38% 90%)",
    bgActive: "hsl(14 44% 82%)",
    border: "hsl(14 28% 82%)",
    borderActive: "hsl(14 34% 74%)",
  },
  "para-pintar": {
    bg: "hsl(47 40% 90%)",
    bgActive: "hsl(47 48% 80%)",
    border: "hsl(47 30% 82%)",
    borderActive: "hsl(47 38% 74%)",
  },
  hongos: {
    bg: "hsl(162 16% 88%)",
    bgActive: "hsl(162 22% 78%)",
    border: "hsl(162 12% 80%)",
    borderActive: "hsl(162 18% 72%)",
  },
  mundial: {
    bg: "hsl(120 20% 90%)",
    bgActive: "hsl(120 28% 82%)",
    border: "hsl(120 14% 82%)",
    borderActive: "hsl(120 22% 74%)",
  },
  otros: {
    bg: "hsl(220 14% 90%)",
    bgActive: "hsl(220 20% 82%)",
    border: "hsl(220 10% 82%)",
    borderActive: "hsl(220 16% 74%)",
  },
};

const FilterChip = ({
  collection,
  isActive,
  onSelect,
  setRef,
}: {
  collection: { id: Collection; label: string };
  isActive: boolean;
  onSelect: () => void;
  setRef?: (el: HTMLButtonElement | null) => void;
}) => {
  const colors = chipColors[collection.id];
  return (
    <button
      ref={setRef}
      onClick={onSelect}
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
    >
      {collection.label}
    </button>
  );
};

const CollectionFilter = ({ selected, onSelect }: CollectionFilterProps) => {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [mobileOpen, setMobileOpen] = useState(false);

  const setButtonRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) buttonRefs.current.set(id, el);
    else buttonRefs.current.delete(id);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const container = scrollRef.current;
    const activeBtn = buttonRefs.current.get(selected);
    if (!container || !activeBtn) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    if (btnRect.left < containerRect.left || btnRect.right > containerRect.right) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [selected, isMobile]);

  const selectedLabel = collections.find((c) => c.id === selected)?.label ?? "Todos";

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor: "hsl(35 40% 92%)",
            borderColor: "hsl(35 30% 84%)",
            color: "hsl(14 20% 28%)",
          }}
        >
          <Filter className="w-4 h-4" />
          <span>Filtrar: {selectedLabel}</span>
        </button>

        {/* Mobile filter panel overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50" style={{ pointerEvents: "auto" }}>
            <div
              className="absolute inset-0"
              style={{ background: "rgba(253,246,240,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
            />
            <div
              className="absolute bottom-0 left-0 right-0 rounded-t-2xl p-6 pb-10"
              style={{
                background: "rgba(253,248,243,0.98)",
                boxShadow: "0 -4px 30px rgba(0,0,0,0.1)",
                animation: "slide-up 0.3s ease-out forwards",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg text-foreground">Filtrar por colección</h3>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-border/30"
                  aria-label="Cerrar filtros"
                >
                  <X className="w-4 h-4 text-foreground/60" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {collections.map((collection) => (
                  <FilterChip
                    key={collection.id}
                    collection={collection}
                    isActive={selected === collection.id}
                    onSelect={() => {
                      onSelect(collection.id);
                      setMobileOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes slide-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>
      </>
    );
  }

  return (
    <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-2 md:gap-3 md:justify-center min-w-max pb-2">
        {collections.map((collection) => (
          <FilterChip
            key={collection.id}
            collection={collection}
            isActive={selected === collection.id}
            onSelect={() => onSelect(collection.id)}
            setRef={(el) => setButtonRef(collection.id, el)}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionFilter;
