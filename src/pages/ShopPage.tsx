import { useState, useMemo } from "react";
import { products, productCategories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal, PackageX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    // 1. Search Filter
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Price Filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // 4. Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <main className="pt-24 pb-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-primary/90 to-secondary/80 p-8 md:p-12 shadow-lg">
          <p className="text-primary-foreground/80 font-semibold tracking-widest uppercase text-xs mb-2">
            Premium Quality • Farm to Table
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-3">Our Products</h1>
          <p className="text-primary-foreground/80 max-w-xl text-sm md:text-base">
            Natural, lab-tested millet products. Explore our wide range of healthy grains, snacks, and cooking oils.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 scrollbar-hide">
          {productCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Toolbar: Search, Filter Toggle, Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products, ingredients..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              className={`flex-1 md:flex-none gap-2 ${showFilters ? "bg-primary/10 text-primary border-primary/20" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Expandable Filters Panel */}
        {showFilters && (
          <div className="bg-muted/30 p-6 rounded-xl border border-border mb-8 animate-in slide-in-from-top-2">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Price Range
            </h3>
            <div className="max-w-md px-2">
              <Slider
                defaultValue={[0, 3000]}
                max={3000}
                step={50}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground font-medium">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAndSortedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-card rounded-2xl border border-border">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <PackageX className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any products matching your current filters. Try adjusting your search or price range.
            </p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setPriceRange([0, 3000]);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShopPage;
