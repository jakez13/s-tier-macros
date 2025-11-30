import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Sun } from "lucide-react";

interface MorningProtocolCardProps {
  completed: boolean[];
  onToggle: (index: number) => void;
}

const MORNING_PROTOCOL_CALORIES = 590; // Approximate total calories

export const MorningProtocolCard = ({ completed, onToggle }: MorningProtocolCardProps) => {
  const items = [
    { text: "2 tbsp CHIA seeds in water with electrolytes", calories: 140 },
    { text: "Cup of kefir", calories: 150 },
    { text: "Banana", calories: 105 },
    { text: "1-2 scoops raw honey before gym", calories: 195 }
  ];

  const completedCount = completed.filter(Boolean).length;

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-secondary/80 to-secondary/40 border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Sun className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">Morning Protocol</h3>
          <p className="text-sm text-muted-foreground">Upon waking • ~{MORNING_PROTOCOL_CALORIES} cal</p>
        </div>
        <div className="ml-auto text-sm font-semibold text-primary">
          {completedCount}/{items.length}
        </div>
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors">
            <Checkbox
              checked={completed[index]}
              onCheckedChange={() => onToggle(index)}
              className="mt-0.5"
            />
            <label className="text-sm text-foreground cursor-pointer flex-1" onClick={() => onToggle(index)}>
              {item.text}
              <span className="text-xs text-muted-foreground ml-2">({item.calories} cal)</span>
            </label>
          </div>
        ))}
      </div>
    </Card>
  );
};
