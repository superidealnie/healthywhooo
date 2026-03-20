import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { guides, type GuideId } from "@/lib/ingredients";
import { useAppStore } from "@/lib/store";
import ryanImg from "@/assets/ryan.png";
import anitaImg from "@/assets/anita.jpg";
import pedroImg from "@/assets/pedro.jpg";
import timonImg from "@/assets/timon.jpg";

const images: Record<GuideId, string> = {
  ryan: ryanImg,
  anita: anitaImg,
  pedro: pedroImg,
  timon: timonImg,
};

const speciesLabel = { human: "👤 Human", dog: "🐕 Dog", cat: "🐱 Cat" };

const GuideSwitcher = () => {
  const [open, setOpen] = useState(false);
  const guide = useAppStore((s) => s.guide);
  const setGuide = useAppStore((s) => s.setGuide);

  if (!guide) return null;

  return (
    <>
      {/* Clickable avatar with pulse hint */}
      <button
        onClick={() => setOpen(true)}
        className="relative group"
        aria-label="Switch guide"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-primary/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40 group-hover:opacity-0" />
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 shadow-[0_2px_12px_hsl(var(--primary)/0.25)] bg-card relative z-10"
        >
          <img
            src={images[guide]}
            alt={guide}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
        {/* First-time hint */}
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-display font-600 text-muted-foreground opacity-70 pointer-events-none">
          Tap to switch
        </span>
      </button>

      {/* Guide selection modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl p-5 w-full max-w-sm shadow-[0_8px_40px_hsl(var(--foreground)/0.12)]"
            >
              <h3 className="font-display font-800 text-foreground text-center text-lg mb-1">
                Choose your guide
              </h3>
              <p className="text-xs text-muted-foreground text-center mb-5">
                Your companion will explain ingredients for you 🧭
              </p>

              <div className="grid grid-cols-2 gap-3">
                {guides.map((g, i) => {
                  const isActive = guide === g.id;
                  return (
                    <motion.button
                      key={g.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * i, type: "spring", stiffness: 260, damping: 22 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setGuide(g.id);
                        setOpen(false);
                      }}
                      className={`rounded-2xl p-4 flex flex-col items-center gap-2.5 border-2 transition-all ${
                        isActive
                          ? "border-primary bg-accent shadow-[0_4px_20px_hsl(var(--primary)/0.15)]"
                          : "border-border bg-card hover:border-lilac hover:shadow-[0_2px_12px_hsl(var(--lilac)/0.12)]"
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full overflow-hidden ring-2 ${isActive ? "ring-primary" : "ring-transparent"}`}>
                        <img src={images[g.id]} alt={g.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="text-center">
                        <span className="font-display font-700 text-sm text-foreground block">{g.name}</span>
                        <span className="text-[10px] text-muted-foreground">{g.desc}</span>
                      </div>
                      <span className="text-[10px] font-display font-600 text-lilac bg-lilac-light px-2 py-0.5 rounded-full">
                        {speciesLabel[g.species]}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="active-check"
                          className="text-[10px] font-display font-700 text-primary"
                        >
                          ✓ Active
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuideSwitcher;
