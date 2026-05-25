import { Heart, Wheat, Dumbbell, Scale, Droplets, Gem } from "lucide-react";

const benefits = [
  { icon: Heart, title: "Diabetes-Friendly", desc: "Low glycemic index helps regulate blood sugar levels naturally" },
  { icon: Wheat, title: "Gluten-Free", desc: "Safe for celiac disease and gluten sensitivity sufferers" },
  { icon: Dumbbell, title: "High Protein", desc: "Essential amino acids for muscle building and repair" },
  { icon: Scale, title: "Weight Management", desc: "High fiber content keeps you full and aids digestion" },
  { icon: Droplets, title: "Sustainable Crop", desc: "Requires less water and grows in marginal soils" },
  { icon: Gem, title: "Rich in Minerals", desc: "Packed with iron, calcium, zinc, and B vitamins" },
];

const WhyMillets = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-secondary font-semibold tracking-widest uppercase text-sm mb-2">
            Why Millets?
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Nature's Most Complete Nutrition
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <b.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMillets;
