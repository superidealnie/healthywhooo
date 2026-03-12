import { useState } from "react";
import { motion } from "framer-motion";
import { X, Send } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

const ReportIngredientModal = ({
  prefillName,
  onClose,
}: {
  prefillName: string;
  onClose: () => void;
}) => {
  const [name, setName] = useState(prefillName);
  const [product, setProduct] = useState("");
  const [comment, setComment] = useState("");
  const reportIngredient = useAppStore((s) => s.reportIngredient);

  const handleSubmit = () => {
    if (!name.trim()) return;
    reportIngredient({ name: name.trim(), product: product.trim(), comment: comment.trim() });
    toast.success("Thanks! We saved this ingredient for review. 🙏");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-card rounded-t-3xl p-5 pb-8"
      >
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-display font-800 text-lg text-foreground">Report New Ingredient</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Help us grow the database 🌱</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-display font-700 text-foreground mb-1 block">
              Ingredient name <span className="text-danger">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Methylcellulose"
              className="w-full bg-muted rounded-xl px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs font-display font-700 text-foreground mb-1 block">
              Product name <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g. Brand X Chocolate Bar"
              className="w-full bg-muted rounded-xl px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs font-display font-700 text-foreground mb-1 block">
              Comment <span className="text-muted-foreground">(optional)</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Any extra context…"
              rows={2}
              className="w-full bg-muted rounded-xl px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-display font-700 rounded-2xl py-3.5 elevated-shadow hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
          Send for review
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ReportIngredientModal;
