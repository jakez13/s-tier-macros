export interface Recipe {
  id: number;
  name: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients: {
    name: string;
    amount: string;
  }[];
  servingSize: string;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  };
  instructions: string[];
  prepTime: string;
  cookTime: string;
  requiredFoods: string[]; // Must match items from foodsData.ts
}

export const RECIPES: Recipe[] = [
  // BREAKFAST (8 recipes)
  {
    id: 1,
    name: "Scrambled Eggs with Avocado",
    mealType: "breakfast",
    ingredients: [
      { name: "Whole Eggs", amount: "6 large eggs" },
      { name: "Grass-Fed Butter", amount: "1 tbsp" },
      { name: "Avocado", amount: "1 whole" }
    ],
    servingSize: "1 serving",
    macros: { protein: 30, carbs: 12, fats: 35, calories: 470 },
    instructions: [
      "Crack 6 eggs into a bowl and whisk well",
      "Heat 1 tbsp butter in pan over medium heat",
      "Pour eggs and scramble for 2-3 minutes until fluffy",
      "Slice 1 whole avocado and serve alongside eggs"
    ],
    prepTime: "5 min",
    cookTime: "5 min",
    requiredFoods: ["Whole Eggs", "Avocado", "Grass-Fed Butter"]
  },
  {
    id: 2,
    name: "Sweet Potato Hash with Eggs and Butter",
    mealType: "breakfast",
    ingredients: [
      { name: "Sweet Potatoes", amount: "1 large (200g)" },
      { name: "Whole Eggs", amount: "4 large eggs" },
      { name: "Grass-Fed Butter", amount: "2 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 28, carbs: 45, fats: 28, calories: 540 },
    instructions: [
      "Dice sweet potato into small cubes",
      "Heat 1 tbsp butter in skillet over medium-high heat",
      "Add sweet potato and cook 8-10 minutes until crispy",
      "Push potatoes to side, add remaining butter and crack in eggs",
      "Cook eggs to desired doneness and serve together"
    ],
    prepTime: "5 min",
    cookTime: "12 min",
    requiredFoods: ["Sweet Potatoes", "Whole Eggs", "Grass-Fed Butter"]
  },
  {
    id: 3,
    name: "Oatmeal with Berries, Protein Powder, and Almonds",
    mealType: "breakfast",
    ingredients: [
      { name: "Oats", amount: "1 cup dry" },
      { name: "Whey Protein Powder", amount: "1 scoop (30g)" },
      { name: "Berries", amount: "1/2 cup" },
      { name: "Almonds", amount: "1 oz (28g)" }
    ],
    servingSize: "1 serving",
    macros: { protein: 40, carbs: 65, fats: 18, calories: 570 },
    instructions: [
      "Cook 1 cup oats with 2 cups water until creamy (5-7 min)",
      "Stir in protein powder while hot",
      "Top with berries and chopped almonds",
      "Optional: add a drizzle of honey for extra carbs"
    ],
    prepTime: "2 min",
    cookTime: "7 min",
    requiredFoods: ["Oats", "Whey Protein Powder", "Berries", "Almonds"]
  },
  {
    id: 4,
    name: "Eggs and Sourdough Toast with Butter",
    mealType: "breakfast",
    ingredients: [
      { name: "Whole Eggs", amount: "5 large eggs" },
      { name: "Sourdough Bread", amount: "2 slices" },
      { name: "Grass-Fed Butter", amount: "2 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 32, carbs: 35, fats: 30, calories: 530 },
    instructions: [
      "Toast 2 slices sourdough bread",
      "Spread 1 tbsp butter on each slice",
      "Scramble or fry 5 eggs in remaining butter",
      "Serve eggs with buttered toast"
    ],
    prepTime: "3 min",
    cookTime: "5 min",
    requiredFoods: ["Whole Eggs", "Sourdough Bread", "Grass-Fed Butter"]
  },
  {
    id: 5,
    name: "Greek Yogurt Bowl with Berries and Honey",
    mealType: "breakfast",
    ingredients: [
      { name: "Greek Yogurt (Full Fat)", amount: "2 cups (450g)" },
      { name: "Berries", amount: "1 cup" },
      { name: "Honey", amount: "2 tbsp" },
      { name: "Almonds", amount: "1 oz (28g)" }
    ],
    servingSize: "1 serving",
    macros: { protein: 35, carbs: 55, fats: 22, calories: 540 },
    instructions: [
      "Add 2 cups full-fat Greek yogurt to bowl",
      "Top with 1 cup mixed berries",
      "Drizzle 2 tbsp honey over top",
      "Sprinkle with chopped almonds"
    ],
    prepTime: "5 min",
    cookTime: "0 min",
    requiredFoods: ["Greek Yogurt (Full Fat)", "Berries", "Honey", "Almonds"]
  },
  {
    id: 6,
    name: "Protein Pancakes",
    mealType: "breakfast",
    ingredients: [
      { name: "Oats", amount: "1/2 cup" },
      { name: "Whole Eggs", amount: "3 large eggs" },
      { name: "Whey Protein Powder", amount: "1 scoop (30g)" },
      { name: "Bananas", amount: "1 medium" },
      { name: "Grass-Fed Butter", amount: "1 tbsp for cooking" }
    ],
    servingSize: "1 serving (4 pancakes)",
    macros: { protein: 45, carbs: 50, fats: 20, calories: 560 },
    instructions: [
      "Blend oats, eggs, protein powder, and banana until smooth",
      "Heat butter in non-stick pan over medium heat",
      "Pour batter to make 4 pancakes",
      "Cook 2-3 minutes per side until golden",
      "Serve with additional butter or honey"
    ],
    prepTime: "5 min",
    cookTime: "10 min",
    requiredFoods: ["Oats", "Whole Eggs", "Whey Protein Powder", "Bananas", "Grass-Fed Butter"]
  },
  {
    id: 7,
    name: "Steak and Eggs",
    mealType: "breakfast",
    ingredients: [
      { name: "Ribeye Steak", amount: "6 oz" },
      { name: "Whole Eggs", amount: "4 large eggs" },
      { name: "Grass-Fed Butter", amount: "2 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 60, carbs: 2, fats: 45, calories: 650 },
    instructions: [
      "Season ribeye with salt and pepper",
      "Heat 1 tbsp butter in cast iron skillet over high heat",
      "Sear steak 3-4 minutes per side for medium-rare",
      "Remove steak and rest 5 minutes",
      "Add remaining butter and fry eggs to desired doneness",
      "Serve steak with eggs"
    ],
    prepTime: "5 min",
    cookTime: "12 min",
    requiredFoods: ["Ribeye Steak", "Whole Eggs", "Grass-Fed Butter"]
  },
  {
    id: 8,
    name: "Cottage Cheese Bowl with Berries",
    mealType: "breakfast",
    ingredients: [
      { name: "Cottage Cheese", amount: "2 cups (450g)" },
      { name: "Berries", amount: "1 cup" },
      { name: "Honey", amount: "1 tbsp" },
      { name: "Almonds", amount: "1 oz (28g)" }
    ],
    servingSize: "1 serving",
    macros: { protein: 50, carbs: 40, fats: 15, calories: 490 },
    instructions: [
      "Add cottage cheese to bowl",
      "Top with fresh berries",
      "Drizzle with honey",
      "Sprinkle with chopped almonds"
    ],
    prepTime: "3 min",
    cookTime: "0 min",
    requiredFoods: ["Cottage Cheese", "Berries", "Honey", "Almonds"]
  },

  // LUNCH (8 recipes)
  {
    id: 9,
    name: "Grilled Chicken Thighs with White Rice and Butter",
    mealType: "lunch",
    ingredients: [
      { name: "Chicken Thighs", amount: "8 oz (2 thighs)" },
      { name: "White Rice", amount: "1.5 cups cooked" },
      { name: "Grass-Fed Butter", amount: "2 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 60, carbs: 70, fats: 28, calories: 760 },
    instructions: [
      "Season chicken thighs with salt, pepper, and garlic powder",
      "Grill or pan-sear over medium-high heat 6-7 minutes per side",
      "Cook 1.5 cups white rice according to package",
      "Mix 2 tbsp butter into hot rice",
      "Serve chicken over buttered rice"
    ],
    prepTime: "5 min",
    cookTime: "20 min",
    requiredFoods: ["Chicken Thighs", "White Rice", "Grass-Fed Butter"]
  },
  {
    id: 10,
    name: "Chicken and Sweet Potato Bowl",
    mealType: "lunch",
    ingredients: [
      { name: "Chicken Breast", amount: "8 oz" },
      { name: "Sweet Potatoes", amount: "1 large (300g)" },
      { name: "Avocado Oil", amount: "1 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 65, carbs: 60, fats: 18, calories: 650 },
    instructions: [
      "Cube sweet potato and toss with avocado oil",
      "Roast at 425°F for 25 minutes until crispy",
      "Season chicken with salt and pepper",
      "Grill or pan-sear chicken 6-7 minutes per side",
      "Slice chicken and serve over roasted sweet potatoes"
    ],
    prepTime: "10 min",
    cookTime: "25 min",
    requiredFoods: ["Chicken Breast", "Sweet Potatoes", "Avocado Oil"]
  },
  {
    id: 11,
    name: "Salmon with Quinoa and Avocado",
    mealType: "lunch",
    ingredients: [
      { name: "Salmon", amount: "6 oz fillet" },
      { name: "Quinoa", amount: "1 cup cooked" },
      { name: "Avocado", amount: "1 whole" }
    ],
    servingSize: "1 serving",
    macros: { protein: 50, carbs: 45, fats: 35, calories: 690 },
    instructions: [
      "Cook 1 cup quinoa according to package",
      "Season salmon with salt, pepper, and lemon",
      "Bake at 400°F for 12-15 minutes or pan-sear 4-5 min per side",
      "Slice avocado",
      "Serve salmon over quinoa with avocado slices"
    ],
    prepTime: "5 min",
    cookTime: "15 min",
    requiredFoods: ["Salmon", "Quinoa", "Avocado"]
  },
  {
    id: 12,
    name: "Ground Beef Stir-Fry with Rice",
    mealType: "lunch",
    ingredients: [
      { name: "Ground Beef (10-20% Fat)", amount: "8 oz" },
      { name: "White Rice", amount: "1.5 cups cooked" },
      { name: "Avocado Oil", amount: "1 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 55, carbs: 70, fats: 30, calories: 770 },
    instructions: [
      "Cook rice according to package",
      "Heat avocado oil in large skillet over high heat",
      "Add ground beef and break up with spoon",
      "Season with salt, pepper, and garlic powder",
      "Cook until browned (8-10 minutes)",
      "Serve beef over rice"
    ],
    prepTime: "5 min",
    cookTime: "15 min",
    requiredFoods: ["Ground Beef (10-20% Fat)", "White Rice", "Avocado Oil"]
  },
  {
    id: 13,
    name: "Turkey and Pasta with Olive Oil",
    mealType: "lunch",
    ingredients: [
      { name: "Turkey", amount: "8 oz ground turkey" },
      { name: "Pasta", amount: "3 oz dry (about 2 cups cooked)" },
      { name: "Extra Virgin Olive Oil", amount: "2 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 60, carbs: 65, fats: 30, calories: 770 },
    instructions: [
      "Cook pasta according to package, drain and toss with olive oil",
      "In skillet, cook ground turkey over medium-high heat",
      "Season with Italian herbs, salt, and pepper",
      "Cook until no longer pink (8-10 minutes)",
      "Combine turkey with pasta and serve"
    ],
    prepTime: "5 min",
    cookTime: "15 min",
    requiredFoods: ["Turkey", "Pasta", "Extra Virgin Olive Oil"]
  },
  {
    id: 14,
    name: "Chicken Breast with White Potatoes",
    mealType: "lunch",
    ingredients: [
      { name: "Chicken Breast", amount: "8 oz" },
      { name: "White Potatoes", amount: "2 medium (400g)" },
      { name: "Grass-Fed Butter", amount: "2 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 65, carbs: 75, fats: 24, calories: 780 },
    instructions: [
      "Cube potatoes and boil until tender (15-20 minutes)",
      "Season chicken with salt and pepper",
      "Grill or pan-sear 6-7 minutes per side",
      "Mash potatoes with butter",
      "Serve chicken with mashed potatoes"
    ],
    prepTime: "5 min",
    cookTime: "25 min",
    requiredFoods: ["Chicken Breast", "White Potatoes", "Grass-Fed Butter"]
  },
  {
    id: 15,
    name: "Ribeye Steak Salad with Olive Oil Dressing",
    mealType: "lunch",
    ingredients: [
      { name: "Ribeye Steak", amount: "6 oz" },
      { name: "Extra Virgin Olive Oil", amount: "3 tbsp" },
      { name: "Avocado", amount: "1 whole" }
    ],
    servingSize: "1 serving",
    macros: { protein: 45, carbs: 12, fats: 60, calories: 740 },
    instructions: [
      "Season ribeye with salt and pepper",
      "Sear in hot pan 3-4 minutes per side for medium-rare",
      "Let rest 5 minutes, then slice thin",
      "Arrange mixed greens on plate (not counted in macros)",
      "Top with sliced steak and avocado",
      "Drizzle with olive oil and season with salt"
    ],
    prepTime: "5 min",
    cookTime: "10 min",
    requiredFoods: ["Ribeye Steak", "Extra Virgin Olive Oil", "Avocado"]
  },
  {
    id: 16,
    name: "Sardines Rice Bowl",
    mealType: "lunch",
    ingredients: [
      { name: "Sardines", amount: "2 cans (4.4 oz each)" },
      { name: "White Rice", amount: "1.5 cups cooked" },
      { name: "Avocado", amount: "1/2 whole" }
    ],
    servingSize: "1 serving",
    macros: { protein: 45, carbs: 70, fats: 25, calories: 690 },
    instructions: [
      "Cook white rice according to package",
      "Open sardine cans and drain oil",
      "Place rice in bowl",
      "Top with sardines and sliced avocado",
      "Season with salt, pepper, and lemon juice"
    ],
    prepTime: "5 min",
    cookTime: "15 min",
    requiredFoods: ["Sardines", "White Rice", "Avocado"]
  },

  // DINNER (8 recipes)
  {
    id: 17,
    name: "Ribeye Steak with Sweet Potato and Butter",
    mealType: "dinner",
    ingredients: [
      { name: "Ribeye Steak", amount: "10 oz" },
      { name: "Sweet Potatoes", amount: "1 large (300g)" },
      { name: "Grass-Fed Butter", amount: "3 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 65, carbs: 60, fats: 55, calories: 1000 },
    instructions: [
      "Preheat oven to 425°F",
      "Pierce sweet potato and bake 45-50 minutes until soft",
      "Season ribeye generously with salt and pepper",
      "Heat cast iron skillet until smoking hot",
      "Sear steak 4 minutes per side for medium-rare, adding 1 tbsp butter",
      "Let steak rest 5 minutes",
      "Split sweet potato and add 2 tbsp butter",
      "Serve together"
    ],
    prepTime: "5 min",
    cookTime: "50 min",
    requiredFoods: ["Ribeye Steak", "Sweet Potatoes", "Grass-Fed Butter"]
  },
  {
    id: 18,
    name: "Grilled Salmon with White Rice",
    mealType: "dinner",
    ingredients: [
      { name: "Salmon", amount: "8 oz fillet" },
      { name: "White Rice", amount: "2 cups cooked" },
      { name: "Grass-Fed Butter", amount: "2 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 60, carbs: 90, fats: 35, calories: 910 },
    instructions: [
      "Cook white rice according to package",
      "Season salmon with salt, pepper, garlic powder",
      "Heat grill or pan to medium-high",
      "Cook salmon skin-side down 5-6 minutes",
      "Flip and cook another 4-5 minutes",
      "Mix butter into hot rice",
      "Serve salmon over rice"
    ],
    prepTime: "5 min",
    cookTime: "20 min",
    requiredFoods: ["Salmon", "White Rice", "Grass-Fed Butter"]
  },
  {
    id: 19,
    name: "Ground Beef Burgers with Sweet Potato Fries",
    mealType: "dinner",
    ingredients: [
      { name: "Ground Beef (10-20% Fat)", amount: "10 oz" },
      { name: "Sweet Potatoes", amount: "1 large (300g)" },
      { name: "Avocado Oil", amount: "2 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 60, carbs: 60, fats: 45, calories: 920 },
    instructions: [
      "Preheat oven to 425°F",
      "Cut sweet potato into fries, toss with avocado oil",
      "Bake fries 25-30 minutes, flipping halfway",
      "Form ground beef into 2 large patties",
      "Season generously with salt and pepper",
      "Cook patties in hot skillet 4-5 minutes per side",
      "Serve burgers with sweet potato fries"
    ],
    prepTime: "10 min",
    cookTime: "30 min",
    requiredFoods: ["Ground Beef (10-20% Fat)", "Sweet Potatoes", "Avocado Oil"]
  },
  {
    id: 20,
    name: "Chicken Thighs with Pasta and Olive Oil",
    mealType: "dinner",
    ingredients: [
      { name: "Chicken Thighs", amount: "10 oz (2-3 thighs)" },
      { name: "Pasta", amount: "3 oz dry" },
      { name: "Extra Virgin Olive Oil", amount: "3 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 65, carbs: 65, fats: 50, calories: 990 },
    instructions: [
      "Cook pasta according to package",
      "Season chicken thighs with Italian seasoning, salt, pepper",
      "Pan-sear thighs skin-side down 7-8 minutes",
      "Flip and cook another 6-7 minutes until done",
      "Drain pasta and toss with olive oil",
      "Serve chicken over pasta"
    ],
    prepTime: "5 min",
    cookTime: "20 min",
    requiredFoods: ["Chicken Thighs", "Pasta", "Extra Virgin Olive Oil"]
  },
  {
    id: 21,
    name: "Turkey Meatballs with Pasta",
    mealType: "dinner",
    ingredients: [
      { name: "Turkey", amount: "10 oz ground turkey" },
      { name: "Pasta", amount: "3 oz dry" },
      { name: "Extra Virgin Olive Oil", amount: "2 tbsp" },
      { name: "Whole Eggs", amount: "1 egg (for meatballs)" }
    ],
    servingSize: "1 serving",
    macros: { protein: 70, carbs: 65, fats: 35, calories: 870 },
    instructions: [
      "Mix ground turkey with 1 egg, salt, pepper, garlic powder",
      "Form into 6-8 meatballs",
      "Bake at 400°F for 20 minutes or pan-fry",
      "Cook pasta according to package",
      "Toss pasta with olive oil",
      "Serve meatballs over pasta"
    ],
    prepTime: "10 min",
    cookTime: "20 min",
    requiredFoods: ["Turkey", "Pasta", "Extra Virgin Olive Oil", "Whole Eggs"]
  },
  {
    id: 22,
    name: "Pan-Seared Salmon with Roasted Potatoes",
    mealType: "dinner",
    ingredients: [
      { name: "Salmon", amount: "8 oz fillet" },
      { name: "White Potatoes", amount: "2 medium (400g)" },
      { name: "Avocado Oil", amount: "2 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 60, carbs: 75, fats: 32, calories: 840 },
    instructions: [
      "Preheat oven to 425°F",
      "Cube potatoes and toss with 1 tbsp avocado oil",
      "Roast 30-35 minutes until crispy",
      "Season salmon with salt and pepper",
      "Heat remaining oil in pan over medium-high",
      "Sear salmon skin-side down 5 minutes",
      "Flip and cook 4 more minutes",
      "Serve salmon with roasted potatoes"
    ],
    prepTime: "10 min",
    cookTime: "35 min",
    requiredFoods: ["Salmon", "White Potatoes", "Avocado Oil"]
  },
  {
    id: 23,
    name: "Steak with Mashed White Potatoes",
    mealType: "dinner",
    ingredients: [
      { name: "Ribeye Steak", amount: "8 oz" },
      { name: "White Potatoes", amount: "3 medium (500g)" },
      { name: "Grass-Fed Butter", amount: "3 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 55, carbs: 85, fats: 45, calories: 970 },
    instructions: [
      "Peel and cube potatoes, boil until tender (20 minutes)",
      "Season steak with salt and pepper",
      "Sear in hot pan 3-4 minutes per side",
      "Let steak rest 5 minutes",
      "Drain potatoes and mash with butter",
      "Serve steak with mashed potatoes"
    ],
    prepTime: "10 min",
    cookTime: "25 min",
    requiredFoods: ["Ribeye Steak", "White Potatoes", "Grass-Fed Butter"]
  },
  {
    id: 24,
    name: "Grilled Chicken with Quinoa and Avocado",
    mealType: "dinner",
    ingredients: [
      { name: "Chicken Breast", amount: "10 oz" },
      { name: "Quinoa", amount: "1.5 cups cooked" },
      { name: "Avocado", amount: "1 whole" }
    ],
    servingSize: "1 serving",
    macros: { protein: 75, carbs: 60, fats: 28, calories: 790 },
    instructions: [
      "Cook quinoa according to package",
      "Season chicken with salt, pepper, paprika",
      "Grill or pan-sear 7-8 minutes per side",
      "Let chicken rest 5 minutes, then slice",
      "Slice avocado",
      "Serve chicken over quinoa with avocado"
    ],
    prepTime: "5 min",
    cookTime: "20 min",
    requiredFoods: ["Chicken Breast", "Quinoa", "Avocado"]
  },

  // SNACKS (6 recipes)
  {
    id: 25,
    name: "Whey Protein Shake with Banana",
    mealType: "snack",
    ingredients: [
      { name: "Whey Protein Powder", amount: "2 scoops (60g)" },
      { name: "Bananas", amount: "1 large" },
      { name: "Whole Eggs", amount: "2 raw eggs (pasteurized)" }
    ],
    servingSize: "1 shake",
    macros: { protein: 65, carbs: 35, fats: 12, calories: 500 },
    instructions: [
      "Add 2 scoops protein powder to blender",
      "Add 1 banana",
      "Add 2 raw pasteurized eggs",
      "Add 1 cup water or milk",
      "Blend until smooth",
      "Drink immediately"
    ],
    prepTime: "3 min",
    cookTime: "0 min",
    requiredFoods: ["Whey Protein Powder", "Bananas", "Whole Eggs"]
  },
  {
    id: 26,
    name: "Greek Yogurt with Berries and Almonds",
    mealType: "snack",
    ingredients: [
      { name: "Greek Yogurt (Full Fat)", amount: "1.5 cups" },
      { name: "Berries", amount: "1/2 cup" },
      { name: "Almonds", amount: "1 oz (28g)" }
    ],
    servingSize: "1 serving",
    macros: { protein: 28, carbs: 25, fats: 18, calories: 370 },
    instructions: [
      "Add Greek yogurt to bowl",
      "Top with berries",
      "Sprinkle with almonds",
      "Mix and enjoy"
    ],
    prepTime: "2 min",
    cookTime: "0 min",
    requiredFoods: ["Greek Yogurt (Full Fat)", "Berries", "Almonds"]
  },
  {
    id: 27,
    name: "Cottage Cheese with Berries and Honey",
    mealType: "snack",
    ingredients: [
      { name: "Cottage Cheese", amount: "1.5 cups" },
      { name: "Berries", amount: "1/2 cup" },
      { name: "Honey", amount: "1 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 38, carbs: 30, fats: 8, calories: 340 },
    instructions: [
      "Add cottage cheese to bowl",
      "Top with berries",
      "Drizzle honey over top",
      "Mix gently and enjoy"
    ],
    prepTime: "2 min",
    cookTime: "0 min",
    requiredFoods: ["Cottage Cheese", "Berries", "Honey"]
  },
  {
    id: 28,
    name: "Protein Shake with Oats and Almond Butter",
    mealType: "snack",
    ingredients: [
      { name: "Whey Protein Powder", amount: "1 scoop (30g)" },
      { name: "Oats", amount: "1/2 cup" },
      { name: "Almonds", amount: "2 tbsp almond butter" }
    ],
    servingSize: "1 shake",
    macros: { protein: 35, carbs: 45, fats: 18, calories: 480 },
    instructions: [
      "Add protein powder to blender",
      "Add oats and almond butter",
      "Add 1 cup water or milk",
      "Blend until smooth",
      "Drink immediately"
    ],
    prepTime: "3 min",
    cookTime: "0 min",
    requiredFoods: ["Whey Protein Powder", "Oats", "Almonds"]
  },
  {
    id: 29,
    name: "Scrambled Eggs Quick Snack",
    mealType: "snack",
    ingredients: [
      { name: "Whole Eggs", amount: "4 large eggs" },
      { name: "Grass-Fed Butter", amount: "1 tbsp" }
    ],
    servingSize: "1 serving",
    macros: { protein: 24, carbs: 2, fats: 24, calories: 310 },
    instructions: [
      "Crack 4 eggs into bowl and whisk",
      "Heat butter in pan over medium heat",
      "Scramble eggs 2-3 minutes",
      "Season with salt and pepper"
    ],
    prepTime: "2 min",
    cookTime: "3 min",
    requiredFoods: ["Whole Eggs", "Grass-Fed Butter"]
  },
  {
    id: 30,
    name: "Avocado with Salt",
    mealType: "snack",
    ingredients: [
      { name: "Avocado", amount: "1 whole" }
    ],
    servingSize: "1 serving",
    macros: { protein: 4, carbs: 12, fats: 30, calories: 320 },
    instructions: [
      "Cut avocado in half and remove pit",
      "Sprinkle with sea salt",
      "Eat with spoon directly from skin"
    ],
    prepTime: "2 min",
    cookTime: "0 min",
    requiredFoods: ["Avocado"]
  }
];
