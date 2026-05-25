import { millets } from "@/data/millets";

const MilletsShowcase = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-secondary font-semibold tracking-widest uppercase text-sm mb-2">
            Discover
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            The Six Super Millets
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Each millet is unique in nutrition and flavor. Explore the ancient grains that are transforming modern diets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {millets.map((millet) => (
            <div
              key={millet.id}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={millet.image}
                  alt={millet.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-foreground">
                  {millet.name}
                </h3>
                <p className="text-sm text-muted-foreground">{millet.subtitle}</p>
                <p className="text-sm text-foreground/80 mt-2">{millet.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {millet.benefits.map((b) => (
                    <span
                      key={b}
                      className="text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MilletsShowcase;
