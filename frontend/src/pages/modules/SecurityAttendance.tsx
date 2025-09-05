import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Shield, Users, AlertTriangle, CheckCircle, Clock, Camera, Plus, Search, Filter, User, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const attendanceRecords = [
  { id: "ATT-001", student: "John Doe", room: "A-101", checkIn: "2024-01-15 08:30", checkOut: "2024-01-15 18:45", status: "Present", method: "Biometric" },
  { id: "ATT-002", student: "Jane Smith", room: "A-102", checkIn: "2024-01-15 09:00", checkOut: null, status: "Present", method: "RFID" },
  { id: "ATT-003", student: "Mike Johnson", room: "B-201", checkIn: "2024-01-15 08:15", checkOut: "2024-01-15 19:00", status: "Present", method: "Biometric" },
  { id: "ATT-004", student: "Sarah Wilson", room: "C-301", checkIn: null, checkOut: null, status: "Absent", method: null },
];

const securityIncidents = [
  { id: "INC-001", type: "Unauthorized Access", location: "Main Gate", time: "2024-01-15 02:30", status: "Resolved", description: "Attempted entry after curfew" },
  { id: "INC-002", type: "Medical Emergency", location: "Block A", time: "2024-01-15 14:20", status: "Resolved", description: "Student fainted in corridor" },
  { id: "INC-003", type: "Suspicious Activity", location: "Parking Area", time: "2024-01-15 22:15", status: "Under Investigation", description: "Unknown person loitering" },
];

const SecurityAttendance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isReportIncidentOpen, setIsReportIncidentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("attendance");

  const filteredAttendance = attendanceRecords.filter(record => {
    const matchesSearch = record.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800";
      case "Absent": return "bg-red-100 text-red-800";
      case "Late": return "bg-yellow-100 text-yellow-800";
      case "Resolved": return "bg-blue-100 text-blue-800";
      case "Under Investigation": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Absent": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "Late": return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const totalStudents = 1200;
  const presentToday = attendanceRecords.filter(r => r.status === "Present").length;
  const absentToday = attendanceRecords.filter(r => r.status === "Absent").length;
  const activeIncidents = securityIncidents.filter(i => i.status === "Under Investigation").length;

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
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Attendance & Security</h1>
                  <p className="text-muted-foreground">Monitor student attendance and security incidents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{presentToday}</div>
              <p className="text-xs text-muted-foreground">{Math.round((presentToday / totalStudents) * 100)}% attendance rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{absentToday}</div>
              <p className="text-xs text-muted-foreground">Requires follow-up</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeIncidents}</div>
              <p className="text-xs text-muted-foreground">Under investigation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Cameras</CardTitle>
              <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Active cameras</p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          <Button
            variant={activeTab === "attendance" ? "default" : "outline"}
            onClick={() => setActiveTab("attendance")}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Attendance</span>
          </Button>
          <Button
            variant={activeTab === "security" ? "default" : "outline"}
            onClick={() => setActiveTab("security")}
            className="flex items-center space-x-2"
          >
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </Button>
        </div>

        {activeTab === "attendance" && (
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance</CardTitle>
              <CardDescription>Track student check-in and check-out times</CardDescription>

              {/* Search and Filter */}
              <div className="flex items-center space-x-4 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check-in Time</TableHead>
                    <TableHead>Check-out Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{record.student}</div>
                            <div className="text-sm text-muted-foreground">{record.room}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{record.room}</TableCell>
                      <TableCell>{record.checkIn || "Not checked in"}</TableCell>
                      <TableCell>{record.checkOut || "Not checked out"}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(record.status)}
                          <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{record.method || "N/A"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                          {record.status === "Absent" && (
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              Mark Present
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Security Incidents</CardTitle>
                    <CardDescription>Monitor and manage security incidents</CardDescription>
                  </div>
                  <Dialog open={isReportIncidentOpen} onOpenChange={setIsReportIncidentOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Report Incident</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Report Security Incident</DialogTitle>
                        <DialogDescription>Log a new security incident</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="incidentType">Incident Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unauthorized">Unauthorized Access</SelectItem>
                              <SelectItem value="medical">Medical Emergency</SelectItem>
                              <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                              <SelectItem value="theft">Theft</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" placeholder="Enter location" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Input id="description" placeholder="Describe the incident" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="time">Time of Incident</Label>
                          <Input id="time" type="datetime-local" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Report Incident</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Incident ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityIncidents.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell className="font-medium">{incident.id}</TableCell>
                        <TableCell>{incident.type}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{incident.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>{incident.time}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(incident.status)}>{incident.status}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{incident.description}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                            {incident.status === "Under Investigation" && (
                              <Button variant="ghost" size="sm" className="text-green-600">
                                Resolve
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Security Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Camera Feed</CardTitle>
                  <CardDescription>Main gate surveillance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Live feed placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                  <CardDescription>Quick access to emergency services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold">🚑</span>
                        </div>
                        <div>
                          <p className="font-medium">Medical Emergency</p>
                          <p className="text-sm text-muted-foreground">108</p>
                        </div>
                      </div>
                      <Button size="sm">Call</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">🚔</span>
                        </div>
                        <div>
                          <p className="font-medium">Police</p>
                          <p className="text-sm text-muted-foreground">100</p>
                        </div>
                      </div>
                      <Button size="sm">Call</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-bold">🚒</span>
                        </div>
                        <div>
                          <p className="font-medium">Fire Department</p>
                          <p className="text-sm text-muted-foreground">101</p>
                        </div>
                      </div>
                      <Button size="sm">Call</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SecurityAttendance;
