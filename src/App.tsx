import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./contexts/AppContext";
import { MacroCalculator } from "./pages/MacroCalculator";
import { RecipeLibrary } from "./pages/RecipeLibrary";
import { MealPlans } from "./pages/MealPlans";
import { Guide } from "./pages/Guide";
import { Settings } from "./pages/Settings";
import { BottomNav } from "./components/BottomNav";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isOnboarded } = useApp();

  return (
    <>
      <Routes>
        <Route path="/macro-calculator" element={<MacroCalculator />} />
        <Route
          path="/recipes"
          element={isOnboarded ? <RecipeLibrary /> : <Navigate to="/macro-calculator" replace />}
        />
        <Route
          path="/meal-plans"
          element={isOnboarded ? <MealPlans /> : <Navigate to="/macro-calculator" replace />}
        />
        <Route
          path="/guide"
          element={isOnboarded ? <Guide /> : <Navigate to="/macro-calculator" replace />}
        />
        <Route
          path="/settings"
          element={isOnboarded ? <Settings /> : <Navigate to="/macro-calculator" replace />}
        />
        <Route path="/" element={<Navigate to={isOnboarded ? "/recipes" : "/macro-calculator"} replace />} />
      </Routes>
      {isOnboarded && <BottomNav />}
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
