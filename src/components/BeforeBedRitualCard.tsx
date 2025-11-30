import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Moon, AlertCircle, X, Plus } from "lucide-react";

interface BeforeBedRitualCardProps {
  completed: boolean[];
  onToggle: (index: number) => void;
  enabledItems: boolean[];
  onRemoveItem: (index: number) => void;
  onRestoreItem: (index: number) => void;
  editMode: boolean;
}

export const BeforeBedRitualCard = ({ completed, onToggle, enabledItems, onRemoveItem, onRestoreItem, editMode }: BeforeBedRitualCardProps) => {
  const items = [
    { name: "2 kiwis with blueberries", calories: 120 },
    { name: "Protein shake (1-2 scoops)", calories: 150 },
    { name: "ALWAYS with creatine", calories: 0 }
  ];

  const enabledCount = enabledItems.filter(Boolean).length;
  const completedCount = completed.filter((c, i) => c && enabledItems[i]).length;
  const allCompleted = completedCount === enabledCount && enabledCount > 0;
  const totalCalories = items.reduce((sum, item, index) => 
    sum + (completed[index] && enabledItems[index] ? item.calories : 0), 0
  );
  const hiddenItems = enabledItems.filter(item => !item).length;

  return (
    <Card className={`p-4 sm:p-6 border-2 ${allCompleted ? 'border-primary/50' : 'border-[#ff4444]'} bg-gradient-to-br from-secondary/80 to-secondary/40`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${allCompleted ? 'bg-primary/20' : 'bg-[#ff4444]/20'}`}>
          {allCompleted ? (
            <Moon className="w-5 h-5 text-primary" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#ff4444]" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">BEFORE BED RITUAL</h3>
          <p className="text-xs font-bold text-[#ff4444] uppercase">At least 2 hours before bed</p>
        </div>
        <div className="text-right">
          <div className={`text-sm font-semibold ${allCompleted ? 'text-primary' : 'text-[#ff4444]'}`}>
            {completedCount}/{enabledCount}
          </div>
          <div className="text-xs text-muted-foreground">
            {totalCalories} cal
          </div>
        </div>
      </div>
      
      <div className="bg-[#ff4444]/10 rounded-lg p-3 mb-3">
        <p className="text-sm font-bold text-foreground text-center">
          THIS IS DONE EVERY NIGHT
        </p>
      </div>

      <div className="space-y-3">
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
              <label className="text-sm font-semibold text-foreground cursor-pointer flex-1" onClick={() => !editMode && onToggle(index)}>
                {item.name}
              </label>
              {item.calories > 0 && (
                <span className="text-xs text-muted-foreground font-medium">
                  {item.calories} cal
                </span>
              )}
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
    </Card>
  );
};
