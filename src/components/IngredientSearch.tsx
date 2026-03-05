import { useState } from "react";
import { Search } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { findIngredientByName, getSpeciesMode, getIngredientsForMode } from "@/lib/ingredients";
import type { Ingredient } from "@/lib/ingredients";

const IngredientSearch = ({ onResult }: { onResult: (i: Ingredient) => void }) => {
  const [query, setQuery] = useState("");
  const guide = useAppStore((s) => s.guide);
  const mode = getSpeciesMode(guide);

  const handleSearch = () => {
    if (!query.trim()) return;
    const found = findIngredientByName(query, mode);
    if (found) {
      onResult(found);
      setQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bg-card rounded-2xl p-4 card-shadow border border-border">
      <p className="font-display font-700 text-sm text-foreground mb-2">
        Search an ingredient 🔎
      </p>
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type e.g. E407, taurine, sugar…"
          className="flex-1 min-w-0 bg-muted rounded-xl px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={handleSearch}
          disabled={!query.trim()}
          className="bg-primary text-primary-foreground rounded-xl px-4 py-2.5 font-display font-700 text-sm flex items-center gap-1.5 disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          <Search className="w-4 h-4" />
          Go
        </button>
      </div>
      <p className="text-[11px] text-muted-foreground mt-1.5">
        Tap "Go" to get a friendly explanation from your guide
      </p>
    </div>
  );
};

export default IngredientSearch;
