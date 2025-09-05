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
import { UtensilsCrossed, Star, Users, ChefHat, Plus, Search, Filter, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const menuItems = [
  { id: 1, day: "Monday", meal: "Breakfast", items: ["Poha", "Tea", "Fruits"], rating: 4.2, feedback: 45 },
  { id: 2, day: "Monday", meal: "Lunch", items: ["Dal", "Rice", "Vegetables", "Raita"], rating: 4.5, feedback: 67 },
  { id: 3, day: "Monday", meal: "Dinner", items: ["Chapati", "Paneer Curry", "Salad"], rating: 4.3, feedback: 52 },
];

const feedback = [
  { id: 1, student: "John Doe", meal: "Lunch", rating: 5, comment: "Delicious food!", date: "2024-01-15" },
  { id: 2, student: "Jane Smith", meal: "Dinner", rating: 4, comment: "Good variety", date: "2024-01-15" },
  { id: 3, student: "Mike Johnson", meal: "Breakfast", rating: 3, comment: "Could be hotter", date: "2024-01-15" },
];

const MessServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mealFilter, setMealFilter] = useState("all");
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  const filteredMenu = menuItems.filter(item => {
    const matchesSearch = item.items.some(itemName => itemName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMeal = mealFilter === "all" || item.meal.toLowerCase() === mealFilter;
    return matchesSearch && matchesMeal;
  });

  const averageRating = menuItems.reduce((sum, item) => sum + item.rating, 0) / menuItems.length;
  const totalFeedback = feedback.length;
  const positiveFeedback = feedback.filter(f => f.rating >= 4).length;

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
                <UtensilsCrossed className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Mess & Food Services</h1>
                  <p className="text-muted-foreground">Manage meal planning and food service operations</p>
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
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Out of 5 stars</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFeedback}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Positive Feedback</CardTitle>
              <ChefHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round((positiveFeedback / totalFeedback) * 100)}%</div>
              <p className="text-xs text-muted-foreground">Satisfaction rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,089</div>
              <p className="text-xs text-muted-foreground">Using mess services</p>
            </CardContent>
          </Card>
        </div>

        {/* Menu Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Weekly Menu</CardTitle>
                  <CardDescription>Current week's meal plan</CardDescription>
                </div>
                <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Menu</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Menu Item</DialogTitle>
                      <DialogDescription>Add a new meal to the menu</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="day">Day</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monday">Monday</SelectItem>
                            <SelectItem value="tuesday">Tuesday</SelectItem>
                            <SelectItem value="wednesday">Wednesday</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="meal">Meal Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select meal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="breakfast">Breakfast</SelectItem>
                            <SelectItem value="lunch">Lunch</SelectItem>
                            <SelectItem value="dinner">Dinner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="items">Menu Items</Label>
                        <Textarea id="items" placeholder="Enter menu items (one per line)" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Menu Item</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Search and Filter */}
              <div className="flex items-center space-x-4 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={mealFilter} onValueChange={setMealFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by meal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Meals</SelectItem>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMenu.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{item.day}</span>
                        <Badge variant="outline">{item.meal}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{item.rating}</span>
                        <span className="text-sm text-muted-foreground">({item.feedback} reviews)</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.items.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>Student reviews and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.student}</span>
                        <Badge variant="outline">{item.meal}</Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < item.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.comment}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MessServices;
