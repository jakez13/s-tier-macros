import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const Settings = () => {
  const navigate = useNavigate();
  const { userProfile, macros } = useApp();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-foreground mb-6">Settings</h1>

        {/* Profile */}
        <Card className="p-6 mb-4 bg-secondary/50 border-border">
          <h2 className="text-xl font-bold text-foreground mb-2">Profile</h2>
          <p className="text-sm text-muted-foreground mb-4">Your Information</p>
          
          {userProfile && (
            <div className="space-y-2 mb-4">
              <p className="text-foreground">
                <span className="text-muted-foreground">Weight:</span> {userProfile.weight} lbs
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Height:</span> {userProfile.heightFeet}'{userProfile.heightInches}"
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Age:</span> {userProfile.age} years
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Activity:</span> {userProfile.activityLevel}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Goal:</span> {userProfile.goal}
              </p>
            </div>
          )}
          
          <Button 
            onClick={() => navigate('/macro-calculator')}
            className="w-full"
          >
            Edit Profile
          </Button>
        </Card>

        {/* Targets */}
        <Card className="p-6 mb-4 bg-secondary/50 border-border">
          <h2 className="text-xl font-bold text-foreground mb-2">Your Targets</h2>
          <p className="text-sm text-muted-foreground mb-4">Daily Goals</p>
          
          {macros && (
            <div className="space-y-2 mb-4">
              <p className="text-foreground">
                <span className="font-bold text-red-500">{macros.calories} cal</span> | 
                <span className="ml-2 text-blue-500">{macros.protein}g protein</span> | 
                <span className="ml-2 text-green-500">{macros.carbs}g carbs</span> | 
                <span className="ml-2 text-orange-500">{macros.fats}g fats</span>
              </p>
            </div>
          )}
          
          <Button 
            onClick={() => navigate('/macro-calculator')}
            variant="outline"
            className="w-full"
          >
            Recalculate Macros
          </Button>
        </Card>

        {/* App Info */}
        <Card className="p-6 mb-4 bg-secondary/50 border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">About</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Version 1.0</p>
            <p className="text-foreground font-semibold">The Durden Effect Nutrition System</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
