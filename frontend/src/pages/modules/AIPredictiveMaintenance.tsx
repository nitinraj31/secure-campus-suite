import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, AlertTriangle, CheckCircle, Wrench, TrendingUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const maintenanceAlerts = [
  { id: 1, equipment: "Air Conditioner - Block A", location: "Room 101", risk: "High", daysLeft: 3, status: "Critical" },
  { id: 2, equipment: "Water Heater - Block B", location: "Common Area", risk: "Medium", daysLeft: 12, status: "Warning" },
  { id: 3, equipment: "Elevator Motor", location: "Main Building", risk: "Low", daysLeft: 45, status: "Normal" },
  { id: 4, equipment: "Generator", location: "Basement", risk: "High", daysLeft: 7, status: "Critical" },
];

const AIPredictiveMaintenance = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Critical": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "Warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "Normal": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">← Back</Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">AI-Powered Predictive Maintenance</h1>
                  <p className="text-muted-foreground">Predict equipment failures and optimize maintenance schedules</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Critical Alerts */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>2 Critical Maintenance Issues Detected:</strong> Immediate attention required for Air Conditioner and Generator.
          </AlertDescription>
        </Alert>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Equipment Health</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <Progress value={87} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">+5% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Requires immediate action</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Tasks</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Alerts Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Predictive Maintenance Alerts</CardTitle>
                <CardDescription>AI-powered predictions for equipment maintenance needs</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant={selectedTimeframe === "7d" ? "default" : "outline"} size="sm" onClick={() => setSelectedTimeframe("7d")}>
                  7 Days
                </Button>
                <Button variant={selectedTimeframe === "30d" ? "default" : "outline"} size="sm" onClick={() => setSelectedTimeframe("30d")}>
                  30 Days
                </Button>
                <Button variant={selectedTimeframe === "90d" ? "default" : "outline"} size="sm" onClick={() => setSelectedTimeframe("90d")}>
                  90 Days
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Days Until Failure</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.equipment}</TableCell>
                    <TableCell>{alert.location}</TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(alert.risk)}>{alert.risk}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{alert.daysLeft} days</span>
                        {alert.daysLeft <= 7 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(alert.status)}
                        <span>{alert.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2">
                        View Details
                      </Button>
                      <Button size="sm" className={alert.status === "Critical" ? "bg-red-600 hover:bg-red-700" : ""}>
                        <Wrench className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AIPredictiveMaintenance;
