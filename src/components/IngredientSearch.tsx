import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { findIngredientByName, getSpeciesMode, getSuggestions } from "@/lib/ingredients";
import type { Ingredient } from "@/lib/ingredients";
import { toast } from "sonner";

const IngredientSearch = ({ onResult }: { onResult: (i: Ingredient) => void }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const guide = useAppStore((s) => s.guide);
  const mode = getSpeciesMode(guide);

  const suggestions = useMemo(() => getSuggestions(query, mode), [query, mode]);

  const handleSearch = () => {
    if (!query.trim()) return;
    const found = findIngredientByName(query, mode);
    if (found) {
      onResult(found);
      setQuery("");
      setShowSuggestions(false);
    } else {
      toast.error("Ingredient not found — try another name or E-number.");
    }
  };

  const handleSelect = (ing: Ingredient) => {
    onResult(ing);
    setQuery("");
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bg-card rounded-2xl p-4 card-shadow border border-border relative">
      <p className="font-display font-700 text-sm text-foreground mb-2">
        Search an ingredient 🔎
      </p>
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
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

      {/* Autocomplete dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-4 right-4 top-full mt-1 bg-card rounded-xl border border-border card-shadow z-20 overflow-hidden">
          {suggestions.map((s) => (
            <button
              key={s.name}
              onMouseDown={() => handleSelect(s)}
              className="w-full text-left px-3 py-2.5 flex items-center gap-2 hover:bg-muted transition-colors text-sm"
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  s.level === "safe" ? "bg-safe" : s.level === "caution" ? "bg-caution" : "bg-danger"
                }`}
              />
              <span className="font-body text-foreground truncate">{s.name}</span>
            </button>
          ))}
        </div>
      )}

      <p className="text-[11px] text-muted-foreground mt-1.5">
        Search 390+ ingredients by name, alias, or E-number
      </p>
    </div>
  );
};

export default IngredientSearch;
