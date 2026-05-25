import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { millets } from "@/data/millets";

const MilletsPage = () => {
  return (
    <main className="pt-24 pb-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-secondary font-semibold tracking-widest uppercase text-sm mb-2">
            Explore
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Discover Millets
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Ancient grains that are transforming modern diets. Click on any millet to learn about its unique benefits, nutrition, and history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {millets.map((millet, i) => (
            <motion.div
              key={millet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={`/millets/${millet.id}`}
                className="group block bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={millet.image}
                    alt={millet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {millet.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">{millet.subtitle}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-foreground/80 mt-3">{millet.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MilletsPage;
