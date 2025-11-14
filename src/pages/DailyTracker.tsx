import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ProgressBar';
import { Plus, Trash2, Droplet } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export const DailyTracker = () => {
  const { macros, getTodayLog, addMealToToday, deleteMeal, addWaterGlass } = useApp();
  const todayLog = getTodayLog();
  
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [mealName, setMealName] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [mealProtein, setMealProtein] = useState('');
  const [mealCarbs, setMealCarbs] = useState('');
  const [mealFats, setMealFats] = useState('');

  if (!macros) return null;

  const totals = todayLog.meals.reduce(
    (acc, meal) => ({
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
      calories: acc.calories + meal.calories,
    }),
    { protein: 0, carbs: 0, fats: 0, calories: 0 }
  );

  const handleAddMeal = () => {
    if (!mealName || !mealTime || !mealProtein || !mealCarbs || !mealFats) {
      toast({
        title: "Missing information",
        description: "Please fill in all meal details.",
        variant: "destructive",
      });
      return;
    }

    const protein = parseFloat(mealProtein);
    const carbs = parseFloat(mealCarbs);
    const fats = parseFloat(mealFats);
    const calories = (protein * 4) + (carbs * 4) + (fats * 9);

    addMealToToday({
      name: mealName,
      time: mealTime,
      protein,
      carbs,
      fats,
      calories,
    });

    // Reset form
    setMealName('');
    setMealTime('');
    setMealProtein('');
    setMealCarbs('');
    setMealFats('');
    setIsAddMealOpen(false);

    toast({
      title: "Meal added",
      description: `${mealName} has been logged to today's tracker.`,
    });
  };

  const waterProgress = (todayLog.waterGlasses / 8) * 100;

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">Today's Nutrition</h1>

        {/* Macro Progress */}
        <Card className="p-4 mb-6 bg-secondary/50 border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Macro Progress</h2>
          <ProgressBar current={totals.protein} target={macros.protein} label="PROTEIN" color="bg-primary" />
          <ProgressBar current={totals.carbs} target={macros.carbs} label="CARBS" color="bg-blue-500" />
          <ProgressBar current={totals.fats} target={macros.fats} label="FATS" color="bg-yellow-500" />
          <ProgressBar current={totals.calories} target={macros.calories} label="CALORIES" color="bg-green-500" />
        </Card>

        {/* Water Tracker */}
        <Card className="p-4 mb-6 bg-secondary/50 border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-foreground">Water Intake</h2>
            <span className="text-muted-foreground">{todayLog.waterGlasses}/8 glasses</span>
          </div>
          <div className="flex gap-1 mb-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-8 rounded ${
                  i < todayLog.waterGlasses ? 'bg-blue-500' : 'bg-secondary'
                }`}
              />
            ))}
          </div>
          <Button
            onClick={addWaterGlass}
            variant="outline"
            className="w-full"
          >
            <Droplet className="mr-2 h-4 w-4" />
            Add Glass (16oz)
          </Button>
        </Card>

        {/* Logged Meals */}
        <Card className="p-4 mb-6 bg-secondary/50 border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Today's Meals</h2>
            <Dialog open={isAddMealOpen} onOpenChange={setIsAddMealOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Meal
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-secondary border-border">
                <DialogHeader>
                  <DialogTitle>Add Custom Meal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mealName">Meal Name</Label>
                    <Input
                      id="mealName"
                      value={mealName}
                      onChange={(e) => setMealName(e.target.value)}
                      placeholder="Scrambled Eggs"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mealTime">Time</Label>
                    <Input
                      id="mealTime"
                      type="time"
                      value={mealTime}
                      onChange={(e) => setMealTime(e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label htmlFor="protein">Protein (g)</Label>
                      <Input
                        id="protein"
                        type="number"
                        value={mealProtein}
                        onChange={(e) => setMealProtein(e.target.value)}
                        placeholder="30"
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="carbs">Carbs (g)</Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={mealCarbs}
                        onChange={(e) => setMealCarbs(e.target.value)}
                        placeholder="45"
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fats">Fats (g)</Label>
                      <Input
                        id="fats"
                        type="number"
                        value={mealFats}
                        onChange={(e) => setMealFats(e.target.value)}
                        placeholder="15"
                        className="bg-background border-border"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddMeal} className="w-full bg-primary hover:bg-primary/90">
                    Add Meal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {todayLog.meals.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No meals logged yet. Add your first meal!</p>
          ) : (
            <div className="space-y-3">
              {todayLog.meals.map(meal => (
                <div key={meal.id} className="bg-background/50 p-3 rounded border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{meal.name}</h3>
                      <p className="text-sm text-muted-foreground">{meal.time}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMeal(meal.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-foreground">P: <span className="font-bold">{meal.protein}g</span></span>
                    <span className="text-foreground">C: <span className="font-bold">{meal.carbs}g</span></span>
                    <span className="text-foreground">F: <span className="font-bold">{meal.fats}g</span></span>
                    <span className="text-foreground">Cal: <span className="font-bold">{Math.round(meal.calories)}</span></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
