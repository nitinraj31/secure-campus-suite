import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Shield,
  UserCheck,
  MessageSquare,
  Phone,
  Heart,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    title: "Room Management",
    description: "Room assignments and maintenance tracking",
    icon: Building2,
    route: "/rooms",
    gradient: "from-green-600 to-green-800"
  },
  {
    title: "Student Management",
    description: "Manage student information and records",
    icon: Users,
    route: "/students",
    gradient: "from-blue-600 to-blue-800"
  },
  {
    title: "Attendance & Security",
    description: "Monitor attendance and security systems",
    icon: Shield,
    route: "/security",
    gradient: "from-indigo-600 to-indigo-800"
  },
  {
    title: "Leave & Visitor Management",
    description: "Approve leaves and manage visitors",
    icon: UserCheck,
    route: "/visitors",
    gradient: "from-teal-600 to-teal-800"
  },
  {
    title: "Complaint Resolution",
    description: "Handle and resolve student complaints",
    icon: MessageSquare,
    route: "/complaints",
    gradient: "from-red-600 to-red-800"
  },
  {
    title: "Communication Hub",
    description: "Send announcements and messages",
    icon: Phone,
    route: "/communication",
    gradient: "from-pink-600 to-pink-800"
  },
  {
    title: "Health Monitoring",
    description: "Track student health and wellness",
    icon: Heart,
    route: "/health",
    gradient: "from-rose-600 to-rose-800"
  },
  {
    title: "Reports & Analytics",
    description: "View reports and hostel statistics",
    icon: BarChart3,
    route: "/reports",
    gradient: "from-cyan-600 to-cyan-800"
  }
];

const WardenDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Warden Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage hostel operations and student welfare</p>
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

export default WardenDashboard;
