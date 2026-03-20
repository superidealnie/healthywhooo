import { motion } from "framer-motion";
import ryanImg from "@/assets/ryan.png";
import anitaImg from "@/assets/anita.jpg";
import pedroImg from "@/assets/pedro.jpg";
import timonImg from "@/assets/timon.jpg";
import { guides, type GuideId } from "@/lib/ingredients";
import { trackEvent } from "@/lib/analytics";
import { useAppStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";

const images: Record<GuideId, string> = {
  ryan: ryanImg,
  anita: anitaImg,
  pedro: pedroImg,
  timon: timonImg,
};

const speciesLabel = { human: "👤 Human mode", dog: "🐕 Dog mode", cat: "🐱 Cat mode" };

const ChooseGuide = () => {
  const setGuide = useAppStore((s) => s.setGuide);
  const navigate = useNavigate();

  const pick = (id: GuideId) => {
    setGuide(id);
    navigate("/scanner");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-3xl font-800 text-foreground mb-2">
          Choose your guide 🧭
        </h1>
        <p className="text-muted-foreground font-body text-base">
          Pick a friendly companion to help you understand food labels
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {guides.map((g, i) => (
          <motion.button
            key={g.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => pick(g.id)}
            className="bg-card rounded-2xl p-4 card-shadow flex flex-col items-center gap-2 border border-border hover:border-primary/40 transition-all hover:elevated-shadow focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <div className="w-28 h-28 rounded-xl overflow-hidden bg-lilac-light">
              <img
                src={images[g.id]}
                alt={g.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="font-display font-700 text-foreground text-lg">{g.name}</span>
            <span className="text-muted-foreground text-sm">{g.desc}</span>
            <span className="text-[10px] font-display font-600 text-lilac bg-lilac-light px-2 py-0.5 rounded-full">
              {speciesLabel[g.species]}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-xs text-muted-foreground text-center max-w-xs"
      >
        Your guide will explain ingredients in simple, friendly language — like a smart friend helping you shop! 🛒
      </motion.p>
    </div>
  );
};

export default ChooseGuide;
