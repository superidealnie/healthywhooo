import csvRaw from "../../data/ingredients_master.csv?raw";
import type { SafetyLevel, SpeciesMode, Ingredient } from "./ingredients";

export interface DbIngredient {
  key: string;
  nameEn: string;
  nameDe: string;
  namePl: string;
  aliases: string[];
  category: string;
  level: SafetyLevel;
  speciesMode: string; // "human" | "all" | "dog" | "cat"
  whatIsIt: string;
  whyUsed: string;
  healthImpact: string;
  funFact: string;
  source: string;
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

function mapRiskLabel(label: string): SafetyLevel {
  const l = label.trim().toLowerCase();
  if (l === "safe") return "safe";
  if (l === "limit") return "danger";
  return "caution";
}

let _db: DbIngredient[] | null = null;

function getDb(): DbIngredient[] {
  if (_db) return _db;
  const lines = csvRaw.split("\n").filter((l) => l.trim());
  // skip header
  _db = lines.slice(1).map((line) => {
    const cols = parseCSVLine(line);
    return {
      key: cols[0] ?? "",
      nameEn: cols[1] ?? "",
      nameDe: cols[2] ?? "",
      namePl: cols[3] ?? "",
      aliases: (cols[4] ?? "").split("|").map((a) => a.trim().toLowerCase()).filter(Boolean),
      category: cols[5] ?? "",
      level: mapRiskLabel(cols[6] ?? ""),
      speciesMode: cols[7]?.trim() ?? "all",
      whatIsIt: cols[8] ?? "",
      whyUsed: cols[9] ?? "",
      healthImpact: cols[10] ?? "",
      funFact: cols[11] ?? "",
      source: cols[12] ?? "",
    };
  });
  return _db;
}

/** Convert a DB row into the app's Ingredient shape, enriched with profile data */
function toIngredient(row: DbIngredient, mode: SpeciesMode = "human"): Ingredient {
  const base: Ingredient = {
    name: row.nameEn,
    level: row.level,
    whatIsIt: row.whatIsIt,
    whyUsed: row.whyUsed,
    healthImpact: row.healthImpact,
    funFact: row.funFact || undefined,
  };
  return enrichWithProfile(base, row.key, mode);
}

/**
 * Search the master CSV database by name, alias, or E-number.
 * Returns the first match for the given species mode.
 */
export function searchDatabase(query: string, mode: SpeciesMode): Ingredient | undefined {
  const q = query.toLowerCase().trim();
  if (!q) return undefined;
  const db = getDb();

  const match = db.find((row) => {
    // species filter: "all" matches everything, otherwise must match mode
    if (row.speciesMode !== "all" && row.speciesMode !== mode) return false;
    // exact name match
    if (row.nameEn.toLowerCase() === q) return true;
    // alias / e-number match
    if (row.aliases.includes(q)) return true;
    return false;
  });

  if (match) return toIngredient(match, mode);

  // partial match fallback
  const partial = db.find((row) => {
    if (row.speciesMode !== "all" && row.speciesMode !== mode) return false;
    if (row.nameEn.toLowerCase().includes(q) || q.includes(row.nameEn.toLowerCase())) return true;
    return row.aliases.some((a) => a.includes(q) || q.includes(a));
  });

  return partial ? toIngredient(partial, mode) : undefined;
}

/**
 * Get autocomplete suggestions from the database.
 */
export function getSuggestions(query: string, mode: SpeciesMode, limit = 6): Ingredient[] {
  const q = query.toLowerCase().trim();
  if (!q || q.length < 2) return [];
  const db = getDb();
  const results: Ingredient[] = [];

  for (const row of db) {
    if (results.length >= limit) break;
    if (row.speciesMode !== "all" && row.speciesMode !== mode) continue;
    if (
      row.nameEn.toLowerCase().includes(q) ||
      row.aliases.some((a) => a.includes(q))
    ) {
      results.push(toIngredient(row, mode));
    }
  }
  return results;
}
