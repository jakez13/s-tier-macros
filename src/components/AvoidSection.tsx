import { AlertTriangle, X } from "lucide-react";

interface AvoidItem {
  title: string;
  items: string[];
  why: string;
  foundIn?: string;
  replaceWith: string;
}

const avoidItems: AvoidItem[] = [
  {
    title: "SEED OILS",
    items: ["Canola oil", "Vegetable oil", "Soybean oil", "Corn oil", "Safflower oil", "Sunflower oil"],
    why: "Inflammatory, oxidizes easily, destroys testosterone, linked to heart disease",
    foundIn: "Restaurant food, packaged snacks, salad dressings, mayo",
    replaceWith: "Butter, ghee, avocado oil, olive oil",
  },
  {
    title: "SOY PRODUCTS",
    items: ["Tofu", "Soy milk", "Edamame", "Soy protein isolate"],
    why: "High in phytoestrogens (plant estrogens), lowers testosterone",
    replaceWith: "Real meat, eggs, whey protein",
  },
  {
    title: "EXCESSIVE ALCOHOL",
    items: [],
    why: "Increases estrogen, decreases testosterone, disrupts sleep, kills gains",
    replaceWith: "1-2 drinks max, 1-2x per week",
  },
  {
    title: "PROCESSED SUGARS",
    items: ["Candy", "Soda", "Baked goods", "Cereals"],
    why: "Insulin spikes, fat storage, inflammation, energy crashes",
    replaceWith: "Honey, fruit, dark chocolate (85%+)",
  },
  {
    title: "TRANS FATS",
    items: ["Margarine", "Hydrogenated oils", "Packaged baked goods"],
    why: "Banned in some countries, terrible for heart and hormones",
    replaceWith: "Real butter, ghee",
  },
];

export const AvoidSection = () => {
  return (
    <div className="bg-gradient-card rounded-xl border-2 border-destructive/50 overflow-hidden shadow-card">
      <div className="bg-destructive/10 p-6 lg:p-8 border-b-2 border-destructive/50">
        <div className="flex items-center gap-4">
          <AlertTriangle className="text-destructive" size={48} />
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-destructive tracking-tight uppercase">
              Testosterone Killers
            </h2>
            <p className="text-destructive/80 text-lg mt-1">Avoid These At All Costs</p>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-6">
        {avoidItems.map((item, index) => (
          <div
            key={index}
            className="bg-secondary/30 rounded-lg p-5 border border-destructive/30 hover:border-destructive/50 transition-all duration-300"
          >
            <div className="flex items-start gap-3 mb-4">
              <X className="text-destructive shrink-0 mt-1" size={24} />
              <h3 className="text-xl font-bold text-destructive uppercase tracking-wide">
                {item.title}
              </h3>
            </div>

            {item.items.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {item.items.map((subItem, subIndex) => (
                  <span
                    key={subIndex}
                    className="bg-destructive/20 text-destructive/90 px-3 py-1 rounded-full text-sm font-medium border border-destructive/30"
                  >
                    {subItem}
                  </span>
                ))}
              </div>
            )}

            <div className="space-y-2 text-sm">
              <div className="bg-background/30 rounded-md px-3 py-2 border-l-2 border-destructive/50">
                <p className="text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Why:</span> {item.why}
                </p>
              </div>

              {item.foundIn && (
                <div className="bg-background/30 rounded-md px-3 py-2 border-l-2 border-muted/50">
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Found in:</span> {item.foundIn}
                  </p>
                </div>
              )}

              <div className="bg-background/30 rounded-md px-3 py-2 border-l-2 border-primary/50">
                <p className="text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-primary">Replace with:</span> {item.replaceWith}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
