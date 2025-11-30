import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  weight: number;
  heightFeet: number;
  heightInches: number;
  age: number;
  activityLevel: 'minimal' | 'light' | 'moderate' | 'active';
  goal: 'bulk' | 'maintain' | 'cut';
  calories?: number;
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
  calories?: number;
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

interface DailyTracking {
  morningProtocol: boolean[];
  supplements: boolean[];
  waterGlasses: number;
  afterLunchFiber: boolean;
  beforeBedRitual: boolean[];
  breakfastCompleted?: boolean;
  lunchCompleted?: boolean;
  dinnerCompleted?: boolean;
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
  resetAllData: () => void;
  loadDurdenRoutine: () => void;
  durdenPlan: 'lean' | 'bulk';
  setDurdenPlan: (plan: 'lean' | 'bulk') => void;
  dailyTracking: DailyTracking;
  updateDailyTracking: (updates: Partial<DailyTracking>) => void;
  complianceStreak: number;
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

  const [durdenPlan, setDurdenPlanState] = useState<'lean' | 'bulk'>(() => {
    try {
      const saved = localStorage.getItem('durdenPlan');
      return saved ? JSON.parse(saved) : 'lean';
    } catch {
      return 'lean';
    }
  });

  const [dailyTracking, setDailyTrackingState] = useState<DailyTracking>(() => {
    try {
      const saved = localStorage.getItem('dailyTracking');
      const today = new Date().toDateString();
      const savedData = saved ? JSON.parse(saved) : null;
      
      // Reset if it's a new day
      if (savedData && savedData.date === today) {
        return savedData.tracking;
      }
    } catch {}
    
    return {
      morningProtocol: [false, false, false, false],
      supplements: [false, false, false, false, false, false],
      waterGlasses: 0,
      afterLunchFiber: false,
      beforeBedRitual: [false, false, false],
      breakfastCompleted: false,
      lunchCompleted: false,
      dinnerCompleted: false,
    };
  });

  const [complianceStreak, setComplianceStreakState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('complianceStreak');
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
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
    
    // Auto-sync calories to userProfile
    if (userProfile) {
      const updatedProfile = { ...userProfile, calories: newMacros.calories };
      setUserProfileState(updatedProfile);
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    }
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

  const setDurdenPlan = (plan: 'lean' | 'bulk') => {
    setDurdenPlanState(plan);
    localStorage.setItem('durdenPlan', JSON.stringify(plan));
  };

  const updateDailyTracking = (updates: Partial<DailyTracking>) => {
    const newTracking = { ...dailyTracking, ...updates };
    setDailyTrackingState(newTracking);
    
    const today = new Date().toDateString();
    localStorage.setItem('dailyTracking', JSON.stringify({
      date: today,
      tracking: newTracking
    }));
  };

  const resetAllData = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const loadDurdenRoutine = () => {
    // Durden's recipes
    const breakfastId = 33; // Durden's Breakfast: Eggs, Avocado & Banana
    const lunchOptions = [31, 9]; // Ribeye with White Rice, Chicken Thighs with Rice
    const dinnerOptions = [32, 34]; // Olive Oil Tuna Bowl, Pan-Seared Salmon
    const snackId = 35; // Bedtime Protein Shake

    // Create weekly plan with Durden's routine (alternating lunch/dinner options)
    const durdenWeeklyPlan: WeeklyMealPlan = {
      monday: { breakfast: breakfastId, lunch: lunchOptions[0], dinner: dinnerOptions[0], snacks: snackId },
      tuesday: { breakfast: breakfastId, lunch: lunchOptions[1], dinner: dinnerOptions[1], snacks: snackId },
      wednesday: { breakfast: breakfastId, lunch: lunchOptions[0], dinner: dinnerOptions[0], snacks: snackId },
      thursday: { breakfast: breakfastId, lunch: lunchOptions[1], dinner: dinnerOptions[1], snacks: snackId },
      friday: { breakfast: breakfastId, lunch: lunchOptions[0], dinner: dinnerOptions[0], snacks: snackId },
      saturday: { breakfast: breakfastId, lunch: lunchOptions[1], dinner: dinnerOptions[1], snacks: snackId },
      sunday: { breakfast: breakfastId, lunch: lunchOptions[0], dinner: dinnerOptions[0], snacks: snackId },
    };

    // Also update currentMealPlan for compatibility
    const durdenCurrentPlan: MealPlan = {
      breakfast: [breakfastId],
      lunch: lunchOptions,
      dinner: dinnerOptions,
      snacks: [snackId]
    };

    // Set flag to prevent auto-regeneration
    localStorage.setItem('durdenRoutineActive', 'true');
    
    setWeeklyMealPlan(durdenWeeklyPlan);
    setCurrentMealPlan(durdenCurrentPlan);
    setMealsSelected(true);
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
        resetAllData,
        loadDurdenRoutine,
        durdenPlan,
        setDurdenPlan,
        dailyTracking,
        updateDailyTracking,
        complianceStreak,
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
