import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Droplets, Zap, Recycle, TrendingDown, Target } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const sustainabilityMetrics = [
  { id: 1, category: "Energy Consumption", current: 1250, target: 1000, unit: "kWh", change: -8.5 },
  { id: 2, category: "Water Usage", current: 4500, target: 4000, unit: "liters", change: -12.3 },
  { id: 3, category: "Waste Generated", current: 120, target: 100, unit: "kg", change: +5.2 },
  { id: 4, category: "Carbon Footprint", current: 2.8, target: 2.5, unit: "tons CO2", change: -7.1 },
];

const ecoInitiatives = [
  { id: 1, name: "Solar Panel Installation", status: "In Progress", completion: 75, impact: "High" },
  { id: 2, name: "Water Conservation Program", status: "Active", completion: 100, impact: "Medium" },
  { id: 3, name: "Recycling Center Upgrade", status: "Completed", completion: 100, impact: "High" },
  { id: 4, name: "LED Lighting Replacement", status: "Planning", completion: 0, impact: "Medium" },
];

const SustainabilityDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Active": return "bg-green-100 text-green-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
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
                <Leaf className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Sustainability Dashboard</h1>
                  <p className="text-muted-foreground">Track environmental impact and eco-friendly initiatives</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Energy Saved</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">250 kWh</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Conserved</CardTitle>
              <Droplets className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,200 L</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO2 Reduced</CardTitle>
              <Leaf className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.3 tons</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
              <Recycle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <Progress value={78} className="mt-2" />
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sustainability Goals Progress</CardTitle>
                  <CardDescription>Monthly progress towards environmental targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Energy Efficiency</span>
                        <span className="text-sm text-muted-foreground">85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Water Conservation</span>
                        <span className="text-sm text-muted-foreground">72%</span>
                      </div>
                      <Progress value={72} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Waste Reduction</span>
                        <span className="text-sm text-muted-foreground">68%</span>
                      </div>
                      <Progress value={68} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Current environmental footprint metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Leaf className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Carbon Neutral</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Achieved</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Water Efficient</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Recycle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium">Zero Waste</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Planning</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sustainability Metrics</CardTitle>
                <CardDescription>Detailed environmental performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Current</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sustainabilityMetrics.map((metric) => (
                      <TableRow key={metric.id}>
                        <TableCell className="font-medium">{metric.category}</TableCell>
                        <TableCell>{metric.current} {metric.unit}</TableCell>
                        <TableCell>{metric.target} {metric.unit}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <TrendingDown className={`h-4 w-4 ${metric.change < 0 ? 'text-green-500' : 'text-red-500'}`} />
                            <span className={metric.change < 0 ? 'text-green-600' : 'text-red-600'}>
                              {metric.change > 0 ? '+' : ''}{metric.change}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={metric.current <= metric.target ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {metric.current <= metric.target ? 'On Track' : 'Off Track'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="initiatives" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Eco-Initiatives</CardTitle>
                    <CardDescription>Active sustainability projects and programs</CardDescription>
                  </div>
                  <Button>
                    <Target className="h-4 w-4 mr-2" />
                    New Initiative
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Initiative</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Impact</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ecoInitiatives.map((initiative) => (
                      <TableRow key={initiative.id}>
                        <TableCell className="font-medium">{initiative.name}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(initiative.status)}>{initiative.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={initiative.completion} className="w-20" />
                            <span className="text-sm">{initiative.completion}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getImpactColor(initiative.impact)}>{initiative.impact}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            View Details
                          </Button>
                          <Button size="sm">
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SustainabilityDashboard;
