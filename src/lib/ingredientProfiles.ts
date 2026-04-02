import profilesCsvRaw from "../../data/ingredient_profiles.csv?raw";
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

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

let cachedProfileMap: Map<string, IngredientProfile> | null = null;

function getProfileMap(): Map<string, IngredientProfile> {
  if (cachedProfileMap) return cachedProfileMap;

  cachedProfileMap = new Map<string, IngredientProfile>();

  try {
    const lines = profilesCsvRaw.split("\n").filter((l) => l.trim());
    if (lines.length < 2) {
      console.log("[Profiles] Fallback: profile CSV empty, using ingredient defaults");
      return cachedProfileMap;
    }

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i]);
      const key = cols[0]?.trim().toLowerCase();
      if (!key) continue;
      cachedProfileMap.set(key, {
        ingredient_key: key,
        what_is_it: cols[1] ?? "",
        why_used: cols[2] ?? "",
        fun_fact: cols[3] ?? "",
        risk_label_human: cols[4] ?? "",
        health_impact_human: cols[5] ?? "",
        risk_label_dog: cols[6] ?? "",
        health_impact_dog: cols[7] ?? "",
        risk_label_cat: cols[8] ?? "",
        health_impact_cat: cols[9] ?? "",
      });
    }

    console.log(`[Profiles] Loaded ${cachedProfileMap.size} profiles from CSV`);
  } catch {
    console.log("[Profiles] Fallback: could not load profile CSV, using ingredient defaults");
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
