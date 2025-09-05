import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, Clock, DollarSign, Users,
  Shield, Zap, Target, CheckCircle
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Operational Efficiency",
    description: "Streamline all hostel operations with automation",
    improvements: [
      "95% reduction in manual paperwork",
      "80% faster complaint resolution",
      "70% improvement in resource allocation",
      "Real-time operational visibility"
    ],
    color: "text-primary"
  },
  {
    icon: DollarSign,
    title: "Cost Optimization",
    description: "Significant cost savings through smart management",
    improvements: [
      "30% reduction in operational costs",
      "Automated billing eliminates errors",
      "Predictive maintenance reduces repairs",
      "Energy management saves utilities"
    ],
    color: "text-education"
  },
  {
    icon: Users,
    title: "Enhanced Student Experience",
    description: "Superior living experience with modern conveniences", 
    improvements: [
      "24/7 self-service capabilities",
      "Instant complaint registration",
      "Mobile app for all services",
      "Transparent communication"
    ],
    color: "text-security"
  },
  {
    icon: Shield,
    title: "Security & Safety",
    description: "Comprehensive security with peace of mind",
    improvements: [
      "Biometric access control",
      "Real-time monitoring system",
      "Emergency response protocols",
      "Parent notification system"
    ],
    color: "text-warning"
  }
];

const roi = [
  {
    metric: "Return on Investment",
    value: "300%",
    description: "Within first 12 months of implementation",
    timeframe: "Year 1"
  },
  {
    metric: "Administrative Time Saved",
    value: "75%",
    description: "Automation reduces manual processes significantly",
    timeframe: "Monthly"
  },
  {
    metric: "Student Satisfaction",
    value: "98%",
    description: "Based on post-implementation surveys",
    timeframe: "Ongoing"
  },
  {
    metric: "Operational Cost Reduction",
    value: "40%", 
    description: "Through optimized resource management",
    timeframe: "Annual"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Transformative Benefits & ROI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience measurable improvements in efficiency, cost savings, and student satisfaction
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title}
              className="group hover:shadow-strong transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 mb-2">
                      {benefit.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {benefit.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {benefit.improvements.map((improvement, improvementIndex) => (
                    <div key={improvementIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-security flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{improvement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ROI Metrics */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Proven Results & ROI</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roi.map((metric, index) => (
              <Card key={metric.metric} className="text-center p-6 hover:shadow-medium transition-all duration-300 bg-background border-border/50">
                <div className="text-4xl font-bold text-primary mb-3">{metric.value}</div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{metric.metric}</h4>
                <p className="text-sm text-muted-foreground mb-3">{metric.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                  <Clock className="w-3 h-3" />
                  {metric.timeframe}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Implementation Success */}
        <Card className="bg-gradient-primary text-white p-8">
          <div className="text-center max-w-4xl mx-auto">
            <Target className="w-12 h-12 mx-auto mb-6 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">Implementation Success Rate</h3>
            <p className="text-xl opacity-90 mb-8">
              Over 500+ educational institutions have successfully implemented our hostel management system with 100% deployment success rate
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <p className="opacity-90">Institutions Served</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <p className="opacity-90">Success Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <p className="opacity-90">Support Available</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default BenefitsSection;