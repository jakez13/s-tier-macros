import { useState, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { RECIPES, Recipe } from '@/data/recipesData';
import { PROTEINS, CARBS, FATS } from '@/data/foodsData';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Heart, Search, Clock, X } from 'lucide-react';

export const RecipeLibrary = () => {
  const { foodPreferences, macros, favoriteRecipes, toggleFavorite } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedFood, setSelectedFood] = useState<string | null>(null);

  const allFoods = [...PROTEINS, ...CARBS, ...FATS];

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe => {
      // Search filter
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Tab filter
      let matchesTab = true;
      if (activeTab === 'breakfast') matchesTab = recipe.mealType === 'breakfast';
      if (activeTab === 'lunch') matchesTab = recipe.mealType === 'lunch';
      if (activeTab === 'dinner') matchesTab = recipe.mealType === 'dinner';
      if (activeTab === 'favorites') matchesTab = favoriteRecipes.includes(recipe.id);

      // Favorite food filter
      const matchesFavoriteFood = selectedFood 
        ? recipe.requiredFoods.includes(selectedFood)
        : true;

      return matchesSearch && matchesTab && matchesFavoriteFood;
    });
  }, [searchQuery, activeTab, favoriteRecipes, selectedFood]);

  const getMealTypeBadge = (type: string) => {
    const colors = {
      breakfast: 'bg-orange-500',
      lunch: 'bg-blue-500',
      dinner: 'bg-purple-500',
      snack: 'bg-green-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-4xl mx-auto p-4">
        {/* Macro Targets Banner */}
        {macros && (
          <Card className="p-4 mb-6 bg-secondary/50 border-border">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">YOUR TARGETS</h2>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{macros.calories}</p>
                <p className="text-xs text-muted-foreground">calories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{macros.protein}g</p>
                <p className="text-xs text-muted-foreground">protein</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{macros.carbs}g</p>
                <p className="text-xs text-muted-foreground">carbs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{macros.fats}g</p>
                <p className="text-xs text-muted-foreground">fats</p>
              </div>
            </div>
          </Card>
        )}

        <h1 className="text-3xl font-bold text-foreground mb-6">Your Recipe Library</h1>

        {/* Favorite Food Filter */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Filter by favorite food:</p>
          <div className="flex flex-wrap gap-2">
            {allFoods.slice(0, 10).map(food => (
              <Button
                key={food}
                variant={selectedFood === food ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFood(selectedFood === food ? null : food)}
                className="text-xs"
              >
                {food}
                {selectedFood === food && <X className="ml-1 h-3 w-3" />}
              </Button>
            ))}
          </div>
          {selectedFood && (
            <p className="text-xs text-muted-foreground mt-2">
              Showing recipes with {selectedFood}
            </p>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="Search recipes or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-5 w-full bg-secondary">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Recipes Grid */}
        {filteredRecipes.length === 0 ? (
          <Card className="p-8 text-center bg-secondary/50 border-border">
            <p className="text-xl text-foreground mb-2">⚠️ No recipes found</p>
            <p className="text-muted-foreground mb-4">
              We couldn't find recipes matching your preferences.
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/food-preferences'}>
              Edit Preferences
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecipes.map(recipe => (
              <Card key={recipe.id} className="p-4 bg-secondary/50 border-border hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{recipe.name}</h3>
                    <Badge className={`${getMealTypeBadge(recipe.mealType)} text-white`}>
                      {recipe.mealType.charAt(0).toUpperCase() + recipe.mealType.slice(1)}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(recipe.id)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Heart 
                      size={20} 
                      fill={favoriteRecipes.includes(recipe.id) ? 'currentColor' : 'none'}
                    />
                  </Button>
                </div>

                {/* Macros */}
                <div className="bg-background/50 p-3 rounded mb-3">
                  <div className="grid grid-cols-3 gap-2 text-center mb-2">
                    <div>
                      <p className="text-lg font-bold text-foreground">P: {recipe.macros.protein}g</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">C: {recipe.macros.carbs}g</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">F: {recipe.macros.fats}g</p>
                    </div>
                  </div>
                  <p className="text-center text-xl font-bold text-primary">
                    {recipe.macros.calories} calories
                  </p>
                </div>

                {/* Time */}
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>Prep: {recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>Cook: {recipe.cookTime}</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setSelectedRecipe(recipe)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  View Recipe
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Recipe Modal */}
        <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
          <DialogContent className="max-w-2xl bg-secondary border-border max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                {selectedRecipe?.name}
              </DialogTitle>
            </DialogHeader>
            
            {selectedRecipe && (
              <div className="space-y-6">
                {/* Macros */}
                <div className="bg-background/50 p-4 rounded">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">{selectedRecipe.macros.calories}</p>
                      <p className="text-xs text-muted-foreground">calories</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{selectedRecipe.macros.protein}g</p>
                      <p className="text-xs text-muted-foreground">protein</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{selectedRecipe.macros.carbs}g</p>
                      <p className="text-xs text-muted-foreground">carbs</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{selectedRecipe.macros.fats}g</p>
                      <p className="text-xs text-muted-foreground">fats</p>
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    {selectedRecipe.servingSize}
                  </p>
                </div>

                {/* Time */}
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>Prep: {selectedRecipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>Cook: {selectedRecipe.cookTime}</span>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Ingredients</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{ing.amount} {ing.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Instructions</h3>
                  <ol className="space-y-3">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="text-foreground flex">
                        <span className="text-primary font-bold mr-3">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => toggleFavorite(selectedRecipe.id)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Heart 
                      size={18} 
                      className="mr-2"
                      fill={favoriteRecipes.includes(selectedRecipe.id) ? 'currentColor' : 'none'}
                    />
                    {favoriteRecipes.includes(selectedRecipe.id) ? 'Remove from Favorites' : 'Save to Favorites'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
