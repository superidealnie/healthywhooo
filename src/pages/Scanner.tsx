import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Camera, Keyboard, Sparkles } from "lucide-react";
import { sampleIngredients } from "@/lib/ingredients";
import CompanionAvatar from "@/components/CompanionAvatar";
import IngredientList from "@/components/IngredientList";
import IngredientDetail from "@/components/IngredientDetail";
import type { Ingredient } from "@/lib/ingredients";

const Scanner = () => {
  const guide = useAppStore((s) => s.guide);
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [selected, setSelected] = useState<Ingredient | null>(null);

  useEffect(() => {
    if (!guide) navigate("/", { replace: true });
  }, [guide, navigate]);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2200);
  };

  if (!guide) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-800 text-foreground">HealthyWhooo</h1>
          <p className="text-xs text-muted-foreground">Your ingredient translator 🔍</p>
        </div>
        <CompanionAvatar size="sm" />
      </div>

      {/* Companion speech */}
      <div className="px-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent rounded-2xl rounded-tl-sm p-3 relative"
        >
          <p className="text-sm text-accent-foreground font-body">
            {!scanned
              ? "Hey! 👋 Upload a photo of ingredients or try our sample list. I'll translate them into human language!"
              : "We translated your ingredients into human language! ✨ Tap any to learn more."}
          </p>
        </motion.div>
      </div>

      {!scanned && !scanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 flex flex-col gap-3"
        >
          <button
            onClick={startScan}
            className="flex items-center justify-center gap-3 bg-primary text-primary-foreground font-display font-700 rounded-2xl py-4 elevated-shadow hover:opacity-90 transition-opacity"
          >
            <Camera className="w-5 h-5" />
            Scan Ingredients
          </button>
          <button
            onClick={startScan}
            className="flex items-center justify-center gap-3 bg-card text-foreground font-display font-600 rounded-2xl py-4 card-shadow border border-border hover:border-primary/30 transition-colors"
          >
            <Keyboard className="w-5 h-5" />
            Try Sample List
          </button>
        </motion.div>
      )}

      {scanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center gap-4 px-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            <Sparkles className="w-10 h-10 text-primary" />
          </motion.div>
          <p className="font-display font-700 text-foreground">Analyzing ingredients...</p>
          <p className="text-sm text-muted-foreground text-center">
            Reading labels so you don't have to 📖
          </p>
          <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </motion.div>
      )}

      {scanned && (
        <>
          {/* Legend */}
          <div className="px-4 mb-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-safe" /> Safe
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-caution" /> Caution
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-danger" /> Limit
            </span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <IngredientList
              ingredients={sampleIngredients}
              onSelect={setSelected}
            />

            {/* Coming Soon */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => navigate("/coming-soon")}
              className="mt-6 w-full bg-card border-2 border-dashed border-primary/30 rounded-2xl p-4 text-center hover:border-primary/50 transition-colors"
            >
              <p className="font-display font-700 text-foreground text-sm">
                🔮 Coming Soon: Nutrient Scanner
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Track your daily nutrients and find what's missing
              </p>
            </motion.button>
          </div>
        </>
      )}

      <AnimatePresence>
        {selected && (
          <IngredientDetail
            ingredient={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      {/* Trust footer */}
      <div className="px-4 py-3 text-center">
        <p className="text-[10px] text-muted-foreground leading-tight">
          Educational information based on public nutrition research.
          <br />Designed to help people understand food better. 🌱
        </p>
      </div>
    </div>
  );
};

export default Scanner;
