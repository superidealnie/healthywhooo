export type SafetyLevel = "safe" | "caution" | "danger";
export type SpeciesMode = "human" | "dog" | "cat";

export interface Ingredient {
  name: string;
  ingredientKey?: string;
  level: SafetyLevel;
  whatIsIt: string;
  whyUsed: string;
  healthImpact: string;
  funFact?: string;
  petNote?: string;
}

// ── Human sample list ──
export const humanIngredients: Ingredient[] = [
  {
    name: "Milk",
    level: "safe",
    whatIsIt: "Regular cow's milk — the white stuff you know from cereal bowls and cookies.",
    whyUsed: "It gives chocolate its creamy, smooth texture and mild sweetness.",
    healthImpact: "Great source of calcium and protein. Most people tolerate it well, but it's not suitable for those with lactose intolerance or dairy allergies.",
    funFact: "It takes about 12 pounds of milk to make just 1 pound of chocolate! 🍫",
  },
  {
    name: "Sugar",
    level: "caution",
    whatIsIt: "The sweet white crystals you put in coffee. Basically pure energy for your body.",
    whyUsed: "Makes things taste sweet. Simple as that!",
    healthImpact: "Your body needs some sugar for energy, but too much can lead to weight gain and dental problems. Moderation is key.",
    funFact: "The average person eats about 17 teaspoons of added sugar per day — way more than the recommended 6-9! 😬",
  },
  {
    name: "Cocoa Butter",
    level: "safe",
    whatIsIt: "The natural fat from cocoa beans. It's what makes chocolate melt in your mouth (literally).",
    whyUsed: "Gives chocolate its smooth, melt-on-your-tongue texture.",
    healthImpact: "It's a natural fat that's relatively neutral for health. Contains some antioxidants too.",
    funFact: "Cocoa butter is also used in skin lotions — so chocolate is basically skincare you can eat! 🧴",
  },
  {
    name: "Cocoa Mass",
    level: "safe",
    whatIsIt: "Ground-up cocoa beans — the real chocolate flavor. It's basically liquid chocolate in its purest form.",
    whyUsed: "This is what gives chocolate its actual chocolate taste.",
    healthImpact: "Rich in antioxidants and minerals like magnesium. The darker the chocolate, the more cocoa mass.",
  },
  {
    name: "Soy Lecithin",
    level: "caution",
    whatIsIt: "A natural substance extracted from soybeans. It's a type of fat that acts like a mixer.",
    whyUsed: "Helps oil and water-based ingredients blend together smoothly — like a peacemaker for ingredients.",
    healthImpact: "Generally safe in small amounts used in food. Some people prefer to avoid soy products.",
    funFact: "Lecithin is also found naturally in eggs — your body already knows it! 🥚",
  },
  {
    name: "Palm Oil",
    level: "danger",
    whatIsIt: "Oil made from the fruit of palm trees. It's in roughly half of all packaged products.",
    whyUsed: "Cheap, versatile, and gives food a smooth, creamy texture that lasts on shelves.",
    healthImpact: "High in saturated fat, which isn't great for your heart in large amounts. Also raises major environmental concerns due to deforestation.",
    funFact: "Palm oil is in everything from ice cream to shampoo to biofuel! 🌴",
  },
  {
    name: "E407 (Carrageenan)",
    level: "danger",
    whatIsIt: "A thickener made from red seaweed. Sounds natural, but it's been debated for years.",
    whyUsed: "Makes food thicker and creamier — like a natural glue for liquids.",
    healthImpact: "Some studies suggest it may cause digestive issues in sensitive people. Regulatory bodies consider food-grade carrageenan safe, but the debate continues.",
    funFact: "People in Ireland have been using seaweed in cooking for over 600 years! ☘️",
  },
  {
    name: "Vanilla Extract",
    level: "safe",
    whatIsIt: "Flavor extracted from vanilla bean pods — those dark, wrinkly things that smell amazing.",
    whyUsed: "Adds warm, sweet flavor that makes everything taste more 'premium'.",
    healthImpact: "Perfectly safe and used in tiny amounts. Real vanilla extract even has trace antioxidants.",
    funFact: "Vanilla is the second most expensive spice in the world after saffron! 💰",
  },
];

// ── Dog sample list (kibble) ──
export const dogIngredients: Ingredient[] = [
  {
    name: "Chicken Meal",
    level: "safe",
    whatIsIt: "Chicken that's been cooked and dried into a concentrated protein powder.",
    whyUsed: "Packs a ton of protein into a small amount — great for kibble.",
    healthImpact: "Excellent protein source for dogs. Highly digestible and nutritious.",
    funFact: "Chicken meal has about 300% more protein than fresh chicken by weight! 🐔",
    petNote: "For dogs: A top-quality protein source. Look for 'chicken meal' over generic 'poultry meal' for better traceability.",
  },
  {
    name: "Corn",
    level: "caution",
    whatIsIt: "Regular corn, ground into flour or meal. A common grain in pet food.",
    whyUsed: "It's an affordable energy source and helps bind kibble together.",
    healthImpact: "Provides energy and some nutrients, but dogs don't digest corn as efficiently as meat proteins.",
    petNote: "For dogs: Not harmful, but some owners prefer grain-free options. It's mainly a filler that adds carbohydrates.",
  },
  {
    name: "Wheat",
    level: "caution",
    whatIsIt: "The same grain used in bread and pasta, ground into flour.",
    whyUsed: "Cheap source of carbs and helps give kibble its shape.",
    healthImpact: "Most dogs tolerate wheat fine, but some can develop sensitivities over time.",
    petNote: "For dogs: A small percentage of dogs may be gluten-sensitive. Watch for itching or digestive issues.",
  },
  {
    name: "Animal Fat",
    level: "caution",
    whatIsIt: "Fat collected from various animal sources during rendering.",
    whyUsed: "Makes food taste better for dogs and provides concentrated energy.",
    healthImpact: "Fat is essential for dogs, but 'animal fat' is vague — you don't know exactly which animal it comes from.",
    funFact: "Dogs can smell fat from incredibly far away — it's like perfume to them! 👃",
    petNote: "For dogs: Prefer named fats like 'chicken fat' over generic 'animal fat' for transparency.",
  },
  {
    name: "Beet Pulp",
    level: "safe",
    whatIsIt: "The fibrous part left over after sugar is extracted from sugar beets.",
    whyUsed: "A gentle source of fiber that helps with digestion.",
    healthImpact: "Great for digestive health. It's a prebiotic that feeds good gut bacteria.",
    petNote: "For dogs: Excellent fiber source. Helps keep stools firm and healthy.",
  },
  {
    name: "Brewers Yeast",
    level: "safe",
    whatIsIt: "A type of yeast left over from beer brewing. Rich in B vitamins.",
    whyUsed: "Adds flavor dogs love and provides nutritional benefits.",
    healthImpact: "Good source of B vitamins and minerals. Also thought to help repel fleas naturally.",
    funFact: "Some dog owners sprinkle brewer's yeast on food as a natural flea deterrent! 🍺",
    petNote: "For dogs: Generally excellent — adds nutrition and makes food tastier.",
  },
  {
    name: "Natural Flavors",
    level: "caution",
    whatIsIt: "Flavoring derived from animal or plant sources, but the exact ingredients aren't specified.",
    whyUsed: "Makes the food smell and taste more appealing to dogs.",
    healthImpact: "Usually safe, but 'natural flavors' is intentionally vague. You can't tell exactly what's in it.",
    petNote: "For dogs: Not necessarily bad, but the lack of specificity means you can't know for sure what's included.",
  },
  {
    name: "Salt",
    level: "caution",
    whatIsIt: "Regular table salt — sodium chloride.",
    whyUsed: "Enhances flavor and acts as a preservative.",
    healthImpact: "Dogs need a small amount of sodium, but too much can be dangerous.",
    petNote: "For dogs: Small amounts are fine, but excessive salt can cause increased thirst, vomiting, or worse.",
  },
  {
    name: "BHA/BHT (Preservatives)",
    level: "danger",
    whatIsIt: "Synthetic chemical preservatives that prevent fats from going rancid.",
    whyUsed: "They keep pet food fresh for a very long time on store shelves.",
    healthImpact: "These are controversial — some studies link them to health concerns in animals at high doses.",
    funFact: "BHA and BHT were first used in the petroleum industry before being added to food! ⛽",
    petNote: "For dogs: Many pet owners and vets prefer foods with natural preservatives like vitamin E (mixed tocopherols) instead.",
  },
];

// ── Cat sample list (wet food) ──
export const catIngredients: Ingredient[] = [
  {
    name: "Chicken",
    level: "safe",
    whatIsIt: "Real chicken meat — the same stuff humans eat, just prepared for cat food.",
    whyUsed: "Cats are meat-lovers, and chicken is a great protein source they enjoy.",
    healthImpact: "Excellent, highly digestible protein. Exactly what cats need as obligate carnivores.",
    funFact: "Cats have about 470 taste buds compared to humans' 9,000 — but they know good chicken! 🐱",
    petNote: "For cats: Whole meat listed first is a great sign — it means protein is the main ingredient.",
  },
  {
    name: "Chicken Broth",
    level: "safe",
    whatIsIt: "Water that chicken has been cooked in — basically chicken-flavored liquid.",
    whyUsed: "Adds moisture and flavor to wet food. Helps cats stay hydrated.",
    healthImpact: "Great for hydration. Cats naturally don't drink enough water, so broth in food helps.",
    petNote: "For cats: Extra moisture is actually very beneficial — cats evolved as desert animals and often don't drink enough water.",
  },
  {
    name: "Liver",
    level: "safe",
    whatIsIt: "An organ meat (usually chicken or beef liver) — packed with nutrients.",
    whyUsed: "Rich in vitamins and minerals, and cats absolutely love the taste.",
    healthImpact: "Nutrient-dense superfood for cats. High in vitamin A, iron, and B vitamins.",
    funFact: "In the wild, cats eat the liver of their prey first — they instinctively know it's the most nutritious part! 🦁",
    petNote: "For cats: Liver is excellent in moderation. Too much vitamin A from liver can be harmful, but normal food amounts are perfectly balanced.",
  },
  {
    name: "Taurine",
    level: "safe",
    whatIsIt: "An amino acid that cats absolutely must have in their diet. It's not optional for them.",
    whyUsed: "Added to ensure cats get enough — their bodies can't make it on their own.",
    healthImpact: "Essential for heart health, vision, and reproduction in cats. Deficiency can be fatal.",
    funFact: "Taurine is named after the Latin word 'taurus' (bull) because it was first isolated from ox bile! 🐂",
    petNote: "For cats: This is critical. Cats are obligate carnivores and cannot synthesize taurine — it MUST be in their food.",
  },
  {
    name: "Guar Gum",
    level: "safe",
    whatIsIt: "A natural thickener made from guar beans. Think of it as a plant-based gelatin.",
    whyUsed: "Gives wet food its smooth, gravy-like texture that cats enjoy.",
    healthImpact: "Generally well-tolerated by cats. It's a common and safe food additive.",
    petNote: "For cats: Safe and functional. It just holds the food together in that nice gravy or pâté texture.",
  },
  {
    name: "Carrageenan",
    level: "danger",
    whatIsIt: "A thickener extracted from red seaweed. Used widely in both human and pet food.",
    whyUsed: "Creates a gel-like texture in wet food — helps it hold its shape.",
    healthImpact: "Debated ingredient. Some studies suggest it may cause GI inflammation, though food-grade carrageenan is considered safe by regulators.",
    petNote: "For cats: Controversial in cat food. Some holistic vets recommend avoiding it, especially for cats with sensitive stomachs.",
  },
  {
    name: "Vitamins & Minerals",
    level: "safe",
    whatIsIt: "A blend of essential vitamins (A, D, E, B-complex) and minerals (zinc, iron, etc.).",
    whyUsed: "Ensures the food is nutritionally complete — covering all the bases.",
    healthImpact: "Essential for overall health. Without these supplements, commercial food wouldn't meet nutritional standards.",
    petNote: "For cats: This is what makes a food 'complete and balanced.' Without it, the food would be just a snack, not a meal.",
  },
  {
    name: "Natural Flavors",
    level: "caution",
    whatIsIt: "Flavoring from animal or plant sources. The exact recipe is usually a trade secret.",
    whyUsed: "Makes the food more appetizing — important for picky cats!",
    healthImpact: "Generally safe, but the vagueness of 'natural flavors' means you can't be 100% sure what's in it.",
    funFact: "Cats can be incredibly picky — some will refuse food if you change brands even slightly! 😾",
    petNote: "For cats: Cats are obligate carnivores, so ideally these flavors come from animal sources. Plant-based fillers are less useful for them.",
  },
];

// Keep legacy export for backward compatibility
export const sampleIngredients = humanIngredients;

export const guides = [
  { id: "ryan", name: "Ryan", desc: "Cool and friendly", emoji: "😎", species: "human" as SpeciesMode },
  { id: "anita", name: "Anita", desc: "Warm and supportive", emoji: "🤗", species: "human" as SpeciesMode },
  { id: "pedro", name: "Pedro", desc: "Playful companion", emoji: "🐕", species: "dog" as SpeciesMode },
  { id: "timon", name: "Timon", desc: "Curious explorer", emoji: "🐱", species: "cat" as SpeciesMode },
] as const;

export type GuideId = typeof guides[number]["id"];

export function getSpeciesMode(guideId: GuideId | null): SpeciesMode {
  if (!guideId) return "human";
  const g = guides.find((g) => g.id === guideId);
  return g?.species ?? "human";
}

export function getIngredientsForMode(mode: SpeciesMode): Ingredient[] {
  switch (mode) {
    case "dog": return dogIngredients;
    case "cat": return catIngredients;
    default: return humanIngredients;
  }
}

import {
  searchDatabase as searchIngredientDatabase,
  getSuggestions as getDatabaseSuggestions,
} from "./ingredientDatabase";

export function searchDatabase(query: string): Ingredient | undefined {
  return searchIngredientDatabase(query);
}

export function getSuggestions(query: string, _mode: SpeciesMode, limit = 6): Ingredient[] {
  return getDatabaseSuggestions(query, limit);
}

export function findIngredientByName(query: string, mode: SpeciesMode): Ingredient | undefined {
  const list = getIngredientsForMode(mode);
  const q = query.toLowerCase().trim();
  const local = list.find((i) => i.name.toLowerCase().includes(q) || q.includes(i.name.toLowerCase()));
  if (local) return local;
  return searchDatabase(query);
}
