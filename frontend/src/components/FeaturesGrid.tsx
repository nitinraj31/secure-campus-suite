import { 
  Users, Home, CreditCard, UtensilsCrossed, 
  Wrench, MapPin, Shield, MessageSquare,
  Heart, Shirt, Wifi, Calendar,
  BarChart3, Zap, Brain, Leaf, ShoppingCart, AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "User & Access Management",
    description: "Multi-role login with biometric authentication and smart ID card integration",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Home,
    title: "Room & Allocation System",
    description: "Auto-allocation based on preferences with digital inspection checklists",
    gradient: "bg-gradient-security"
  },
  {
    icon: CreditCard,
    title: "Financial & Billing System",
    description: "Automated billing, installments, and scholarship adjustments",
    gradient: "bg-gradient-primary"
  },
  {
    icon: UtensilsCrossed,
    title: "Mess & Food Services",
    description: "Online meal booking with dietary customization and attendance tracking",
    gradient: "bg-gradient-security"
  },
  {
    icon: Wrench,
    title: "Complaint & Maintenance",
    description: "Priority-based complaint system with automated staff assignment",
    gradient: "bg-gradient-primary"
  },
  {
    icon: MapPin,
    title: "Leave & Visitor Management",
    description: "QR-based gate passes with visitor pre-registration system",
    gradient: "bg-gradient-security"
  },
  {
    icon: Shield,
    title: "Attendance & Security",
    description: "Biometric entry-exit with real-time movement tracking and alerts",
    gradient: "bg-gradient-primary"
  },
  {
    icon: MessageSquare,
    title: "Communication Hub",
    description: "Multi-channel notifications with parent portal and chatbot support",
    gradient: "bg-gradient-security"
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Medical records management with doctor appointment booking",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Shirt,
    title: "Extra Services",
    description: "Laundry booking, room cleaning, and event management",
    gradient: "bg-gradient-security"
  },
  {
    icon: BarChart3,
    title: "Admin & Analytics",
    description: "Live dashboards with predictive analytics and comprehensive reports",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Zap,
    title: "IoT Integration",
    description: "Smart locks, energy management, and automated campus systems",
    gradient: "bg-gradient-security"
  },
  {
    icon: Brain,
    title: "AI-Powered Predictive Maintenance",
    description: "Machine learning to predict equipment failures and schedule maintenance",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Heart,
    title: "Mental Health & Wellness Hub",
    description: "Integrated counseling, mood tracking, and wellness programs",
    gradient: "bg-gradient-security"
  },
  {
    icon: Leaf,
    title: "Sustainability Dashboard",
    description: "Carbon footprint tracking, waste management, and eco-friendly initiatives",
    gradient: "bg-gradient-primary"
  },
  {
    icon: ShoppingCart,
    title: "Peer-to-Peer Marketplace",
    description: "Secure platform for students to buy/sell items within campus",
    gradient: "bg-gradient-security"
  },
  {
    icon: AlertTriangle,
    title: "Emergency Response System",
    description: "Automated evacuation alerts, emergency contacts, and safety protocols",
    gradient: "bg-gradient-primary"
  }
];

const FeaturesGrid = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Complete Campus Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Manage every aspect of hostel operations with our comprehensive suite of integrated modules
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;