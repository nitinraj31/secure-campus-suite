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
import { Phone, MessageSquare, Bell, Megaphone, Mail, Send, Plus, Search, Filter, Users, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const announcements = [
  { id: "ANN-001", title: "Hostel Maintenance Schedule", message: "Electrical maintenance will be conducted on Block A from 2-4 PM tomorrow.", priority: "Medium", audience: "All Students", date: "2024-01-15", status: "Published" },
  { id: "ANN-002", title: "New Mess Menu", message: "Updated menu for next week is now available. Check the mess board for details.", priority: "Low", audience: "All Students", date: "2024-01-14", status: "Published" },
  { id: "ANN-003", title: "Emergency Drill", message: "Fire safety drill scheduled for tomorrow at 10 AM. All students must participate.", priority: "High", audience: "All Students", date: "2024-01-13", status: "Published" },
];

const messages = [
  { id: "MSG-001", from: "Admin", to: "John Doe", subject: "Room Change Request", content: "Your room change request has been approved.", date: "2024-01-15", read: true },
  { id: "MSG-002", from: "Warden", to: "Jane Smith", subject: "Outstanding Fees", content: "Please clear your outstanding mess fees by end of week.", date: "2024-01-14", read: false },
  { id: "MSG-003", from: "Admin", to: "Mike Johnson", subject: "Visitor Approval", content: "Your visitor request has been approved for tomorrow.", date: "2024-01-13", read: true },
];

const CommunicationHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewAnnouncementOpen, setIsNewAnnouncementOpen] = useState(false);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("announcements");

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalAnnouncements = announcements.length;
  const unreadMessages = messages.filter(m => !m.read).length;
  const emergencyAlerts = announcements.filter(a => a.priority === "High").length;

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
                <Phone className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Communication Hub</h1>
                  <p className="text-muted-foreground">Announcements and messaging system</p>
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
              <CardTitle className="text-sm font-medium">Total Announcements</CardTitle>
              <Megaphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAnnouncements}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadMessages}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emergency Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{emergencyAlerts}</div>
              <p className="text-xs text-muted-foreground">High priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Recipients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,089</div>
              <p className="text-xs text-muted-foreground">Students reached</p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          <Button
            variant={activeTab === "announcements" ? "default" : "outline"}
            onClick={() => setActiveTab("announcements")}
            className="flex items-center space-x-2"
          >
            <Megaphone className="h-4 w-4" />
            <span>Announcements</span>
          </Button>
          <Button
            variant={activeTab === "messages" ? "default" : "outline"}
            onClick={() => setActiveTab("messages")}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Messages</span>
          </Button>
          <Button
            variant={activeTab === "emergency" ? "default" : "outline"}
            onClick={() => setActiveTab("emergency")}
            className="flex items-center space-x-2"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Emergency</span>
          </Button>
        </div>

        {activeTab === "announcements" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>Broadcast important messages to students</CardDescription>
                </div>
                <Dialog open={isNewAnnouncementOpen} onOpenChange={setIsNewAnnouncementOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>New Announcement</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Announcement</DialogTitle>
                      <DialogDescription>Broadcast a message to students</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Announcement title" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Announcement content" />
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
                      <div className="grid gap-2">
                        <Label htmlFor="audience">Target Audience</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Students</SelectItem>
                            <SelectItem value="block-a">Block A</SelectItem>
                            <SelectItem value="block-b">Block B</SelectItem>
                            <SelectItem value="block-c">Block C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Publish Announcement</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Search */}
              <div className="relative max-w-sm mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAnnouncements.map((announcement) => (
                  <Card key={announcement.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                          <Badge variant="outline">{announcement.status}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{announcement.date}</span>
                        <span>•</span>
                        <span>{announcement.audience}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{announcement.message}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Delete
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          <Send className="h-4 w-4 mr-1" />
                          Send Push
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "messages" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Send and receive direct messages</CardDescription>
                </div>
                <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>New Message</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send New Message</DialogTitle>
                      <DialogDescription>Send a direct message to a student</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="recipient">Recipient</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipient" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="john">John Doe</SelectItem>
                            <SelectItem value="jane">Jane Smith</SelectItem>
                            <SelectItem value="mike">Mike Johnson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Message subject" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="content">Message</Label>
                        <Textarea id="content" placeholder="Message content" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Send Message</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">{message.from}</TableCell>
                      <TableCell>{message.to}</TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>{message.date}</TableCell>
                      <TableCell>
                        <Badge className={message.read ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {message.read ? "Read" : "Unread"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Reply
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
          <Card>
            <CardHeader>
              <CardTitle>Emergency Broadcasting</CardTitle>
              <CardDescription>Send emergency alerts to all students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center space-y-2">
                    <AlertTriangle className="h-8 w-8" />
                    <span>Fire Emergency</span>
                  </Button>
                  <Button className="h-20 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center space-y-2">
                    <AlertTriangle className="h-8 w-8" />
                    <span>Medical Emergency</span>
                  </Button>
                  <Button className="h-20 bg-orange-600 hover:bg-orange-700 text-white flex flex-col items-center justify-center space-y-2">
                    <AlertTriangle className="h-8 w-8" />
                    <span>Security Alert</span>
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Custom Emergency Message</h3>
                  <div className="space-y-4">
                    <Textarea placeholder="Enter emergency message..." className="min-h-20" />
                    <div className="flex items-center space-x-4">
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="bg-red-600 hover:bg-red-700">
                        <Bell className="h-4 w-4 mr-2" />
                        Send Emergency Alert
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default CommunicationHub;
