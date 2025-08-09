import BgGradient from "@/components/common/bg-gradient";
import HowItWorkSection from "@/components/common/how-it-works";
import CTASection from "@/components/home/cta-section";
import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import PricingSection from "@/components/home/pricing-section";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
      <HeroSection  />
      <DemoSection/>
      <HowItWorkSection />
      <PricingSection/>
      <CTASection />
      </div>
    </div>
  );
}
