import { TrendingUp, Shield, Clock, Users } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Students Managed",
      description: "Across 200+ institutions",
      color: "text-primary"
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "Security Uptime",
      description: "24/7 monitoring active",
      color: "text-security"
    },
    {
      icon: TrendingUp,
      value: "85%",
      label: "Efficiency Gain",
      description: "Reduced manual work",
      color: "text-education"
    },
    {
      icon: Clock,
      value: "< 2min",
      label: "Response Time",
      description: "For critical alerts",
      color: "text-warning"
    }
  ];

  return (
    <section className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,white_0%,transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,white_0%,transparent_50%)]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Trusted by Educational Institutions Worldwide
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Our platform powers modern campus management, delivering measurable results and exceptional user experiences
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-4">
                <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
              </div>
              
              <div className="text-4xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              
              <div className="text-lg font-semibold mb-2 opacity-90">
                {stat.label}
              </div>
              
              <div className="text-sm opacity-70">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-16 border-t border-background/20">
          <h3 className="text-2xl font-semibold mb-4">
            Ready to transform your campus management?
          </h3>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Join thousands of institutions already using Secure Campus Suite to streamline operations and enhance student experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;