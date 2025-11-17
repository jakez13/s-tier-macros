import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { RECIPES, Recipe } from '@/data/recipesData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Loader2, ChevronLeft, ChevronRight, Check, Clock, Circle, Sparkles, TrendingUp, Target } from 'lucide-react';
import { toast } from 'sonner';
import { DailyMealPlan } from '@/contexts/AppContext';
import { Progress } from '@/components/ui/progress';

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

const DAYS: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'MON',
  tuesday: 'TUE',
  wednesday: 'WED',
  thursday: 'THU',
  friday: 'FRI',
  saturday: 'SAT',
  sunday: 'SUN',
};

const DAY_FULL_LABELS: Record<DayOfWeek, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

interface LoadingStep {
  label: string;
  status: 'pending' | 'active' | 'complete';
}

export const MealPlans = () => {
  const { macros, weeklyMealPlan, setWeeklyMealPlan, selectedRecipes } = useApp();
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('monday');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([
    { label: 'Analyzing your favorite recipes', status: 'pending' },
    { label: 'Finding optimal macro combinations', status: 'pending' },
    { label: 'Building 7 days of variety', status: 'pending' },
    { label: 'Calculating totals', status: 'pending' },
  ]);

  // Auto-generate plan when favorites change or on mount
  useEffect(() => {
    const isPlanEmpty = DAYS.every(day => {
      const dayPlan = weeklyMealPlan[day];
      return !dayPlan.breakfast && !dayPlan.lunch && !dayPlan.dinner && !dayPlan.snacks;
    });

    const hasFavorites = selectedRecipes.length > 0;

    if (isPlanEmpty && !isGenerating && macros && hasFavorites) {
      generateWeeklyMealPlan();
    }
  }, [selectedRecipes]); // Regenerate when favorites change

  const getRecipeById = (id: number): Recipe | undefined => {
    return RECIPES.find(r => r.id === id);
  };

  const calculateDayTotals = (day: DailyMealPlan) => {
    const meals = [day.breakfast, day.lunch, day.dinner, day.snacks].filter(id => id !== null);
    return meals.reduce((totals, id) => {
      const recipe = getRecipeById(id as number);
      if (recipe) {
        totals.protein += recipe.macros.protein;
        totals.carbs += recipe.macros.carbs;
        totals.fats += recipe.macros.fats;
        totals.calories += recipe.macros.calories;
      }
      return totals;
    }, { protein: 0, carbs: 0, fats: 0, calories: 0 });
  };

  const generateWeeklyMealPlan = async () => {
    if (!macros) {
      toast.error('Please set your macro goals first');
      return;
    }

    setIsGenerating(true);
    
    const steps = [
      { label: 'Analyzing your favorite recipes', status: 'pending' as const },
      { label: 'Finding optimal macro combinations', status: 'pending' as const },
      { label: 'Building 7 days of variety', status: 'pending' as const },
      { label: 'Calculating totals', status: 'pending' as const },
    ];
    setLoadingSteps(steps);

    await new Promise(resolve => setTimeout(resolve, 300));
    setLoadingSteps([
      { label: 'Analyzing your favorite recipes', status: 'complete' },
      { label: 'Finding optimal macro combinations', status: 'active' },
      { label: 'Building 7 days of variety', status: 'pending' },
      { label: 'Calculating totals', status: 'pending' },
    ]);

    const breakfasts = RECIPES.filter(r => r.mealType === 'breakfast');
    const lunches = RECIPES.filter(r => r.mealType === 'lunch');
    const dinners = RECIPES.filter(r => r.mealType === 'dinner');
    const snacks = RECIPES.filter(r => r.mealType === 'snack');

    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newWeekPlan = { ...weeklyMealPlan };
    const usedRecipesByDay: { [day: string]: number[] } = {};

    const calculateScore = (
      total: { calories: number; protein: number; carbs: number; fats: number },
      previousDayRecipes: number[] = []
    ) => {
      const caloriesDiff = Math.abs(total.calories - macros.calories);
      const proteinDiff = Math.abs(total.protein - macros.protein);
      const carbsDiff = Math.abs(total.carbs - macros.carbs);
      const fatsDiff = Math.abs(total.fats - macros.fats);

      const weightedDiff = (caloriesDiff * 2) + (proteinDiff * 3) + carbsDiff + fatsDiff;

      let bonus = 0;
      const caloriesTolerance = macros.calories * 0.05;
      const proteinTolerance = macros.protein * 0.05;
      
      if (Math.abs(total.calories - macros.calories) <= caloriesTolerance) bonus += 50;
      if (Math.abs(total.protein - macros.protein) <= proteinTolerance) bonus += 100;

      const varietyPenalty = previousDayRecipes.length > 0 ? 
        previousDayRecipes.filter(id => [total.calories, total.protein, total.carbs, total.fats].includes(id)).length * 20 : 0;

      return weightedDiff - bonus + varietyPenalty;
    };

    setLoadingSteps([
      { label: 'Analyzing your favorite recipes', status: 'complete' },
      { label: 'Finding optimal macro combinations', status: 'complete' },
      { label: 'Building 7 days of variety', status: 'active' },
      { label: 'Calculating totals', status: 'pending' },
    ]);

    for (let dayIndex = 0; dayIndex < DAYS.length; dayIndex++) {
      const day = DAYS[dayIndex];
      const previousDay = dayIndex > 0 ? DAYS[dayIndex - 1] : null;
      const previousDayRecipes = previousDay ? usedRecipesByDay[previousDay] || [] : [];

      let bestPlan: { breakfast: Recipe; lunch: Recipe; dinner: Recipe; snacks: Recipe } | null = null;
      let bestScore = Infinity;

      const maxIterations = 10;
      for (let i = 0; i < maxIterations; i++) {
        const b = breakfasts[Math.floor(Math.random() * Math.min(breakfasts.length, 10))];
        const l = lunches[Math.floor(Math.random() * Math.min(lunches.length, 10))];
        const d = dinners[Math.floor(Math.random() * Math.min(dinners.length, 10))];
        const s = snacks[Math.floor(Math.random() * Math.min(snacks.length, 10))];

        if (!b || !l || !d || !s) continue;

        const total = {
          calories: b.macros.calories + l.macros.calories + d.macros.calories + s.macros.calories,
          protein: b.macros.protein + l.macros.protein + d.macros.protein + s.macros.protein,
          carbs: b.macros.carbs + l.macros.carbs + d.macros.carbs + s.macros.carbs,
          fats: b.macros.fats + l.macros.fats + d.macros.fats + s.macros.fats
        };

        const score = calculateScore(total, previousDayRecipes);

        if (score < bestScore) {
          bestScore = score;
          bestPlan = { breakfast: b, lunch: l, dinner: d, snacks: s };
        }
      }

      if (bestPlan) {
        newWeekPlan[day] = {
          breakfast: bestPlan.breakfast.id,
          lunch: bestPlan.lunch.id,
          dinner: bestPlan.dinner.id,
          snacks: bestPlan.snacks.id,
        };
        usedRecipesByDay[day] = [
          bestPlan.breakfast.id,
          bestPlan.lunch.id,
          bestPlan.dinner.id,
          bestPlan.snacks.id,
        ];
      }

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setLoadingSteps([
      { label: 'Analyzing your favorite recipes', status: 'complete' },
      { label: 'Finding optimal macro combinations', status: 'complete' },
      { label: 'Building 7 days of variety', status: 'complete' },
      { label: 'Calculating totals', status: 'active' },
    ]);

    await new Promise(resolve => setTimeout(resolve, 500));
    setLoadingSteps([
      { label: 'Analyzing your favorite recipes', status: 'complete' },
      { label: 'Finding optimal macro combinations', status: 'complete' },
      { label: 'Building 7 days of variety', status: 'complete' },
      { label: 'Calculating totals', status: 'complete' },
    ]);

    await new Promise(resolve => setTimeout(resolve, 600));

    setWeeklyMealPlan(newWeekPlan);
    setIsGenerating(false);
    toast.success('7-day meal plan generated! ✓');
  };

  const clearDay = (day: DayOfWeek) => {
    const newPlan = { ...weeklyMealPlan };
    newPlan[day] = { breakfast: null, lunch: null, dinner: null, snacks: null };
    setWeeklyMealPlan(newPlan);
    toast.success(`${DAY_LABELS[day]} cleared`);
  };

  const copyMondayToWeek = () => {
    const mondayPlan = weeklyMealPlan.monday;
    const newPlan = { ...weeklyMealPlan };
    DAYS.forEach(day => {
      if (day !== 'monday') {
        newPlan[day] = { ...mondayPlan };
      }
    });
    setWeeklyMealPlan(newPlan);
    toast.success('Monday plan copied to entire week');
  };

  const renderLoadingOverlay = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md">
      <Card className="w-full max-w-md p-8 bg-gradient-to-br from-card via-card to-card/80 shadow-2xl border-2 border-primary/20">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse">
              <div className="h-20 w-20 rounded-full bg-primary/30 blur-2xl" />
            </div>
            <Sparkles className="h-16 w-16 text-primary animate-pulse relative z-10" />
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Generating Your Plan</h3>
          
          <div className="w-full space-y-3">
            {loadingSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg transition-colors duration-200" 
                style={{ 
                  backgroundColor: step.status === 'active' ? 'hsl(var(--primary) / 0.1)' : 'transparent' 
                }}>
                <div className="flex-shrink-0">
                  {step.status === 'complete' && (
                    <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                  {step.status === 'active' && (
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 text-primary animate-spin" />
                    </div>
                  )}
                  {step.status === 'pending' && (
                    <div className="h-6 w-6 rounded-full bg-muted/20 flex items-center justify-center">
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  step.status === 'complete' ? 'text-green-500' : 
                  step.status === 'active' ? 'text-foreground' : 
                  'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  const renderMealCard = (recipeId: number | null, mealLabel: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
    if (!recipeId) {
      return (
        <Card className="p-6 border-dashed border-2 border-border/50 bg-muted/20 hover:bg-muted/30 transition-all duration-200">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{mealLabel}</p>
            <p className="text-xs text-muted-foreground/70">No meal selected</p>
          </div>
        </Card>
      );
    }

    const recipe = getRecipeById(recipeId);
    if (!recipe) return null;

    const mealColors = {
      breakfast: 'from-orange-500/10 to-orange-500/5 border-orange-500/20',
      lunch: 'from-blue-500/10 to-blue-500/5 border-blue-500/20',
      dinner: 'from-purple-500/10 to-purple-500/5 border-purple-500/20',
      snacks: 'from-green-500/10 to-green-500/5 border-green-500/20',
    };

    return (
      <Card className={`p-5 border bg-gradient-to-br ${mealColors[mealType]} hover:border-primary/30 transition-all duration-200 hover:shadow-lg group`}>
        <div className="space-y-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-2 opacity-70">
              {mealLabel}
            </p>
            <h4 className="font-bold text-foreground text-base group-hover:text-primary transition-colors duration-200 leading-tight">
              {recipe.name}
            </h4>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border/30">
              <div className="text-2xl font-bold" style={{ color: '#ef4444' }}>{Math.round(recipe.macros.calories)}</div>
              <div className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">Calories</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border/30">
              <div className="text-2xl font-bold" style={{ color: '#3b82f6' }}>{Math.round(recipe.macros.protein)}g</div>
              <div className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">Protein</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border/30">
              <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{Math.round(recipe.macros.carbs)}g</div>
              <div className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">Carbs</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border/30">
              <div className="text-2xl font-bold" style={{ color: '#f59e0b' }}>{Math.round(recipe.macros.fats)}g</div>
              <div className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">Fats</div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const renderDayTotals = (day: DayOfWeek) => {
    const totals = calculateDayTotals(weeklyMealPlan[day]);
    
    if (!macros) return null;

    const calorieDiff = totals.calories - macros.calories;
    const proteinDiff = totals.protein - macros.protein;
    const carbsDiff = totals.carbs - macros.carbs;
    const fatsDiff = totals.fats - macros.fats;
    
    const caloriePercent = (Math.abs(calorieDiff) / macros.calories) * 100;
    const proteinPercent = (Math.abs(proteinDiff) / macros.protein) * 100;
    
    const isOnTarget = caloriePercent <= 10 && proteinPercent <= 10;
    const calorieProgress = Math.min((totals.calories / macros.calories) * 100, 100);
    const proteinProgress = Math.min((totals.protein / macros.protein) * 100, 100);

    return (
      <Card className="p-6 bg-gradient-to-br from-card via-card/95 to-card/90 border-2 border-border/50 shadow-xl">
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Daily Summary</h3>
                <p className="text-xs text-muted-foreground">Your progress vs goals</p>
              </div>
            </div>
            {isOnTarget ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-xs font-bold text-green-500 uppercase tracking-wide">On Target</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                <TrendingUp className="h-4 w-4 text-yellow-500" />
                <span className="text-xs font-bold text-yellow-500 uppercase tracking-wide">Adjust</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ef4444' }} />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Calories</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold" style={{ color: '#ef4444' }}>
                    {Math.round(totals.calories)}
                  </span>
                  <span className="text-xs text-muted-foreground"> / {Math.round(macros.calories)}</span>
                </div>
              </div>
              <Progress value={calorieProgress} className="h-2" />
              <p className="text-[10px] text-muted-foreground">
                {calorieDiff > 0 ? '+' : ''}{Math.round(calorieDiff)} cal {calorieDiff > 0 ? 'over' : 'under'} target
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Protein</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold" style={{ color: '#3b82f6' }}>
                    {Math.round(totals.protein)}g
                  </span>
                  <span className="text-xs text-muted-foreground"> / {Math.round(macros.protein)}g</span>
                </div>
              </div>
              <Progress value={proteinProgress} className="h-2" />
              <p className="text-[10px] text-muted-foreground">
                {proteinDiff > 0 ? '+' : ''}{Math.round(proteinDiff)}g {proteinDiff > 0 ? 'over' : 'under'} target
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-background/50 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10b981' }} />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Carbs</span>
                </div>
                <p className="text-lg font-bold" style={{ color: '#10b981' }}>{Math.round(totals.carbs)}g</p>
                <p className="text-[9px] text-muted-foreground">Target: {Math.round(macros.carbs)}g</p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f59e0b' }} />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Fats</span>
                </div>
                <p className="text-lg font-bold" style={{ color: '#f59e0b' }}>{Math.round(totals.fats)}g</p>
                <p className="text-[9px] text-muted-foreground">Target: {Math.round(macros.fats)}g</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {isGenerating && renderLoadingOverlay()}

      <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-foreground">Meal Plans</h1>
            <p className="text-muted-foreground">
              AI-powered weekly meal planning optimized for your goals
            </p>
          </div>
          <Button 
            onClick={generateWeeklyMealPlan}
            disabled={isGenerating}
            size="lg"
            className="bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate 7-Day Plan
              </>
            )}
          </Button>
        </div>

        <div className="space-y-6 mt-8">
            <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-foreground">Select Day</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-primary/10">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium text-muted-foreground px-3">Week 1</span>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-primary/10">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {DAYS.map(day => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`p-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                        selectedDay === day
                          ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg scale-105 border-2 border-primary'
                          : 'bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:scale-102 border-2 border-transparent'
                      }`}
                    >
                      {DAY_LABELS[day]}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {DAY_FULL_LABELS[selectedDay]}'s Meal Plan
                </h2>
                <div className="flex gap-2">
                  {selectedDay === 'monday' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={copyMondayToWeek}
                      className="hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                    >
                      Copy to Week
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => clearDay(selectedDay)}
                    className="hover:bg-destructive/10 hover:border-destructive/30 transition-all duration-200"
                  >
                    Clear Day
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                  {renderMealCard(weeklyMealPlan[selectedDay].breakfast, 'Breakfast', 'breakfast')}
                  {renderMealCard(weeklyMealPlan[selectedDay].lunch, 'Lunch', 'lunch')}
                  {renderMealCard(weeklyMealPlan[selectedDay].dinner, 'Dinner', 'dinner')}
                  {renderMealCard(weeklyMealPlan[selectedDay].snacks, 'Snacks', 'snacks')}
                </div>

                <div className="lg:col-span-1">
                  {renderDayTotals(selectedDay)}
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
