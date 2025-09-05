import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Download, Filter } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const analyticsData = {
  occupancy: {
    total: 1200,
    occupied: 1089,
    available: 111,
    rate: 90.8
  },
  revenue: {
    monthly: 2500000,
    yearly: 30000000,
    growth: 12.5
  },
  students: {
    total: 1200,
    active: 1189,
    inactive: 11
  },
  complaints: {
    total: 245,
    resolved: 198,
    pending: 47,
    resolutionRate: 80.8
  }
};

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState("month");

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
                <BarChart3 className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Admin Analytics</h1>
                  <p className="text-muted-foreground">Comprehensive dashboard insights</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.occupancy.rate}%</div>
              <p className="text-xs text-muted-foreground">
                {analyticsData.occupancy.occupied} of {analyticsData.occupancy.total} rooms
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(analyticsData.revenue.monthly / 100000).toFixed(1)}L</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{analyticsData.revenue.growth}%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.students.active}</div>
              <p className="text-xs text-muted-foreground">
                {analyticsData.students.inactive} inactive
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Complaint Resolution</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.complaints.resolutionRate}%</div>
              <p className="text-xs text-muted-foreground">
                {analyticsData.complaints.resolved} of {analyticsData.complaints.total} resolved
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Revenue Chart Placeholder</p>
                  <p className="text-xs text-muted-foreground mt-1">Interactive chart will be implemented</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Occupancy Trends</CardTitle>
              <CardDescription>Room occupancy over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Occupancy Chart Placeholder</p>
                  <p className="text-xs text-muted-foreground mt-1">Interactive chart will be implemented</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Room Distribution</CardTitle>
              <CardDescription>Breakdown by block and type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Block A</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Block B</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Block C</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">78%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Complaint Categories</CardTitle>
              <CardDescription>Most common issues reported</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Maintenance</span>
                  <Badge variant="secondary">45%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">WiFi Issues</span>
                  <Badge variant="secondary">25%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cleaning</span>
                  <Badge variant="secondary">15%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Electrical</span>
                  <Badge variant="secondary">10%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Other</span>
                  <Badge variant="secondary">5%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">New student registered</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Payment received</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Complaint resolved</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Room allocation updated</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;
