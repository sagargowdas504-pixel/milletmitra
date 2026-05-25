import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const BestSellers = () => {
  const featured = products.slice(0, 4);

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-secondary font-semibold tracking-widest uppercase text-sm mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" /> Best Sellers
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Our Most Loved Products</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Handpicked favorites from our Milletmithra store.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-forest-dark hover:from-forest-dark hover:to-primary text-primary-foreground shadow-lg">
            <Link to="/shop">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
