import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Building, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-security/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <Badge variant="outline" className="mb-6 text-primary border-primary/20 bg-primary/5">
              <Shield className="w-4 h-4 mr-2" />
              Secure Campus Suite
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Complete Hostel
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Management </span>
              System
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Streamline your campus operations with our comprehensive solution. From room allocation 
              to security management, handle everything seamlessly in one platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Users, label: "Students", value: "10,000+" },
                { icon: Building, label: "Hostels", value: "50+" },
                { icon: Shield, label: "Security", value: "24/7" },
                { icon: BarChart3, label: "Efficiency", value: "98%" }
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{value}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img 
                src={heroImage} 
                alt="Secure Campus Suite Dashboard" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -left-6 bg-card p-4 rounded-xl shadow-medium border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-security rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-security-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Real-time Security</div>
                  <div className="text-xs text-muted-foreground">24/7 Monitoring Active</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-card p-4 rounded-xl shadow-medium border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-education rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-education-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Smart Analytics</div>
                  <div className="text-xs text-muted-foreground">Predictive Insights</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;