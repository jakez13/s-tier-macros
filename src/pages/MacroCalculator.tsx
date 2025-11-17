import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, UserProfile } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';

export const MacroCalculator = () => {
  const navigate = useNavigate();
  const { setUserProfile, setMacros } = useApp();
  
  const [weight, setWeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState<'minimal' | 'light' | 'moderate' | 'active'>('moderate');
  const [goal, setGoal] = useState<'bulk' | 'maintain' | 'cut'>('maintain');
  const [calorieAdjustment, setCalorieAdjustment] = useState(200);

  const calculateMacros = () => {
    const w = parseFloat(weight);
    const hFeet = parseInt(heightFeet);
    const hInches = parseInt(heightInches);
    const a = parseInt(age);
    
    // Convert weight to kg and height to cm
    const weightKg = w * 0.453592;
    const heightCm = (hFeet * 12 + hInches) * 2.54;
    
    // Mifflin-St Jeor Equation (using male formula as default)
    const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * a) + 5;
    
    // Activity level multipliers
    const activityMultipliers = {
      minimal: 1.2,   // Sedentary
      light: 1.375,   // Light exercise 1-3 days/week
      moderate: 1.55, // Moderate exercise 3-5 days/week
      active: 1.725   // Heavy exercise 6-7 days/week
    };
    
    const maintenance = bmr * activityMultipliers[activityLevel];
    
    let targetCalories = maintenance;
    if (goal === 'bulk') targetCalories = maintenance + calorieAdjustment;
    if (goal === 'cut') targetCalories = maintenance - calorieAdjustment;
    
    const protein = Math.round(w * 1);
    const fats = Math.round(goal === 'cut' ? w * 0.35 : w * 0.45);
    const remainingCalories = targetCalories - (protein * 4) - (fats * 9);
    const carbs = Math.round(remainingCalories / 4);
    
    return {
      maintenance: Math.round(maintenance),
      calories: Math.round(targetCalories),
      protein,
      carbs,
      fats,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: UserProfile = {
      weight: parseFloat(weight),
      heightFeet: parseInt(heightFeet),
      heightInches: parseInt(heightInches),
      age: parseInt(age),
      activityLevel,
      goal,
    };
    
    const macros = calculateMacros();
    
    setUserProfile(profile);
    setMacros(macros);
    
    navigate('/recipes');
  };

  const isFormValid = weight && heightFeet && heightInches && age;

  return (
    <ScrollArea className="h-screen bg-background">
      <div className="min-h-screen p-4 py-8 flex items-start justify-center">
        <Card className="w-full max-w-md p-6 bg-secondary/50 border-border mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Let's Calculate Your Macros</h1>
        <p className="text-muted-foreground mb-6">We'll build your nutrition plan based on your goals</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="weight">Current Weight (lbs)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="180"
              className="bg-background border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="heightFeet">Height (feet)</Label>
              <Input
                id="heightFeet"
                type="number"
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                placeholder="5"
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="heightInches">Height (inches)</Label>
              <Input
                id="heightInches"
                type="number"
                value={heightInches}
                onChange={(e) => setHeightInches(e.target.value)}
                placeholder="10"
                className="bg-background border-border"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="age">Age (years)</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              className="bg-background border-border"
            />
          </div>

          <div>
            <Label htmlFor="activity">Activity Level</Label>
            <Select value={activityLevel} onValueChange={(v: any) => setActivityLevel(v)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                <SelectItem value="minimal">Minimal Activity (little to no exercise)</SelectItem>
                <SelectItem value="light">Lightly Active (1-3 days/week training)</SelectItem>
                <SelectItem value="moderate">Moderately Active (3-5 days/week training)</SelectItem>
                <SelectItem value="active">Very Active (6-7 days/week training)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="goal">Goal</Label>
            <Select value={goal} onValueChange={(v: any) => setGoal(v)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                <SelectItem value="bulk">Build Muscle (Bulk)</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="cut">Lose Fat (Cut)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {goal !== 'maintain' && (
            <div>
              <Label>
                {goal === 'bulk' ? 'Calorie Surplus' : 'Calorie Deficit'}: {calorieAdjustment} cal/day
              </Label>
              <Slider
                value={[calorieAdjustment]}
                onValueChange={(value) => setCalorieAdjustment(value[0])}
                min={200}
                max={500}
                step={50}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>200</span>
                <span>500</span>
              </div>
            </div>
          )}

          {isFormValid && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Calorie Maintenance Estimate:</p>
              <p className="text-2xl font-bold text-primary">{calculateMacros().maintenance} cal/day</p>
              {goal !== 'maintain' && (
                <p className="text-sm text-muted-foreground mt-2">
                  Target: {calculateMacros().calories} cal/day
                </p>
              )}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!isFormValid}
          >
            Next: Choose Your Foods
          </Button>
        </form>
        </Card>
      </div>
    </ScrollArea>
  );
};
