import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import ryanImg from "@/assets/ryan.png";
import anitaImg from "@/assets/anita.jpg";
import pedroImg from "@/assets/pedro.jpg";
import timonImg from "@/assets/timon.jpg";
import type { GuideId } from "@/lib/ingredients";

const images: Record<GuideId, string> = {
  ryan: ryanImg,
  anita: anitaImg,
  pedro: pedroImg,
  timon: timonImg,
};

const CompanionAvatar = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
  const guide = useAppStore((s) => s.guide);
  if (!guide) return null;

  const dim = size === "sm" ? "w-12 h-12" : "w-28 h-28";

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className={`${dim} rounded-full overflow-hidden border-2 border-primary/20 card-shadow bg-card`}
    >
      <img
        src={images[guide]}
        alt={guide}
        className="w-full h-full object-cover object-top"
      />
    </motion.div>
  );
};

export default CompanionAvatar;
