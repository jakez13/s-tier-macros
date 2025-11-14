import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { PROTEINS, CARBS, FATS } from '@/data/foodsData';
import { toast } from '@/hooks/use-toast';

export const FoodPreferences = () => {
  const navigate = useNavigate();
  const { setFoodPreferences } = useApp();
  
  const [selectedProteins, setSelectedProteins] = useState<string[]>([]);
  const [selectedCarbs, setSelectedCarbs] = useState<string[]>([]);
  const [selectedFats, setSelectedFats] = useState<string[]>([]);

  const toggleFood = (food: string, category: 'proteins' | 'carbs' | 'fats') => {
    const setters = {
      proteins: setSelectedProteins,
      carbs: setSelectedCarbs,
      fats: setSelectedFats,
    };
    
    const selected = {
      proteins: selectedProteins,
      carbs: selectedCarbs,
      fats: selectedFats,
    };

    const setter = setters[category];
    const currentList = selected[category];

    if (currentList.includes(food)) {
      setter(currentList.filter(f => f !== food));
    } else {
      setter([...currentList, food]);
    }
  };

  const handleSubmit = () => {
    if (selectedProteins.length < 3 || selectedCarbs.length < 3 || selectedFats.length < 3) {
      toast({
        title: "Not enough selections",
        description: "Please select at least 3 foods from each category.",
        variant: "destructive",
      });
      return;
    }

    setFoodPreferences({
      proteins: selectedProteins,
      carbs: selectedCarbs,
      fats: selectedFats,
    });

    navigate('/tracker');
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">Select Foods You Actually Eat</h1>
        <p className="text-muted-foreground mb-6">Pick at least 3 foods from each category. We'll only show recipes using these foods.</p>

        <div className="space-y-6">
          {/* Proteins */}
          <Card className="p-4 bg-secondary/50 border-border">
            <h2 className="text-xl font-bold text-foreground mb-3">
              PROTEINS ({selectedProteins.length}/3 minimum)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PROTEINS.map(food => (
                <label key={food} className="flex items-center space-x-3 cursor-pointer hover:bg-background/50 p-2 rounded">
                  <Checkbox
                    checked={selectedProteins.includes(food)}
                    onCheckedChange={() => toggleFood(food, 'proteins')}
                  />
                  <span className="text-foreground">{food}</span>
                </label>
              ))}
            </div>
          </Card>

          {/* Carbs */}
          <Card className="p-4 bg-secondary/50 border-border">
            <h2 className="text-xl font-bold text-foreground mb-3">
              CARBS ({selectedCarbs.length}/3 minimum)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CARBS.map(food => (
                <label key={food} className="flex items-center space-x-3 cursor-pointer hover:bg-background/50 p-2 rounded">
                  <Checkbox
                    checked={selectedCarbs.includes(food)}
                    onCheckedChange={() => toggleFood(food, 'carbs')}
                  />
                  <span className="text-foreground">{food}</span>
                </label>
              ))}
            </div>
          </Card>

          {/* Fats */}
          <Card className="p-4 bg-secondary/50 border-border">
            <h2 className="text-xl font-bold text-foreground mb-3">
              FATS ({selectedFats.length}/3 minimum)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FATS.map(food => (
                <label key={food} className="flex items-center space-x-3 cursor-pointer hover:bg-background/50 p-2 rounded">
                  <Checkbox
                    checked={selectedFats.includes(food)}
                    onCheckedChange={() => toggleFood(food, 'fats')}
                  />
                  <span className="text-foreground">{food}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>

        <Button 
          onClick={handleSubmit}
          className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Generate My Meal Plan
        </Button>
      </div>
    </div>
  );
};
