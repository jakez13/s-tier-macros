import { Card } from "./ui/card";
import { Droplets } from "lucide-react";
import { Progress } from "./ui/progress";

interface WaterIntakeTrackerProps {
  glasses: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const WaterIntakeTracker = ({ glasses, onIncrease, onDecrease }: WaterIntakeTrackerProps) => {
  const totalGlasses = 8;

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-secondary/80 to-secondary/40 border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Droplets className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">WATER INTAKE</h3>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={onDecrease}
          disabled={glasses === 0}
          className="h-10 w-10 rounded-lg border-2 border-border bg-background/50 hover:bg-background hover:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-bold"
        >
          -
        </button>
        
        <div className="text-center min-w-[140px]">
          <div className="text-2xl font-bold text-foreground">
            {glasses} / {totalGlasses}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
            glasses
          </div>
        </div>
        
        <button
          onClick={onIncrease}
          disabled={glasses >= totalGlasses}
          className="h-10 w-10 rounded-lg border-2 border-border bg-background/50 hover:bg-background hover:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-bold"
        >
          +
        </button>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        Good water intake is essential
      </p>
    </Card>
  );
};
