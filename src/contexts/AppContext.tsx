import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  weight: number;
  heightFeet: number;
  heightInches: number;
  age: number;
  activityLevel: 'sedentary' | 'moderate' | 'active';
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

export interface MealLog {
  id: string;
  name: string;
  time: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export interface DailyLog {
  date: string;
  meals: MealLog[];
  waterGlasses: number;
}

interface AppContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  macros: Macros | null;
  setMacros: (macros: Macros) => void;
  foodPreferences: FoodPreferences | null;
  setFoodPreferences: (preferences: FoodPreferences) => void;
  dailyLogs: DailyLog[];
  addMealToToday: (meal: Omit<MealLog, 'id'>) => void;
  deleteMeal: (mealId: string) => void;
  addWaterGlass: () => void;
  getTodayLog: () => DailyLog;
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

  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>(() => {
    const saved = localStorage.getItem('dailyLogs');
    return saved ? JSON.parse(saved) : [];
  });

  const isOnboarded = !!userProfile && !!macros && !!foodPreferences;

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

  useEffect(() => {
    localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  const getTodayLog = (): DailyLog => {
    const today = new Date().toISOString().split('T')[0];
    const todayLog = dailyLogs.find(log => log.date === today);
    
    if (!todayLog) {
      const newLog: DailyLog = { date: today, meals: [], waterGlasses: 0 };
      setDailyLogs([...dailyLogs, newLog]);
      return newLog;
    }
    
    return todayLog;
  };

  const addMealToToday = (meal: Omit<MealLog, 'id'>) => {
    const today = new Date().toISOString().split('T')[0];
    const mealWithId: MealLog = { ...meal, id: Date.now().toString() };
    
    setDailyLogs(logs => {
      const todayIndex = logs.findIndex(log => log.date === today);
      
      if (todayIndex >= 0) {
        const updated = [...logs];
        updated[todayIndex] = {
          ...updated[todayIndex],
          meals: [...updated[todayIndex].meals, mealWithId]
        };
        return updated;
      } else {
        return [...logs, { date: today, meals: [mealWithId], waterGlasses: 0 }];
      }
    });
  };

  const deleteMeal = (mealId: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setDailyLogs(logs => {
      const todayIndex = logs.findIndex(log => log.date === today);
      
      if (todayIndex >= 0) {
        const updated = [...logs];
        updated[todayIndex] = {
          ...updated[todayIndex],
          meals: updated[todayIndex].meals.filter(m => m.id !== mealId)
        };
        return updated;
      }
      
      return logs;
    });
  };

  const addWaterGlass = () => {
    const today = new Date().toISOString().split('T')[0];
    
    setDailyLogs(logs => {
      const todayIndex = logs.findIndex(log => log.date === today);
      
      if (todayIndex >= 0) {
        const updated = [...logs];
        updated[todayIndex] = {
          ...updated[todayIndex],
          waterGlasses: updated[todayIndex].waterGlasses + 1
        };
        return updated;
      } else {
        return [...logs, { date: today, meals: [], waterGlasses: 1 }];
      }
    });
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
        dailyLogs,
        addMealToToday,
        deleteMeal,
        addWaterGlass,
        getTodayLog,
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
