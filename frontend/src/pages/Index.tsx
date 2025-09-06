import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import ModuleBreakdown from "@/components/ModuleBreakdown";
import SecurityFeatures from "@/components/SecurityFeatures";
import AnalyticsSection from "@/components/AnalyticsSection";
import BenefitsSection from "@/components/BenefitsSection";
import StatsSection from "@/components/StatsSection";
import TeamSection from "@/components/TeamSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-28">
        <section className="relative">
          <HeroSection />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full animate-pulse" />
        </section>

        <section className="space-y-16">
          <FeaturesGrid />
          <ModuleBreakdown />
          <SecurityFeatures />
        </section>

        <section className="space-y-16">
          <BenefitsSection />
          <StatsSection />
          <AnalyticsSection />
        </section>

        <section className="relative">
          <TeamSection />
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500 rounded-full opacity-30 animate-ping"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500 rounded-full opacity-20 animate-pulse"></div>
        </section>
      </main>
    </div>
  );
};

export default Index;
