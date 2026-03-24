import profilesData from "@/data/ingredient_profiles.json";
import type { SafetyLevel, SpeciesMode, Ingredient } from "./ingredients";

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

// Build a lookup map keyed by ingredient_key
const profileMap = new Map<string, IngredientProfile>();
for (const p of profilesData as IngredientProfile[]) {
  if (p.ingredient_key) {
    profileMap.set(p.ingredient_key.toLowerCase(), p);
  }
}

function mapProfileRisk(label: string): SafetyLevel {
  const l = label.trim().toLowerCase();
  if (l === "safe") return "safe";
  if (l === "avoid" || l === "limit" || l === "danger") return "danger";
  return "caution";
}

/**
 * Enrich an Ingredient with profile data for the given species mode.
 * Returns a new Ingredient with profile fields applied, falling back
 * to the original values when profile data is missing.
 */
export function enrichWithProfile(
  ingredient: Ingredient,
  ingredientKey: string,
  mode: SpeciesMode
): Ingredient {
  const profile = profileMap.get(ingredientKey.toLowerCase());

  if (!profile) {
    console.log(`[Profiles] No profile found for key="${ingredientKey}", using fallback`);
    return ingredient;
  }

  console.log(`[Profiles] Profile found for key="${ingredientKey}", mode="${mode}"`);

  // Pick mode-specific risk + health impact
  let riskLabel: string;
  let healthImpact: string;

  switch (mode) {
    case "dog":
      riskLabel = profile.risk_label_dog;
      healthImpact = profile.health_impact_dog;
      break;
    case "cat":
      riskLabel = profile.risk_label_cat;
      healthImpact = profile.health_impact_cat;
      break;
    default:
      riskLabel = profile.risk_label_human;
      healthImpact = profile.health_impact_human;
  }

  // Build enriched ingredient with fallbacks
  const enriched: Ingredient = {
    ...ingredient,
    whatIsIt: profile.what_is_it || ingredient.whatIsIt,
    whyUsed: profile.why_used || ingredient.whyUsed,
    funFact: profile.fun_fact || ingredient.funFact,
    level: riskLabel ? mapProfileRisk(riskLabel) : ingredient.level,
    healthImpact: healthImpact || ingredient.healthImpact,
  };

  // Log fallbacks
  if (!profile.what_is_it) console.log(`[Profiles] Fallback: what_is_it missing for "${ingredientKey}"`);
  if (!healthImpact) console.log(`[Profiles] Fallback: health_impact missing for "${ingredientKey}" mode="${mode}"`);

  return enriched;
}

/** Check if a profile exists for the given key */
export function hasProfile(key: string): boolean {
  return profileMap.has(key.toLowerCase());
}
