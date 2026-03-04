import { motion } from "framer-motion";
import type { Ingredient, SafetyLevel } from "@/lib/ingredients";
import { ChevronRight } from "lucide-react";

const levelColors: Record<SafetyLevel, { dot: string; bg: string; border: string }> = {
  safe: { dot: "bg-safe", bg: "bg-safe-bg", border: "border-safe/20" },
  caution: { dot: "bg-caution", bg: "bg-caution-bg", border: "border-caution/20" },
  danger: { dot: "bg-danger", bg: "bg-danger-bg", border: "border-danger/20" },
};

const levelEmoji: Record<SafetyLevel, string> = {
  safe: "🟢",
  caution: "🟡",
  danger: "🔴",
};

const IngredientList = ({
  ingredients,
  onSelect,
}: {
  ingredients: Ingredient[];
  onSelect: (i: Ingredient) => void;
}) => {
  return (
    <div className="space-y-2">
      {ingredients.map((ing, i) => {
        const colors = levelColors[ing.level];
        return (
          <motion.button
            key={ing.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(ing)}
            className={`w-full flex items-center gap-3 ${colors.bg} border ${colors.border} rounded-xl px-4 py-3 text-left transition-all hover:elevated-shadow`}
          >
            <span className="text-base">{levelEmoji[ing.level]}</span>
            <span className="flex-1 font-body font-600 text-foreground text-sm">
              {ing.name}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        );
      })}
    </div>
  );
};

export default IngredientList;
