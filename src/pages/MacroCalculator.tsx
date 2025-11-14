import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, UserProfile } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

export const MacroCalculator = () => {
  const navigate = useNavigate();
  const { setUserProfile, setMacros } = useApp();
  
  const [weight, setWeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState<'minimal' | 'light' | 'moderate' | 'active'>('moderate');
  const [goal, setGoal] = useState<'bulk' | 'maintain' | 'cut'>('maintain');

  const calculateMacros = () => {
    const w = parseFloat(weight);
    const maintenance = w * 15;
    
    let targetCalories = maintenance;
    if (goal === 'bulk') targetCalories = maintenance + 400;
    if (goal === 'cut') targetCalories = maintenance - 400;
    
    const protein = Math.round(w * 1);
    const fats = Math.round(goal === 'cut' ? w * 0.35 : w * 0.45);
    const remainingCalories = targetCalories - (protein * 4) - (fats * 9);
    const carbs = Math.round(remainingCalories / 4);
    
    return {
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
    
    navigate('/food-preferences');
  };

  const isFormValid = weight && heightFeet && heightInches && age;

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 bg-secondary/50 border-border">
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
  );
};
