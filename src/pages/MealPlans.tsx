import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { RECIPES, Recipe } from '@/data/recipesData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, ChevronLeft, ChevronRight, Check, Clock, Circle } from 'lucide-react';
import { toast } from 'sonner';
import { DailyMealPlan } from '@/contexts/AppContext';

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

interface LoadingStep {
  label: string;
  status: 'pending' | 'active' | 'complete';
}

export const MealPlans = () => {
  const { macros, weeklyMealPlan, setWeeklyMealPlan } = useApp();
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('monday');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([
    { label: 'Analyzing your favorite recipes', status: 'pending' },
    { label: 'Finding optimal macro combinations', status: 'pending' },
    { label: 'Building 7 days of variety', status: 'pending' },
    { label: 'Calculating totals', status: 'pending' },
  ]);

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
    
    // Reset loading steps
    const steps = [
      { label: 'Analyzing your favorite recipes', status: 'pending' as const },
      { label: 'Finding optimal macro combinations', status: 'pending' as const },
      { label: 'Building 7 days of variety', status: 'pending' as const },
      { label: 'Calculating totals', status: 'pending' as const },
    ];
    setLoadingSteps(steps);

    // Step 1: Complete immediately
    await new Promise(resolve => setTimeout(resolve, 300));
    setLoadingSteps([
      { label: 'Analyzing your favorite recipes', status: 'complete' },
      { label: 'Finding optimal macro combinations', status: 'active' },
      { label: 'Building 7 days of variety', status: 'pending' },
      { label: 'Calculating totals', status: 'pending' },
    ]);

    // Get recipes by meal type
    const breakfasts = RECIPES.filter(r => r.mealType === 'breakfast');
    const lunches = RECIPES.filter(r => r.mealType === 'lunch');
    const dinners = RECIPES.filter(r => r.mealType === 'dinner');
    const snacks = RECIPES.filter(r => r.mealType === 'snack');

    // Step 2: Find optimal combinations
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newWeekPlan = { ...weeklyMealPlan };
    const usedRecipesByDay: { [day: string]: number[] } = {};

    // Weighted scoring function
    const calculateScore = (
      total: { calories: number; protein: number; carbs: number; fats: number },
      previousDayRecipes: number[] = []
    ) => {
      const caloriesDiff = Math.abs(total.calories - macros.calories);
      const proteinDiff = Math.abs(total.protein - macros.protein);
      const carbsDiff = Math.abs(total.carbs - macros.carbs);
      const fatsDiff = Math.abs(total.fats - macros.fats);

      // Weighted differences (protein is 3x, calories 2x)
      const weightedDiff = (caloriesDiff * 2) + (proteinDiff * 3) + carbsDiff + fatsDiff;

      // Bonus for hitting targets within tolerance (±5%)
      let bonus = 0;
      const caloriesTolerance = macros.calories * 0.05;
      const proteinTolerance = macros.protein * 0.05;
      
      if (Math.abs(total.calories - macros.calories) <= caloriesTolerance) bonus += 50;
      if (Math.abs(total.protein - macros.protein) <= proteinTolerance) bonus += 100; // Protein bonus is higher

      // Variety penalty: check if any recipe was used yesterday
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

    // Step 3: Generate 7 days
    for (let dayIndex = 0; dayIndex < DAYS.length; dayIndex++) {
      const day = DAYS[dayIndex];
      const previousDay = dayIndex > 0 ? DAYS[dayIndex - 1] : null;
      const previousDayRecipes = previousDay ? usedRecipesByDay[previousDay] || [] : [];

      let bestPlan: { breakfast: Recipe; lunch: Recipe; dinner: Recipe; snacks: Recipe } | null = null;
      let bestScore = Infinity;

      // Try different combinations (limited for performance)
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

    // Step 4: Final calculations
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoadingSteps([
      { label: 'Analyzing your favorite recipes', status: 'complete' },
      { label: 'Finding optimal macro combinations', status: 'complete' },
      { label: 'Building 7 days of variety', status: 'complete' },
      { label: 'Calculating totals', status: 'complete' },
    ]);

    // Ensure minimum 2 seconds total
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-md p-8 shadow-2xl border-border/50">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
            <div className="absolute inset-0 animate-pulse">
              <div className="h-16 w-16 rounded-full bg-primary/20 blur-xl" />
            </div>
          </div>
          
          <div className="w-full space-y-3">
            {loadingSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {step.status === 'complete' && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                  {step.status === 'active' && (
                    <Clock className="h-5 w-5 text-primary animate-pulse" />
                  )}
                  {step.status === 'pending' && (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <span className={`text-sm ${
                  step.status === 'complete' ? 'text-green-500' : 
                  step.status === 'active' ? 'text-foreground font-medium' : 
                  'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>This may take a moment...</span>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderMealCard = (recipeId: number | null, mealLabel: string) => {
    if (!recipeId) {
      return (
        <Card className="p-4 border-dashed border-border/50 bg-card/30">
          <div className="text-center text-muted-foreground text-sm">
            No meal added
          </div>
        </Card>
      );
    }

    const recipe = getRecipeById(recipeId);
    if (!recipe) return null;

    return (
      <Card className="p-4 border-border hover:border-primary/50 transition-all duration-200 hover:shadow-lg bg-gradient-to-br from-card to-card/50">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">
                {mealLabel}
              </p>
              <h4 className="font-semibold text-foreground">{recipe.name}</h4>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="text-center p-2 rounded-lg bg-background/50 border border-border/30">
              <div className="font-bold" style={{ color: '#ef4444' }}>{Math.round(recipe.macros.calories)}</div>
              <div className="text-muted-foreground text-[10px] mt-0.5">cal</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-background/50 border border-border/30">
              <div className="font-bold" style={{ color: '#3b82f6' }}>{Math.round(recipe.macros.protein)}g</div>
              <div className="text-muted-foreground text-[10px] mt-0.5">protein</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-background/50 border border-border/30">
              <div className="font-bold" style={{ color: '#10b981' }}>{Math.round(recipe.macros.carbs)}g</div>
              <div className="text-muted-foreground text-[10px] mt-0.5">carbs</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-background/50 border border-border/30">
              <div className="font-bold" style={{ color: '#f59e0b' }}>{Math.round(recipe.macros.fats)}g</div>
              <div className="text-muted-foreground text-[10px] mt-0.5">fats</div>
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
    const caloriePercent = (Math.abs(calorieDiff) / macros.calories) * 100;
    const proteinPercent = (Math.abs(proteinDiff) / macros.protein) * 100;
    
    const isOnTarget = caloriePercent <= 10 && proteinPercent <= 10;

    return (
      <Card className="p-4 bg-gradient-to-br from-card via-card to-card/80 border-border shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Day Totals
            </h3>
            {isOnTarget ? (
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <Check className="h-3 w-3" />
                On Target
              </span>
            ) : (
              <span className="text-xs font-medium text-yellow-500">
                ⚠️ Adjust meals
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-3 rounded-xl bg-background/70 border border-border/50">
              <div className="text-lg font-bold" style={{ color: '#ef4444' }}>
                {Math.round(totals.calories)}
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">CALORIES</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                {calorieDiff > 0 ? '+' : ''}{Math.round(calorieDiff)}
              </div>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/70 border border-border/50">
              <div className="text-lg font-bold" style={{ color: '#3b82f6' }}>
                {Math.round(totals.protein)}g
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">PROTEIN</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                {proteinDiff > 0 ? '+' : ''}{Math.round(proteinDiff)}g
              </div>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/70 border border-border/50">
              <div className="text-lg font-bold" style={{ color: '#10b981' }}>
                {Math.round(totals.carbs)}g
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">CARBS</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                {totals.carbs - macros.carbs > 0 ? '+' : ''}{Math.round(totals.carbs - macros.carbs)}g
              </div>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/70 border border-border/50">
              <div className="text-lg font-bold" style={{ color: '#f59e0b' }}>
                {Math.round(totals.fats)}g
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">FATS</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                {totals.fats - macros.fats > 0 ? '+' : ''}{Math.round(totals.fats - macros.fats)}g
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border/50">
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Target:</span> {Math.round(macros.calories)} cal • {Math.round(macros.protein)}g protein • {Math.round(macros.carbs)}g carbs • {Math.round(macros.fats)}g fats
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {isGenerating && renderLoadingOverlay()}

      <div className="container max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meal Plans</h1>
            <p className="text-muted-foreground text-sm mt-1">
              AI-powered weekly meal planning
            </p>
          </div>
          <Button 
            onClick={generateWeeklyMealPlan}
            disabled={isGenerating}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate 7-Day Plan'
            )}
          </Button>
        </div>

        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50">
            <TabsTrigger value="today" className="data-[state=active]:bg-background">
              Today
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-background">
              Weekly View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-6 mt-6">
            {/* Week Navigator */}
            <Card className="p-4 bg-card/50 border-border">
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium text-foreground">
                  Current Week
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Day Selector */}
              <div className="grid grid-cols-7 gap-2">
                {DAYS.map(day => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`p-3 rounded-xl text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
                      selectedDay === day
                        ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg scale-105'
                        : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    {DAY_LABELS[day]}
                  </button>
                ))}
              </div>
            </Card>

            {/* Selected Day's Meals */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground capitalize">
                  {selectedDay}'s Meals
                </h2>
                <div className="flex gap-2">
                  {selectedDay === 'monday' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={copyMondayToWeek}
                      className="hover:bg-primary/10 transition-colors duration-200"
                    >
                      Copy to Week
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => clearDay(selectedDay)}
                    className="hover:bg-destructive/10 transition-colors duration-200"
                  >
                    Clear Day
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {renderMealCard(weeklyMealPlan[selectedDay].breakfast, 'Breakfast')}
                {renderMealCard(weeklyMealPlan[selectedDay].lunch, 'Lunch')}
                {renderMealCard(weeklyMealPlan[selectedDay].dinner, 'Dinner')}
                {renderMealCard(weeklyMealPlan[selectedDay].snacks, 'Snacks')}
              </div>

              {renderDayTotals(selectedDay)}
            </div>
          </TabsContent>

          <TabsContent value="today" className="space-y-6 mt-6">
            <Card className="p-6 bg-card/50">
              <p className="text-center text-muted-foreground">
                Manual meal building coming soon. Use Weekly View to generate meal plans.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
