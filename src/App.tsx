import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./contexts/AppContext";
import { MacroCalculator } from "./pages/MacroCalculator";
import { FoodPreferences } from "./pages/FoodPreferences";
import { DailyTracker } from "./pages/DailyTracker";
import { ComingSoon } from "./pages/ComingSoon";
import { BottomNav } from "./components/BottomNav";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isOnboarded } = useApp();

  return (
    <>
      <Routes>
        <Route path="/macro-calculator" element={<MacroCalculator />} />
        <Route path="/food-preferences" element={<FoodPreferences />} />
        <Route
          path="/tracker"
          element={isOnboarded ? <DailyTracker /> : <Navigate to="/macro-calculator" replace />}
        />
        <Route
          path="/recipes"
          element={isOnboarded ? <ComingSoon title="Recipe Library" /> : <Navigate to="/macro-calculator" replace />}
        />
        <Route
          path="/plan"
          element={isOnboarded ? <ComingSoon title="Meal Plans" /> : <Navigate to="/macro-calculator" replace />}
        />
        <Route
          path="/progress"
          element={isOnboarded ? <ComingSoon title="Progress Tracking" /> : <Navigate to="/macro-calculator" replace />}
        />
        <Route
          path="/t-protocol"
          element={isOnboarded ? <ComingSoon title="T-Protocol" /> : <Navigate to="/macro-calculator" replace />}
        />
        <Route path="/" element={<Navigate to={isOnboarded ? "/tracker" : "/macro-calculator"} replace />} />
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
