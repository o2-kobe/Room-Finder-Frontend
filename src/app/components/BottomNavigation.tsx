import { useNavigate, useLocation } from "react-router";
import { Home, Map, PlusCircle, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const allowedRoles = ["hostelManager", "landlord"];

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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around h-16 max-w-screen-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          if (item.label === "Add Listing") {
            if (!isAuthenticated || !allowedRoles.includes(user?.role))
              return null;
          }

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "fill-primary" : ""}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
