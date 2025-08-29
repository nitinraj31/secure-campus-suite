import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Home, CreditCard, UtensilsCrossed, 
  Wrench, MapPin, Shield, MessageSquare,
  Heart, Shirt, BarChart3, Zap,
  CheckCircle, ArrowRight
} from "lucide-react";

const modules = [
  {
    icon: Users,
    title: "User & Access Management",
    description: "Complete identity and permission management system",
    features: [
      "Multi-role login (Admin, Warden, Student, Staff, Security)",
      "Role-based permissions & access control",
      "Multi-factor authentication (OTP, Biometric)",
      "Student ID card integration (RFID/Smart card)",
      "Face recognition & fingerprint access",
      "Active directory integration"
    ],
    gradient: "bg-gradient-primary"
  },
  {
    icon: Home,
    title: "Room & Allocation System",
    description: "Intelligent room management and allocation",
    features: [
      "Auto-allocation based on preferences & merit",
      "Priority allocation (special category, disabled students)",
      "Bed & furniture inventory management",
      "Room change request workflow",
      "Digital inspection checklists",
      "Occupancy optimization algorithms"
    ],
    gradient: "bg-gradient-security"
  },
  {
    icon: CreditCard,
    title: "Financial & Billing System", 
    description: "Comprehensive fee management and billing",
    features: [
      "Multiple fee categories (rent, mess, utilities)",
      "Installment & partial payment options",
      "Automatic fine calculation system",
      "Digital invoices & e-receipts",
      "Scholarship & waiver management",
      "Payment gateway integration"
    ],
    gradient: "bg-gradient-primary"
  },
  {
    icon: UtensilsCrossed,
    title: "Mess & Food Services",
    description: "Complete dining hall management solution",
    features: [
      "Online meal pre-booking system",
      "Monthly/semester mess subscriptions",
      "Diet customization (veg/non-veg/allergies)",
      "RFID-based mess attendance tracking",
      "Meal feedback & rating system",
      "Menu planning & nutrition tracking"
    ],
    gradient: "bg-gradient-security"
  },
  {
    icon: Wrench,
    title: "Complaint & Maintenance",
    description: "Streamlined issue resolution system",
    features: [
      "Category-wise complaint management",
      "Priority tagging (urgent/normal/low)",
      "Auto-assignment to maintenance staff",
      "Complete maintenance history logs",
      "Resolution feedback system",
      "Preventive maintenance scheduling"
    ],
    gradient: "bg-gradient-primary"
  },
  {
    icon: MapPin,
    title: "Leave & Visitor Management",
    description: "Secure entry-exit and visitor control",
    features: [
      "Multi-level leave approval workflow",
      "QR-based gate pass generation",
      "Visitor pre-registration system",
      "Photo capture & verification",
      "Overnight guest management",
      "Parent notification system"
    ],
    gradient: "bg-gradient-security"
  }
];

const ModuleBreakdown = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Detailed Module Breakdown
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the comprehensive features within each core module of our hostel management system
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <Card 
              key={module.title}
              className="group hover:shadow-strong transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl ${module.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <module.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 mb-2">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {module.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {module.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-security flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all duration-300">
                    Learn more about {module.title.toLowerCase()}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModuleBreakdown;