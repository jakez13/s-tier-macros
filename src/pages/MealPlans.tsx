import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { RECIPES, Recipe } from '@/data/recipesData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RefreshCw, Save, Copy, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
const DAYS: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const MealPlans = () => {
  const { 
    foodPreferences, 
    macros, 
    currentMealPlan, 
    setCurrentMealPlan,
    savedMealPlans,
    saveMealPlan,
    deleteSavedPlan
  } = useApp();

  const [viewingDay, setViewingDay] = useState<DayOfWeek>('monday');
  const [savePlanDialogOpen, setSavePlanDialogOpen] = useState(false);
  const [planName, setPlanName] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState('current');

  const getFilteredRecipes = () => {
    // Return all recipes for meal plan generation
    return RECIPES;
  };

  const generateMealPlan = () => {
    const filteredRecipes = getFilteredRecipes();
    
    if (filteredRecipes.length < 4) {
      toast({
        title: "Not enough recipes",
        description: "Please add more food preferences to generate a meal plan.",
        variant: "destructive"
      });
      return;
    }

    const breakfasts = filteredRecipes.filter(r => r.mealType === 'breakfast');
    const lunches = filteredRecipes.filter(r => r.mealType === 'lunch');
    const dinners = filteredRecipes.filter(r => r.mealType === 'dinner');
    const snacks = filteredRecipes.filter(r => r.mealType === 'snack');

    const getRandomRecipe = (list: Recipe[]) => list[Math.floor(Math.random() * list.length)];

    const newPlan = {
      monday: {
        breakfast: getRandomRecipe(breakfasts)?.id || 1,
        lunch: getRandomRecipe(lunches)?.id || 9,
        dinner: getRandomRecipe(dinners)?.id || 17,
        snack: getRandomRecipe(snacks)?.id || 25
      },
      tuesday: {
        breakfast: getRandomRecipe(breakfasts)?.id || 2,
        lunch: getRandomRecipe(lunches)?.id || 10,
        dinner: getRandomRecipe(dinners)?.id || 18,
        snack: getRandomRecipe(snacks)?.id || 26
      },
      wednesday: {
        breakfast: getRandomRecipe(breakfasts)?.id || 3,
        lunch: getRandomRecipe(lunches)?.id || 11,
        dinner: getRandomRecipe(dinners)?.id || 19,
        snack: getRandomRecipe(snacks)?.id || 27
      },
      thursday: {
        breakfast: getRandomRecipe(breakfasts)?.id || 4,
        lunch: getRandomRecipe(lunches)?.id || 12,
        dinner: getRandomRecipe(dinners)?.id || 20,
        snack: getRandomRecipe(snacks)?.id || 28
      },
      friday: {
        breakfast: getRandomRecipe(breakfasts)?.id || 5,
        lunch: getRandomRecipe(lunches)?.id || 13,
        dinner: getRandomRecipe(dinners)?.id || 21,
        snack: getRandomRecipe(snacks)?.id || 29
      },
      saturday: {
        breakfast: getRandomRecipe(breakfasts)?.id || 6,
        lunch: getRandomRecipe(lunches)?.id || 14,
        dinner: getRandomRecipe(dinners)?.id || 22,
        snack: getRandomRecipe(snacks)?.id || 30
      },
      sunday: {
        breakfast: getRandomRecipe(breakfasts)?.id || 7,
        lunch: getRandomRecipe(lunches)?.id || 15,
        dinner: getRandomRecipe(dinners)?.id || 23,
        snack: getRandomRecipe(snacks)?.id || 25
      }
    };

    setCurrentMealPlan(newPlan);
    toast({
      title: "Meal plan generated!",
      description: "Your new weekly meal plan is ready."
    });
  };

  const swapMeal = (day: DayOfWeek, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    if (!currentMealPlan) return;

    const filteredRecipes = getFilteredRecipes();
    const availableRecipes = filteredRecipes.filter(r => r.mealType === mealType);
    
    if (availableRecipes.length === 0) return;

    const currentRecipeId = currentMealPlan[day][mealType];
    const otherRecipes = availableRecipes.filter(r => r.id !== currentRecipeId);
    
    if (otherRecipes.length === 0) return;

    const newRecipe = otherRecipes[Math.floor(Math.random() * otherRecipes.length)];

    setCurrentMealPlan({
      ...currentMealPlan,
      [day]: {
        ...currentMealPlan[day],
        [mealType]: newRecipe.id
      }
    });

    toast({
      title: "Meal swapped!",
      description: `Switched to ${newRecipe.name}`
    });
  };

  const handleSavePlan = () => {
    if (!currentMealPlan || !planName.trim()) return;
    
    saveMealPlan(planName, currentMealPlan);
    toast({
      title: "Meal plan saved!",
      description: `"${planName}" has been saved to your library.`
    });
    setPlanName('');
    setSavePlanDialogOpen(false);
  };

  const loadSavedPlan = (planId: string) => {
    const plan = savedMealPlans.find(p => p.id === planId);
    if (plan) {
      setCurrentMealPlan(plan.week);
      toast({
        title: "Meal plan loaded!",
        description: `"${plan.name}" is now your current plan.`
      });
      setActiveTab('current');
    }
  };

  const getRecipeById = (id: number): Recipe | undefined => {
    return RECIPES.find(r => r.id === id);
  };

  const calculateDayTotals = (day: DayOfWeek) => {
    if (!currentMealPlan) return { protein: 0, carbs: 0, fats: 0, calories: 0 };

    const meals = currentMealPlan[day];
    const breakfast = getRecipeById(meals.breakfast);
    const lunch = getRecipeById(meals.lunch);
    const dinner = getRecipeById(meals.dinner);
    const snack = getRecipeById(meals.snack);

    return {
      protein: (breakfast?.macros.protein || 0) + (lunch?.macros.protein || 0) + (dinner?.macros.protein || 0) + (snack?.macros.protein || 0),
      carbs: (breakfast?.macros.carbs || 0) + (lunch?.macros.carbs || 0) + (dinner?.macros.carbs || 0) + (snack?.macros.carbs || 0),
      fats: (breakfast?.macros.fats || 0) + (lunch?.macros.fats || 0) + (dinner?.macros.fats || 0) + (snack?.macros.fats || 0),
      calories: (breakfast?.macros.calories || 0) + (lunch?.macros.calories || 0) + (dinner?.macros.calories || 0) + (snack?.macros.calories || 0)
    };
  };

  const MealCard = ({ recipe, mealType, day }: { recipe: Recipe, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', day: DayOfWeek }) => (
    <Card className="p-4 bg-secondary/50 border-border">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-foreground">{recipe.name}</h4>
          <p className="text-sm text-muted-foreground">
            P: {recipe.macros.protein}g | C: {recipe.macros.carbs}g | F: {recipe.macros.fats}g | {recipe.macros.calories} cal
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => setSelectedRecipe(recipe)}
          className="flex-1"
        >
          <Eye size={14} className="mr-1" />
          View
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => swapMeal(day, mealType)}
          className="flex-1"
        >
          <RefreshCw size={14} className="mr-1" />
          Swap
        </Button>
      </div>
    </Card>
  );

  if (!foodPreferences || !macros) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-4xl mx-auto p-4">
        {/* Macro Targets Banner */}
        <Card className="p-4 mb-6 bg-secondary/50 border-border">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">YOUR TARGETS</h2>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{macros.calories}</p>
              <p className="text-xs text-muted-foreground">calories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{macros.protein}g</p>
              <p className="text-xs text-muted-foreground">protein</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{macros.carbs}g</p>
              <p className="text-xs text-muted-foreground">carbs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{macros.fats}g</p>
              <p className="text-xs text-muted-foreground">fats</p>
            </div>
          </div>
        </Card>

        <h1 className="text-3xl font-bold text-foreground mb-6">Weekly Meal Plans</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 w-full bg-secondary">
            <TabsTrigger value="current">Current Plan</TabsTrigger>
            <TabsTrigger value="saved">Saved Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            {!currentMealPlan ? (
              <Card className="p-8 text-center bg-secondary/50 border-border">
                <p className="text-xl text-foreground mb-4">No meal plan yet!</p>
                <Button onClick={generateMealPlan} className="bg-primary hover:bg-primary/90">
                  <RefreshCw size={18} className="mr-2" />
                  Generate Your First Meal Plan
                </Button>
              </Card>
            ) : (
              <>
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button onClick={generateMealPlan} variant="outline" className="flex-1">
                    <RefreshCw size={18} className="mr-2" />
                    Generate New Week
                  </Button>
                  <Button onClick={() => setSavePlanDialogOpen(true)} variant="outline" className="flex-1">
                    <Save size={18} className="mr-2" />
                    Save Plan
                  </Button>
                </div>

                {/* Day Selector */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {DAYS.map(day => (
                    <Button
                      key={day}
                      onClick={() => setViewingDay(day)}
                      variant={viewingDay === day ? "default" : "outline"}
                      className="capitalize"
                    >
                      {day.slice(0, 3)}
                    </Button>
                  ))}
                </div>

                {/* Day View */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground capitalize">{viewingDay}</h2>

                  {/* Breakfast */}
                  <div>
                    <Badge className="mb-2 bg-orange-500">Breakfast</Badge>
                    <MealCard 
                      recipe={getRecipeById(currentMealPlan[viewingDay].breakfast)!} 
                      mealType="breakfast"
                      day={viewingDay}
                    />
                  </div>

                  {/* Lunch */}
                  <div>
                    <Badge className="mb-2 bg-blue-500">Lunch</Badge>
                    <MealCard 
                      recipe={getRecipeById(currentMealPlan[viewingDay].lunch)!} 
                      mealType="lunch"
                      day={viewingDay}
                    />
                  </div>

                  {/* Dinner */}
                  <div>
                    <Badge className="mb-2 bg-purple-500">Dinner</Badge>
                    <MealCard 
                      recipe={getRecipeById(currentMealPlan[viewingDay].dinner)!} 
                      mealType="dinner"
                      day={viewingDay}
                    />
                  </div>

                  {/* Snack */}
                  <div>
                    <Badge className="mb-2 bg-green-500">Snack</Badge>
                    <MealCard 
                      recipe={getRecipeById(currentMealPlan[viewingDay].snack)!} 
                      mealType="snack"
                      day={viewingDay}
                    />
                  </div>

                  {/* Daily Totals */}
                  <Card className="p-4 bg-background border-primary">
                    <h3 className="font-bold text-foreground mb-3">Daily Total vs Target</h3>
                    {(() => {
                      const totals = calculateDayTotals(viewingDay);
                      return (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Protein:</span>
                            <span className="text-foreground font-medium">
                              {totals.protein}g / {macros.protein}g
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Carbs:</span>
                            <span className="text-foreground font-medium">
                              {totals.carbs}g / {macros.carbs}g
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Fats:</span>
                            <span className="text-foreground font-medium">
                              {totals.fats}g / {macros.fats}g
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Calories:</span>
                            <span className="text-primary font-bold">
                              {totals.calories} / {macros.calories}
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            {savedMealPlans.length === 0 ? (
              <Card className="p-8 text-center bg-secondary/50 border-border">
                <p className="text-muted-foreground">No saved meal plans yet</p>
              </Card>
            ) : (
              savedMealPlans.map(plan => (
                <Card key={plan.id} className="p-4 bg-secondary/50 border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Saved {new Date(plan.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        onClick={() => loadSavedPlan(plan.id)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Load
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => deleteSavedPlan(plan.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Save Plan Dialog */}
        <Dialog open={savePlanDialogOpen} onOpenChange={setSavePlanDialogOpen}>
          <DialogContent className="bg-secondary border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Save Meal Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="planName">Plan Name</Label>
                <Input
                  id="planName"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="e.g., High Protein Week"
                  className="bg-background border-border"
                />
              </div>
              <Button 
                onClick={handleSavePlan}
                disabled={!planName.trim()}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Save Meal Plan
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Recipe View Dialog */}
        <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
          <DialogContent className="max-w-2xl bg-secondary border-border max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                {selectedRecipe?.name}
              </DialogTitle>
            </DialogHeader>
            
            {selectedRecipe && (
              <div className="space-y-4">
                <div className="bg-background/50 p-4 rounded">
                  <p className="text-center text-sm text-muted-foreground mb-2">
                    P: {selectedRecipe.macros.protein}g | C: {selectedRecipe.macros.carbs}g | F: {selectedRecipe.macros.fats}g
                  </p>
                  <p className="text-center text-xl font-bold text-primary">
                    {selectedRecipe.macros.calories} calories
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-2">Ingredients</h3>
                  <ul className="space-y-1">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-foreground text-sm">
                        • {ing.amount} {ing.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-2">Instructions</h3>
                  <ol className="space-y-2">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="text-foreground text-sm">
                        {idx + 1}. {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
