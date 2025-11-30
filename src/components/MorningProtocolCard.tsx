import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Sun, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useState } from "react";

interface MorningProtocolCardProps {
  completed: boolean[];
  onToggle: (index: number) => void;
  mealName?: string;
}

export const MorningProtocolCard = ({ completed, onToggle, mealName = 'Morning Protocol' }: MorningProtocolCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const items = [
    { name: "2 tbsp CHIA seeds in water with electrolytes", calories: 140 },
    { name: "Cup of kefir", calories: 110 },
    { name: "Banana", calories: 105 },
    { name: "1-2 scoops raw honey before gym", calories: 100 }
  ];

  const completedCount = completed.filter(Boolean).length;
  const totalCalories = items.reduce((sum, item, index) => 
    sum + (completed[index] ? item.calories : 0), 0
  );

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-secondary/80 to-secondary/40 border-border/50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Sun className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-bold text-foreground">MORNING MEAL</h3>
              <p className="text-xs text-muted-foreground">{mealName}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-primary">
                  {completedCount}/{items.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  {totalCalories} cal
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="space-y-3 pt-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors">
                <Checkbox
                  checked={completed[index]}
                  onCheckedChange={() => onToggle(index)}
                  className="mt-0.5"
                />
                <label className="text-sm text-foreground cursor-pointer flex-1" onClick={() => onToggle(index)}>
                  {item.name}
                </label>
                <span className="text-xs text-muted-foreground font-medium">
                  {item.calories} cal
                </span>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
