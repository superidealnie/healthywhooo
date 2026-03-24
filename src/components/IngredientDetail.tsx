import { motion } from "framer-motion";
import type { Ingredient, SafetyLevel } from "@/lib/ingredients";
import { getSpeciesMode } from "@/lib/ingredients";
import { getIngredientDisplayData } from "@/lib/ingredientProfiles";
import { X, Flag, Lightbulb, Bookmark, BookmarkCheck, Dog, Cat, User } from "lucide-react";
import CompanionAvatar from "./CompanionAvatar";
import GuideSwitcher from "./GuideSwitcher";
import ModeLabel from "./ModeLabel";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

const levelLabel: Record<SafetyLevel, { text: string; color: string }> = {
  safe: { text: "Generally Safe", color: "text-safe" },
  caution: { text: "Use Caution", color: "text-caution" },
  danger: { text: "Recommended to Limit", color: "text-danger" },
};

const IngredientDetail = ({
  ingredient,
  onClose,
}: {
  ingredient: Ingredient;
  onClose: () => void;
}) => {
  const [reported, setReported] = useState(false);
  const label = levelLabel[ingredient.level];
  const guide = useAppStore((s) => s.guide);
  const saveIngredient = useAppStore((s) => s.saveIngredient);
  const isSaved = useAppStore((s) => s.isIngredientSaved(ingredient.name));
  const mode = getSpeciesMode(guide);

  useEffect(() => {
    trackEvent("result_viewed", { ingredient: ingredient.name, level: ingredient.level, mode });
  }, [ingredient.name]);

  const handleSave = () => {
    saveIngredient(ingredient);
    trackEvent("ingredient_saved", { ingredient: ingredient.name, mode });
    toast.success("Saved to your ingredient library! 📚");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-card rounded-t-3xl p-5 pb-8 max-h-[85vh] overflow-y-auto"
      >
        {/* Handle */}
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Character presentation area */}
        <div className="flex items-start gap-4 mb-5">
          <div className="shrink-0">
            <CompanionAvatar size="lg" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display font-800 text-xl text-foreground">
                  {ingredient.name}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className={`text-xs font-600 ${label.color}`}>{label.text}</p>
                  <ModeLabel />
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-2 bg-lilac-light rounded-2xl rounded-tl-sm p-3"
            >
              <p className="text-xs text-muted-foreground font-body">
                Your guide found something interesting here. 🔍
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-4">
          <Section title="What is it? 🤔" content={ingredient.whatIsIt} delay={0.1} />
          <Section title="Why is it used? 🧪" content={ingredient.whyUsed} delay={0.15} />
          <Section title="Health impact 💚" content={ingredient.healthImpact} delay={0.2} />

          {/* Pet-specific note */}
          {ingredient.petNote && mode !== "human" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className={`rounded-xl p-3 flex items-start gap-2 border ${
                mode === "dog" ? "bg-caution-bg border-caution/20" : "bg-lilac-light border-lilac/20"
              }`}
            >
              {mode === "dog" ? (
                <Dog className="w-4 h-4 text-caution mt-0.5 shrink-0" />
              ) : (
                <Cat className="w-4 h-4 text-lilac mt-0.5 shrink-0" />
              )}
              <div>
                <p className="text-xs font-600 text-accent-foreground mb-0.5">
                  {mode === "dog" ? "🐕 Dog-specific note" : "🐱 Cat-specific note"}
                </p>
                <p className="text-xs text-muted-foreground">{ingredient.petNote}</p>
              </div>
            </motion.div>
          )}

          {ingredient.funFact && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-lilac-light rounded-xl p-3 flex items-start gap-2 border border-lilac/20"
            >
              <Lightbulb className="w-4 h-4 text-lilac mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-600 text-accent-foreground mb-0.5">Fun fact</p>
                <p className="text-xs text-muted-foreground">{ingredient.funFact}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Save & Actions */}
        <div className="mt-5 flex gap-2">
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-display font-700 text-sm transition-all ${
              isSaved
                ? "bg-safe-bg text-safe"
                : "bg-primary text-primary-foreground elevated-shadow hover:opacity-90"
            }`}
          >
            {isSaved ? (
              <><BookmarkCheck className="w-4 h-4" /> Saved</>
            ) : (
              <><Bookmark className="w-4 h-4" /> Save Ingredient</>
            )}
          </button>
        </div>

        {/* Guide switch + Report */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <GuideSwitcher />
          {!reported ? (
            <button
              onClick={() => setReported(true)}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              Report correction
            </button>
          ) : (
            <p className="text-xs text-safe">Thanks! We'll review it ✅</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Section = ({ title, content, delay = 0 }: { title: string; content: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <h3 className="font-display font-700 text-sm text-foreground mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed font-body">{content}</p>
  </motion.div>
);

export default IngredientDetail;
