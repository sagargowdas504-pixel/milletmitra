import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-secondary" />
              <span className="font-display text-lg font-bold">
                Millet<span className="text-secondary">mithra</span>
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Premium quality millet products for a healthier lifestyle. Farm fresh, lab tested.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <Link to="/" className="block hover:text-secondary transition-colors">Home</Link>
              <Link to="/millets" className="block hover:text-secondary transition-colors">Millets</Link>
              <Link to="/shop" className="block hover:text-secondary transition-colors">Shop</Link>
              <Link to="/recipes" className="block hover:text-secondary transition-colors">Recipes</Link>
              <Link to="/about" className="block hover:text-secondary transition-colors">About</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Popular Products</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <p>Millet Health Mix</p>
              <p>Ragi Flour Premium</p>
              <p>Millet Granola Crunch</p>
              <p>Multi Millet Atta</p>
              <p>Millet Energy Bars</p>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <a href="mailto:karthikgowdas504@gmail.com" className="flex items-center gap-2 hover:text-secondary transition-colors block">
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                <span>karthikgowdas504@gmail.com</span>
              </a>
              <a href="tel:8618791226" className="flex items-center gap-2 hover:text-secondary transition-colors block">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <span>8618791226</span>
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Karnataka+Bangalore+-+560078" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-secondary transition-colors block"
              >
                <MapPin className="h-4 w-4 text-secondary shrink-0" />
                <span>Karnataka Bangalore - 560078</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© 2026 Milletmithra. All rights reserved. Made with ❤️ for healthy living.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
