import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, Eye, Fingerprint, Smartphone, 
  Lock, AlertTriangle, Camera, Wifi
} from "lucide-react";

const securityFeatures = [
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description: "Advanced fingerprint and face recognition for secure access control",
    benefits: ["99.9% accuracy", "Anti-spoofing technology", "Multi-modal verification"]
  },
  {
    icon: Camera,
    title: "CCTV Integration",
    description: "24/7 surveillance with AI-powered monitoring and incident detection",
    benefits: ["Motion detection", "Facial recognition", "Automatic alerts"]
  },
  {
    icon: Smartphone,
    title: "Mobile App Security",
    description: "Encrypted mobile access with push notifications and remote monitoring",
    benefits: ["End-to-end encryption", "Two-factor authentication", "Real-time alerts"]
  },
  {
    icon: Lock,
    title: "Smart Lock System",
    description: "RFID and digital lock integration for room and facility access",
    benefits: ["Keyless entry", "Access logs", "Emergency override"]
  },
  {
    icon: Eye,
    title: "Real-time Monitoring", 
    description: "Live tracking of student movement and facility usage",
    benefits: ["Live dashboards", "Automated reports", "Anomaly detection"]
  },
  {
    icon: AlertTriangle,
    title: "Emergency Response",
    description: "Panic buttons, SOS alerts, and emergency communication system",
    benefits: ["Instant alerts", "GPS location", "Emergency contacts"]
  }
];

const SecurityFeatures = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-security" />
            <h2 className="text-4xl font-bold text-foreground">
              Advanced Security Features
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Military-grade security protocols ensuring complete safety and peace of mind for students and administrators
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-security/20"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-security flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-security transition-colors duration-300">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-security" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: "Security Incidents Prevented", value: "99.7%", icon: Shield },
            { label: "Response Time", value: "<30s", icon: AlertTriangle },
            { label: "System Uptime", value: "99.9%", icon: Wifi },
            { label: "Data Encryption", value: "256-bit", icon: Lock }
          ].map((stat, index) => (
            <Card key={stat.label} className="text-center p-6 hover:shadow-medium transition-all duration-300">
              <stat.icon className="w-8 h-8 text-security mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;