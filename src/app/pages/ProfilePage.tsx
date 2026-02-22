import { useEffect } from "react";
import { useNavigate } from "react-router";
import { User, LogOut, LoaderIcon } from "lucide-react";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");

  const { isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderIcon className="animate-spin text-3xl" />
      </div>
    );

  return (
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
                <h1 className="text-xl">Kwame Mensah</h1>
                <p className="text-sm text-primary-foreground/80">
                  Property Manager
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-3 py-1 bg-white/10 hover:bg-red-500 rounded-full transition-colors flex items-center gap-1"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>

          {/* <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 w-1/3">
            <p className="text-sm text-primary-foreground/80 mb-1">
              Active Listings
            </p>
            <p className="text-2xl">{activeListings.length}</p>
          </div> */}
        </div>
      </header>

      <BottomNavigation />
    </div>
  );
}
