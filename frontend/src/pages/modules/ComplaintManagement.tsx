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
import { MessageSquare, AlertTriangle, CheckCircle, Clock, Wrench, Plus, Search, Filter, User } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const complaints = [
  { id: "COMP-001", student: "John Doe", room: "A-101", category: "Maintenance", title: "Leaky faucet", description: "Water leaking from bathroom faucet", status: "In Progress", priority: "Medium", date: "2024-01-15", assignedTo: "Maintenance Team" },
  { id: "COMP-002", student: "Jane Smith", room: "A-102", category: "Electrical", title: "Power outage", description: "No electricity in room", status: "Resolved", priority: "High", date: "2024-01-14", assignedTo: "Electrical Team" },
  { id: "COMP-003", student: "Mike Johnson", room: "B-201", category: "Cleaning", title: "Room cleaning", description: "Room needs deep cleaning", status: "Pending", priority: "Low", date: "2024-01-13", assignedTo: null },
  { id: "COMP-004", student: "Sarah Wilson", room: "C-301", category: "WiFi", title: "Internet issues", description: "Slow internet connection", status: "In Progress", priority: "Medium", date: "2024-01-12", assignedTo: "IT Support" },
];

const ComplaintManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddComplaintOpen, setIsAddComplaintOpen] = useState(false);

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status.toLowerCase().replace(" ", "-") === statusFilter;
    const matchesCategory = categoryFilter === "all" || complaint.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "In Progress": return <Wrench className="h-4 w-4 text-blue-600" />;
      case "Resolved": return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const totalComplaints = complaints.length;
  const resolvedComplaints = complaints.filter(c => c.status === "Resolved").length;
  const pendingComplaints = complaints.filter(c => c.status === "Pending").length;
  const inProgressComplaints = complaints.filter(c => c.status === "In Progress").length;

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
                <MessageSquare className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Complaint & Maintenance</h1>
                  <p className="text-muted-foreground">Track issues and maintenance requests</p>
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
              <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalComplaints}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolvedComplaints}</div>
              <p className="text-xs text-muted-foreground">{Math.round((resolvedComplaints / totalComplaints) * 100)}% resolution rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressComplaints}</div>
              <p className="text-xs text-muted-foreground">Being worked on</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingComplaints}</div>
              <p className="text-xs text-muted-foreground">Awaiting assignment</p>
            </CardContent>
          </Card>
        </div>

        {/* Complaint Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Complaint Tracker</CardTitle>
                <CardDescription>Monitor and manage all maintenance requests and issues</CardDescription>
              </div>
              <Dialog open={isAddComplaintOpen} onOpenChange={setIsAddComplaintOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Complaint</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Report New Issue</DialogTitle>
                    <DialogDescription>Submit a maintenance request or complaint</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="student">Student Name</Label>
                      <Input id="student" placeholder="Enter student name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="room">Room Number</Label>
                      <Input id="room" placeholder="Enter room number" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="cleaning">Cleaning</SelectItem>
                          <SelectItem value="wifi">WiFi</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="title">Issue Title</Label>
                      <Input id="title" placeholder="Brief title of the issue" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Detailed description of the issue" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit Complaint</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search complaints..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="wifi">WiFi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Complaint ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{complaint.student}</div>
                          <div className="text-sm text-muted-foreground">{complaint.room}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{complaint.category}</TableCell>
                    <TableCell>{complaint.title}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(complaint.status)}
                        <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>{complaint.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Update
                        </Button>
                        {complaint.status !== "Resolved" && (
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
      </main>
    </div>
  );
};

export default ComplaintManagement;
