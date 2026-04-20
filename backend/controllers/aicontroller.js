// ─────────────────────────────────────────────────────────
//  Smart Mock AI Nutrition Controller
//  Dynamically analyses free-text input and returns a
//  personalised profile, meal plan, and suggestions.
//  No external AI API — pure keyword extraction + logic.
// ─────────────────────────────────────────────────────────

// ── Keyword dictionaries for text analysis ──────────────

const GOAL_KEYWORDS = {
  weight_loss: ["lose weight", "slim", "cut", "fat loss", "lean", "shred", "diet", "reduce weight", "weight loss"],
  muscle_gain: ["muscle", "bulk", "gain", "mass", "strength", "build", "grow", "hypertrophy", "bulking"],
  maintenance: ["maintain", "balance", "healthy", "stay fit", "sustain", "general", "normal"],
};

const DIET_KEYWORDS = {
  vegan:      ["vegan", "plant based", "plant-based", "no dairy", "no animal"],
  vegetarian: ["vegetarian", "veg", "no meat", "no chicken", "no fish"],
  non_veg:    ["non veg", "non-veg", "nonveg", "meat", "chicken", "fish", "egg", "mutton"],
};

const ACTIVITY_KEYWORDS = {
  high:     ["very active", "intense", "gym daily", "athlete", "heavy workout", "high activity"],
  moderate: ["moderate", "sometimes gym", "light workout", "active", "regular exercise"],
  low:      ["sedentary", "no exercise", "lazy", "desk job", "inactive", "low activity"],
};

// ── Meal databases per diet type ────────────────────────

const MEALS = {
  vegetarian: {
    breakfast: ["Oats with banana & almonds", "Paneer paratha with curd", "Poha with peanuts", "Idli sambar", "Smoothie bowl with granola"],
    lunch:     ["Dal rice with salad", "Rajma chawal", "Chole with roti & raita", "Paneer tikka wrap", "Vegetable biryani"],
    dinner:    ["Palak paneer with roti", "Mixed veg curry with quinoa", "Stuffed capsicum with dal", "Mushroom stir-fry with brown rice", "Khichdi with ghee"],
  },
  vegan: {
    breakfast: ["Chia pudding with berries", "Avocado toast on sourdough", "Smoothie with soy milk & spinach", "Oatmeal with almond butter", "Fruit bowl with seeds"],
    lunch:     ["Quinoa black bean bowl", "Chickpea salad wrap", "Lentil soup with bread", "Tofu stir-fry with rice", "Sweet potato & kale bowl"],
    dinner:    ["Grilled tofu with veggies", "Vegan chili with rice", "Stuffed bell peppers", "Mushroom & lentil bolognese", "Coconut curry with brown rice"],
  },
  non_veg: {
    breakfast: ["Egg white omelette with toast", "Chicken sausage wrap", "Boiled eggs with avocado", "Protein pancakes", "Masala egg bhurji with roti"],
    lunch:     ["Grilled chicken with rice & salad", "Fish curry with roti", "Chicken biryani", "Tuna sandwich with greens", "Egg fried rice with veggies"],
    dinner:    ["Baked salmon with asparagus", "Chicken tikka with salad", "Grilled fish with quinoa", "Lean mutton curry with roti", "Shrimp stir-fry with noodles"],
  },
};

// ── Suggestion templates ────────────────────────────────

const SUGGESTIONS_MAP = {
  weight_loss: {
    low:      ["Walk at least 8 000 steps daily", "Avoid sugary drinks", "Eat more fibre-rich foods", "Drink water before meals", "Sleep 7-8 hours for recovery"],
    moderate: ["Add 20 min cardio 3×/week", "Reduce refined carbs", "Track your calorie intake", "Include green tea in your routine", "Eat smaller, frequent meals"],
    high:     ["Maintain a calorie deficit of 300-500 kcal", "Prioritise lean protein sources", "Time your carbs around workouts", "Stay hydrated — aim for 3 L/day", "Consider intermittent fasting"],
  },
  muscle_gain: {
    low:      ["Start with bodyweight exercises", "Eat protein with every meal", "Get at least 7 hours of sleep", "Increase daily calorie intake gradually", "Focus on compound movements"],
    moderate: ["Increase weight progressively in the gym", "Consume a post-workout protein shake", "Eat complex carbs for sustained energy", "Add creatine if suitable", "Train each muscle group 2×/week"],
    high:     ["Follow a structured hypertrophy programme", "Aim for 1.6-2.2 g protein/kg bodyweight", "Periodise your training cycles", "Include de-load weeks", "Track macros closely"],
  },
  maintenance: {
    low:      ["Stay consistent with daily movement", "Balance macros across meals", "Avoid processed snacks", "Practice mindful eating", "Hydrate adequately"],
    moderate: ["Keep a balanced 40/30/30 macro split", "Mix cardio and strength training", "Monitor body composition monthly", "Prioritise whole foods", "Manage stress levels"],
    high:     ["Ensure adequate recovery between sessions", "Cycle calorie intake based on activity", "Include mobility work", "Get regular health check-ups", "Fuel performance with nutrient-dense foods"],
  },
};

// ── Helper utilities ────────────────────────────────────

/**
 * Pick a random element from an array.
 */
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Scan `text` against a keyword map and return the first matching key.
 * Falls back to `fallback` if nothing matches.
 */
const extractFromText = (text, keywordMap, fallback) => {
  const lower = text.toLowerCase();
  for (const [key, keywords] of Object.entries(keywordMap)) {
    if (keywords.some((kw) => lower.includes(kw))) return key;
  }
  return fallback;
};

/**
 * Calculate calorie & protein targets from goal + activity level.
 * Returns { calories_target, protein_target }.
 */
const calculateTargets = (goal, activityLevel) => {
  // Base values per goal
  const bases = {
    weight_loss:  { cal: 1600, protein: 100 },
    muscle_gain:  { cal: 2600, protein: 140 },
    maintenance:  { cal: 2000, protein: 90 },
  };

  // Activity multipliers
  const activityBonus = { low: 0, moderate: 200, high: 400 };
  const proteinBonus  = { low: 0, moderate: 10,  high: 25 };

  const base = bases[goal] || bases.maintenance;

  return {
    calories_target: base.cal + (activityBonus[activityLevel] || 0),
    protein_target:  base.protein + (proteinBonus[activityLevel] || 0),
  };
};

/**
 * Build a randomised meal plan for a given diet type.
 */
const buildMealPlan = (dietType) => {
  const meals = MEALS[dietType] || MEALS.vegetarian;
  return {
    breakfast: pickRandom(meals.breakfast),
    lunch:     pickRandom(meals.lunch),
    dinner:    pickRandom(meals.dinner),
  };
};

/**
 * Return contextual suggestions for goal + activity level.
 */
const getSuggestions = (goal, activityLevel) => {
  const pool = SUGGESTIONS_MAP[goal]?.[activityLevel]
    || SUGGESTIONS_MAP.maintenance.moderate;
  return pool;
};

// ── Controller ──────────────────────────────────────────

export const extractNutrition = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({ error: "Please provide a valid text query." });
    }

    // 1. Extract intent from free-text input
    const goal          = extractFromText(text, GOAL_KEYWORDS, "maintenance");
    const dietType      = extractFromText(text, DIET_KEYWORDS, "vegetarian");
    const activityLevel = extractFromText(text, ACTIVITY_KEYWORDS, "moderate");

    // 2. Calculate nutrition targets
    const { calories_target, protein_target } = calculateTargets(goal, activityLevel);

    // 3. Build dynamic meal plan
    const mealPlan = buildMealPlan(dietType);

    // 4. Get contextual suggestions
    const suggestions = getSuggestions(goal, activityLevel);

    // 5. Assemble & send response
    const response = {
      profile: {
        goal,
        calories_target,
        protein_target,
        diet_type: dietType,
        activity_level: activityLevel,
      },
      meal_plan: mealPlan,
      suggestions,
    };

    return res.json(response);
  } catch (error) {
    console.error("extractNutrition error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};