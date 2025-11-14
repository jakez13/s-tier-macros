import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const TProtocol = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Testosterone Optimization</h1>
      <p className="text-muted-foreground mb-6">Complete guide to maximizing natural testosterone through nutrition and lifestyle</p>

        <Accordion type="single" collapsible className="space-y-4">
          {/* The Science */}
          <AccordionItem value="science" className="bg-secondary/50 border-border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-bold text-foreground">
              1. THE SCIENCE OF TESTOSTERONE
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 text-foreground">
              <div>
                <h3 className="font-bold text-primary mb-2">What Testosterone Does</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Builds and maintains muscle mass</li>
                  <li>Burns body fat and improves body composition</li>
                  <li>Increases strength and power output</li>
                  <li>Boosts confidence and assertiveness</li>
                  <li>Enhances libido and sexual function</li>
                  <li>Improves mood and reduces depression</li>
                  <li>Increases bone density</li>
                  <li>Supports cardiovascular health</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-2">How It's Produced</h3>
                <p className="text-muted-foreground mb-2">
                  Testosterone is produced primarily in the Leydig cells of your testes. The process requires:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li><strong>Cholesterol</strong> - The raw material (from eggs, red meat, butter)</li>
                  <li><strong>LH (Luteinizing Hormone)</strong> - Signals testes to produce testosterone</li>
                  <li><strong>Key nutrients</strong> - Zinc, magnesium, vitamin D, B vitamins</li>
                  <li><strong>Adequate sleep</strong> - 70% of daily testosterone produced during sleep</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-2">Why Most Men Have Low T</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Seed oils in every processed food (inflammatory)</li>
                  <li>Soy and phytoestrogens in modern diet</li>
                  <li>Chronic stress and elevated cortisol</li>
                  <li>Poor sleep quality (screen time, late nights)</li>
                  <li>Lack of heavy compound lifting</li>
                  <li>Microplastics and endocrine disruptors</li>
                  <li>Low cholesterol and low-fat diets</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-2">Optimal Ranges</h3>
                <Card className="p-4 bg-background border-border">
                  <p className="text-foreground mb-2"><strong>Total Testosterone:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>Medical "normal": 300-900 ng/dL</li>
                    <li>Optimal for performance: 700-1000+ ng/dL</li>
                    <li>Elite athletes: 900-1200 ng/dL naturally</li>
                  </ul>
                  <p className="text-muted-foreground text-sm mt-2">
                    Get blood work annually. Test in the morning (T peaks after sleep).
                  </p>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Nutrition */}
          <AccordionItem value="nutrition" className="bg-secondary/50 border-border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-bold text-foreground">
              2. TESTOSTERONE-BOOSTING NUTRITION
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 text-foreground">
              <div>
                <h3 className="font-bold text-primary mb-2">Foods That Increase Testosterone</h3>
                <div className="space-y-3">
                  <Card className="p-3 bg-background border-border">
                    <h4 className="font-bold text-foreground">Red Meat (Beef)</h4>
                    <p className="text-sm text-muted-foreground">
                      High in cholesterol, zinc, and saturated fat - all essential for T production. 
                      Don't fear saturated fat, you NEED it for hormones.
                    </p>
                  </Card>
                  <Card className="p-3 bg-background border-border">
                    <h4 className="font-bold text-foreground">Whole Eggs (6-8 daily)</h4>
                    <p className="text-sm text-muted-foreground">
                      Dietary cholesterol directly supports testosterone synthesis. 
                      Never eat just egg whites - the yolk contains all the nutrients.
                    </p>
                  </Card>
                  <Card className="p-3 bg-background border-border">
                    <h4 className="font-bold text-foreground">Grass-Fed Butter & Ghee</h4>
                    <p className="text-sm text-muted-foreground">
                      Natural saturated fats that support hormone production. 
                      Rich in vitamins A, D, E, and K2.
                    </p>
                  </Card>
                  <Card className="p-3 bg-background border-border">
                    <h4 className="font-bold text-foreground">Beef Liver (1-2x/week)</h4>
                    <p className="text-sm text-muted-foreground">
                      Nature's multivitamin. Packed with vitamin A, B12, iron, copper - all crucial for T.
                    </p>
                  </Card>
                  <Card className="p-3 bg-background border-border">
                    <h4 className="font-bold text-foreground">Avocados</h4>
                    <p className="text-sm text-muted-foreground">
                      Monounsaturated fats and vitamin E support testosterone production.
                    </p>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-2">Why Cholesterol & Saturated Fats Are Essential</h3>
                <p className="text-muted-foreground mb-2">
                  Cholesterol is the <strong>precursor molecule</strong> for all steroid hormones, including testosterone. 
                  Without adequate dietary cholesterol and saturated fat, your body cannot produce optimal testosterone.
                </p>
                <Card className="p-4 bg-background border-primary">
                  <p className="text-foreground font-semibold mb-2">The Low-Fat Myth</p>
                  <p className="text-sm text-muted-foreground">
                    Low-fat diets = low testosterone. Period. The push for low-fat, high-carb diets coincides with 
                    declining testosterone levels in men. Eat 0.4-0.5g fat per pound of bodyweight daily.
                  </p>
                </Card>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-2">Key Micronutrients for Testosterone</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Card className="p-3 bg-background border-border">
                    <h4 className="font-bold text-foreground text-sm">ZINC</h4>
                    <p className="text-xs text-muted-foreground">
                      Directly involved in T production. Found in red meat, oysters, pumpkin seeds.
                    </p>
                  </Card>
                  <Card className="p-3 bg-background border-border">
                    <h4 className="font-bold text-foreground text-sm">MAGNESIUM</h4>
                    <p className="text-xs text-muted-foreground">
                      Increases free testosterone. Found in dark leafy greens, nuts, seeds.
                    </p>
                  </Card>
                  <Card className="p-3 bg-background border-border">
                    <h4 className="font-bold text-foreground text-sm">VITAMIN D</h4>
                    <p className="text-xs text-muted-foreground">
                      Acts as a steroid hormone. Get sunlight daily or supplement 5,000 IU.
                    </p>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-2">Meal Timing for Hormones</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Eat breakfast within 1 hour of waking (stabilizes cortisol)</li>
                  <li>Front-load calories and fats in morning (supports T production)</li>
                  <li>Protein with every meal (maintains steady amino acid levels)</li>
                  <li>Post-workout carbs + protein (insulin spike aids recovery)</li>
                  <li>Casein protein before bed (sustained amino acid release)</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Foods That Kill T */}
          <AccordionItem value="killers" className="bg-destructive/10 border-destructive rounded-lg px-6">
            <AccordionTrigger className="text-xl font-bold text-destructive">
              3. FOODS THAT KILL TESTOSTERONE
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <AvoidCard
                title="SEED OILS (The Worst Offender)"
                items={["Canola oil", "Vegetable oil", "Soybean oil", "Corn oil", "Sunflower oil"]}
                why="Highly inflammatory omega-6 fatty acids. Oxidize easily. Disrupt hormone production. Linked to decreased testosterone and increased estrogen."
                action="Read labels obsessively. Avoid all restaurant food unless you know they use butter/olive oil."
              />
              
              <AvoidCard
                title="SOY PRODUCTS"
                items={["Tofu", "Soy milk", "Edamame", "Soy protein isolate"]}
                why="Contains phytoestrogens (plant estrogens) that mimic estrogen in your body. Directly lowers testosterone."
                action="Never eat soy. Check protein bars and processed foods - soy is everywhere."
              />

              <AvoidCard
                title="ALCOHOL"
                items={["Beer (worst - contains hops which are estrogenic)", "Liquor", "Wine"]}
                why="Increases aromatase enzyme (converts testosterone to estrogen). Impairs sleep. Damages the testes."
                action="Limit to 1-2 drinks maximum, 1-2x per week. Never binge drink."
              />

              <AvoidCard
                title="PROCESSED SUGARS"
                items={["Candy", "Soda", "Pastries", "Cereals", "Energy drinks"]}
                why="Insulin spikes suppress testosterone production. Increases inflammation. Promotes fat gain (fat tissue produces estrogen)."
                action="Satisfy sweet cravings with honey, fruit, or 85%+ dark chocolate."
              />

              <AvoidCard
                title="TRANS FATS & MARGARINE"
                items={["Margarine", "Hydrogenated oils", "Processed baked goods"]}
                why="Artificial fats that wreak havoc on hormones. Increase inflammation. Terrible for cardiovascular health."
                action="Use real butter, ghee, or coconut oil. Never buy margarine."
              />

              <AvoidCard
                title="EXCESSIVE CARBS (Context-Dependent)"
                items={["Giant pasta servings", "Multiple slices of bread", "Sugary snacks all day"]}
                why="Constant insulin spikes can impair testosterone production. However, you NEED carbs around training."
                action="Time carbs around workouts. Keep moderate on rest days. Focus on whole food sources."
              />
            </AccordionContent>
          </AccordionItem>

          {/* Lifestyle */}
          <AccordionItem value="lifestyle" className="bg-secondary/50 border-border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-bold text-foreground">
              4. LIFESTYLE FACTORS
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 text-foreground">
              <LifestyleCard
                title="SLEEP (7-9 Hours Nightly)"
                why="70% of daily testosterone is produced during sleep. One night of poor sleep can drop T by 10-15%."
                tips={[
                  "Go to bed same time every night",
                  "Sleep in complete darkness (blackout curtains)",
                  "Keep room cool (65-68°F optimal)",
                  "No screens 1 hour before bed",
                  "Magnesium supplement before bed"
                ]}
              />

              <LifestyleCard
                title="STRESS MANAGEMENT"
                why="Cortisol (stress hormone) is inversely related to testosterone. Chronic stress = chronically low T."
                tips={[
                  "Deep breathing exercises (5-10 minutes daily)",
                  "Meditation or prayer",
                  "Time in nature",
                  "Limit social media and news consumption",
                  "Set boundaries with work and relationships"
                ]}
              />

              <LifestyleCard
                title="HEAVY LIFTING"
                why="Compound movements (squats, deadlifts, bench) trigger acute testosterone spikes. Muscle mass correlates with higher baseline T."
                tips={[
                  "Train 4-5x per week",
                  "Focus on compound lifts",
                  "Lift heavy (5-8 rep range)",
                  "Keep workouts under 60 minutes (cortisol rises after)",
                  "Progressive overload every session"
                ]}
              />

              <LifestyleCard
                title="SUNLIGHT EXPOSURE"
                why="Sunlight on skin produces vitamin D, which acts as a steroid hormone and directly increases testosterone."
                tips={[
                  "Get 15-30 minutes direct sunlight daily",
                  "Morning sun is best (sets circadian rhythm)",
                  "Expose as much skin as possible",
                  "Supplement vitamin D3 5,000 IU if limited sun"
                ]}
              />

              <LifestyleCard
                title="COLD EXPOSURE"
                why="Cold increases dopamine and norepinephrine. May increase testosterone and improve sperm quality."
                tips={[
                  "End showers with 2-3 minutes cold water",
                  "Cold plunges 2-3x per week (if available)",
                  "Avoid hot tubs and saunas excessively (heat kills T)"
                ]}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Supplements */}
          <AccordionItem value="supplements" className="bg-secondary/50 border-border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-bold text-foreground">
              5. SUPPLEMENT STACK
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">TIER 1 (Essential)</h3>
                <div className="space-y-3">
                  <SupplementCard
                    name="Vitamin D3"
                    dose="5,000 IU daily"
                    why="Acts as a steroid hormone. Most people are deficient. Directly supports testosterone production and bone health."
                    when="Morning with fats (fat-soluble vitamin)"
                  />
                  <SupplementCard
                    name="Zinc"
                    dose="30mg daily"
                    why="Essential mineral for testosterone synthesis. Deficiency = low T. Also supports immune function."
                    when="Evening with food (can cause nausea on empty stomach)"
                  />
                  <SupplementCard
                    name="Magnesium"
                    dose="400mg daily"
                    why="Increases free testosterone. Improves sleep quality. Most athletes are deficient."
                    when="Evening before bed (aids sleep)"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">TIER 2 (Highly Effective)</h3>
                <div className="space-y-3">
                  <SupplementCard
                    name="Ashwagandha KSM-66"
                    dose="600mg daily"
                    why="Adaptogen that reduces cortisol (stress hormone). Studies show 10-15% increase in testosterone."
                    when="Post-workout or evening"
                  />
                  <SupplementCard
                    name="Omega-3 Fish Oil"
                    dose="2g daily (EPA/DHA)"
                    why="Reduces inflammation. Supports cardiovascular health. May improve sperm quality."
                    when="With meals"
                  />
                  <SupplementCard
                    name="Creatine Monohydrate"
                    dose="5g daily"
                    why="Increases strength and muscle growth. May indirectly support testosterone. Proven and safe."
                    when="Anytime (timing doesn't matter)"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-muted-foreground mb-3">TIER 3 (Optional / Advanced)</h3>
                <div className="space-y-3">
                  <SupplementCard
                    name="Shilajit Resin"
                    dose="300-500mg daily"
                    why="Ayurvedic supplement. Some studies show testosterone increases. Contains fulvic acid and minerals."
                    when="Morning"
                  />
                  <SupplementCard
                    name="Boron"
                    dose="10mg daily"
                    why="Trace mineral that may increase free testosterone and reduce estrogen."
                    when="Morning with breakfast"
                  />
                  <SupplementCard
                    name="Tongkat Ali"
                    dose="200-400mg daily"
                    why="Traditional Malaysian herb. May increase testosterone and reduce cortisol. Quality matters."
                    when="Morning"
                  />
                </div>
              </div>

              <Card className="p-4 bg-background border-primary">
                <p className="text-sm text-foreground font-semibold mb-2">⚠️ Important Note</p>
                <p className="text-sm text-muted-foreground">
                  Supplements are supplementary. You cannot out-supplement a poor diet, lack of sleep, or chronic stress. 
                  Fix your lifestyle first, then add supplements to optimize further.
                </p>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* The Protocol */}
          <AccordionItem value="protocol" className="bg-primary/10 border-primary rounded-lg px-6">
            <AccordionTrigger className="text-xl font-bold text-primary">
              6. THE DURDEN TESTOSTERONE PROTOCOL
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              <Card className="p-4 bg-background border-border">
                <h3 className="font-bold text-foreground mb-3">MORNING ROUTINE</h3>
                <div className="space-y-2">
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Wake up, get sunlight (10-15 min outside)</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Take Vitamin D3 with breakfast</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Eat 6-8 whole eggs (cholesterol for T)</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Avoid phone/stress for first hour</span>
                  </label>
                </div>
              </Card>

              <Card className="p-4 bg-background border-border">
                <h3 className="font-bold text-foreground mb-3">TRAINING</h3>
                <div className="space-y-2">
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Heavy compound lifts (squats, deadlifts, bench)</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Keep workouts under 60 minutes</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Avoid overtraining (rest days matter)</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Post-workout: Protein + carbs within 1 hour</span>
                  </label>
                </div>
              </Card>

              <Card className="p-4 bg-background border-border">
                <h3 className="font-bold text-foreground mb-3">EVENING ROUTINE</h3>
                <div className="space-y-2">
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Take Zinc, Magnesium, Ashwagandha</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Casein protein shake or cottage cheese before bed</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Sleep 7-9 hours (consistent schedule)</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Keep bedroom cool (65-68°F) and dark</span>
                  </label>
                </div>
              </Card>

              <Card className="p-4 bg-background border-border">
                <h3 className="font-bold text-foreground mb-3">WEEKLY CHECKLIST</h3>
                <div className="space-y-2">
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Beef liver 1-2x per week</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Red meat daily (beef, lamb)</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Eggs daily (6-8 minimum)</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Healthy fats every meal (butter, avocado, olive oil)</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Zero seed oils (check labels obsessively)</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Zero soy products</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Alcohol limited to 1-2 drinks max, 1-2x per week</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Minimum 7 hours sleep every night</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-foreground">
                    <input type="checkbox" className="mt-1" />
                    <span>Heavy lifting 4-5x per week</span>
                  </label>
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
  );
};

const AvoidCard = ({ title, items, why, action }: { title: string; items: string[]; why: string; action: string }) => (
  <Card className="p-4 bg-background border-destructive">
    <h4 className="font-bold text-destructive mb-2">{title}</h4>
    <ul className="list-disc list-inside mb-2 text-sm text-foreground">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
    <div className="space-y-2 text-sm">
      <div>
        <span className="font-semibold text-foreground">Why: </span>
        <span className="text-muted-foreground">{why}</span>
      </div>
      <div>
        <span className="font-semibold text-success">Action: </span>
        <span className="text-muted-foreground">{action}</span>
      </div>
    </div>
  </Card>
);

const LifestyleCard = ({ title, why, tips }: { title: string; why: string; tips: string[] }) => (
  <Card className="p-4 bg-background border-border">
    <h4 className="font-bold text-foreground mb-2">{title}</h4>
    <p className="text-sm text-muted-foreground mb-3">{why}</p>
    <div>
      <p className="text-sm font-semibold text-foreground mb-1">Action Steps:</p>
      <ul className="list-disc list-inside space-y-1">
        {tips.map((tip, idx) => (
          <li key={idx} className="text-sm text-muted-foreground">{tip}</li>
        ))}
      </ul>
    </div>
  </Card>
);

const SupplementCard = ({ name, dose, why, when }: { name: string; dose: string; why: string; when: string }) => (
  <Card className="p-3 bg-background border-border">
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-bold text-foreground">{name}</h4>
      <span className="text-sm text-primary font-semibold">{dose}</span>
    </div>
    <p className="text-sm text-muted-foreground mb-2">{why}</p>
    <p className="text-xs text-muted-foreground">
      <span className="font-semibold">When to take:</span> {when}
    </p>
  </Card>
);
