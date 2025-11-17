import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./contexts/AppContext";
import { MacroCalculator } from "./pages/MacroCalculator";
import { MealSelection } from "./pages/MealSelection";
import { RecipeLibrary } from "./pages/RecipeLibrary";
import { MealPlans } from "./pages/MealPlans";
import { Guide } from "./pages/Guide";
import { Settings } from "./pages/Settings";
import { BottomNav } from "./components/BottomNav";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isOnboarded, mealsSelected } = useApp();

  return (
    <>
      <Routes>
        <Route path="/macro-calculator" element={<MacroCalculator />} />
        <Route
          path="/meal-selection"
          element={isOnboarded && !mealsSelected ? <MealSelection /> : <Navigate to={isOnboarded ? "/meal-plans" : "/macro-calculator"} replace />}
        />
        <Route
          path="/recipes"
          element={isOnboarded && mealsSelected ? <RecipeLibrary /> : <Navigate to={isOnboarded ? "/meal-selection" : "/macro-calculator"} replace />}
        />
        <Route
          path="/meal-plans"
          element={isOnboarded && mealsSelected ? <MealPlans /> : <Navigate to={isOnboarded ? "/meal-selection" : "/macro-calculator"} replace />}
        />
        <Route
          path="/guide"
          element={isOnboarded && mealsSelected ? <Guide /> : <Navigate to={isOnboarded ? "/meal-selection" : "/macro-calculator"} replace />}
        />
        <Route
          path="/settings"
          element={isOnboarded && mealsSelected ? <Settings /> : <Navigate to={isOnboarded ? "/meal-selection" : "/macro-calculator"} replace />}
        />
        <Route path="/" element={<Navigate to={!isOnboarded ? "/macro-calculator" : !mealsSelected ? "/meal-selection" : "/meal-plans"} replace />} />
      </Routes>
      {isOnboarded && mealsSelected && <BottomNav />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
