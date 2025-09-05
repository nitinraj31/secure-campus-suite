import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Building2,
  UserCheck,
  MessageSquare,
  UtensilsCrossed,
  Phone,
  Heart,
  CreditCard
} from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    title: "My Profile",
    description: "View and update your personal information",
    icon: User,
    route: "/profile",
    gradient: "from-blue-600 to-blue-800"
  },
  {
    title: "My Room",
    description: "View your room details and facilities",
    icon: Building2,
    route: "/my-room",
    gradient: "from-green-600 to-green-800"
  },
  {
    title: "Leave Requests",
    description: "Apply for leave and track approvals",
    icon: UserCheck,
    route: "/leave",
    gradient: "from-teal-600 to-teal-800"
  },
  {
    title: "Complaints",
    description: "Submit and track your complaints",
    icon: MessageSquare,
    route: "/my-complaints",
    gradient: "from-red-600 to-red-800"
  },
  {
    title: "Mess Services",
    description: "View meal schedule and feedback",
    icon: UtensilsCrossed,
    route: "/mess",
    gradient: "from-orange-600 to-orange-800"
  },
  {
    title: "Announcements",
    description: "Read important notices and updates",
    icon: Phone,
    route: "/announcements",
    gradient: "from-pink-600 to-pink-800"
  },
  {
    title: "Health Services",
    description: "Access health records and appointments",
    icon: Heart,
    route: "/health",
    gradient: "from-rose-600 to-rose-800"
  },
  {
    title: "Fee Payment",
    description: "View dues and make payments",
    icon: CreditCard,
    route: "/fees",
    gradient: "from-purple-600 to-purple-800"
  }
];

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
              <p className="text-muted-foreground mt-2">Access your hostel services and information</p>
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

export default StudentDashboard;
