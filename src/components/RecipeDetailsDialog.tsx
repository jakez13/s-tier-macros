import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Recipe } from "@/data/recipesData";
import { Clock, ChefHat } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecipeDetailsDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RecipeDetailsDialog = ({ recipe, open, onOpenChange }: RecipeDetailsDialogProps) => {
  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{recipe.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Meal Type & Time */}
          <div className="flex items-center gap-4 flex-wrap">
            <Badge variant="secondary" className="capitalize">
              {recipe.mealType}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Prep: {recipe.prepTime}</span>
              <span>•</span>
              <span>Cook: {recipe.cookTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ChefHat className="h-4 w-4" />
              <span>{recipe.servingSize}</span>
            </div>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="text-2xl font-bold text-red-600">{Math.round(recipe.macros.calories)}</div>
              <div className="text-xs text-muted-foreground uppercase mt-1">Calories</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-600">{Math.round(recipe.macros.protein)}g</div>
              <div className="text-xs text-muted-foreground uppercase mt-1">Protein</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="text-2xl font-bold text-green-600">{Math.round(recipe.macros.carbs)}g</div>
              <div className="text-xs text-muted-foreground uppercase mt-1">Carbs</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-600">{Math.round(recipe.macros.fats)}g</div>
              <div className="text-xs text-muted-foreground uppercase mt-1">Fats</div>
            </div>
          </div>

          {/* Ingredients */}
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground">
                      <span className="font-medium">{ingredient.amount}</span> {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          {recipe.instructions && recipe.instructions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Instructions</h3>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-foreground flex-1 pt-0.5">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Custom AI meals note */}
          {recipe.instructions.length === 1 && recipe.instructions[0] === "Custom AI-generated meal" && (
            <div className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-lg">
              This is a custom AI-generated meal. Cooking instructions are not available.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
