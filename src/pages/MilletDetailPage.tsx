import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Leaf, Flame, Heart, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { millets } from "@/data/millets";

const MilletDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const millet = millets.find((m) => m.id === id);

  if (!millet) {
    return (
      <main className="pt-24 pb-16 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Millet not found</h1>
          <Button asChild className="mt-4">
            <Link to="/millets">Back to Millets</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/millets"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to All Millets</span>
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden aspect-[4/3]"
          >
            <img
              src={millet.image}
              alt={millet.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="text-secondary font-semibold tracking-widest uppercase text-sm mb-2">
              {millet.subtitle}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {millet.name}
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              {millet.longDescription}
            </p>

            <div className="flex flex-wrap gap-2">
              {millet.benefits.map((b) => (
                <span
                  key={b}
                  className="text-sm bg-primary/10 text-primary font-medium px-4 py-2 rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Nutrition Table */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <Flame className="h-5 w-5 text-secondary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Nutrition per 100g
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {millet.nutritionPer100g.map((item) => (
              <div
                key={item.label}
                className="bg-card rounded-xl border border-border p-5 text-center hover:shadow-lg transition-shadow"
              >
                <p className="text-2xl font-display font-bold text-foreground">{item.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* How to Use */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Wheat className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              How to Use {millet.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {millet.howToUse.map((use, i) => (
              <div
                key={use}
                className="bg-card rounded-xl border border-border p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
              >
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-foreground">{use}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* History */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-gradient-forest rounded-2xl p-8 md:p-12 text-primary-foreground">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Leaf className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl font-bold">History & Origin</h2>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed max-w-3xl">
              {millet.history}
            </p>
          </div>
        </motion.section>

        {/* Health Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Key Health Benefits
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {millet.benefits.map((benefit, i) => (
              <div
                key={benefit}
                className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">{i + 1}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">{benefit}</h3>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default MilletDetailPage;
