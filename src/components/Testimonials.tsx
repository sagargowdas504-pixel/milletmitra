import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Switching to millets changed my clients' health dramatically. Blood sugar levels improved, energy increased, and they feel lighter!",
    name: "Priya Sharma",
    role: "Nutritionist",
  },
  {
    quote: "As a fitness enthusiast, I need high-protein, gluten-free grains. Millets from Milletmithra are the highest quality I've found.",
    name: "Rajesh Kumar",
    role: "Fitness Enthusiast",
  },
  {
    quote: "My family's health improved after switching to these products. The recipes make it so easy to incorporate millets daily!",
    name: "Anita Desai",
    role: "Home Cook",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-forest">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-golden-light font-semibold tracking-widest uppercase text-sm mb-2">
            Testimonials
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream">
            What Our Community Says
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-xl p-6 hover:bg-cream/10 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-cream/90 italic mb-6 leading-relaxed">"{t.quote}"</p>
              <div>
                <p className="font-display font-bold text-cream">{t.name}</p>
                <p className="text-cream/60 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
