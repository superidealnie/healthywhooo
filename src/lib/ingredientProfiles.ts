import type { Ingredient, SafetyLevel, SpeciesMode } from "./ingredients";

export interface IngredientProfile {
  ingredient_key: string;
  what_is_it: string;
  why_used: string;
  fun_fact: string;
  risk_label_human: string;
  health_impact_human: string;
  risk_label_dog: string;
  health_impact_dog: string;
  risk_label_cat: string;
  health_impact_cat: string;
}

type ProfileModule = {
  default?: unknown;
};

let cachedProfileMap: Map<string, IngredientProfile> | null = null;

function getProfileMap(): Map<string, IngredientProfile> {
  if (cachedProfileMap) return cachedProfileMap;

  cachedProfileMap = new Map<string, IngredientProfile>();

  try {
    const modules = import.meta.glob("../data/ingredient_profiles.json", { eager: true });
    const profileModule = modules["../data/ingredient_profiles.json"] as ProfileModule | undefined;
    const profiles = Array.isArray(profileModule?.default) ? profileModule.default : [];

    if (!profiles.length) {
      console.log("[Profiles] Fallback: profile dataset missing or empty, using ingredient defaults");
      return cachedProfileMap;
    }

    for (const entry of profiles) {
      if (!entry || typeof entry !== "object") continue;
      const profile = entry as IngredientProfile;
      if (!profile.ingredient_key) continue;
      cachedProfileMap.set(profile.ingredient_key.toLowerCase(), profile);
    }
  } catch {
    console.log("[Profiles] Fallback: could not load profile dataset, using ingredient defaults");
  }

  return cachedProfileMap;
}

function mapProfileRisk(label: string | undefined, fallback: SafetyLevel): SafetyLevel {
  const normalized = label?.trim().toLowerCase();

  if (!normalized) return fallback;
  if (normalized === "safe") return "safe";
  if (normalized === "caution") return "caution";
  if (normalized === "avoid" || normalized === "danger" || normalized === "limit") return "danger";

  return fallback;
}

function getModeSpecificFields(profile: IngredientProfile, mode: SpeciesMode) {
  switch (mode) {
    case "dog":
      return {
        riskLabel: profile.risk_label_dog,
        healthImpact: profile.health_impact_dog,
      };
    case "cat":
      return {
        riskLabel: profile.risk_label_cat,
        healthImpact: profile.health_impact_cat,
      };
    default:
      return {
        riskLabel: profile.risk_label_human,
        healthImpact: profile.health_impact_human,
      };
  }
}

export function getIngredientDisplayData(ingredient: Ingredient, mode: SpeciesMode): Ingredient {
  try {
    const ingredientKey = ingredient.ingredientKey?.trim().toLowerCase();

    if (!ingredientKey) {
      console.log("[Profiles] Fallback: ingredient_key missing, using ingredient defaults");
      return ingredient;
    }

    const profile = getProfileMap().get(ingredientKey);

    if (!profile) {
      console.log(`[Profiles] Fallback: no profile found for key=\"${ingredientKey}\"`);
      return ingredient;
    }

    console.log(`[Profiles] Profile found for key=\"${ingredientKey}\", mode=\"${mode}\"`);

    const { riskLabel, healthImpact } = getModeSpecificFields(profile, mode);

    if (!profile.what_is_it) console.log(`[Profiles] Fallback: what_is_it missing for \"${ingredientKey}\"`);
    if (!profile.why_used) console.log(`[Profiles] Fallback: why_used missing for \"${ingredientKey}\"`);
    if (!profile.fun_fact) console.log(`[Profiles] Fallback: fun_fact missing for \"${ingredientKey}\"`);
    if (!riskLabel) console.log(`[Profiles] Fallback: risk label missing for \"${ingredientKey}\" mode=\"${mode}\"`);
    if (!healthImpact) console.log(`[Profiles] Fallback: health impact missing for \"${ingredientKey}\" mode=\"${mode}\"`);

    return {
      ...ingredient,
      whatIsIt: profile.what_is_it || ingredient.whatIsIt,
      whyUsed: profile.why_used || ingredient.whyUsed,
      funFact: profile.fun_fact || ingredient.funFact,
      level: mapProfileRisk(riskLabel, ingredient.level),
      healthImpact: healthImpact || ingredient.healthImpact,
    };
  } catch {
    console.log("[Profiles] Fallback: enrichment failed, using ingredient defaults");
    return ingredient;
  }
}
