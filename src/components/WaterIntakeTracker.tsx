import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Droplet, Plus, Minus, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useState } from "react";

interface WaterIntakeTrackerProps {
  waterGlasses: number;
  onWaterChange: (newValue: number) => void;
}

export const WaterIntakeTracker = ({ waterGlasses, onWaterChange }: WaterIntakeTrackerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const targetGlasses = 8;
  const percentage = Math.round((waterGlasses / targetGlasses) * 100);

  const handleIncrement = () => {
    if (waterGlasses < targetGlasses) {
      onWaterChange(waterGlasses + 1);
    }
  };

  const handleDecrement = () => {
    if (waterGlasses > 0) {
      onWaterChange(waterGlasses - 1);
    }
  };

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-secondary/80 to-secondary/40 border-border/50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Droplet className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-bold text-foreground">Water Intake</h3>
              <p className="text-sm text-muted-foreground">
                {waterGlasses}/{targetGlasses} glasses • {percentage}%
              </p>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="flex items-center justify-center gap-4 py-4">
            <Button
              onClick={handleDecrement}
              variant="outline"
              size="icon"
              disabled={waterGlasses === 0}
              className="h-12 w-12"
            >
              <Minus className="h-5 w-5" />
            </Button>
            
            <div className="text-center min-w-[120px]">
              <div className="text-3xl font-bold text-foreground">
                {waterGlasses} / {targetGlasses}
              </div>
              <div className="text-sm text-muted-foreground">
                glasses
              </div>
            </div>
            
            <Button
              onClick={handleIncrement}
              variant="outline"
              size="icon"
              disabled={waterGlasses >= targetGlasses}
              className="h-12 w-12"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground mt-2">
            Good water intake is essential
          </p>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
