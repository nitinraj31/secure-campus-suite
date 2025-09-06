import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Phone, MapPin, BellRing } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const emergencyContacts = [
  { id: 1, name: "Campus Security", phone: "123-456-7890", availability: "24/7" },
  { id: 2, name: "Medical Emergency", phone: "987-654-3210", availability: "24/7" },
  { id: 3, name: "Fire Department", phone: "555-123-4567", availability: "24/7" },
];

const evacuationAlerts = [
  { id: 1, location: "Block A", alertTime: "2024-01-15 14:30", status: "Active" },
  { id: 2, location: "Block B", alertTime: "2024-01-14 09:00", status: "Resolved" },
];

const EmergencyResponse = () => {
  const [alertActive, setAlertActive] = useState(false);

  const toggleAlert = () => {
    setAlertActive(!alertActive);
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
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Emergency Response System</h1>
                  <p className="text-muted-foreground">Automated alerts and safety protocols for emergencies</p>
                </div>
              </div>
            </div>
            <Button onClick={toggleAlert} className={alertActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}>
              {alertActive ? "Deactivate Alert" : "Activate Alert"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {alertActive && (
          <Alert className="mb-6 border-red-200 bg-red-50 flex items-center space-x-4">
            <BellRing className="h-6 w-6 text-red-600" />
            <AlertDescription>
              <strong>Emergency Alert Active:</strong> Evacuate affected areas immediately and follow safety protocols.
            </AlertDescription>
          </Alert>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
            <CardDescription>Quick access to essential emergency numbers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Availability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emergencyContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.availability}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evacuation Alerts</CardTitle>
            <CardDescription>Recent and active evacuation notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Alert Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evacuationAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>{alert.location}</TableCell>
                    <TableCell>{alert.alertTime}</TableCell>
                    <TableCell>{alert.status}</TableCell>
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

export default EmergencyResponse;
