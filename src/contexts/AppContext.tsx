import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  weight: number;
  heightFeet: number;
  heightInches: number;
  age: number;
  activityLevel: 'minimal' | 'light' | 'moderate' | 'active';
  goal: 'bulk' | 'maintain' | 'cut';
}

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface FoodPreferences {
  proteins: string[];
  carbs: string[];
  fats: string[];
}

export interface MealPlan {
  breakfast: number[]; // Array of Recipe IDs
  lunch: number[];
  dinner: number[];
  snacks: number[];
}

export interface SavedMealPlan {
  id: string;
  name: string;
  plan: MealPlan;
  createdAt: string;
}

interface AppContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  macros: Macros | null;
  setMacros: (macros: Macros) => void;
  foodPreferences: FoodPreferences | null;
  setFoodPreferences: (preferences: FoodPreferences) => void;
  currentMealPlan: MealPlan | null;
  setCurrentMealPlan: (plan: MealPlan) => void;
  savedMealPlans: SavedMealPlan[];
  saveMealPlan: (name: string, plan: MealPlan) => void;
  deleteSavedPlan: (id: string) => void;
  addRecipeToMealPlan: (recipeId: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => void;
  removeRecipeFromMealPlan: (recipeId: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => void;
  favoriteRecipes: number[];
  toggleFavorite: (recipeId: number) => void;
  isOnboarded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : null;
  });

  const [macros, setMacrosState] = useState<Macros | null>(() => {
    const saved = localStorage.getItem('macros');
    return saved ? JSON.parse(saved) : null;
  });

  const [foodPreferences, setFoodPreferencesState] = useState<FoodPreferences | null>(() => {
    const saved = localStorage.getItem('foodPreferences');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentMealPlan, setCurrentMealPlanState] = useState<MealPlan | null>(() => {
    const saved = localStorage.getItem('currentMealPlan');
    return saved ? JSON.parse(saved) : { breakfast: [], lunch: [], dinner: [], snacks: [] };
  });

  const [savedMealPlans, setSavedMealPlans] = useState<SavedMealPlan[]>(() => {
    const saved = localStorage.getItem('savedMealPlans');
    return saved ? JSON.parse(saved) : [];
  });

  const [favoriteRecipes, setFavoriteRecipes] = useState<number[]>(() => {
    const saved = localStorage.getItem('favoriteRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  const isOnboarded = !!userProfile && !!macros;

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  const setMacros = (newMacros: Macros) => {
    setMacrosState(newMacros);
    localStorage.setItem('macros', JSON.stringify(newMacros));
  };

  const setFoodPreferences = (preferences: FoodPreferences) => {
    setFoodPreferencesState(preferences);
    localStorage.setItem('foodPreferences', JSON.stringify(preferences));
  };

  const setCurrentMealPlan = (plan: MealPlan) => {
    setCurrentMealPlanState(plan);
    localStorage.setItem('currentMealPlan', JSON.stringify(plan));
  };

  const addRecipeToMealPlan = (recipeId: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
    const updated = {
      ...currentMealPlan!,
      [mealType]: [...(currentMealPlan?.[mealType] || []), recipeId]
    };
    setCurrentMealPlan(updated);
  };

  const removeRecipeFromMealPlan = (recipeId: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
    const updated = {
      ...currentMealPlan!,
      [mealType]: currentMealPlan?.[mealType].filter(id => id !== recipeId) || []
    };
    setCurrentMealPlan(updated);
  };

  const saveMealPlan = (name: string, plan: MealPlan) => {
    const newPlan: SavedMealPlan = {
      id: Date.now().toString(),
      name,
      plan: plan,
      createdAt: new Date().toISOString()
    };
    const updated = [...savedMealPlans, newPlan];
    setSavedMealPlans(updated);
    localStorage.setItem('savedMealPlans', JSON.stringify(updated));
  };

  const deleteSavedPlan = (id: string) => {
    const updated = savedMealPlans.filter(p => p.id !== id);
    setSavedMealPlans(updated);
    localStorage.setItem('savedMealPlans', JSON.stringify(updated));
  };

  const toggleFavorite = (recipeId: number) => {
    const updated = favoriteRecipes.includes(recipeId)
      ? favoriteRecipes.filter(id => id !== recipeId)
      : [...favoriteRecipes, recipeId];
    setFavoriteRecipes(updated);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        macros,
        setMacros,
        foodPreferences,
        setFoodPreferences,
        currentMealPlan,
        setCurrentMealPlan,
        savedMealPlans,
        saveMealPlan,
        deleteSavedPlan,
        addRecipeToMealPlan,
        removeRecipeFromMealPlan,
        favoriteRecipes,
        toggleFavorite,
        isOnboarded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
