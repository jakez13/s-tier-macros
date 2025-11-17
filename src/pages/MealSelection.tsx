import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { RECIPES, Recipe } from '@/data/recipesData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2 } from 'lucide-react';
import { LoadingScreen } from '@/components/LoadingScreen';

export const MealSelection = () => {
  const navigate = useNavigate();
  const { selectedRecipes, toggleRecipeSelection, addRecipeToMealPlan, clearMealPlan, setMealsSelected } = useApp();
  const [currentStep, setCurrentStep] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');
  const [showLoading, setShowLoading] = useState(false);

  const steps: Array<'breakfast' | 'lunch' | 'dinner' | 'snacks'> = ['breakfast', 'lunch', 'dinner', 'snacks'];
  const currentStepIndex = steps.indexOf(currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;

  const recipesByMealType = useMemo(() => ({
    breakfast: RECIPES.filter(r => r.mealType === 'breakfast'),
    lunch: RECIPES.filter(r => r.mealType === 'lunch'),
    dinner: RECIPES.filter(r => r.mealType === 'dinner'),
    snacks: RECIPES.filter(r => r.mealType === 'snack'),
  }), []);

  const selectedCounts = useMemo(() => {
    const counts = { breakfast: 0, lunch: 0, dinner: 0, snacks: 0 };
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

  const currentStepCount = selectedCounts[currentStep];
  const canProceed = currentStepCount >= 3;

  const getMealTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snacks: 'Snacks'
    };
    return labels[type] || type;
  };

  const handleToggleRecipe = (recipe: Recipe) => {
    const mealTypeKey = recipe.mealType === 'snack' ? 'snacks' : recipe.mealType;
    const currentCount = selectedCounts[mealTypeKey as keyof typeof selectedCounts];
    const isSelected = selectedRecipes.includes(recipe.id);
    
    if (!isSelected && currentCount >= 3) {
      return; // Don't allow more than 3
    }
    
    toggleRecipeSelection(recipe.id);
  };

  const handleNext = () => {
    if (isLastStep) {
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
        setMealsSelected(true);
        setShowLoading(true);
      }, 100);
    } else {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const handleLoadingComplete = () => {
    navigate('/meal-plans');
  };

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  const currentRecipes = recipesByMealType[currentStep];
  const stepLabel = getMealTypeLabel(currentStep);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Choose Your Meals</h1>
          <p className="text-sm md:text-base text-muted-foreground">Select exactly 3 meals for {stepLabel.toLowerCase()}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between gap-2">
            {steps.map((step, idx) => {
              const stepCount = selectedCounts[step];
              const isComplete = stepCount >= 3;
              const isCurrent = step === currentStep;
              const isPast = idx < currentStepIndex;

              return (
                <div key={step} className="flex-1">
                  <div className={`p-2 md:p-3 rounded-lg border-2 transition-all ${
                    isCurrent 
                      ? 'border-primary bg-primary/10' 
                      : isComplete || isPast
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-border bg-muted/50'
                  }`}>
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs md:text-sm font-medium truncate ${
                        isCurrent ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {getMealTypeLabel(step)}
                      </span>
                      {(isComplete || isPast) && (
                        <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                      )}
                    </div>
                    <p className={`text-xs mt-1 ${
                      isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}>
                      {stepCount}/3 selected
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {currentRecipes.map((recipe) => {
            const isSelected = selectedRecipes.includes(recipe.id);
            const canSelect = currentStepCount < 3 || isSelected;

            return (
              <Card
                key={recipe.id}
                onClick={() => canSelect && handleToggleRecipe(recipe)}
                className={`cursor-pointer transition-all touch-manipulation ${
                  isSelected
                    ? 'ring-2 ring-primary shadow-md bg-primary/5'
                    : canSelect
                    ? 'hover:shadow-md hover:border-primary/50'
                    : 'opacity-50 cursor-not-allowed'
                } ${!canSelect ? 'pointer-events-none' : ''}`}
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-base md:text-lg text-foreground flex-1 leading-tight">
                      {recipe.name}
                    </h3>
                    {isSelected && (
                      <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-3">
                    <Clock className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{recipe.prepTime}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
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
              </Card>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            size="lg"
            className="w-full md:w-auto min-w-[200px] touch-manipulation"
          >
            {isLastStep ? 'Create Plan' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};
