import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Building2, Home } from "lucide-react";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { type ListingType } from "../types";
import CreateListingForm from "../components/CreateListingForm";

export default function AddListingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"select-type" | "form">("select-type");
  const [providerType, setProviderType] = useState<ListingType | null>(null);

  const handleSelectType = (type: ListingType) => {
    setProviderType(type);
    setStep("form");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

      <CreateListingForm
        handleSubmit={handleSubmit}
        providerType={providerType}
      />

      <BottomNavigation />
    </div>
  );
}
