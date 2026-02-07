import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter products based on search query
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase().trim();
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(lowerQuery) ||
          product.collection.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 6); // Limit to 6 results for performance
  }, [query]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset query when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formattedPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 md:pt-28"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg mx-4 bg-card rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="p-6 text-center text-muted-foreground">
              No se encontraron productos para "{query}"
            </div>
          )}

          {results.length > 0 && (
            <div className="p-2">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/producto/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-papachoa-cream shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formattedPrice(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!query.trim() && (
            <div className="p-6 text-center text-muted-foreground text-sm">
              Escribe para buscar productos
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
