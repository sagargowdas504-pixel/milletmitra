import HeroSection from "@/components/HeroSection";
import MilletsShowcase from "@/components/MilletsShowcase";
import BestSellers from "@/components/BestSellers";
import WhyMillets from "@/components/WhyMillets";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <MilletsShowcase />
      <BestSellers />
      <WhyMillets />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Index;
