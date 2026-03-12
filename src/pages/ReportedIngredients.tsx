import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ClipboardList } from "lucide-react";
import CompanionAvatar from "@/components/CompanionAvatar";

const ReportedIngredients = () => {
  const reported = useAppStore((s) => s.reportedIngredients);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-display text-lg font-800 text-foreground flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            Reported Ingredients
          </h1>
          <p className="text-xs text-muted-foreground">Ingredients submitted for review</p>
        </div>
        <CompanionAvatar size="sm" />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {reported.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-4xl mb-3">📋</p>
            <p className="font-display font-700 text-foreground mb-1">No reports yet</p>
            <p className="text-sm text-muted-foreground">
              When you search for an unknown ingredient, you can report it here for future review.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-2.5">
            {reported.map((r, i) => (
              <motion.div
                key={`${r.name}-${r.timestamp}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl p-4 card-shadow border border-border"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-700 text-sm text-foreground">{r.name}</p>
                    {r.product && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Product: {r.product}
                      </p>
                    )}
                    {r.comment && (
                      <p className="text-xs text-muted-foreground mt-0.5 italic">
                        "{r.comment}"
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 bg-caution-bg text-caution text-[10px] font-display font-700 px-2 py-0.5 rounded-full border border-caution/20">
                    To review
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportedIngredients;
