import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
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

const GuideSwitcher = () => {
  const [open, setOpen] = useState(false);
  const guide = useAppStore((s) => s.guide);
  const setGuide = useAppStore((s) => s.setGuide);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs font-display font-600 text-lilac hover:text-primary transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Change Guide
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl p-5 w-full max-w-xs card-shadow"
            >
              <h3 className="font-display font-800 text-foreground text-center mb-4">
                Switch Guide 🧭
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {guides.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setGuide(g.id);
                      setOpen(false);
                    }}
                    className={`rounded-xl p-3 flex flex-col items-center gap-2 border-2 transition-all ${
                      guide === g.id
                        ? "border-primary bg-accent elevated-shadow"
                        : "border-border bg-card hover:border-lilac"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <img src={images[g.id]} alt={g.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <span className="font-display font-700 text-sm text-foreground">{g.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuideSwitcher;
