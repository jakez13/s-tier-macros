import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { RECIPES, Recipe } from '@/data/recipesData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Trash2, RefreshCw, Zap, Save, Heart } from 'lucide-react';
import { toast } from 'sonner';

export const MealPlans = () => {
  const { 
    macros, 
    currentMealPlan, 
    savedMealPlans, 
    saveMealPlan, 
    deleteSavedPlan,
    removeRecipeFromMealPlan,
    clearMealPlan,
    replaceRecipeInMealPlan,
    favoriteRecipes,
    addRecipeToMealPlan
  } = useApp();

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showSwapDialog, setShowSwapDialog] = useState(false);
  const [planName, setPlanName] = useState('');
  const [swapMealType, setSwapMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');
  const [swapRecipeId, setSwapRecipeId] = useState<number | null>(null);

  const getRecipeById = (id: number): Recipe | undefined => {
    return RECIPES.find(r => r.id === id);
  };

  const calculateTotals = () => {
    if (!currentMealPlan) return { protein: 0, carbs: 0, fats: 0, calories: 0 };

    const allRecipeIds = [
      ...(Array.isArray(currentMealPlan.breakfast) ? currentMealPlan.breakfast : []),
      ...(Array.isArray(currentMealPlan.lunch) ? currentMealPlan.lunch : []),
      ...(Array.isArray(currentMealPlan.dinner) ? currentMealPlan.dinner : []),
      ...(Array.isArray(currentMealPlan.snacks) ? currentMealPlan.snacks : [])
    ];

    return allRecipeIds.reduce((totals, id) => {
      const recipe = getRecipeById(id);
      if (recipe) {
        totals.protein += recipe.macros.protein;
        totals.carbs += recipe.macros.carbs;
        totals.fats += recipe.macros.fats;
        totals.calories += recipe.macros.calories;
      }
      return totals;
    }, { protein: 0, carbs: 0, fats: 0, calories: 0 });
  };

  const generateFullDay = () => {
    const toastId = toast.loading("Finding optimal recipes for your macros...");
    
    const breakfasts = RECIPES.filter(r => r.mealType === 'breakfast');
    const lunches = RECIPES.filter(r => r.mealType === 'lunch');
    const dinners = RECIPES.filter(r => r.mealType === 'dinner');
    const snacks = RECIPES.filter(r => r.mealType === 'snack');

    if (!macros) {
      toast.dismiss(toastId);
      return;
    }

    let bestPlan = null;
    let smallestDiff = Infinity;

    for (const b of breakfasts.slice(0, 5)) {
      for (const l of lunches.slice(0, 5)) {
        for (const d of dinners.slice(0, 5)) {
          for (const s of snacks.slice(0, 5)) {
            const total = {
              calories: b.macros.calories + l.macros.calories + d.macros.calories + s.macros.calories,
              protein: b.macros.protein + l.macros.protein + d.macros.protein + s.macros.protein,
              carbs: b.macros.carbs + l.macros.carbs + d.macros.carbs + s.macros.carbs,
              fats: b.macros.fats + l.macros.fats + d.macros.fats + s.macros.fats
            };

            const diff = Math.abs(total.calories - macros.calories) +
                        Math.abs(total.protein - macros.protein) +
                        Math.abs(total.carbs - macros.carbs) +
                        Math.abs(total.fats - macros.fats);

            if (diff < smallestDiff) {
              smallestDiff = diff;
              bestPlan = { breakfast: b, lunch: l, dinner: d, snacks: s };
            }
          }
        }
      }
    }

    toast.dismiss(toastId);

    if (bestPlan) {
      clearMealPlan();
      setTimeout(() => {
        addRecipeToMealPlan(bestPlan.breakfast.id, 'breakfast');
        addRecipeToMealPlan(bestPlan.lunch.id, 'lunch');
        addRecipeToMealPlan(bestPlan.dinner.id, 'dinner');
        addRecipeToMealPlan(bestPlan.snacks.id, 'snacks');
        toast.success("Generated optimal meal plan! ✓");
      }, 100);
    } else {
      toast.error("Couldn't generate plan");
    }
  };

  const handleSwap = (recipeId: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
    setSwapRecipeId(recipeId);
    setSwapMealType(mealType);
    setShowSwapDialog(true);
  };

  const swapRecipe = (newRecipeId: number) => {
    if (swapRecipeId) {
      replaceRecipeInMealPlan(swapRecipeId, newRecipeId, swapMealType);
      const newRecipe = getRecipeById(newRecipeId);
      toast.success(`Swapped to ${newRecipe?.name}! ✓`);
      setShowSwapDialog(false);
    }
  };

  const handleSavePlan = () => {
    if (!planName.trim()) {
      toast.error("Please enter a plan name");
      return;
    }
    saveMealPlan(planName);
    toast.success("Plan saved! ✓");
    setPlanName('');
    setShowSaveDialog(false);
  };

  const loadSavedPlan = (planId: string) => {
    const plan = savedMealPlans.find(p => p.id === planId);
    if (plan) {
      clearMealPlan();
      setTimeout(() => {
        plan.plan.breakfast.forEach(id => addRecipeToMealPlan(id, 'breakfast'));
        plan.plan.lunch.forEach(id => addRecipeToMealPlan(id, 'lunch'));
        plan.plan.dinner.forEach(id => addRecipeToMealPlan(id, 'dinner'));
        plan.plan.snacks.forEach(id => addRecipeToMealPlan(id, 'snacks'));
        toast.success(`Loaded "${plan.name}"! ✓`);
      }, 100);
    }
  };

  const totals = calculateTotals();
  const remaining = macros ? {
    calories: macros.calories - totals.calories,
    protein: macros.protein - totals.protein,
    carbs: macros.carbs - totals.carbs,
    fats: macros.fats - totals.fats
  } : null;

  const MealSection = ({ 
    title, 
    mealType 
  }: { 
    title: string; 
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks' 
  }) => {
    const recipeIds = currentMealPlan?.[mealType] || [];
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
        {recipeIds.length === 0 ? (
          <Card className="p-8 border-dashed border-2 border-border bg-secondary/20">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No meal added</p>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/recipes'}
              >
                + Add {title} Meal
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {recipeIds.map(id => {
              const recipe = getRecipeById(id);
              if (!recipe) return null;
              
              return (
                <Card key={id} className="p-4 bg-secondary/50 border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-foreground text-lg">{recipe.name}</h4>
                        {favoriteRecipes.includes(recipe.id) && (
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        )}
                      </div>
                      <p className="text-sm text-foreground mt-1">
                        <span className="font-bold text-red-500">{recipe.macros.calories} cal</span> | 
                        <span className="ml-2 text-blue-500">P: {recipe.macros.protein}g</span> | 
                        <span className="ml-2 text-green-500">C: {recipe.macros.carbs}g</span> | 
                        <span className="ml-2 text-orange-500">F: {recipe.macros.fats}g</span>
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
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSwap(recipe.id, mealType)}
                      className="flex-1"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Swap
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        removeRecipeFromMealPlan(recipe.id, mealType);
                        toast.success("Meal removed ✓");
                      }}
                      className="flex-1"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const hasAnyMeals = currentMealPlan && (
    currentMealPlan.breakfast.length > 0 || 
    currentMealPlan.lunch.length > 0 || 
    currentMealPlan.dinner.length > 0 || 
    currentMealPlan.snacks.length > 0
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-foreground mb-6">My Meal Plan</h1>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="current">Current Plan</TabsTrigger>
            <TabsTrigger value="saved">Saved Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            {/* Totals Summary */}
            {macros && (
              <Card className="p-4 mb-6 bg-secondary/50 border-border">
                <h3 className="text-sm font-bold text-muted-foreground mb-2">CURRENT PLAN TOTALS:</h3>
                <p className="text-foreground mb-3">
                  <span className="font-bold text-red-500">{totals.calories} cal</span> | 
                  <span className="ml-2 text-blue-500">{totals.protein}g protein</span> | 
                  <span className="ml-2 text-green-500">{totals.carbs}g carbs</span> | 
                  <span className="ml-2 text-orange-500">{totals.fats}g fats</span>
                </p>
                
                <h3 className="text-sm font-bold text-muted-foreground mb-2">Target:</h3>
                <p className="text-foreground mb-3">
                  <span className="font-bold text-red-500">{macros.calories} cal</span> | 
                  <span className="ml-2 text-blue-500">{macros.protein}g protein</span> | 
                  <span className="ml-2 text-green-500">{macros.carbs}g carbs</span> | 
                  <span className="ml-2 text-orange-500">{macros.fats}g fats</span>
                </p>

                {remaining && (
                  <>
                    <h3 className="text-sm font-bold text-muted-foreground mb-2">Remaining:</h3>
                    <p className="text-foreground">
                      <span className="font-bold text-red-500">{remaining.calories} cal</span> | 
                      <span className="ml-2 text-blue-500">{remaining.protein}g protein</span> | 
                      <span className="ml-2 text-green-500">{remaining.carbs}g carbs</span> | 
                      <span className="ml-2 text-orange-500">{remaining.fats}g fats</span>
                    </p>
                  </>
                )}
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mb-6">
              <Button
                onClick={generateFullDay}
                className="flex-1"
              >
                <Zap className="h-4 w-4 mr-2" />
                Generate Full Day
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  clearMealPlan();
                  toast.success("Plan cleared ✓");
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(true)}
                disabled={!hasAnyMeals}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>

            {/* Empty State */}
            {!hasAnyMeals && (
              <Card className="p-12 border-border bg-secondary/20 text-center mb-6">
                <p className="text-muted-foreground mb-4 text-lg">No meals in your plan yet.</p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => window.location.href = '/recipes'}>
                    Browse Recipes
                  </Button>
                  <Button variant="outline" onClick={generateFullDay}>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Full Day
                  </Button>
                </div>
              </Card>
            )}

            {/* Meal Sections */}
            <div className="space-y-6">
              <MealSection title="Breakfast" mealType="breakfast" />
              <MealSection title="Lunch" mealType="lunch" />
              <MealSection title="Dinner" mealType="dinner" />
              <MealSection title="Snacks" mealType="snacks" />
            </div>
          </TabsContent>

          <TabsContent value="saved">
            {savedMealPlans.length === 0 ? (
              <Card className="p-12 border-border bg-secondary/20 text-center">
                <p className="text-muted-foreground text-lg">No saved plans yet</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {savedMealPlans.map(plan => (
                  <Card key={plan.id} className="p-4 bg-secondary/50 border-border">
                    <h3 className="font-bold text-foreground text-lg mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Created: {new Date(plan.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => loadSavedPlan(plan.id)}
                        className="flex-1"
                      >
                        Load Plan
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          deleteSavedPlan(plan.id);
                          toast.success("Plan deleted ✓");
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Recipe Detail Dialog */}
        <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedRecipe?.name}</DialogTitle>
            </DialogHeader>
            {selectedRecipe && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Serves: {selectedRecipe.servingSize}</span>
                  <span>⏱️ {selectedRecipe.prepTime} prep + {selectedRecipe.cookTime} cook</span>
                </div>

                <div className="p-4 bg-secondary/50 rounded-lg">
                  <h3 className="font-bold text-foreground mb-2">MACROS:</h3>
                  <p className="text-foreground">
                    <span className="text-blue-500">P: {selectedRecipe.macros.protein}g</span> | 
                    <span className="ml-2 text-green-500">C: {selectedRecipe.macros.carbs}g</span> | 
                    <span className="ml-2 text-orange-500">F: {selectedRecipe.macros.fats}g</span> | 
                    <span className="ml-2 font-bold text-red-500">{selectedRecipe.macros.calories} cal</span>
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-2">INGREDIENTS:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="text-foreground">
                        {ing.amount} {ing.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-2">INSTRUCTIONS:</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {selectedRecipe.instructions.map((step, i) => (
                      <li key={i} className="text-foreground">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Swap Dialog */}
        <Dialog open={showSwapDialog} onOpenChange={setShowSwapDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Swap Meal</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {RECIPES
                .filter(r => r.mealType === swapMealType)
                .slice(0, 3)
                .map(recipe => (
                  <Card 
                    key={recipe.id} 
                    className="p-3 cursor-pointer hover:bg-secondary/70 transition-colors"
                    onClick={() => swapRecipe(recipe.id)}
                  >
                    <h4 className="font-bold text-foreground">{recipe.name}</h4>
                    <p className="text-sm text-foreground">
                      <span className="text-red-500">{recipe.macros.calories} cal</span> | 
                      <span className="ml-2 text-blue-500">P: {recipe.macros.protein}g</span> | 
                      <span className="ml-2 text-green-500">C: {recipe.macros.carbs}g</span> | 
                      <span className="ml-2 text-orange-500">F: {recipe.macros.fats}g</span>
                    </p>
                  </Card>
                ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Save Plan Dialog */}
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Meal Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Enter plan name..."
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
              <Button onClick={handleSavePlan} className="w-full">
                Save Plan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
