import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, Bed, CheckCircle, XCircle, Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import api, { apiRequest } from "@/lib/api";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [blockFilter, setBlockFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await apiRequest(api.rooms.getAll);
      setRooms(data);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBlock = blockFilter === "all" || room.block === blockFilter;
    const matchesStatus = statusFilter === "all" || room.status.toLowerCase().replace(" ", "-") === statusFilter;
    return matchesSearch && matchesBlock && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "Occupied": return "bg-red-100 text-red-800";
      case "Partially Occupied": return "bg-yellow-100 text-yellow-800";
      case "Maintenance": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Available": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Occupied": return <XCircle className="h-4 w-4 text-red-600" />;
      case "Partially Occupied": return <Users className="h-4 w-4 text-yellow-600" />;
      default: return <XCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(room => room.status === "Available").length;
  const occupiedRooms = rooms.filter(room => room.status === "Occupied").length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

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
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Room & Allocation System</h1>
                  <p className="text-muted-foreground">Manage room assignments and availability</p>
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
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRooms}</div>
              <p className="text-xs text-muted-foreground">Across 3 blocks</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableRooms}</div>
              <p className="text-xs text-muted-foreground">Ready for allocation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{occupancyRate}%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Required</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Room Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Room Directory</CardTitle>
                <CardDescription>Manage room allocations and availability</CardDescription>
              </div>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Room</span>
              </Button>
            </div>
            
            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search rooms..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={blockFilter} onValueChange={setBlockFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blocks</SelectItem>
                  <SelectItem value="A">Block A</SelectItem>
                  <SelectItem value="B">Block B</SelectItem>
                  <SelectItem value="C">Block C</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="partially-occupied">Partially Occupied</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <Card key={room.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{room.id}</CardTitle>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(room.status)}
                        <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                      </div>
                    </div>
                    <CardDescription>
                      Block {room.block} • Floor {room.floor} • {room.type} Room
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Capacity:</span>
                        <div className="flex items-center space-x-1">
                          <Bed className="h-4 w-4" />
                          <span>{room.occupied}/{room.capacity}</span>
                        </div>
                      </div>
                      
                      {room.students.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-sm font-medium">Current Students:</span>
                          <div className="space-y-1">
                            {room.students.map((student, index) => (
                              <div key={index} className="text-sm text-muted-foreground">
                                • {student}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        {room.status === "Available" && (
                          <Button size="sm" className="flex-1">
                            Allocate
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RoomManagement;
