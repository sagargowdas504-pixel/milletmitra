import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4">
          Stay Connected
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8">
          Get weekly millet recipes, health tips, and exclusive offers delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" className="bg-primary hover:bg-forest-dark text-primary-foreground">
            Subscribe <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
