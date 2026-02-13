import { useNavigate, useLocation } from "react-router";
import { Home, Map, PlusCircle, User } from "lucide-react";

export function DesktopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Explore", path: "/explore" },
    { icon: Map, label: "Map", path: "/map" },
    { icon: PlusCircle, label: "Add Listing", path: "/add-listing" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="hidden md:block bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl">StudentRooms Ghana</span>
          </button>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
