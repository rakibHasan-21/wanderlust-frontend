import CTASection from "@/components/CTASection";
import Banner from "../components/Banner";
import Hero from "../components/Hero"
import Home from "../components/Home";
import Feature from "../components/Feature";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <Feature />
      <Hero />
      <Home />

      <CTASection />
    </div>
  );
}
