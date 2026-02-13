import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Building2, Home, Upload, MapPin } from "lucide-react";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { type ListingType } from "../types";

export default function AddListingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"select-type" | "form">("select-type");
  const [providerType, setProviderType] = useState<ListingType | null>(null);

  const handleSelectType = (type: ListingType) => {
    setProviderType(type);
    setStep("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    alert("Listing submitted successfully! (Demo mode)");
    navigate("/profile");
  };

  if (step === "select-type") {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <DesktopNavigation />

        <header className="bg-white border-b border-border px-4 py-4">
          <div className="max-w-screen-xl mx-auto flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl">Add New Listing</h1>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <h2 className="text-2xl text-center mb-2">Choose Provider Type</h2>
          <p className="text-center text-muted-foreground mb-8">
            Select the type of accommodation you're listing
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleSelectType("hostel")}
              className="p-8 bg-white rounded-2xl border-2 border-border hover:border-primary transition-all shadow-sm hover:shadow-md"
            >
              <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl mb-2">Hostel Manager</h3>
              <p className="text-sm text-muted-foreground">
                List university hostel rooms and accommodations with multiple
                room types
              </p>
            </button>

            <button
              onClick={() => handleSelectType("private")}
              className="p-8 bg-white rounded-2xl border-2 border-border hover:border-primary transition-all shadow-sm hover:shadow-md"
            >
              <Home className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl mb-2">Private Landlord</h3>
              <p className="text-sm text-muted-foreground">
                List individual rooms, apartments, or houses for rent
              </p>
            </button>
          </div>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <DesktopNavigation />

      <header className="bg-white border-b border-border px-4 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center gap-3">
          <button
            onClick={() => setStep("select-type")}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl">
            Add {providerType === "hostel" ? "Hostel" : "Private Rental"}
          </h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block mb-2">Title *</label>
            <input
              type="text"
              required
              placeholder={
                providerType === "hostel"
                  ? "e.g., University of Ghana Main Hostel"
                  : "e.g., Cozy Studio Apartment"
              }
              className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block mb-2">Description *</label>
            <textarea
              required
              rows={4}
              placeholder="Describe the accommodation..."
              className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg">Location</h3>

            <div>
              <label className="block mb-2">University *</label>
              <select
                required
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Select university</option>
                <option value="ug">University of Ghana</option>
                <option value="knust">KNUST</option>
                <option value="ucc">University of Cape Coast</option>
                <option value="atu">Accra Technical University</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Area *</label>
              <input
                type="text"
                required
                placeholder="e.g., Legon, East Legon"
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block mb-2">Full Address *</label>
              <input
                type="text"
                required
                placeholder="Street address"
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div className="p-4 bg-muted/50 rounded-xl border-2 border-dashed border-border">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-center text-sm text-muted-foreground">
                Map picker would go here
              </p>
              <p className="text-center text-xs text-muted-foreground mt-1">
                Drag marker to exact location
              </p>
            </div>
          </div>

          {/* Price */}
          {providerType === "private" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <label className="block mb-2">Monthly Rent (GH₵)</label>
              <input
                type="number"
                placeholder="1500"
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          )}

          {/* Room Types (for hostels) */}
          {providerType === "hostel" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg mb-4">Room Types</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add different room types available in your hostel
              </p>
              <button
                type="button"
                className="w-full py-3 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-muted/50 transition-colors text-muted-foreground"
              >
                + Add Room Type
              </button>
            </div>
          )}

          {/* Availability Status */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block mb-2">Availability Status *</label>
            <select
              required
              className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
            >
              <option value="available">Available</option>
              <option value="recently-updated">Recently Updated</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg">Contact Information</h3>

            <div>
              <label className="block mb-2">Contact Name *</label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+233 XX XXX XXXX"
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block mb-2">Email (Optional)</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block mb-2">Photos</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 10MB
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors"
          >
            Submit Listing
          </button>
        </form>
      </div>

      <BottomNavigation />
    </div>
  );
}
