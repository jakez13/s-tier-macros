import { Card } from "./ui/card";
import { Droplets } from "lucide-react";
import { Progress } from "./ui/progress";

interface WaterIntakeTrackerProps {
  glasses: number;
  onGlassClick: (index: number) => void;
}

export const WaterIntakeTracker = ({ glasses, onGlassClick }: WaterIntakeTrackerProps) => {
  const totalGlasses = 8;
  const percentage = Math.round((glasses / totalGlasses) * 100);

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-secondary/80 to-secondary/40 border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Droplets className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">Water Intake</h3>
          <p className="text-sm text-muted-foreground">
            {glasses}/{totalGlasses} glasses • {percentage}%
          </p>
        </div>
      </div>
      
      <Progress value={percentage} className="h-2 mb-4" />

      <div className="flex justify-between gap-2">
        {Array.from({ length: totalGlasses }, (_, i) => (
          <button
            key={i}
            onClick={() => onGlassClick(i)}
            className={`flex-1 h-12 rounded-lg border-2 transition-all ${
              i < glasses
                ? 'bg-primary/20 border-primary'
                : 'bg-background/50 border-border hover:border-primary/50'
            }`}
          >
            <Droplets
              className={`w-5 h-5 mx-auto ${
                i < glasses ? 'text-primary' : 'text-muted-foreground'
              }`}
            />
          </button>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground mt-3">
        Good water intake is essential
      </p>
    </Card>
  );
};
