import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Apple } from "lucide-react";

interface AfterLunchFiberCardProps {
  completed: boolean;
  onToggle: () => void;
}

export const AfterLunchFiberCard = ({ completed, onToggle }: AfterLunchFiberCardProps) => {
  return (
    <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30">
      <div className="flex items-center gap-3">
        <div className="bg-green-500/20 p-2 rounded-lg">
          <Apple className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-foreground">AFTER LUNCH - FIBER</h3>
          <p className="text-xs text-muted-foreground">Apple/Banana/Orange for fiber (or add broccoli to lunch)</p>
        </div>
        <Checkbox
          checked={completed}
          onCheckedChange={onToggle}
        />
      </div>
    </Card>
  );
};
