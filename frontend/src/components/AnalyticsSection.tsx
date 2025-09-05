import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, TrendingUp, PieChart, LineChart, 
  Target, Zap, Brain, Globe
} from "lucide-react";

const analyticsFeatures = [
  {
    icon: BarChart3,
    title: "Real-time Dashboards",
    description: "Live operational metrics with customizable widgets and KPI tracking",
    metrics: ["Occupancy rates", "Fee collections", "Maintenance status", "Student attendance"]
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "AI-powered insights for capacity planning and resource optimization",
    metrics: ["Demand forecasting", "Revenue predictions", "Maintenance scheduling", "Enrollment trends"]
  },
  {
    icon: PieChart,
    title: "Financial Reports",
    description: "Comprehensive financial analytics with automated report generation",
    metrics: ["Revenue breakdown", "Expense tracking", "Profit margins", "Budget analysis"]
  },
  {
    icon: Target,
    title: "Performance Metrics",
    description: "Key performance indicators for operational efficiency measurement",
    metrics: ["Response times", "Satisfaction scores", "Utilization rates", "Cost per student"]
  }
];

const reportTypes = [
  {
    title: "Daily Operations Report",
    description: "Check-ins, check-outs, maintenance requests, and incidents",
    frequency: "Automated daily at 6 AM"
  },
  {
    title: "Financial Summary",
    description: "Fee collections, pending payments, and expense breakdown",
    frequency: "Weekly & monthly reports"
  },
  {
    title: "Occupancy Analytics",
    description: "Room utilization, vacancy trends, and allocation efficiency",
    frequency: "Real-time with monthly summaries"
  },
  {
    title: "Student Welfare Report",
    description: "Attendance patterns, complaint resolution, and satisfaction metrics",
    frequency: "Monthly comprehensive report"
  },
  {
    title: "Maintenance Analytics",
    description: "Issue resolution times, recurring problems, and cost analysis",
    frequency: "Weekly operational reports"
  },
  {
    title: "Security Audit Report", 
    description: "Access logs, incident reports, and compliance monitoring",
    frequency: "Daily summaries with monthly audits"
  }
];

const AnalyticsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              Advanced Analytics & Reporting
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Data-driven insights and comprehensive reporting for informed decision making and operational excellence
          </p>
        </div>

        {/* Analytics Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {analyticsFeatures.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-3">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {feature.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{metric}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Automated Reports */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Automated Report Generation</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTypes.map((report, index) => (
              <Card key={report.title} className="hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                    {report.frequency}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Analytics Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: "Data Points Tracked", value: "500+", icon: BarChart3 },
            { label: "Report Templates", value: "25+", icon: LineChart },
            { label: "Export Formats", value: "PDF, Excel, CSV", icon: Globe },
            { label: "Custom Dashboards", value: "Unlimited", icon: Zap }
          ].map((stat, index) => (
            <Card key={stat.label} className="text-center p-6 hover:shadow-medium transition-all duration-300">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-2">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;