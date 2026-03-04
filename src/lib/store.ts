import { create } from "zustand";
import type { GuideId, Ingredient } from "./ingredients";

interface AppState {
  guide: GuideId | null;
  setGuide: (g: GuideId) => void;
  savedIngredients: Ingredient[];
  saveIngredient: (ing: Ingredient) => void;
  removeIngredient: (name: string) => void;
  isIngredientSaved: (name: string) => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  guide: null,
  setGuide: (guide) => set({ guide }),
  savedIngredients: [],
  saveIngredient: (ing) =>
    set((s) => {
      if (s.savedIngredients.some((i) => i.name === ing.name)) return s;
      return { savedIngredients: [...s.savedIngredients, ing] };
    }),
  removeIngredient: (name) =>
    set((s) => ({
      savedIngredients: s.savedIngredients.filter((i) => i.name !== name),
    })),
  isIngredientSaved: (name) => get().savedIngredients.some((i) => i.name === name),
}));
