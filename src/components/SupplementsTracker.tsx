import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Pill, ChevronDown, X, Plus } from "lucide-react";
import { Progress } from "./ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useState } from "react";

interface SupplementsTrackerProps {
  completed: boolean[];
  onToggle: (index: number) => void;
  enabledItems: boolean[];
  onRemoveItem: (index: number) => void;
  onRestoreItem: (index: number) => void;
  editMode: boolean;
}

export const SupplementsTracker = ({ completed, onToggle, enabledItems, onRemoveItem, onRestoreItem, editMode }: SupplementsTrackerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const supplements = [
    "Creatine monohydrate",
    "Vitamin C",
    "Vitamin D3 (5000 units)",
    "Omega 3 fish oil",
    "Zinc with copper",
    "Magnesium glycinate"
  ];

  const enabledCount = enabledItems.filter(Boolean).length;
  const completedCount = completed.filter((c, i) => c && enabledItems[i]).length;
  const percentage = enabledCount > 0 ? Math.round((completedCount / enabledCount) * 100) : 0;
  const hiddenItems = enabledItems.filter(item => !item).length;

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-secondary/80 to-secondary/40 border-border/50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Pill className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-bold text-foreground">Daily Supplements</h3>
              <p className="text-sm text-muted-foreground">
                {completedCount}/{enabledCount} completed • {percentage}%
              </p>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <Progress value={percentage} className="h-2 mb-4" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {supplements.map((supplement, index) => (
              enabledItems[index] && (
                <div 
                  key={index} 
                  className={`relative flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-all ${editMode ? 'animate-wiggle' : ''}`}
                >
                  <Checkbox
                    checked={completed[index]}
                    onCheckedChange={() => onToggle(index)}
                    disabled={editMode}
                  />
                  <label className="text-sm text-foreground cursor-pointer flex-1" onClick={() => !editMode && onToggle(index)}>
                    {supplement}
                  </label>
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
          </div>
          {hiddenItems > 0 && (
            <div className="p-3 border-2 border-dashed border-border rounded-lg mt-3">
              <p className="text-xs text-muted-foreground text-center mb-2">{hiddenItems} supplement{hiddenItems > 1 ? 's' : ''} hidden</p>
              <div className="flex flex-wrap gap-2">
                {supplements.map((supplement, index) => (
                  !enabledItems[index] && (
                    <button
                      key={index}
                      onClick={() => onRestoreItem(index)}
                      className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded-md flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      {supplement}
                    </button>
                  )
                ))}
              </div>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
