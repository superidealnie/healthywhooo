import { useState, useMemo } from "react";
import { Search, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { findIngredientByName, getSpeciesMode, getSuggestions } from "@/lib/ingredients";
import type { Ingredient } from "@/lib/ingredients";
import ReportIngredientModal from "./ReportIngredientModal";
import { trackEvent } from "@/lib/analytics";

const IngredientSearch = ({ onResult }: { onResult: (i: Ingredient) => void }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [notFound, setNotFound] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);
  const guide = useAppStore((s) => s.guide);
  const mode = getSpeciesMode(guide);

  const suggestions = useMemo(() => getSuggestions(query, mode), [query, mode]);

  const handleSearch = () => {
    if (!query.trim()) return;
    trackEvent("ingredient_searched", { query: query.trim(), mode });
    const found = findIngredientByName(query, mode);
    if (found) {
      trackEvent("ingredient_found", { ingredient: found.name, mode });
      onResult(found);
      setQuery("");
      setNotFound(null);
      setShowSuggestions(false);
    } else {
      trackEvent("ingredient_not_found", { query: query.trim(), mode });
      setNotFound(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSelect = (ing: Ingredient) => {
    onResult(ing);
    setQuery("");
    setNotFound(null);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
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
              setNotFound(null);
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

        {/* Not found state */}
        <AnimatePresence>
          {notFound && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="mt-3 bg-caution-bg rounded-xl p-3 border border-caution/20"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-caution mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-display font-700 text-foreground">
                    We haven't translated this ingredient yet.
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Help us grow the database by reporting it!
                  </p>
                  <button
                    onClick={() => setShowReport(true)}
                    className="mt-2 bg-primary text-primary-foreground font-display font-700 text-xs rounded-lg px-3 py-1.5 hover:opacity-90 transition-opacity"
                  >
                    Report new ingredient
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[11px] text-muted-foreground mt-1.5">
          Search 390+ ingredients by name, alias, or E-number
        </p>
      </div>

      <AnimatePresence>
        {showReport && notFound && (
          <ReportIngredientModal
            prefillName={notFound}
            onClose={() => {
              setShowReport(false);
              setNotFound(null);
              setQuery("");
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default IngredientSearch;
