import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { RECIPES, Recipe } from '@/data/recipesData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

export const RecipeLibrary = () => {
  const navigate = useNavigate();
  const { selectedRecipes, toggleRecipeSelection, addRecipeToMealPlan, clearMealPlan } = useApp();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [currentStep, setCurrentStep] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');

  const steps: Array<'breakfast' | 'lunch' | 'dinner' | 'snacks'> = ['breakfast', 'lunch', 'dinner', 'snacks'];
  const currentStepIndex = steps.indexOf(currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;

  // Group recipes by meal type
  const recipesByMealType = useMemo(() => {
    return {
      breakfast: RECIPES.filter(r => r.mealType === 'breakfast'),
      lunch: RECIPES.filter(r => r.mealType === 'lunch'),
      dinner: RECIPES.filter(r => r.mealType === 'dinner'),
      snacks: RECIPES.filter(r => r.mealType === 'snack'),
    };
  }, []);

  // Count selected recipes per meal type
  const selectedCounts = useMemo(() => {
    const counts = {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snacks: 0,
    };

    selectedRecipes.forEach(id => {
      const recipe = RECIPES.find(r => r.id === id);
      if (recipe) {
        if (recipe.mealType === 'snack') {
          counts.snacks++;
        } else {
          counts[recipe.mealType as keyof typeof counts]++;
        }
      }
    });

    return counts;
  }, [selectedRecipes]);

  // Get current step's count
  const currentStepCount = selectedCounts[currentStep];
  const canProceed = currentStepCount >= 3;

  const getMealTypeBadge = (type: string) => {
    const colors = {
      breakfast: 'bg-orange-500',
      lunch: 'bg-blue-500',
      dinner: 'bg-purple-500',
      snack: 'bg-green-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  const handleToggleRecipe = (recipe: Recipe) => {
    const isSelected = selectedRecipes.includes(recipe.id);
    toggleRecipeSelection(recipe.id);
    toast({
      title: isSelected ? "Removed from favorites!" : "Added to favorites!",
      description: isSelected 
        ? `${recipe.name} removed from your selections.`
        : `${recipe.name} added to your favorites.`
    });
  };

  const handleNext = () => {
    if (isLastStep) {
      // Populate the meal plan with selected recipes
      clearMealPlan();
      setTimeout(() => {
        selectedRecipes.forEach(id => {
          const recipe = RECIPES.find(r => r.id === id);
          if (recipe) {
            const mealTypeMap: { [key: string]: 'breakfast' | 'lunch' | 'dinner' | 'snacks' } = {
              'breakfast': 'breakfast',
              'lunch': 'lunch',
              'dinner': 'dinner',
              'snack': 'snacks'
            };
            const mealType = mealTypeMap[recipe.mealType];
            addRecipeToMealPlan(id, mealType);
          }
        });
        navigate('/meal-plans');
      }, 100);
    } else {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const handleSkip = () => {
    if (isLastStep) {
      navigate('/meal-plans');
    } else {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const getStepTitle = (step: string) => {
    const titles = {
      breakfast: 'BREAKFAST RECIPES',
      lunch: 'LUNCH RECIPES',
      dinner: 'DINNER RECIPES',
      snacks: 'SNACKS & SHAKES'
    };
    return titles[step as keyof typeof titles];
  };

  const getTotalTime = (prepTime: string, cookTime: string) => {
    const prep = parseInt(prepTime);
    const cook = parseInt(cookTime);
    return prep + cook;
  };

  const getMainIngredients = (recipe: Recipe) => {
    return recipe.ingredients.slice(0, 3).map(ing => ing.name).join(', ');
  };

  // Render current step's recipes
  const currentRecipes = recipesByMealType[currentStep];
  const currentCount = selectedCounts[currentStep];
  const isValid = currentCount >= 3;

  return (
    <ScrollArea className="h-screen bg-background">
      <div className="min-h-screen pb-32 px-4 pt-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((step, index) => (
              <div 
                key={step}
                className={`h-2 w-16 rounded-full transition-colors ${
                  index < currentStepIndex 
                    ? 'bg-green-500' 
                    : index === currentStepIndex 
                    ? 'bg-primary' 
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">{getStepTitle(currentStep)}</h1>
          <p className="text-muted-foreground mb-4">
            Select at least 3 recipes or skip to move on.<br />
            These will be your go-to meals. You can always add more or make changes later.
          </p>

          {/* Selection counter */}
          <div className={`flex items-center gap-2 text-sm font-medium mb-6 ${isValid ? 'text-green-500' : 'text-muted-foreground'}`}>
            {isValid && <CheckCircle2 size={16} />}
            <span>Selected: {currentCount}/3 minimum</span>
          </div>

          {/* Recipe grid for current step */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentRecipes.map(recipe => {
              const isSelected = selectedRecipes.includes(recipe.id);
              return (
                <Card 
                  key={recipe.id} 
                  className={`p-4 bg-secondary/50 border-border transition-all cursor-pointer ${
                    isSelected ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleToggleRecipe(recipe)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleToggleRecipe(recipe)}
                      className="mt-1 pointer-events-none"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{recipe.name}</h3>
                      <Badge className={`${getMealTypeBadge(recipe.mealType)} text-white mb-2`}>
                        {recipe.mealType.charAt(0).toUpperCase() + recipe.mealType.slice(1)}
                      </Badge>
                      <p className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium">Ingredients:</span> {getMainIngredients(recipe)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3 text-sm">
                    <div className="flex gap-4 text-muted-foreground">
                      <span>P: {recipe.macros.protein}g</span>
                      <span>C: {recipe.macros.carbs}g</span>
                      <span>F: {recipe.macros.fats}g</span>
                    </div>
                    <span className="font-semibold text-foreground">{recipe.macros.calories} cal</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock size={14} />
                      <span>{getTotalTime(recipe.prepTime, recipe.cookTime)} min total</span>
                    </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRecipe(recipe);
                    }}
                  >
                    View Details
                  </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
            <div className="max-w-4xl mx-auto flex gap-4">
              <Button 
                variant="outline"
                size="lg"
                onClick={handleSkip}
                className="flex-1"
              >
                Skip for Now
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex-1">
                      <Button 
                        size="lg"
                        onClick={handleNext}
                        disabled={!canProceed}
                        className="w-full"
                      >
                        {isLastStep ? 'Continue to Meal Plan' : 'Next'}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!canProceed && (
                    <TooltipContent>
                      <p>Select at least 3 recipes to continue, or skip</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Details Dialog */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedRecipe.name}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <Badge className={`${getMealTypeBadge(selectedRecipe.mealType)} text-white`}>
                  {selectedRecipe.mealType.charAt(0).toUpperCase() + selectedRecipe.mealType.slice(1)}
                </Badge>

                <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Prep Time</p>
                    <p className="text-lg font-semibold">{selectedRecipe.prepTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cook Time</p>
                    <p className="text-lg font-semibold">{selectedRecipe.cookTime}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 p-4 bg-secondary/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{selectedRecipe.macros.calories}</p>
                    <p className="text-xs text-muted-foreground">calories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedRecipe.macros.protein}g</p>
                    <p className="text-xs text-muted-foreground">protein</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedRecipe.macros.carbs}g</p>
                    <p className="text-xs text-muted-foreground">carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedRecipe.macros.fats}g</p>
                    <p className="text-xs text-muted-foreground">fats</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                  <ul className="space-y-1">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-muted-foreground">
                        • {ing.amount} {ing.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                  <ol className="space-y-2">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="text-muted-foreground">
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
    </ScrollArea>
  );
};
