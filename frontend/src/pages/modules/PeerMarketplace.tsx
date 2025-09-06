import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Search, Tag } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const marketplaceItems = [
  { id: 1, name: "Used Textbook - Calculus", seller: "John Doe", price: 25, status: "Available" },
  { id: 2, name: "Bicycle - Mountain Bike", seller: "Jane Smith", price: 150, status: "Sold" },
  { id: 3, name: "Laptop Charger", seller: "Mike Johnson", price: 30, status: "Available" },
  { id: 4, name: "Desk Lamp", seller: "Sarah Wilson", price: 15, status: "Available" },
];

const PeerMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = marketplaceItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "Sold": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
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
                <ShoppingCart className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Peer-to-Peer Marketplace</h1>
                  <p className="text-muted-foreground">Buy and sell items securely within campus</p>
                </div>
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              List New Item
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 max-w-sm">
          <Input
            placeholder="Search items or sellers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-10 text-muted-foreground h-4 w-4" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Marketplace Listings</CardTitle>
            <CardDescription>Browse and manage items for sale</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Price ($)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.seller}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" disabled={item.status === "Sold"}>
                        Buy
                      </Button>
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

export default PeerMarketplace;
