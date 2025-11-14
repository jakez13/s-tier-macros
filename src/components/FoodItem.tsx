import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

interface FoodItemProps {
  food: {
    name: string;
    serving: string;
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
    why: string;
  };
  tier: "s" | "a";
}

export const FoodItem = ({ food, tier }: FoodItemProps) => {
  const tierColor = tier === "s" ? "s-tier" : "a-tier";

  const handleAddToTracker = () => {
    toast({
      title: "Added to Tracker",
      description: `${food.name} has been added to your nutrition tracker.`,
    });
  };

  return (
    <div className="bg-secondary/50 rounded-lg p-4 border border-border hover:border-primary/50 transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {food.name}
              </h4>
              <p className="text-sm text-muted-foreground">{food.serving}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              onClick={handleAddToTracker}
            >
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="bg-background/50 rounded px-2 py-1.5 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Protein</div>
              <div className="text-sm font-bold text-foreground">{food.protein}g</div>
            </div>
            <div className="bg-background/50 rounded px-2 py-1.5 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Fat</div>
              <div className="text-sm font-bold text-foreground">{food.fat}g</div>
            </div>
            <div className="bg-background/50 rounded px-2 py-1.5 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Carbs</div>
              <div className="text-sm font-bold text-foreground">{food.carbs}g</div>
            </div>
            <div className="bg-background/50 rounded px-2 py-1.5 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Cal</div>
              <div className={`text-sm font-bold text-${tierColor}`}>{food.calories}</div>
            </div>
          </div>

          <div className="bg-background/30 rounded-md px-3 py-2 border-l-2 border-primary/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Why:</span> {food.why}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
