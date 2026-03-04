import { motion } from "framer-motion";
import type { Ingredient, SafetyLevel } from "@/lib/ingredients";
import { ChevronRight } from "lucide-react";

const levelColors: Record<SafetyLevel, { dot: string; bg: string; border: string; glow: string }> = {
  safe: { dot: "bg-safe", bg: "bg-safe-bg", border: "border-safe/20", glow: "hover:shadow-[0_4px_16px_hsl(152_60%_42%/0.12)]" },
  caution: { dot: "bg-caution", bg: "bg-caution-bg", border: "border-caution/20", glow: "hover:shadow-[0_4px_16px_hsl(42_95%_52%/0.12)]" },
  danger: { dot: "bg-danger", bg: "bg-danger-bg", border: "border-danger/20", glow: "hover:shadow-[0_4px_16px_hsl(0_70%_58%/0.12)]" },
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
    <div className="space-y-2.5">
      {ingredients.map((ing, i) => {
        const colors = levelColors[ing.level];
        return (
          <motion.button
            key={ing.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            onClick={() => onSelect(ing)}
            className={`w-full flex items-center gap-3 ${colors.bg} border ${colors.border} rounded-2xl px-4 py-3.5 text-left transition-all card-shadow ${colors.glow} active:scale-[0.97]`}
          >
            <span className="text-base">{levelEmoji[ing.level]}</span>
            <div className="flex-1 min-w-0">
              <span className="font-body font-600 text-foreground text-sm block">
                {ing.name}
              </span>
              <span className="text-[11px] text-muted-foreground">Tap to learn more</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </motion.button>
        );
      })}
    </div>
  );
};

export default IngredientList;
