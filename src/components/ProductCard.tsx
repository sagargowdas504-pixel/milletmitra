import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, type Product, getProductPrice } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const currentPrice = getProductPrice(product, selectedSize);

  const handleAdd = () => {
    addToCart(product, selectedSize);
    toast.success(`${product.name} (${selectedSize}) added to cart!`);
  };

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col group relative">
      <Link to={`/shop/${product.id}`} className="relative aspect-square overflow-hidden bg-muted block">
        {product.badge && (
          <span className={`absolute z-10 top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${
            product.badge === "Best Seller" ? "bg-gradient-to-r from-secondary to-golden-light text-secondary-foreground" :
            product.badge === "Premium" ? "bg-gradient-to-r from-primary to-forest-dark text-primary-foreground" :
            product.badge === "Organic" ? "bg-green-500 text-white" :
            product.badge === "New" ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" :
            "bg-secondary text-secondary-foreground"
          }`}>
            {product.badge === "Premium" && <Sparkles className="inline h-3 w-3 mr-1" />}
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/shop/${product.id}`}>
          <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "fill-muted text-muted"}`} />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2 flex-1 line-clamp-2">{product.description}</p>

        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-200 ${
                  selectedSize === size
                    ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-foreground">₹{currentPrice}</span>
              {product.originalPrice && currentPrice < product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-forest-dark hover:from-forest-dark hover:to-primary text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300"
              onClick={handleAdd}
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
