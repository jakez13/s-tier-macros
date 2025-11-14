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
import { Save, Trash2, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ProgressBar } from '@/components/ProgressBar';

export const MealPlans = () => {
  const { 
    macros, 
    currentMealPlan, 
    setCurrentMealPlan,
    savedMealPlans,
    saveMealPlan,
    deleteSavedPlan,
    removeRecipeFromMealPlan
  } = useApp();

  const [savePlanDialogOpen, setSavePlanDialogOpen] = useState(false);
  const [planName, setPlanName] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState('current');

  const getRecipeById = (id: number): Recipe | undefined => {
    return RECIPES.find(r => r.id === id);
  };

  const calculateTotals = () => {
    if (!currentMealPlan) return { protein: 0, carbs: 0, fats: 0, calories: 0 };

    const allRecipeIds = [
      ...(currentMealPlan.breakfast || []),
      ...(currentMealPlan.lunch || []),
      ...(currentMealPlan.dinner || []),
      ...(currentMealPlan.snacks || [])
    ];

    return allRecipeIds.reduce((totals, recipeId) => {
      const recipe = getRecipeById(recipeId);
      if (recipe) {
        return {
          protein: totals.protein + recipe.macros.protein,
          carbs: totals.carbs + recipe.macros.carbs,
          fats: totals.fats + recipe.macros.fats,
          calories: totals.calories + recipe.macros.calories
        };
      }
      return totals;
    }, { protein: 0, carbs: 0, fats: 0, calories: 0 });
  };

  const handleSavePlan = () => {
    if (!planName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for this meal plan.",
        variant: "destructive"
      });
      return;
    }

    if (!currentMealPlan) {
      toast({
        title: "No plan to save",
        description: "Add some recipes to your meal plan first.",
        variant: "destructive"
      });
      return;
    }

    saveMealPlan(planName, currentMealPlan);
    toast({
      title: "Meal plan saved!",
      description: `"${planName}" has been saved successfully.`
    });
    setSavePlanDialogOpen(false);
    setPlanName('');
  };

  const loadSavedPlan = (planId: string) => {
    const plan = savedMealPlans.find(p => p.id === planId);
    if (plan) {
      setCurrentMealPlan(plan.plan);
      toast({
        title: "Meal plan loaded!",
        description: `"${plan.name}" is now your current plan.`
      });
      setActiveTab('current');
    }
  };

  const handleDeleteSavedPlan = (planId: string) => {
    const plan = savedMealPlans.find(p => p.id === planId);
    deleteSavedPlan(planId);
    toast({
      title: "Plan deleted",
      description: `"${plan?.name}" has been removed.`
    });
  };

  const totals = calculateTotals();

  const MealSection = ({ 
    title, 
    mealType, 
    recipeIds 
  }: { 
    title: string; 
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks'; 
    recipeIds: number[] 
  }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-foreground">{title}</h3>
      {recipeIds.length === 0 ? (
        <Card className="p-4 border-dashed">
          <p className="text-muted-foreground text-sm text-center">
            No recipes added. Go to Recipe Library to add meals.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {recipeIds.map(recipeId => {
            const recipe = getRecipeById(recipeId);
            if (!recipe) return null;
            return (
              <Card key={`${mealType}-${recipeId}`} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{recipe.name}</h4>
                    <div className="flex gap-2 flex-wrap mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {recipe.macros.calories} cal
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        P: {recipe.macros.protein}g
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        C: {recipe.macros.carbs}g
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        F: {recipe.macros.fats}g
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedRecipe(recipe)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeRecipeFromMealPlan(recipeId, mealType)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-foreground">My Meal Plan</h1>
        <p className="text-muted-foreground">
          Build your custom meal plan by adding recipes from the Recipe Library
        </p>
      </div>

      {macros && (
        <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 to-primary/10">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Daily Progress</h2>
          <div className="space-y-3">
            <ProgressBar
              current={totals.calories}
              target={macros.calories}
              label="Calories"
              color="bg-primary"
            />
            <ProgressBar
              current={totals.protein}
              target={macros.protein}
              label="Protein"
              color="bg-blue-500"
            />
            <ProgressBar
              current={totals.carbs}
              target={macros.carbs}
              label="Carbs"
              color="bg-green-500"
            />
            <ProgressBar
              current={totals.fats}
              target={macros.fats}
              label="Fats"
              color="bg-yellow-500"
            />
          </div>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="current">Current Plan</TabsTrigger>
          <TabsTrigger value="saved">Saved Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Your Meals</h2>
              <Button onClick={() => setSavePlanDialogOpen(true)}>
                <Save className="h-4 w-4 mr-2" />
                Save Plan
              </Button>
            </div>

            <MealSection 
              title="Breakfast" 
              mealType="breakfast" 
              recipeIds={currentMealPlan?.breakfast || []} 
            />
            <MealSection 
              title="Lunch" 
              mealType="lunch" 
              recipeIds={currentMealPlan?.lunch || []} 
            />
            <MealSection 
              title="Dinner" 
              mealType="dinner" 
              recipeIds={currentMealPlan?.dinner || []} 
            />
            <MealSection 
              title="Snacks" 
              mealType="snacks" 
              recipeIds={currentMealPlan?.snacks || []} 
            />
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Saved Meal Plans</h2>
            {savedMealPlans.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No saved meal plans yet. Create and save your first plan!
              </p>
            ) : (
              <div className="space-y-4">
                {savedMealPlans.map(plan => (
                  <Card key={plan.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Created: {new Date(plan.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => loadSavedPlan(plan.id)}
                        >
                          Load Plan
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteSavedPlan(plan.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={savePlanDialogOpen} onOpenChange={setSavePlanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Meal Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="planName">Plan Name</Label>
              <Input
                id="planName"
                placeholder="e.g., Week 1 Meal Plan"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setSavePlanDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePlan}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedRecipe.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Badge variant="secondary">{selectedRecipe.mealType}</Badge>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    <Badge variant="outline">Prep: {selectedRecipe.prepTime}</Badge>
                    <Badge variant="outline">Cook: {selectedRecipe.cookTime}</Badge>
                    <Badge variant="outline">Serving: {selectedRecipe.servingSize}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="font-bold text-lg text-foreground">{selectedRecipe.macros.calories}</div>
                    <div className="text-xs text-muted-foreground">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-foreground">{selectedRecipe.macros.protein}g</div>
                    <div className="text-xs text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-foreground">{selectedRecipe.macros.carbs}g</div>
                    <div className="text-xs text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-foreground">{selectedRecipe.macros.fats}g</div>
                    <div className="text-xs text-muted-foreground">Fats</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Ingredients</h3>
                  <ul className="space-y-1">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-sm text-foreground">
                        • {ing.amount} {ing.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Instructions</h3>
                  <ol className="space-y-2">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="text-sm text-foreground">
                        {idx + 1}. {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
