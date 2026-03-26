import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero-intro.jpg";
import { trackEvent } from "@/lib/analytics";

const steps = [
  { num: "1", text: "Choose a guide" },
  { num: "2", text: "Scan or type ingredients" },
  { num: "3", text: "See simple ingredient explanations" },
];

const Intro = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    trackEvent("intro_cta_clicked");
    navigate("/choose-guide");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Hero image – constrained height, cropped white strip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg overflow-hidden relative"
        style={{ maxHeight: '42vh' }}
      >
        <img
          src={heroImg}
          alt="Friendly characters shopping for food in a supermarket with a dog and cat"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 70%' }}
        />
        {/* Top-only soft gradient for visual balance */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/15 to-transparent" />
        {/* Bottom fade into background */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="flex flex-col items-center px-5 -mt-2">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-2xl sm:text-3xl font-800 text-foreground text-center max-w-sm mb-2 leading-snug"
        >
          Scan food. Understand ingredients. Choose the right mode.
        </motion.h1>

        {/* Explanation */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground font-body text-sm text-center max-w-xs mb-5 leading-relaxed"
        >
          HealthyWhooo helps you understand ingredients in a simple way.
          Choose who the food is for — human, dog, or cat — and the app will explain the ingredients for that specific mode.
        </motion.p>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-xs flex flex-col gap-2.5 mb-5"
        >
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-card rounded-xl px-4 py-2.5 card-shadow"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground font-display font-700 text-xs flex items-center justify-center">
                {s.num}
              </span>
              <span className="font-body text-sm text-foreground">{s.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Helper note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-xs bg-accent rounded-xl px-4 py-2.5 mb-6"
        >
          <p className="text-xs text-muted-foreground font-body leading-relaxed text-center">
            🐾 Dog and cat results can be different from human results. Some ingredients may be fine for people but not safe for pets.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleStart}
          className="bg-primary text-primary-foreground font-display font-700 text-base px-8 py-3 rounded-full card-shadow hover:elevated-shadow transition-shadow mb-8"
        >
          Choose guide 🧭
        </motion.button>
      </div>
    </div>
  );
};

export default Intro;
