import { useAppStore } from "@/lib/store";
import { getSpeciesMode } from "@/lib/ingredients";
import { User, Dog, Cat } from "lucide-react";

const icons = { human: User, dog: Dog, cat: Cat };
const labels = { human: "Human", dog: "Dog", cat: "Cat" };

const ModeLabel = () => {
  const guide = useAppStore((s) => s.guide);
  const mode = getSpeciesMode(guide);
  const Icon = icons[mode];

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-display font-700 text-lilac bg-lilac-light px-2 py-0.5 rounded-full">
      <Icon className="w-3 h-3" />
      {labels[mode]}
    </span>
  );
};

export default ModeLabel;
