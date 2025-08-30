import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building2, 
  CreditCard, 
  UtensilsCrossed, 
  MessageSquare, 
  UserCheck, 
  Shield, 
  Phone, 
  Heart, 
  Plus, 
  BarChart3, 
  Cpu 
} from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    title: "User & Access Management",
    description: "Manage users, roles, and access permissions",
    icon: Users,
    route: "/users",
    gradient: "from-blue-600 to-blue-800"
  },
  {
    title: "Room & Allocation System",
    description: "Room assignments and availability tracking",
    icon: Building2,
    route: "/rooms",
    gradient: "from-green-600 to-green-800"
  },
  {
    title: "Financial & Billing System",
    description: "Fee collection and financial management",
    icon: CreditCard,
    route: "/billing",
    gradient: "from-purple-600 to-purple-800"
  },
  {
    title: "Mess & Food Services",
    description: "Meal planning and food service management",
    icon: UtensilsCrossed,
    route: "/mess",
    gradient: "from-orange-600 to-orange-800"
  },
  {
    title: "Complaint & Maintenance",
    description: "Issue tracking and maintenance requests",
    icon: MessageSquare,
    route: "/complaints",
    gradient: "from-red-600 to-red-800"
  },
  {
    title: "Leave & Visitor Management",
    description: "Track student leaves and visitor entries",
    icon: UserCheck,
    route: "/visitors",
    gradient: "from-teal-600 to-teal-800"
  },
  {
    title: "Attendance & Security",
    description: "Student attendance and security monitoring",
    icon: Shield,
    route: "/security",
    gradient: "from-indigo-600 to-indigo-800"
  },
  {
    title: "Communication Hub",
    description: "Announcements and messaging system",
    icon: Phone,
    route: "/communication",
    gradient: "from-pink-600 to-pink-800"
  },
  {
    title: "Health & Wellness",
    description: "Medical records and wellness tracking",
    icon: Heart,
    route: "/health",
    gradient: "from-rose-600 to-rose-800"
  },
  {
    title: "Extra Services",
    description: "Additional services and amenities",
    icon: Plus,
    route: "/services",
    gradient: "from-amber-600 to-amber-800"
  },
  {
    title: "Admin & Analytics",
    description: "Reports and analytical insights",
    icon: BarChart3,
    route: "/analytics",
    gradient: "from-cyan-600 to-cyan-800"
  },
  {
    title: "IoT Integration",
    description: "Smart devices and automation control",
    icon: Cpu,
    route: "/iot",
    gradient: "from-violet-600 to-violet-800"
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Campus Management Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage all aspects of your hostel operations</p>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Link key={module.route} to={module.route}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-lg bg-gradient-to-br ${module.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-sm">
                      {module.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;