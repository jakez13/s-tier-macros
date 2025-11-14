import { MacroSection } from "@/components/MacroSection";
import { AvoidSection } from "@/components/AvoidSection";
import { proteinData, carbsData, fatsData } from "@/data/nutritionData";
import { Dumbbell } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-12 lg:py-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Dumbbell className="text-primary" size={48} />
            <h1 className="text-4xl lg:text-6xl font-black text-foreground tracking-tight uppercase">
              Macronutrients
            </h1>
          </div>
          <p className="text-xl lg:text-2xl text-steel max-w-3xl mx-auto leading-relaxed">
            The Ultimate Guide to Building Muscle & Maximizing Testosterone
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-1 w-16 bg-s-tier rounded-full"></div>
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              S-Tier & A-Tier Only
            </span>
            <div className="h-1 w-16 bg-a-tier rounded-full"></div>
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
