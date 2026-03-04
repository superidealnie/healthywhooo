import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3, Apple, Pill, Bell } from "lucide-react";
import CompanionAvatar from "@/components/CompanionAvatar";
import { useState } from "react";

const ComingSoon = () => {
  const navigate = useNavigate();
  const [interested, setInterested] = useState(false);

  const features = [
    { icon: BarChart3, text: "Analyze daily nutrient intake" },
    { icon: Apple, text: "Detect nutrient gaps in your diet" },
    { icon: Apple, text: "Suggest foods to improve nutrition" },
    { icon: Pill, text: "Optional supplement guidance" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground text-sm mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex justify-center mb-6">
        <CompanionAvatar size="lg" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-2xl font-800 text-foreground mb-2">
          🔮 Nutrient Scanner
        </h1>
        <p className="text-muted-foreground text-sm">
          We're building something amazing — a way to understand not just what's in your food, but what's missing from your diet.
        </p>
      </motion.div>

      <div className="space-y-3 mb-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="bg-card rounded-xl p-4 card-shadow flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <f.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-body text-foreground">{f.text}</p>
          </motion.div>
        ))}
      </div>

      {!interested ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setInterested(true)}
          className="w-full bg-primary text-primary-foreground font-display font-700 rounded-2xl py-4 elevated-shadow"
        >
          <Bell className="w-4 h-4 inline mr-2" />
          I'm interested in this feature
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-safe-bg rounded-2xl p-4 text-center"
        >
          <p className="font-display font-700 text-safe text-lg">Thanks! 🎉</p>
          <p className="text-sm text-muted-foreground mt-1">
            We'll let you know when it's ready. You're one of the first!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ComingSoon;
