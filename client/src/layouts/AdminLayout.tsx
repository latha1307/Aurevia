import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { AdminSidebar } from "../components/AdminSidebar";
import { useApp } from "../contexts/AppContext";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";

export function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useApp();
  const navigate = useNavigate();

  // Check if user has admin access
  const hasAdminAccess = user && (user.role === "admin" || user.role === "super_admin");

  useEffect(() => {
    if (!hasAdminAccess) {
      navigate("/auth/admin-login");
    }
  }, [hasAdminAccess, navigate]);

  if (!hasAdminAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Access denied. Redirecting to admin login...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          } mt-16 p-6`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
