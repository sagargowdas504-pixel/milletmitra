import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <img
        src={heroBg}
        alt="Millet fields at sunset"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="container relative z-10 mx-auto px-4 pt-16">
        <div className="max-w-2xl space-y-6 animate-fade-up">
          <p className="text-golden-light font-semibold tracking-widest uppercase text-sm">
            Ancient Grains, Modern Health
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-cream leading-tight">
            Healthy Living{" "}
            <span className="text-gradient-golden">with Millets</span>
          </h1>
          <p className="text-cream/80 text-lg md:text-xl max-w-lg leading-relaxed">
            Discover the power of nature's most nutritious grains. From farm to
            table, explore millets that nourish your body and sustain our planet.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-golden-light font-semibold shadow-golden">
              <Link to="/millets">Explore Millets</Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-forest-dark text-primary-foreground hover:from-forest-dark hover:to-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/shop">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
