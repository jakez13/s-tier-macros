import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface GeneratedMeal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  instructions?: string;
}

interface AiMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMealCreated: (meal: GeneratedMeal) => void;
}

export const AiMealDialog = ({ open, onOpenChange, onMealCreated }: AiMealDialogProps) => {
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMeal, setGeneratedMeal] = useState<GeneratedMeal | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const generateMeal = async () => {
    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please describe the meal you want to create",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai-meal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate meal");
      }

      const data = await response.json();
      setGeneratedMeal(data.meal);
      setIsEditing(false);
      
      toast({
        title: "Meal generated!",
        description: "Review and edit the details before saving",
      });
    } catch (error) {
      console.error("Error generating meal:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate meal",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (generatedMeal) {
      onMealCreated(generatedMeal);
      handleClose();
    }
  };

  const handleClose = () => {
    setDescription("");
    setGeneratedMeal(null);
    setIsEditing(false);
    onOpenChange(false);
  };

  const updateField = (field: keyof GeneratedMeal, value: string | number) => {
    if (generatedMeal) {
      setGeneratedMeal({ ...generatedMeal, [field]: value });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Custom Meal Creator
          </DialogTitle>
          <DialogDescription>
            Describe your meal and AI will generate the recipe with estimated macros
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {!generatedMeal ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="description">Meal Description</Label>
                <Textarea
                  id="description"
                  placeholder="E.g., Grilled chicken breast with quinoa and steamed broccoli, or Protein smoothie with banana and peanut butter..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={generateMeal}
                disabled={isGenerating || !description.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Meal
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Generated Meal</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Done Editing" : "Edit"}
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Meal Name</Label>
                    <Input
                      id="name"
                      value={generatedMeal.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="mealType">Meal Type</Label>
                    <Select
                      value={generatedMeal.mealType}
                      onValueChange={(value) => updateField("mealType", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger id="mealType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="calories">Calories</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={generatedMeal.calories}
                        onChange={(e) => updateField("calories", Number(e.target.value))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="protein">Protein (g)</Label>
                      <Input
                        id="protein"
                        type="number"
                        value={generatedMeal.protein}
                        onChange={(e) => updateField("protein", Number(e.target.value))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="carbs">Carbs (g)</Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={generatedMeal.carbs}
                        onChange={(e) => updateField("carbs", Number(e.target.value))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fat">Fat (g)</Label>
                      <Input
                        id="fat"
                        type="number"
                        value={generatedMeal.fat}
                        onChange={(e) => updateField("fat", Number(e.target.value))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {generatedMeal.instructions && (
                    <div>
                      <Label htmlFor="instructions">Instructions</Label>
                      <Textarea
                        id="instructions"
                        value={generatedMeal.instructions}
                        onChange={(e) => updateField("instructions", e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleClose} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  Save to Recipes
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
