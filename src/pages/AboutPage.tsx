import { motion } from "framer-motion";
import { Leaf, Heart, Shield, Truck, Users, Award, Globe, Sprout, Target, Zap } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const AboutPage = () => {
  return (
    <main className="pt-24 pb-16 bg-background min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-forest text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.p {...fadeIn} className="text-golden-light font-semibold tracking-widest uppercase text-sm mb-3">Our Story</motion.p>
          <motion.h1 {...fadeIn} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-gradient-golden">Milletmithra</span>
          </motion.h1>
          <motion.p {...fadeIn} transition={{ delay: 0.2 }} className="text-primary-foreground/80 max-w-2xl mx-auto text-lg leading-relaxed">
            We're on a mission to bring the goodness of ancient grains to every Indian household — bridging tradition with modern nutrition.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Story Section */}
        <motion.section {...fadeIn} className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold text-foreground">Welcome to Milletmithra</h2>
              <p className="text-foreground/80 leading-relaxed">
                Welcome to Milletmithra, a platform dedicated to promoting healthy living through the goodness of millets. We are passionate about bringing traditional nutrition back into modern lifestyles by creating awareness about millet foods, healthy eating habits, and natural wellness.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Millets are one of the oldest and healthiest grains known for their rich nutritional value, high fiber content, and natural health benefits. At Milletmithra, our mission is to reconnect people with these traditional super grains and make healthy food choices simple, tasty, and accessible for everyone.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Our journey began with the vision of creating a trusted online space where people can learn about millets, explore healthy products, and discover easy recipes that fit into everyday life. We believe that food is not just about taste — it is about health, energy, and well-being.
              </p>
              
              <div className="mt-8 space-y-4 pt-4 border-t border-border/50">
                <h3 className="font-display text-xl font-bold text-foreground">Why We Advocate for Millets</h3>
                <p className="text-foreground/80 leading-relaxed">
                  As climate-resilient crops, millets require very little water and no synthetic fertilizers, making them incredibly friendly to our ecosystem. By integrating them into your diet, you support local biodiverse agriculture, lower your carbon footprint, and embrace a wholesome, sustainable lifestyle.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <span className="text-primary text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">Gluten-Free & Rich in Fiber</h4>
                      <p className="text-xs text-muted-foreground">Easy on digestion and excellent for blood sugar management.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <span className="text-primary text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">Sustaining Local Farmers</h4>
                      <p className="text-xs text-muted-foreground">Fair-trade partnerships that support rural Indian farming.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-2xl border border-border shadow-xl aspect-[4/3] lg:aspect-square">
              <img 
                src="/src/assets/about_millet_showcase.png" 
                alt="Organic Millets" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs font-semibold tracking-wider uppercase text-golden-light mb-1">Naturally Sourced</p>
                  <h4 className="font-display font-bold text-lg">Pure, Unprocessed Ancient Grains</h4>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeIn} className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-foreground/80 leading-relaxed">
                To make millets the preferred choice of every health-conscious Indian family by offering convenient, delicious, and affordable millet-based products. We aim to revive the forgotten superfood tradition while supporting sustainable agriculture and empowering rural farming communities across India.
              </p>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-8 border border-secondary/20">
              <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <Sprout className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-foreground/80 leading-relaxed">
                A world where millets are part of every meal, every day. We envision India leading a global millet revolution — where ancient wisdom meets modern food science, creating a healthier population and a more sustainable planet for future generations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold tracking-widest uppercase text-sm mb-2">What We Stand For</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Leaf, title: "100% Natural", desc: "No preservatives, no artificial additives, no chemicals. Just pure, clean nutrition from nature's best grains.", color: "text-green-600 bg-green-100" },
              { icon: Heart, title: "Health First", desc: "Every product is designed with your well-being in mind. Lab-tested for nutrition, safety, and purity.", color: "text-red-500 bg-red-100" },
              { icon: Shield, title: "Quality Assured", desc: "FSSAI certified, ISO compliant. Every batch undergoes rigorous testing before reaching your home.", color: "text-blue-600 bg-blue-100" },
              { icon: Truck, title: "Fast Delivery", desc: "2-3 day delivery across India. Free shipping on orders above ₹500. Eco-friendly packaging.", color: "text-purple-600 bg-purple-100" },
              { icon: Users, title: "Farmer Partnership", desc: "We work directly with 500+ farmers, ensuring fair prices and sustainable agricultural practices.", color: "text-orange-600 bg-orange-100" },
              { icon: Zap, title: "Innovation", desc: "Constantly developing new millet-based products that fit modern lifestyles without compromising tradition.", color: "text-yellow-600 bg-yellow-100" },
            ].map((item) => (
              <motion.div key={item.title} {...fadeIn} className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>


      </div>
    </main>
  );
};

export default AboutPage;
