import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const MacroGuide = () => {
  const { macros } = useApp();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-foreground mb-6">Complete Macro Guide</h1>

        {/* What Are Macros */}
        <Card className="p-6 mb-6 bg-secondary/50 border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">What Are Macros?</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">Protein - 4 calories per gram</h3>
              <p className="text-foreground mb-2">Builds and repairs muscle tissue.</p>
              {macros && <p className="text-muted-foreground">Your target: <span className="text-primary font-bold">{macros.protein}g</span> per day</p>}
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary mb-2">Carbohydrates - 4 calories per gram</h3>
              <p className="text-foreground mb-2">Primary fuel source for training.</p>
              {macros && <p className="text-muted-foreground">Your target: <span className="text-primary font-bold">{macros.carbs}g</span> per day</p>}
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary mb-2">Fats - 9 calories per gram</h3>
              <p className="text-foreground mb-2">Essential for hormone production and testosterone.</p>
              {macros && <p className="text-muted-foreground">Your target: <span className="text-primary font-bold">{macros.fats}g</span> per day</p>}
            </div>
          </div>
        </Card>

        {/* Food Lists */}
        <Accordion type="single" collapsible className="space-y-4">
          {/* PROTEINS */}
          <AccordionItem value="proteins" className="bg-secondary/50 border-border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-bold text-foreground">
              PROTEIN SOURCES
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">S-TIER (Prioritize These)</h3>
                <div className="space-y-4">
                  <FoodCard
                    name="BEEF LIVER (4oz)"
                    macros="P: 20g | F: 4g | C: 4g | 135 cal"
                    why="Most nutrient-dense food on earth. Loaded with vitamin A, B12, iron, and copper. Eat 1-2x per week."
                    howTo="Pan-fried with onions and butter, or mixed into meatballs/burgers."
                  />
                  <FoodCard
                    name="WHOLE EGGS (3 large)"
                    macros="P: 18g | F: 15g | C: 1g | 210 cal"
                    why="Complete protein with all essential amino acids. Rich in choline for brain health and cholesterol for testosterone."
                    howTo="Scrambled, fried, boiled, or in omelets. Eat 6-8 daily for max T."
                  />
                  <FoodCard
                    name="RIBEYE STEAK (8oz)"
                    macros="P: 50g | F: 40g | C: 0g | 560 cal"
                    why="Perfect fat-to-protein ratio. High in B12, iron, and creatine. The king of muscle-building foods."
                    howTo="Pan-seared or grilled medium-rare. Season with salt and butter."
                  />
                  <FoodCard
                    name="GROUND BEEF 80/20 (8oz)"
                    macros="P: 48g | F: 31g | C: 0g | 480 cal"
                    why="Affordable, versatile, great macros. Don't fear the fat - you need it for testosterone."
                    howTo="Burgers, meatballs, stir-fries, or mixed with rice."
                  />
                  <FoodCard
                    name="SALMON (6oz)"
                    macros="P: 40g | F: 18g | C: 0g | 340 cal"
                    why="Omega-3 powerhouse for brain health and reducing inflammation. High in vitamin D."
                    howTo="Baked, grilled, or pan-seared with lemon and herbs."
                  />
                  <FoodCard
                    name="CHICKEN THIGHS (8oz)"
                    macros="P: 50g | F: 20g | C: 0g | 380 cal"
                    why="More flavorful than breast. Better fat content for hormones. Still lean enough for cutting."
                    howTo="Grilled, roasted, or pan-seared with skin on."
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">A-TIER (Solid Options)</h3>
                <div className="space-y-4">
                  <FoodCard
                    name="CHICKEN BREAST (8oz)"
                    macros="P: 62g | F: 6g | C: 0g | 310 cal"
                    why="Extremely lean protein. Great for cutting or high protein days."
                    howTo="Grilled, baked, or diced in stir-fries."
                  />
                  <FoodCard
                    name="TURKEY (8oz ground)"
                    macros="P: 56g | F: 16g | C: 0g | 380 cal"
                    why="Lean meat with good protein. Slightly lower fat than beef."
                    howTo="Meatballs, burgers, or pasta sauce."
                  />
                  <FoodCard
                    name="GREEK YOGURT Full Fat (2 cups)"
                    macros="P: 35g | F: 18g | C: 16g | 360 cal"
                    why="Probiotic-rich for gut health. High protein, easy to eat."
                    howTo="Plain with berries, honey, or in smoothies."
                  />
                  <FoodCard
                    name="WHEY PROTEIN POWDER (2 scoops)"
                    macros="P: 50g | F: 2g | C: 6g | 240 cal"
                    why="Fastest-digesting protein. Convenient post-workout."
                    howTo="Shakes with milk, banana, or oats."
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* CARBS */}
          <AccordionItem value="carbs" className="bg-secondary/50 border-border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-bold text-foreground">
              CARBOHYDRATE SOURCES
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">S-TIER (Prioritize These)</h3>
                <div className="space-y-4">
                  <FoodCard
                    name="WHITE RICE (1 cup cooked)"
                    macros="P: 4g | F: 0g | C: 45g | 200 cal"
                    why="Easily digestible. No bloating. Perfect pre/post-workout fuel."
                    howTo="Cook with butter or ghee for better absorption."
                  />
                  <FoodCard
                    name="SWEET POTATOES (1 large)"
                    macros="P: 4g | F: 0g | C: 55g | 240 cal"
                    why="Rich in beta-carotene and fiber. Steady energy release."
                    howTo="Roasted, mashed with butter, or baked whole."
                  />
                  <FoodCard
                    name="WHITE POTATOES (2 medium)"
                    macros="P: 8g | F: 0g | C: 70g | 320 cal"
                    why="High in potassium and vitamin C. Great for bulking."
                    howTo="Mashed, roasted, or baked."
                  />
                  <FoodCard
                    name="OATS (1 cup dry)"
                    macros="P: 10g | F: 6g | C: 54g | 300 cal"
                    why="High in fiber. Slow-digesting for sustained energy."
                    howTo="Cooked with water/milk, topped with protein and berries."
                  />
                  <FoodCard
                    name="SOURDOUGH BREAD (2 slices)"
                    macros="P: 8g | F: 2g | C: 35g | 190 cal"
                    why="Fermented = easier to digest. Lower glycemic index."
                    howTo="Toasted with butter and eggs for breakfast."
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">A-TIER (Solid Options)</h3>
                <div className="space-y-4">
                  <FoodCard
                    name="PASTA (3oz dry)"
                    macros="P: 10g | F: 2g | C: 65g | 320 cal"
                    why="Great for carb-loading. Versatile and filling."
                    howTo="Toss with olive oil, meat, and vegetables."
                  />
                  <FoodCard
                    name="BANANAS (1 large)"
                    macros="P: 1g | F: 0g | C: 30g | 120 cal"
                    why="Quick energy. High in potassium for muscle function."
                    howTo="Pre-workout snack or in protein shakes."
                  />
                  <FoodCard
                    name="BERRIES (1 cup)"
                    macros="P: 1g | F: 0g | C: 20g | 85 cal"
                    why="Antioxidant-rich. Lower sugar than most fruits."
                    howTo="With yogurt, oatmeal, or cottage cheese."
                  />
                  <FoodCard
                    name="HONEY (2 tbsp)"
                    macros="P: 0g | F: 0g | C: 34g | 128 cal"
                    why="Natural sugar. Quick energy boost. Better than processed sugar."
                    howTo="Post-workout for insulin spike, or in oatmeal."
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* FATS */}
          <AccordionItem value="fats" className="bg-secondary/50 border-border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-bold text-foreground">
              FAT SOURCES
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">S-TIER (Prioritize These)</h3>
                <div className="space-y-4">
                  <FoodCard
                    name="GRASS-FED BUTTER (2 tbsp)"
                    macros="P: 0g | F: 23g | C: 0g | 207 cal"
                    why="Rich in vitamin K2 and conjugated linoleic acid (CLA). Essential for testosterone."
                    howTo="On toast, mixed into rice, or for cooking eggs."
                  />
                  <FoodCard
                    name="EGG YOLKS (from 6 eggs)"
                    macros="P: 16g | F: 27g | C: 3g | 330 cal"
                    why="Cholesterol = testosterone production. Loaded with choline and vitamins."
                    howTo="Never throw away the yolk. Eat whole eggs always."
                  />
                  <FoodCard
                    name="AVOCADO (1 whole)"
                    macros="P: 4g | F: 30g | C: 12g | 320 cal"
                    why="Monounsaturated fats for heart health. High in potassium."
                    howTo="Sliced with eggs, in salads, or with salt as a snack."
                  />
                  <FoodCard
                    name="AVOCADO OIL (2 tbsp)"
                    macros="P: 0g | F: 28g | C: 0g | 240 cal"
                    why="High smoke point. Great for high-heat cooking. Heart-healthy fats."
                    howTo="Cooking meat, roasting vegetables, or salad dressing."
                  />
                  <FoodCard
                    name="EXTRA VIRGIN OLIVE OIL (2 tbsp)"
                    macros="P: 0g | F: 28g | C: 0g | 240 cal"
                    why="Anti-inflammatory. Rich in antioxidants. Mediterranean diet staple."
                    howTo="Drizzle on salads, pasta, or use for low-heat cooking."
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">A-TIER (Solid Options)</h3>
                <div className="space-y-4">
                  <FoodCard
                    name="ALMONDS (1 oz / 28g)"
                    macros="P: 6g | F: 14g | C: 6g | 164 cal"
                    why="High in vitamin E and magnesium. Great snack."
                    howTo="Raw or roasted. Add to yogurt or oatmeal."
                  />
                  <FoodCard
                    name="COCONUT OIL (2 tbsp)"
                    macros="P: 0g | F: 28g | C: 0g | 240 cal"
                    why="MCT-rich for quick energy. Supports metabolism."
                    howTo="Cooking or in coffee/shakes."
                  />
                  <FoodCard
                    name="GHEE (2 tbsp)"
                    macros="P: 0g | F: 28g | C: 0g | 240 cal"
                    why="Clarified butter. Lactose-free. Higher smoke point."
                    howTo="Same as butter, better for high-heat cooking."
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* FOODS TO AVOID */}
          <AccordionItem value="avoid" className="bg-destructive/10 border-destructive rounded-lg px-6">
            <AccordionTrigger className="text-xl font-bold text-destructive">
              ⚠️ FOODS TO AVOID (Testosterone Killers)
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              <AvoidCard
                title="SEED OILS"
                examples="Canola, vegetable, soybean, corn oil"
                why="Inflammatory, destroys testosterone, linked to heart disease"
                replace="Butter, ghee, avocado oil, olive oil"
              />
              <AvoidCard
                title="SOY PRODUCTS"
                examples="Tofu, soy milk, edamame"
                why="High in phytoestrogens, lowers testosterone"
                replace="Real meat, eggs, whey protein"
              />
              <AvoidCard
                title="EXCESSIVE ALCOHOL"
                examples="Beer, liquor, wine"
                why="Increases estrogen, decreases testosterone, impairs recovery"
                replace="Limit: 1-2 drinks max, 1-2x per week"
              />
              <AvoidCard
                title="PROCESSED SUGARS"
                examples="Candy, soda, baked goods"
                why="Insulin spikes, inflammation, energy crashes"
                replace="Honey, fruit, dark chocolate 85%+"
              />
              <AvoidCard
                title="TRANS FATS"
                examples="Margarine, hydrogenated oils"
                why="Terrible for heart and hormones"
                replace="Real butter, ghee"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

const FoodCard = ({ name, macros, why, howTo }: { name: string; macros: string; why: string; howTo: string }) => (
  <Card className="p-4 bg-background border-border">
    <h4 className="font-bold text-foreground mb-1">{name}</h4>
    <p className="text-sm text-primary mb-2">{macros}</p>
    <div className="space-y-2 text-sm">
      <div>
        <span className="font-semibold text-foreground">Why it matters: </span>
        <span className="text-muted-foreground">{why}</span>
      </div>
      <div>
        <span className="font-semibold text-foreground">How to prepare: </span>
        <span className="text-muted-foreground">{howTo}</span>
      </div>
    </div>
  </Card>
);

const AvoidCard = ({ title, examples, why, replace }: { title: string; examples: string; why: string; replace: string }) => (
  <Card className="p-4 bg-destructive/5 border-destructive">
    <h4 className="font-bold text-destructive mb-1">❌ {title}</h4>
    <p className="text-sm text-foreground mb-2">{examples}</p>
    <div className="space-y-2 text-sm">
      <div>
        <span className="font-semibold text-foreground">Why: </span>
        <span className="text-muted-foreground">{why}</span>
      </div>
      <div>
        <span className="font-semibold text-success">Replace with: </span>
        <span className="text-muted-foreground">{replace}</span>
      </div>
    </div>
  </Card>
);
