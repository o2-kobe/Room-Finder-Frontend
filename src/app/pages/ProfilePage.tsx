import { useState } from "react";
import { useNavigate } from "react-router";
import { User, LogOut, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import { mockListings } from "../data/mockData";
import { ListingCard } from "../components/ListingCard";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");

  // Mock user data - in a real app this would come from auth context
  const userListings = mockListings.slice(0, 3);
  const activeListings = userListings.filter(
    (l) => l.availability !== "inactive",
  );
  const inactiveListings = userListings.filter(
    (l) => l.availability === "inactive",
  );

  const handleToggleStatus = (listingId: string) => {
    // In a real app, this would update the backend
    alert(`Toggle listing ${listingId} status (Demo mode)`);
  };

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
              onClick={() => navigate("/auth")}
              className="px-3 py-1 bg-white/10 hover:bg-red-500 rounded-full transition-colors flex items-center gap-1"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 w-1/3">
            <p className="text-sm text-primary-foreground/80 mb-1">
              Active Listings
            </p>
            <p className="text-2xl">{activeListings.length}</p>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-3 border-b-2 transition-colors ${
              activeTab === "active"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Active ({activeListings.length})
          </button>
          <button
            onClick={() => setActiveTab("inactive")}
            className={`px-4 py-3 border-b-2 transition-colors ${
              activeTab === "inactive"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Inactive ({inactiveListings.length})
          </button>
        </div>

        {/* Listings Grid */}
        <div className="space-y-4">
          {activeTab === "active" && activeListings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl">
              <p className="text-muted-foreground mb-4">
                No active listings yet
              </p>
              <button
                onClick={() => navigate("/add-listing")}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors"
              >
                Add Your First Listing
              </button>
            </div>
          )}

          {activeTab === "active" &&
            activeListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                <ListingCard listing={listing} />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      const path =
                        listing.type === "hostel"
                          ? `/hostel/${listing.id}`
                          : `/rental/${listing.id}`;
                      navigate(path);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleToggleStatus(listing.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
                  >
                    <ToggleLeft className="w-4 h-4" />
                    <span>Mark Inactive</span>
                  </button>
                </div>
              </div>
            ))}

          {activeTab === "inactive" && inactiveListings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl">
              <p className="text-muted-foreground">No inactive listings</p>
            </div>
          )}

          {activeTab === "inactive" &&
            inactiveListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl p-4 shadow-sm opacity-60"
              >
                <ListingCard listing={listing} />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleToggleStatus(listing.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-success text-success-foreground rounded-xl hover:bg-success/90 transition-colors"
                  >
                    <ToggleRight className="w-4 h-4" />
                    <span>Reactivate</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
