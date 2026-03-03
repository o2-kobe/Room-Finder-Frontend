import { useNavigate } from "react-router";
import { User, LogOut } from "lucide-react";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import PropertiesofOwner from "../components/PropertiesofOwner";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <DesktopNavigation />

        {/* Header */}
        <header className="bg-primary text-primary-foreground px-4 py-6">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-xl">{user?.username || "User"}</h1>
                  <p className="text-sm text-primary font-bold rounded-md mt-1 bg-gray-300 w-fit p-1">
                    {user?.role?.toUpperCase() || "Member"}
                  </p>
                </div>
              </div>
              <button
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
                className="px-3 py-1 bg-white/10 hover:bg-red-500 rounded-full transition-colors flex items-center gap-1"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        </header>

        <PropertiesofOwner />

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
}
