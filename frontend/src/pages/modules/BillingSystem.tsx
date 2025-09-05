import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign, Receipt, TrendingUp, Plus, Search, Filter, Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const bills = [
  { id: "BILL-001", student: "John Doe", room: "A-101", amount: 25000, status: "Paid", dueDate: "2024-02-01", paidDate: "2024-01-28" },
  { id: "BILL-002", student: "Jane Smith", room: "A-102", amount: 25000, status: "Pending", dueDate: "2024-02-01", paidDate: null },
  { id: "BILL-003", student: "Mike Johnson", room: "B-201", amount: 30000, status: "Overdue", dueDate: "2024-01-15", paidDate: null },
  { id: "BILL-004", student: "Sarah Wilson", room: "C-301", amount: 20000, status: "Paid", dueDate: "2024-01-15", paidDate: "2024-01-10" },
];

const BillingSystem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddBillOpen, setIsAddBillOpen] = useState(false);

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bill.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalRevenue = bills.filter(bill => bill.status === "Paid").reduce((sum, bill) => sum + bill.amount, 0);
  const pendingAmount = bills.filter(bill => bill.status === "Pending").reduce((sum, bill) => sum + bill.amount, 0);
  const overdueAmount = bills.filter(bill => bill.status === "Overdue").reduce((sum, bill) => sum + bill.amount, 0);

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
                <CreditCard className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Financial & Billing System</h1>
                  <p className="text-muted-foreground">Manage fee collection and financial operations</p>
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
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">5 bills pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{overdueAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Billing Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Billing Management</CardTitle>
                <CardDescription>Track payments, generate invoices, and manage financial records</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
                <Dialog open={isAddBillOpen} onOpenChange={setIsAddBillOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Generate Bill</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Generate New Bill</DialogTitle>
                      <DialogDescription>Create a new bill for a student</DialogDescription>
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
                        <Label htmlFor="amount">Amount (₹)</Label>
                        <Input id="amount" type="number" placeholder="Enter amount" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input id="dueDate" type="date" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Generate Bill</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search bills..."
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.id}</TableCell>
                    <TableCell>{bill.student}</TableCell>
                    <TableCell>{bill.room}</TableCell>
                    <TableCell>₹{bill.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(bill.status)}>{bill.status}</Badge>
                    </TableCell>
                    <TableCell>{bill.dueDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        {bill.status === "Pending" && (
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <Mail className="h-4 w-4 mr-1" />
                            Remind
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
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

export default BillingSystem;
