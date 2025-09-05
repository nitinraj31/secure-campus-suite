import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UserCheck, Users, Clock, CheckCircle, XCircle, Plus, Search, Filter, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const visitors = [
  { id: "VIS-001", name: "Alice Johnson", student: "John Doe", room: "A-101", purpose: "Family Visit", checkIn: "2024-01-15 10:00", checkOut: null, status: "Checked In", contact: "+91-9876543210" },
  { id: "VIS-002", name: "Bob Smith", student: "Jane Smith", room: "A-102", purpose: "Delivery", checkIn: "2024-01-15 09:30", checkOut: "2024-01-15 09:45", status: "Checked Out", contact: "+91-9876543211" },
  { id: "VIS-003", name: "Carol Davis", student: "Mike Johnson", room: "B-201", purpose: "Medical", checkIn: null, checkOut: null, status: "Approved", contact: "+91-9876543212" },
  { id: "VIS-004", name: "David Wilson", student: "Sarah Wilson", room: "C-301", purpose: "Interview", checkIn: null, checkOut: null, status: "Pending", contact: "+91-9876543213" },
];

const leaveRequests = [
  { id: "LEAVE-001", student: "John Doe", room: "A-101", reason: "Family Function", fromDate: "2024-01-20", toDate: "2024-01-22", status: "Approved", appliedDate: "2024-01-10" },
  { id: "LEAVE-002", student: "Jane Smith", room: "A-102", reason: "Medical", fromDate: "2024-01-18", toDate: "2024-01-19", status: "Pending", appliedDate: "2024-01-15" },
];

const VisitorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddVisitorOpen, setIsAddVisitorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("visitors");

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || visitor.status.toLowerCase().replace(" ", "-") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Checked In": return "bg-green-100 text-green-800";
      case "Checked Out": return "bg-blue-100 text-blue-800";
      case "Approved": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Checked In": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Checked Out": return <XCircle className="h-4 w-4 text-blue-600" />;
      case "Approved": return <CheckCircle className="h-4 w-4 text-yellow-600" />;
      case "Pending": return <Clock className="h-4 w-4 text-gray-600" />;
      default: return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const totalVisitors = visitors.length;
  const checkedInVisitors = visitors.filter(v => v.status === "Checked In").length;
  const pendingApprovals = visitors.filter(v => v.status === "Pending").length;
  const todayVisits = visitors.filter(v => v.checkIn?.startsWith("2024-01-15")).length;

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
                <UserCheck className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Leave & Visitor Management</h1>
                  <p className="text-muted-foreground">Track student leaves and visitor entries</p>
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
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVisitors}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Currently Checked In</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{checkedInVisitors}</div>
              <p className="text-xs text-muted-foreground">Active visitors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Visits</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayVisits}</div>
              <p className="text-xs text-muted-foreground">Check-ins today</p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          <Button
            variant={activeTab === "visitors" ? "default" : "outline"}
            onClick={() => setActiveTab("visitors")}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Visitor Log</span>
          </Button>
          <Button
            variant={activeTab === "leaves" ? "default" : "outline"}
            onClick={() => setActiveTab("leaves")}
            className="flex items-center space-x-2"
          >
            <UserCheck className="h-4 w-4" />
            <span>Leave Requests</span>
          </Button>
        </div>

        {activeTab === "visitors" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Visitor Management</CardTitle>
                  <CardDescription>Track and manage visitor entries and approvals</CardDescription>
                </div>
                <Dialog open={isAddVisitorOpen} onOpenChange={setIsAddVisitorOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Visitor</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Register New Visitor</DialogTitle>
                      <DialogDescription>Add a new visitor entry</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="visitorName">Visitor Name</Label>
                        <Input id="visitorName" placeholder="Enter visitor name" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="student">Visiting Student</Label>
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
                        <Label htmlFor="purpose">Purpose of Visit</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="family">Family Visit</SelectItem>
                            <SelectItem value="delivery">Delivery</SelectItem>
                            <SelectItem value="medical">Medical</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="contact">Contact Number</Label>
                        <Input id="contact" placeholder="Enter contact number" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="expectedTime">Expected Visit Time</Label>
                        <Input id="expectedTime" type="datetime-local" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Register Visitor</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Search and Filter */}
              <div className="flex items-center space-x-4 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search visitors..."
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
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="checked-out">Checked Out</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visitor ID</TableHead>
                    <TableHead>Visitor</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check-in Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisitors.map((visitor) => (
                    <TableRow key={visitor.id}>
                      <TableCell className="font-medium">{visitor.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{visitor.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{visitor.contact}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{visitor.student}</div>
                          <div className="text-sm text-muted-foreground">{visitor.room}</div>
                        </div>
                      </TableCell>
                      <TableCell>{visitor.purpose}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(visitor.status)}
                          <Badge className={getStatusColor(visitor.status)}>{visitor.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{visitor.checkIn || "Not checked in"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          {visitor.status === "Approved" && (
                            <Button variant="ghost" size="sm" className="text-green-600">
                              Check In
                            </Button>
                          )}
                          {visitor.status === "Checked In" && (
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              Check Out
                            </Button>
                          )}
                          {visitor.status === "Pending" && (
                            <>
                              <Button variant="ghost" size="sm" className="text-green-600">
                                Approve
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                Reject
                              </Button>
                            </>
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

        {activeTab === "leaves" && (
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>Manage student leave applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Leave ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell className="font-medium">{leave.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{leave.student}</div>
                          <div className="text-sm text-muted-foreground">{leave.room}</div>
                        </div>
                      </TableCell>
                      <TableCell>{leave.reason}</TableCell>
                      <TableCell>{leave.fromDate} to {leave.toDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(leave.status)}>{leave.status}</Badge>
                      </TableCell>
                      <TableCell>{leave.appliedDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          {leave.status === "Pending" && (
                            <>
                              <Button variant="ghost" size="sm" className="text-green-600">
                                Approve
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                Reject
                              </Button>
                            </>
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
      </main>
    </div>
  );
};

export default VisitorManagement;
