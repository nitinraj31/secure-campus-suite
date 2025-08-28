import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Home, AlertCircle, TrendingUp, 
  Calendar, Shield, MapPin, DollarSign 
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Unified Dashboard Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get real-time insights across all modules with our intuitive admin dashboard
          </p>
        </div>
        
        {/* Dashboard Mockup */}
        <div className="bg-gradient-subtle rounded-2xl p-8 shadow-strong border">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Campus Overview</h3>
              <p className="text-muted-foreground">Real-time operational dashboard</p>
            </div>
            <Badge variant="outline" className="bg-security/10 text-security border-security/20">
              <Shield className="w-4 h-4 mr-2" />
              All Systems Active
            </Badge>
          </div>
          
          {/* Key Metrics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { 
                icon: Users, 
                title: "Total Students", 
                value: "2,847", 
                change: "+12 today",
                color: "text-primary"
              },
              { 
                icon: Home, 
                title: "Occupancy Rate", 
                value: "94.2%", 
                change: "+2.1% this month",
                color: "text-security"
              },
              { 
                icon: AlertCircle, 
                title: "Pending Issues", 
                value: "8", 
                change: "3 urgent",
                color: "text-warning"
              },
              { 
                icon: DollarSign, 
                title: "Fee Collection", 
                value: "₹4.2M", 
                change: "89% collected",
                color: "text-education"
              }
            ].map((metric, index) => (
              <Card key={metric.title} className="hover:shadow-medium transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {metric.value}
                  </div>
                  <CardTitle className="text-sm font-medium text-foreground mb-2">
                    {metric.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {metric.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "10:30 AM", action: "New student checked in", user: "John Doe - Room 205" },
                    { time: "10:15 AM", action: "Maintenance completed", user: "Plumbing - Block A" },
                    { time: "09:45 AM", action: "Fee payment received", user: "Sarah Smith - ₹15,000" },
                    { time: "09:30 AM", action: "Leave request approved", user: "Mike Johnson - Weekend" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.user}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Right Column */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-security" />
                  Security Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { severity: "low", alert: "Visitor registered", location: "Main Gate", time: "11:20 AM" },
                    { severity: "medium", alert: "After-hours access", location: "Block B - Floor 3", time: "10:55 AM" },
                    { severity: "low", alert: "Maintenance access", location: "Mess Hall", time: "10:30 AM" },
                    { severity: "high", alert: "Emergency drill", location: "All Blocks", time: "09:00 AM" }
                  ].map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        alert.severity === 'high' ? 'bg-destructive' : 
                        alert.severity === 'medium' ? 'bg-warning' : 'bg-security'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {alert.alert}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {alert.location}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {alert.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;