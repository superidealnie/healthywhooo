import { useState } from "react";
import { extractTextFromImage } from "../utils/ocr";
import { normalizeOcrText, splitIngredients } from "../utils/ingredientParser";

export default function OcrTest() {
  const [file, setFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const text = await extractTextFromImage(file);
      const normalized = normalizeOcrText(text);
      const parsed = splitIngredients(normalized);

      setRawText(text);
      setIngredients(parsed);
    } catch (error) {
      console.error("OCR error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>OCR Test</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <div style={{ marginTop: "12px" }}>
        <button onClick={handleProcess} disabled={!file || loading}>
          {loading ? "Processing..." : "Extract text"}
        </button>
      </div>

      <h3 style={{ marginTop: "20px" }}>Raw OCR text</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>{rawText}</pre>

      <h3 style={{ marginTop: "20px" }}>Parsed ingredients</h3>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}