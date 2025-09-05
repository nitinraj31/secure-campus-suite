import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Thermometer, Droplets, Lightbulb, Shield, Wifi, Settings, Plus } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const iotDevices = [
  { id: "DEV-001", name: "Room AC Controller", type: "Climate", room: "A-101", status: "Online", lastSeen: "2 min ago" },
  { id: "DEV-002", name: "Smart Lock", type: "Security", room: "A-101", status: "Online", lastSeen: "1 min ago" },
  { id: "DEV-003", name: "Energy Monitor", type: "Utility", room: "A-101", status: "Online", lastSeen: "30 sec ago" },
  { id: "DEV-004", name: "Motion Sensor", type: "Security", room: "A-102", status: "Offline", lastSeen: "2 hours ago" },
  { id: "DEV-005", name: "Water Leak Detector", type: "Safety", room: "B-201", status: "Online", lastSeen: "5 min ago" },
];

const sensorData = {
  temperature: { current: 24, target: 22, unit: "°C" },
  humidity: { current: 65, target: 60, unit: "%" },
  energy: { current: 2.4, target: 2.0, unit: "kW" },
  water: { current: 0, target: 0, unit: "L/min" }
};

const IoTIntegration = () => {
  const [selectedRoom, setSelectedRoom] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online": return "bg-green-100 text-green-800";
      case "Offline": return "bg-red-100 text-red-800";
      case "Maintenance": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "Climate": return <Thermometer className="h-4 w-4" />;
      case "Security": return <Shield className="h-4 w-4" />;
      case "Utility": return <Zap className="h-4 w-4" />;
      case "Safety": return <Droplets className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
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
                <Wifi className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">IoT Integration</h1>
                  <p className="text-muted-foreground">Smart campus device management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Real-time Sensor Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sensorData.temperature.current}{sensorData.temperature.unit}</div>
              <p className="text-xs text-muted-foreground">
                Target: {sensorData.temperature.target}{sensorData.temperature.unit}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Humidity</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sensorData.humidity.current}{sensorData.humidity.unit}</div>
              <p className="text-xs text-muted-foreground">
                Target: {sensorData.humidity.target}{sensorData.humidity.unit}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Energy Usage</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sensorData.energy.current}{sensorData.energy.unit}</div>
              <p className="text-xs text-muted-foreground">
                Target: {sensorData.energy.target}{sensorData.energy.unit}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Flow</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sensorData.water.current}{sensorData.water.unit}</div>
              <p className="text-xs text-muted-foreground">
                No leaks detected
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Device Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Connected Devices</CardTitle>
                  <CardDescription>Monitor and control IoT devices</CardDescription>
                </div>
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rooms</SelectItem>
                    <SelectItem value="A-101">A-101</SelectItem>
                    <SelectItem value="A-102">A-102</SelectItem>
                    <SelectItem value="B-201">B-201</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {iotDevices
                  .filter(device => selectedRoom === "all" || device.room === selectedRoom)
                  .map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getDeviceIcon(device.type)}
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <p className="text-sm text-muted-foreground">{device.room} • {device.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(device.status)}>{device.status}</Badge>
                        <span className="text-sm text-muted-foreground">{device.lastSeen}</span>
                        <Switch defaultChecked={device.status === "Online"} />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Controls</CardTitle>
              <CardDescription>Automated system controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Lightbulb className="h-5 w-5" />
                      <span>Automated Lighting</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Thermometer className="h-5 w-5" />
                      <span>Climate Control</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5" />
                      <span>Security System</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5" />
                      <span>Energy Optimization</span>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      System Reset
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Device
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Overall IoT system performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
                <p className="text-sm text-muted-foreground">Device Uptime</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2.4ms</div>
                <p className="text-sm text-muted-foreground">Average Latency</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
                <p className="text-sm text-muted-foreground">Active Sensors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IoTIntegration;
