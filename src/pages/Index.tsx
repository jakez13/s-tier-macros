import { MacroSection } from "@/components/MacroSection";
import { AvoidSection } from "@/components/AvoidSection";
import { proteinData, carbsData, fatsData } from "@/data/nutritionData";
import { Dumbbell } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-2">
              <Dumbbell className="text-primary" size={32} strokeWidth={2.5} />
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-foreground tracking-tighter">
              MACRONUTRIENTS
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              The Ultimate Guide to Building Muscle & Maximizing Testosterone
            </p>
            
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-s-tier shadow-glow"></div>
                <span className="text-sm font-semibold text-s-tier uppercase tracking-wide">
                  S-Tier
                </span>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-a-tier"></div>
                <span className="text-sm font-semibold text-a-tier uppercase tracking-wide">
                  A-Tier
                </span>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Only
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 space-y-8">
        <MacroSection
          title="Protein"
          subtitle="Builds & Repairs Muscle"
          caloriesPerGram={4}
          target="1g per lb of bodyweight"
          icon="🥩"
          sTierFoods={proteinData.sTier}
          aTierFoods={proteinData.aTier}
        />

        <MacroSection
          title="Carbs"
          subtitle="Fuel for Performance"
          caloriesPerGram={4}
          target="Fill remaining calories after protein and fats"
          icon="🍚"
          sTierFoods={carbsData.sTier}
          aTierFoods={carbsData.aTier}
        />

        <MacroSection
          title="Fats"
          subtitle="Hormones & Testosterone"
          caloriesPerGram={9}
          target="0.4-0.5g per lb of bodyweight"
          icon="🥑"
          sTierFoods={fatsData.sTier}
          aTierFoods={fatsData.aTier}
        />

        <AvoidSection />
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground text-sm">
            Track your macros, build muscle, and optimize your nutrition for peak performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
