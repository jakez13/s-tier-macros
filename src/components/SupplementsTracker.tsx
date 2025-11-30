import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Pill } from "lucide-react";
import { Progress } from "./ui/progress";

interface SupplementsTrackerProps {
  completed: boolean[];
  onToggle: (index: number) => void;
}

export const SupplementsTracker = ({ completed, onToggle }: SupplementsTrackerProps) => {
  const supplements = [
    "Creatine monohydrate",
    "Vitamin C",
    "Vitamin D3 (5000 units)",
    "Omega 3 fish oil",
    "Zinc with copper",
    "Magnesium glycinate"
  ];

  const completedCount = completed.filter(Boolean).length;
  const percentage = Math.round((completedCount / supplements.length) * 100);

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-secondary/80 to-secondary/40 border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Pill className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">Daily Supplements</h3>
          <p className="text-sm text-muted-foreground">
            {completedCount}/{supplements.length} completed • {percentage}%
          </p>
        </div>
      </div>
      
      <Progress value={percentage} className="h-2 mb-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {supplements.map((supplement, index) => (
          <div key={index} className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors">
            <Checkbox
              checked={completed[index]}
              onCheckedChange={() => onToggle(index)}
            />
            <label className="text-sm text-foreground cursor-pointer flex-1" onClick={() => onToggle(index)}>
              {supplement}
            </label>
          </div>
        ))}
      </div>
    </Card>
  );
};
