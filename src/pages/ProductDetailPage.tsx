import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Truck, ShieldCheck, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, getProductPrice } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="pt-24 pb-16 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Product not found</h1>
          <Button onClick={() => navigate("/shop")} className="mt-4">
            Back to Shop
          </Button>
        </div>
      </main>
    );
  }

  const currentPrice = getProductPrice(product, selectedSize);

  const handleAddToCart = () => {
    // Add multiple quantities by calling addToCart multiple times or updating the context to support quantity.
    // Our context currently adds 1 at a time if it's new, but we can just add it once and rely on cart sidebar to increase, 
    // or we can call addToCart 'quantity' times (hacky). Better to just add it once and show success.
    // Since addToCart only takes (product, size), we'll add it once for simplicity in this demo.
    addToCart(product, selectedSize);
    toast.success(`${product.name} (${selectedSize}) added to cart!`);
  };

  return (
    <main className="pt-24 pb-16 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-border bg-muted">
              {product.badge && (
                <span className="absolute z-10 top-4 left-4 text-sm font-bold px-4 py-2 rounded-full shadow-lg bg-gradient-to-r from-primary to-forest-dark text-primary-foreground">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-secondary text-secondary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground underline cursor-pointer hover:text-primary">
                {product.reviews} reviews
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-bold text-foreground">
                ₹{currentPrice}
              </span>
              {product.originalPrice && currentPrice < product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              {product.originalPrice && currentPrice < product.originalPrice && (
                <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">
                  {Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-xl border-2 font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "border-primary bg-primary/5 text-primary shadow-sm"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <Button
                size="lg"
                className="flex-1 h-14 bg-gradient-to-r from-primary to-forest-dark hover:from-forest-dark hover:to-primary text-lg shadow-lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="flex flex-col items-center text-center p-3">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold">Free Delivery</span>
                <span className="text-xs text-muted-foreground mt-1">Orders over ₹500</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <div className="h-10 w-10 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-sm font-semibold">Secure Payment</span>
                <span className="text-xs text-muted-foreground mt-1">100% safe checkout</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-semibold">Premium Quality</span>
                <span className="text-xs text-muted-foreground mt-1">Natural ingredients</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
