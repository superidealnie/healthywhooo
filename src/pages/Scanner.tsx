import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Camera, Sparkles, RotateCcw, BookOpen, Trash2, ClipboardList } from "lucide-react";
import { getSpeciesMode, getIngredientsForMode } from "@/lib/ingredients";

import IngredientList from "@/components/IngredientList";
import IngredientDetail from "@/components/IngredientDetail";
import IngredientSearch from "@/components/IngredientSearch";
import GuideSwitcher from "@/components/GuideSwitcher";
import ModeLabel from "@/components/ModeLabel";
import type { Ingredient } from "@/lib/ingredients";

const Scanner = () => {
  const guide = useAppStore((s) => s.guide);
  const savedIngredients = useAppStore((s) => s.savedIngredients);
  const reportedIngredients = useAppStore((s) => s.reportedIngredients);
  const removeIngredient = useAppStore((s) => s.removeIngredient);
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [selected, setSelected] = useState<Ingredient | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);

  const mode = getSpeciesMode(guide);
  const sampleIngredients = getIngredientsForMode(mode);

  useEffect(() => {
    if (!guide) navigate("/", { replace: true });
  }, [guide, navigate]);

  const startScan = () => {
    setScanning(true);
    setScanned(false);
    setShowLibrary(false);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2200);
  };

  const resetScan = () => {
    setScanned(false);
    setScanning(false);
  };

  if (!guide) return null;

  const modeEmoji = mode === "dog" ? "🐕" : mode === "cat" ? "🐱" : "🧑";
  const scanLabel = mode === "human" ? "Scan Ingredients" : mode === "dog" ? "Scan Kibble Label" : "Scan Cat Food Label";
  const sampleLabel = mode === "human" ? "Try Sample List" : mode === "dog" ? "Try Sample Kibble" : "Try Sample Cat Food";

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-800 text-foreground">HealthyWhooo</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-muted-foreground">Your ingredient translator 🔍</p>
            <ModeLabel />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/reported")}
            className="relative w-10 h-10 rounded-full bg-caution-bg flex items-center justify-center hover:bg-accent transition-colors"
          >
            <ClipboardList className="w-5 h-5 text-caution" strokeWidth={2} />
            {reportedIngredients.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-caution text-primary-foreground text-[10px] font-700 rounded-full flex items-center justify-center">
                {reportedIngredients.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowLibrary(!showLibrary)}
            className="relative w-10 h-10 rounded-full bg-lilac-light flex items-center justify-center hover:bg-accent transition-colors"
          >
            <BookOpen className="w-5 h-5 text-lilac" strokeWidth={2} />
            {savedIngredients.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-700 rounded-full flex items-center justify-center">
                {savedIngredients.length}
              </span>
            )}
          </button>
          <GuideSwitcher />
        </div>
      </div>



      {/* Companion speech */}
      <div className="px-4 mb-4">
        <motion.div
          key={`speech-${showLibrary}-${scanned}-${mode}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-lilac-light rounded-2xl rounded-tl-sm p-3.5 relative border border-lilac/10"
        >
          <p className="text-sm text-accent-foreground font-body">
            {showLibrary
              ? savedIngredients.length > 0
                ? "Here's your ingredient library! 📚 Keep exploring and learning."
                : "Your library is empty! Save ingredients to learn about them later. 🌱"
              : !scanned
              ? mode === "human"
                ? "Hey! 👋 Search an ingredient, upload a photo, or try our sample list. I'll translate them into human language!"
                : mode === "dog"
                ? `Woof! 🐕 Let's check what's in that kibble. I'll help you understand every ingredient for your furry friend!`
                : `Meow! 🐱 Let's decode that cat food label. I'll explain every ingredient so you know what your kitty is eating!`
              : `We translated your ${mode === "human" ? "" : mode + " food "}ingredients! ${modeEmoji} Tap any ingredient and I'll explain it.`}
          </p>
        </motion.div>
      </div>

      {/* Library view */}
      {showLibrary && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto px-4 pb-4">
          <h2 className="font-display font-800 text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-lilac" />
            My Ingredient Library
          </h2>
          {savedIngredients.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">📚</p>
              <p className="font-display font-700 text-foreground mb-1">No saved ingredients yet</p>
              <p className="text-sm text-muted-foreground">Scan a product and save ingredients to build your library!</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {savedIngredients.map((ing) => (
                <motion.div key={ing.name} layout className="bg-card rounded-2xl p-4 card-shadow border border-border flex items-start gap-3">
                  <button onClick={() => setSelected(ing)} className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2.5 h-2.5 rounded-full ${ing.level === "safe" ? "bg-safe" : ing.level === "caution" ? "bg-caution" : "bg-danger"}`} />
                      <span className="font-display font-700 text-foreground text-sm">{ing.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{ing.whatIsIt}</p>
                  </button>
                  <button
                    onClick={() => removeIngredient(ing.name)}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 hover:bg-danger-bg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Pre-scan: search + buttons */}
      {!showLibrary && !scanned && !scanning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 flex flex-col gap-3">
          <IngredientSearch onResult={setSelected} />

          <button
            onClick={startScan}
            className="flex items-center justify-center gap-3 bg-primary text-primary-foreground font-display font-700 rounded-2xl py-4 elevated-shadow hover:opacity-90 transition-opacity"
          >
            <Camera className="w-5 h-5" />
            {scanLabel}
          </button>
          <button
            onClick={startScan}
            className="flex items-center justify-center gap-3 bg-card text-foreground font-display font-600 rounded-2xl py-4 card-shadow border border-border hover:border-lilac transition-colors"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            {sampleLabel}
          </button>
        </motion.div>
      )}

      {/* Scanning state */}
      {!showLibrary && scanning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
            <Sparkles className="w-10 h-10 text-primary" />
          </motion.div>
          <p className="font-display font-700 text-foreground">Analyzing ingredients...</p>
          <p className="text-sm text-muted-foreground text-center">
            {mode === "human" ? "Reading labels so you don't have to 📖" : mode === "dog" ? "Sniffing out every ingredient 🐕" : "Inspecting the label with feline precision 🐱"}
          </p>
          <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, ease: "easeInOut" }} className="h-full bg-primary rounded-full" />
          </div>
        </motion.div>
      )}

      {/* Results */}
      {!showLibrary && scanned && (
        <>
          <div className="px-4 mb-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-safe" /> Safe</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-caution" /> Caution</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-danger" /> Limit</span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <IngredientList ingredients={sampleIngredients} onSelect={setSelected} />

            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              whileTap={{ scale: 0.97 }}
              onClick={resetScan}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-lilac-light text-foreground font-display font-700 rounded-2xl py-3.5 border border-lilac/20 hover:border-lilac transition-colors sticky bottom-2"
            >
              <RotateCcw className="w-4 h-4" />
              Scan Another Product
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              onClick={() => navigate("/coming-soon")}
              className="mt-3 w-full bg-card border-2 border-dashed border-primary/30 rounded-2xl p-4 text-center hover:border-primary/50 transition-colors"
            >
              <p className="font-display font-700 text-foreground text-sm">🔮 Coming Soon: Nutrient Scanner</p>
              <p className="text-xs text-muted-foreground mt-1">Track your daily nutrients and find what's missing</p>
            </motion.button>
          </div>
        </>
      )}

      <AnimatePresence>
        {selected && <IngredientDetail ingredient={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* Trust footer */}
      <div className="px-4 py-3 text-center">
        <p className="text-[10px] text-muted-foreground leading-tight">
          Educational info based on public nutrition research. Not medical advice.
          <br />Designed to help people understand food better. 🌱
        </p>
      </div>
    </div>
  );
};

export default Scanner;
