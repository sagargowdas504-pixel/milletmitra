import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const to = "karthikgowdas504@gmail.com";
    const subject = encodeURIComponent(form.subject || "Contact Form Message");
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone || "N/A"}\n\n` +
      `Message:\n${form.message}`
    );
    
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    
    toast.success("Redirecting to your email client...");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <main className="pt-24 pb-16 bg-background min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-forest text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.p {...fadeIn} className="text-golden-light font-semibold tracking-widest uppercase text-sm mb-3">Get In Touch</motion.p>
          <motion.h1 {...fadeIn} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </motion.h1>
          <motion.p {...fadeIn} transition={{ delay: 0.2 }} className="text-primary-foreground/80 max-w-xl mx-auto">
            Have questions about our products, orders, or partnerships? We'd love to hear from you.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-8">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { 
              icon: Phone, 
              label: "Call Us", 
              value: "8618791226", 
              sub: "Mon-Sat, 9AM-6PM IST", 
              color: "from-primary/10 to-primary/5 border-primary/20",
              href: "tel:8618791226" 
            },
            { 
              icon: Mail, 
              label: "Email Us", 
              value: "karthikgowdas504@gmail.com", 
              sub: "We reply within 24 hours", 
              color: "from-secondary/10 to-secondary/5 border-secondary/20",
              href: "mailto:karthikgowdas504@gmail.com" 
            },
            { 
              icon: MapPin, 
              label: "Visit Us", 
              value: "Karnataka Bangalore - 560078", 
              sub: "Bangalore, India", 
              color: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
              href: "https://www.google.com/maps/search/?api=1&query=Karnataka+Bangalore+-+560078" 
            },
          ].map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              target={item.label !== "Call Us" ? "_blank" : undefined} 
              rel="noopener noreferrer"
              className="block h-full group"
            >
              <motion.div {...fadeIn} className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 border text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full`}>
                <div className="h-12 w-12 rounded-full bg-card flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground">{item.label}</h3>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mt-1 break-all">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
              </motion.div>
            </a>
          ))}
        </div>

        {/* Form + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div {...fadeIn} className="lg:col-span-3">
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">Send a Message</h2>
                  <p className="text-xs text-muted-foreground">Fill in the form below and we'll respond promptly</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  <Input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input type="tel" placeholder="Phone (Optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <Input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <Textarea placeholder="Your Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-forest-dark hover:from-forest-dark hover:to-primary text-primary-foreground h-12 font-semibold shadow-lg">
                  Send Message <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-secondary" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground">Frequently Asked</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "What is the delivery time?", a: "We deliver within 2-3 business days across India. Metro cities get next-day delivery on orders before 2 PM." },
                { q: "Do you offer free shipping?", a: "Yes! Orders above ₹500 qualify for free delivery. Below that, a flat ₹49 delivery fee applies." },
                { q: "Are products organic?", a: "Most of our products use organically grown millets. Look for the 'Organic' badge on specific products." },
                { q: "Can I return a product?", a: "We offer hassle-free returns within 7 days of delivery if the product is unopened and in original packaging." },
                { q: "Do you offer bulk orders?", a: "Yes! Contact us for bulk/corporate orders. We offer special pricing for orders above 50 units." },
              ].map((faq, i) => (
                <div key={i} className="bg-muted/50 rounded-xl p-4 border border-border/50 hover:border-primary/20 transition-colors">
                  <h4 className="font-medium text-sm text-foreground">{faq.q}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>


          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
