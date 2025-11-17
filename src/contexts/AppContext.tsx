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

export interface SelectedRecipes {
  recipeIds: number[];
}

export interface MealPlan {
  breakfast: number[]; // Array of Recipe IDs
  lunch: number[];
  dinner: number[];
  snacks: number[];
}

export interface DailyMealPlan {
  breakfast: number | null;
  lunch: number | null;
  dinner: number | null;
  snacks: number | null;
}

export interface WeeklyMealPlan {
  monday: DailyMealPlan;
  tuesday: DailyMealPlan;
  wednesday: DailyMealPlan;
  thursday: DailyMealPlan;
  friday: DailyMealPlan;
  saturday: DailyMealPlan;
  sunday: DailyMealPlan;
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
  selectedRecipes: number[];
  setSelectedRecipes: (recipeIds: number[]) => void;
  toggleRecipeSelection: (recipeId: number) => void;
  currentMealPlan: MealPlan;
  setCurrentMealPlan: (plan: MealPlan) => void;
  weeklyMealPlan: WeeklyMealPlan;
  setWeeklyMealPlan: (plan: WeeklyMealPlan) => void;
  savedMealPlans: SavedMealPlan[];
  saveMealPlan: (name: string) => void;
  deleteSavedPlan: (id: string) => void;
  addRecipeToMealPlan: (recipeId: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => void;
  removeRecipeFromMealPlan: (recipeId: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => void;
  clearMealPlan: () => void;
  replaceRecipeInMealPlan: (oldRecipeId: number, newRecipeId: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => void;
  favoriteRecipes: number[];
  toggleFavorite: (recipeId: number) => void;
  isOnboarded: boolean;
  mealsSelected: boolean;
  setMealsSelected: (selected: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('userProfile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [macros, setMacrosState] = useState<Macros | null>(() => {
    try {
      const saved = localStorage.getItem('macros');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedRecipes, setSelectedRecipesState] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('selectedRecipes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentMealPlan, setCurrentMealPlanState] = useState<MealPlan>(() => {
    try {
      const saved = localStorage.getItem('currentMealPlan');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate and migrate old data structure
        return {
          breakfast: Array.isArray(parsed.breakfast) ? parsed.breakfast : [],
          lunch: Array.isArray(parsed.lunch) ? parsed.lunch : [],
          dinner: Array.isArray(parsed.dinner) ? parsed.dinner : [],
          snacks: Array.isArray(parsed.snacks) ? parsed.snacks : []
        };
      }
    } catch (e) {
      console.error('Failed to parse meal plan:', e);
    }
    return { breakfast: [], lunch: [], dinner: [], snacks: [] };
  });

  const [savedMealPlans, setSavedMealPlans] = useState<SavedMealPlan[]>(() => {
    try {
      const saved = localStorage.getItem('savedMealPlans');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favoriteRecipes, setFavoriteRecipes] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('favoriteRecipes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [weeklyMealPlan, setWeeklyMealPlanState] = useState<WeeklyMealPlan>(() => {
    try {
      const saved = localStorage.getItem('weeklyMealPlan');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse weekly meal plan:', e);
    }
    return {
      monday: { breakfast: null, lunch: null, dinner: null, snacks: null },
      tuesday: { breakfast: null, lunch: null, dinner: null, snacks: null },
      wednesday: { breakfast: null, lunch: null, dinner: null, snacks: null },
      thursday: { breakfast: null, lunch: null, dinner: null, snacks: null },
      friday: { breakfast: null, lunch: null, dinner: null, snacks: null },
      saturday: { breakfast: null, lunch: null, dinner: null, snacks: null },
      sunday: { breakfast: null, lunch: null, dinner: null, snacks: null },
    };
  });

  const [mealsSelected, setMealsSelectedState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mealsSelected');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
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

  const setSelectedRecipes = (recipeIds: number[]) => {
    setSelectedRecipesState(recipeIds);
    localStorage.setItem('selectedRecipes', JSON.stringify(recipeIds));
  };

  const toggleRecipeSelection = (recipeId: number) => {
    const updated = selectedRecipes.includes(recipeId)
      ? selectedRecipes.filter(id => id !== recipeId)
      : [...selectedRecipes, recipeId];
    setSelectedRecipes(updated);
  };

  const setCurrentMealPlan = (plan: MealPlan) => {
    setCurrentMealPlanState(plan);
    localStorage.setItem('currentMealPlan', JSON.stringify(plan));
  };

  const setWeeklyMealPlan = (plan: WeeklyMealPlan) => {
    setWeeklyMealPlanState(plan);
    localStorage.setItem('weeklyMealPlan', JSON.stringify(plan));
  };

  const addRecipeToMealPlan = (recipeId: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
    const updated = {
      ...currentMealPlan,
      [mealType]: [...currentMealPlan[mealType], recipeId]
    };
    setCurrentMealPlan(updated);
  };

  const removeRecipeFromMealPlan = (recipeId: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
    const updated = {
      ...currentMealPlan,
      [mealType]: currentMealPlan[mealType].filter(id => id !== recipeId)
    };
    setCurrentMealPlan(updated);
  };

  const clearMealPlan = () => {
    setCurrentMealPlan({
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: []
    });
  };

  const replaceRecipeInMealPlan = (oldRecipeId: number, newRecipeId: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
    const updated = {
      ...currentMealPlan,
      [mealType]: currentMealPlan[mealType].map(id => id === oldRecipeId ? newRecipeId : id)
    };
    setCurrentMealPlan(updated);
  };

  const saveMealPlan = (name: string) => {
    const plan = currentMealPlan;
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

  const setMealsSelected = (selected: boolean) => {
    setMealsSelectedState(selected);
    localStorage.setItem('mealsSelected', JSON.stringify(selected));
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        macros,
        setMacros,
        selectedRecipes,
        setSelectedRecipes,
        toggleRecipeSelection,
        currentMealPlan,
        setCurrentMealPlan,
        weeklyMealPlan,
        setWeeklyMealPlan,
        savedMealPlans,
        saveMealPlan,
        deleteSavedPlan,
        addRecipeToMealPlan,
        removeRecipeFromMealPlan,
        clearMealPlan,
        replaceRecipeInMealPlan,
        favoriteRecipes,
        toggleFavorite,
        isOnboarded,
        mealsSelected,
        setMealsSelected,
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
