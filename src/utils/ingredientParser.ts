export function normalizeOcrText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .replace(/ingredients\s*:/gi, "")
    .replace(/zutaten\s*:/gi, "")
    .replace(/skład\s*:/gi, "")
    .trim();
}

export function splitIngredients(text: string): string[] {
  return text
    .split(/[,;]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) =>
      item.replace(/^[^a-zA-Ząćęłńóśźżäöüß]+\s*/, "").trim()
    );
}