import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FoodItem } from "./FoodItem";
import { Button } from "./ui/button";

interface Food {
  name: string;
  serving: string;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
  why: string;
}

interface MacroSectionProps {
  title: string;
  subtitle: string;
  caloriesPerGram: number;
  target: string;
  icon: string;
  sTierFoods: Food[];
  aTierFoods: Food[];
}

export const MacroSection = ({
  title,
  subtitle,
  caloriesPerGram,
  target,
  icon,
  sTierFoods,
  aTierFoods,
}: MacroSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-glow transition-all duration-300">
      <div className="p-6 lg:p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-5xl">{icon}</span>
              <div>
                <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight uppercase">
                  {title}
                </h2>
                <p className="text-steel text-lg mt-1">{subtitle}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-muted-foreground">
              <div>
                <span className="text-primary font-bold">{caloriesPerGram}</span> calories per gram
              </div>
              <div className="hidden sm:block text-border">|</div>
              <div>
                <span className="font-semibold">Target:</span> {target}
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="secondary"
          className="w-full justify-between text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <span>{isExpanded ? "Hide" : "View All"} Sources</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>

        {isExpanded && (
          <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-12 bg-s-tier rounded-full"></div>
                <h3 className="text-2xl font-bold text-s-tier uppercase tracking-wide">
                  S-Tier
                </h3>
                <div className="h-1 flex-1 bg-s-tier/20 rounded-full"></div>
              </div>
              <div className="space-y-3">
                {sTierFoods.map((food, index) => (
                  <FoodItem key={index} food={food} tier="s" />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-12 bg-a-tier rounded-full"></div>
                <h3 className="text-2xl font-bold text-a-tier uppercase tracking-wide">
                  A-Tier
                </h3>
                <div className="h-1 flex-1 bg-a-tier/20 rounded-full"></div>
              </div>
              <div className="space-y-3">
                {aTierFoods.map((food, index) => (
                  <FoodItem key={index} food={food} tier="a" />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
