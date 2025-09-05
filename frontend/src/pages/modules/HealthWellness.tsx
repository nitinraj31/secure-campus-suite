import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Stethoscope, Calendar, Users, Activity, Plus, Search, Filter, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const medicalRecords = [
  { id: "MED-001", student: "John Doe", room: "A-101", condition: "Fever", doctor: "Dr. Smith", date: "2024-01-15", status: "Under Treatment" },
  { id: "MED-002", student: "Jane Smith", room: "A-102", condition: "Headache", doctor: "Dr. Johnson", date: "2024-01-14", status: "Recovered" },
  { id: "MED-003", student: "Mike Johnson", room: "B-201", condition: "Allergy", doctor: "Dr. Brown", date: "2024-01-13", status: "Monitoring" },
];

const appointments = [
  { id: "APP-001", student: "John Doe", doctor: "Dr. Smith", type: "Consultation", date: "2024-01-16", time: "10:00 AM", status: "Scheduled" },
  { id: "APP-002", student: "Sarah Wilson", doctor: "Dr. Johnson", type: "Follow-up", date: "2024-01-16", time: "2:00 PM", status: "Scheduled" },
];

const emergencyContacts = [
  { id: 1, name: "Campus Clinic", phone: "022-12345678", type: "Medical" },
  { id: 2, name: "Nearest Hospital", phone: "022-87654321", type: "Emergency" },
  { id: 3, name: "Ambulance", phone: "108", type: "Emergency" },
];

const HealthWellness = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("records");

  const filteredRecords = medicalRecords.filter(record =>
    record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Recovered": return "bg-green-100 text-green-800";
      case "Under Treatment": return "bg-blue-100 text-blue-800";
      case "Monitoring": return "bg-yellow-100 text-yellow-800";
      case "Scheduled": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalRecords = medicalRecords.length;
  const activeCases = medicalRecords.filter(r => r.status === "Under Treatment" || r.status === "Monitoring").length;
  const todayAppointments = appointments.filter(a => a.date === "2024-01-16").length;

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
                <Heart className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Health & Wellness</h1>
                  <p className="text-muted-foreground">Medical records and health services</p>
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
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecords}</div>
              <p className="text-xs text-muted-foreground">Medical records</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCases}</div>
              <p className="text-xs text-muted-foreground">Under treatment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments}</div>
              <p className="text-xs text-muted-foreground">Scheduled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emergency Contacts</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{emergencyContacts.length}</div>
              <p className="text-xs text-muted-foreground">Available</p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          <Button
            variant={activeTab === "records" ? "default" : "outline"}
            onClick={() => setActiveTab("records")}
            className="flex items-center space-x-2"
          >
            <Stethoscope className="h-4 w-4" />
            <span>Medical Records</span>
          </Button>
          <Button
            variant={activeTab === "appointments" ? "default" : "outline"}
            onClick={() => setActiveTab("appointments")}
            className="flex items-center space-x-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Appointments</span>
          </Button>
          <Button
            variant={activeTab === "emergency" ? "default" : "outline"}
            onClick={() => setActiveTab("emergency")}
            className="flex items-center space-x-2"
          >
            <Phone className="h-4 w-4" />
            <span>Emergency</span>
          </Button>
        </div>

        {activeTab === "records" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Medical Records</CardTitle>
                  <CardDescription>Track student health records and treatments</CardDescription>
                </div>
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Record</span>
                </Button>
              </div>

              {/* Search */}
              <div className="relative max-w-sm mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.student}</div>
                          <div className="text-sm text-muted-foreground">{record.room}</div>
                        </div>
                      </TableCell>
                      <TableCell>{record.condition}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm">
                            Update
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "appointments" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Medical Appointments</CardTitle>
                  <CardDescription>Schedule and manage medical appointments</CardDescription>
                </div>
                <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Schedule Appointment</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule New Appointment</DialogTitle>
                      <DialogDescription>Book a medical appointment for a student</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="student">Student</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select student" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="john">John Doe</SelectItem>
                            <SelectItem value="jane">Jane Smith</SelectItem>
                            <SelectItem value="mike">Mike Johnson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="doctor">Doctor</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                            <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                            <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="type">Appointment Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consultation">Consultation</SelectItem>
                            <SelectItem value="follow-up">Follow-up</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" type="time" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Schedule Appointment</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.student}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            Cancel
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "emergency" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
                <CardDescription>Quick access to medical emergency services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {emergencyContacts.map((contact) => (
                    <Card key={contact.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{contact.name}</h3>
                            <p className="text-sm text-muted-foreground">{contact.type}</p>
                            <p className="text-lg font-mono mt-2">{contact.phone}</p>
                          </div>
                          <Button size="sm" className="ml-4">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Tips & Resources</CardTitle>
                <CardDescription>Wellness information and preventive care</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Daily Health Tips</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Stay Hydrated</h4>
                        <p className="text-sm text-muted-foreground">Drink at least 8 glasses of water daily</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Regular Exercise</h4>
                        <p className="text-sm text-muted-foreground">30 minutes of physical activity daily</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">Healthy Sleep</h4>
                        <p className="text-sm text-muted-foreground">7-9 hours of sleep per night</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Emergency Procedures</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium text-red-600">Medical Emergency</h4>
                        <p className="text-sm text-muted-foreground">Call 108 immediately</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium text-orange-600">Fire Emergency</h4>
                        <p className="text-sm text-muted-foreground">Call 101 and evacuate</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium text-blue-600">Security Emergency</h4>
                        <p className="text-sm text-muted-foreground">Call 100 or campus security</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default HealthWellness;
