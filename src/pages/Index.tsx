import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import ModuleBreakdown from "@/components/ModuleBreakdown";
import SecurityFeatures from "@/components/SecurityFeatures";
import DashboardPreview from "@/components/DashboardPreview";
import AnalyticsSection from "@/components/AnalyticsSection";
import BenefitsSection from "@/components/BenefitsSection";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <ModuleBreakdown />
        <SecurityFeatures />
        <DashboardPreview />
        <AnalyticsSection />
        <BenefitsSection />
        <StatsSection />
      </main>
    </div>
  );
};

export default Index;
