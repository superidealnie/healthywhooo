import { create } from "zustand";
import type { GuideId } from "./ingredients";

interface AppState {
  guide: GuideId | null;
  setGuide: (g: GuideId) => void;
}

export const useAppStore = create<AppState>((set) => ({
  guide: null,
  setGuide: (guide) => set({ guide }),
}));
