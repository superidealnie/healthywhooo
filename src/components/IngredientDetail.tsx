import { motion } from "framer-motion";
import type { Ingredient, SafetyLevel } from "@/lib/ingredients";
import { X, Flag, Lightbulb } from "lucide-react";
import CompanionAvatar from "./CompanionAvatar";
import { useState } from "react";

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

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <CompanionAvatar size="sm" />
            <div>
              <h2 className="font-display font-800 text-lg text-foreground">
                {ingredient.name}
              </h2>
              <p className={`text-xs font-600 ${label.color}`}>{label.text}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content sections */}
        <div className="space-y-4">
          <Section title="What is it? 🤔" content={ingredient.whatIsIt} />
          <Section title="Why is it used? 🧪" content={ingredient.whyUsed} />
          <Section title="Health impact 💚" content={ingredient.healthImpact} />

          {ingredient.funFact && (
            <div className="bg-accent rounded-xl p-3 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-600 text-accent-foreground mb-0.5">Fun fact</p>
                <p className="text-xs text-muted-foreground">{ingredient.funFact}</p>
              </div>
            </div>
          )}
        </div>

        {/* Report */}
        <div className="mt-6 pt-4 border-t border-border">
          {!reported ? (
            <button
              onClick={() => setReported(true)}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              Report correction
            </button>
          ) : (
            <p className="text-xs text-safe">Thanks for the feedback! We'll review it. ✅</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Section = ({ title, content }: { title: string; content: string }) => (
  <div>
    <h3 className="font-display font-700 text-sm text-foreground mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed font-body">{content}</p>
  </div>
);

export default IngredientDetail;
