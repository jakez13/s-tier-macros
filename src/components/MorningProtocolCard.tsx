import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Sun, ChevronDown, X, Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useState } from "react";

interface MorningProtocolCardProps {
  completed: boolean[];
  onToggle: (index: number) => void;
  enabledItems: boolean[];
  onRemoveItem: (index: number) => void;
  onRestoreItem: (index: number) => void;
  editMode: boolean;
}

export const MorningProtocolCard = ({ completed, onToggle, enabledItems, onRemoveItem, onRestoreItem, editMode }: MorningProtocolCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const items = [
    { name: "2 tbsp CHIA seeds in water with electrolytes", calories: 140 },
    { name: "Cup of kefir", calories: 110 },
    { name: "Banana", calories: 105 },
    { name: "1-2 scoops raw honey before gym", calories: 100 }
  ];

  const enabledCount = enabledItems.filter(Boolean).length;
  const completedCount = completed.filter((c, i) => c && enabledItems[i]).length;
  const totalCalories = items.reduce((sum, item, index) => 
    sum + (completed[index] && enabledItems[index] ? item.calories : 0), 0
  );
  
  const hiddenItems = enabledItems.filter(item => !item).length;

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
              <p className="text-xs text-muted-foreground">Durden Breakfast Protocol</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-primary">
                  {completedCount}/{enabledCount}
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
              enabledItems[index] && (
                <div 
                  key={index} 
                  className={`relative flex items-start gap-3 p-2 rounded-lg hover:bg-background/50 transition-all ${editMode ? 'animate-wiggle' : ''}`}
                >
                  <Checkbox
                    checked={completed[index]}
                    onCheckedChange={() => onToggle(index)}
                    className="mt-0.5"
                    disabled={editMode}
                  />
                  <label className="text-sm text-foreground cursor-pointer flex-1" onClick={() => !editMode && onToggle(index)}>
                    {item.name}
                  </label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {item.calories} cal
                  </span>
                  {editMode && (
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 hover:scale-110 transition-transform z-10"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )
            ))}
            {hiddenItems > 0 && (
              <div className="p-2 border-2 border-dashed border-border rounded-lg">
                <p className="text-xs text-muted-foreground text-center mb-2">{hiddenItems} item{hiddenItems > 1 ? 's' : ''} hidden</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, index) => (
                    !enabledItems[index] && (
                      <button
                        key={index}
                        onClick={() => onRestoreItem(index)}
                        className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded-md flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        {item.name}
                      </button>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
