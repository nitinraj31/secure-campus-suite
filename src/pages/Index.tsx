import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import DashboardPreview from "@/components/DashboardPreview";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <DashboardPreview />
        <StatsSection />
      </main>
    </div>
  );
};

export default Index;
