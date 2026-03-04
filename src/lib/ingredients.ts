export type SafetyLevel = "safe" | "caution" | "danger";

export interface Ingredient {
  name: string;
  level: SafetyLevel;
  whatIsIt: string;
  whyUsed: string;
  healthImpact: string;
  funFact?: string;
}

export const sampleIngredients: Ingredient[] = [
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

export const guides = [
  { id: "ryan", name: "Ryan", desc: "Cool and friendly", emoji: "😎" },
  { id: "anita", name: "Anita", desc: "Warm and supportive", emoji: "🤗" },
  { id: "pedro", name: "Pedro", desc: "Playful companion", emoji: "🐕" },
  { id: "timon", name: "Timon", desc: "Curious explorer", emoji: "🐱" },
] as const;

export type GuideId = typeof guides[number]["id"];
