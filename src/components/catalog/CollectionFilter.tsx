import { cn } from "@/lib/utils";
import { collections, type Collection } from "@/data/products";

interface CollectionFilterProps {
  selected: Collection;
  onSelect: (collection: Collection) => void;
}

const CollectionFilter = ({ selected, onSelect }: CollectionFilterProps) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-2 md:gap-3 md:justify-center min-w-max pb-2">
        {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => onSelect(collection.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selected === collection.id
                ? cn(collection.color, "text-foreground shadow-sm")
                : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {collection.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CollectionFilter;
