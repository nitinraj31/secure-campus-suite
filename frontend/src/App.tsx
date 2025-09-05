import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import WardenDashboard from "./pages/WardenDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import UserManagement from "./pages/modules/UserManagement";
import RoomManagement from "./pages/modules/RoomManagement";
import BillingSystem from "./pages/modules/BillingSystem";
import MessServices from "./pages/modules/MessServices";
import ComplaintManagement from "./pages/modules/ComplaintManagement";
import VisitorManagement from "./pages/modules/VisitorManagement";
import SecurityAttendance from "./pages/modules/SecurityAttendance";
import CommunicationHub from "./pages/modules/CommunicationHub";
import HealthWellness from "./pages/modules/HealthWellness";
import ExtraServices from "./pages/modules/ExtraServices";
import AdminAnalytics from "./pages/modules/AdminAnalytics";
import IoTIntegration from "./pages/modules/IoTIntegration";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/warden-dashboard"
            element={
              <ProtectedRoute allowedRoles={['Warden']}>
                <WardenDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/rooms" element={<RoomManagement />} />
          <Route path="/billing" element={<BillingSystem />} />
          <Route path="/mess" element={<MessServices />} />
          <Route path="/complaints" element={<ComplaintManagement />} />
          <Route path="/visitors" element={<VisitorManagement />} />
          <Route path="/security" element={<SecurityAttendance />} />
          <Route path="/communication" element={<CommunicationHub />} />
          <Route path="/health" element={<HealthWellness />} />
          <Route path="/services" element={<ExtraServices />} />
          <Route path="/analytics" element={<AdminAnalytics />} />
          <Route path="/iot" element={<IoTIntegration />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */} 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
