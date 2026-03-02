import { useState } from "react";
import { Building2, Home } from "lucide-react";
import { BottomNavigation } from "../components/BottomNavigation";
import { DesktopNavigation } from "../components/DesktopNavigation";
import MobileHeader from "../components/MobileHeader";
import ProtectedRoute from "../components/ProtectedRoute";
import HostelListingForm from "../components/HostelListingForm";
import PrivateListingForm from "../components/PrivateListingForm";

export default function AddListingPage() {
  const [step, setStep] = useState<"select-type" | "form">("select-type");
  const [providerType, setProviderType] = useState<any | null>(null);

  const handleSelectType = (type: any) => {
    setProviderType(type);
    setStep("form");
  };

  const goBack = () => setStep("select-type");

  if (step === "select-type") {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background pb-20 md:pb-0">
          <DesktopNavigation />

          <MobileHeader heading="Add New Listing" />

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
                <h3 className="text-xl mb-2">Hostel</h3>
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
                <h3 className="text-xl mb-2">Private Rental</h3>
                <p className="text-sm text-muted-foreground">
                  List individual rooms, apartments, or houses for rent
                </p>
              </button>
            </div>
          </div>

          <BottomNavigation />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 relative">
      <DesktopNavigation />

      <MobileHeader
        heading={`Add ${providerType === "hostel" ? "Hostel" : "Private Rental"}`}
      />

      {providerType === "hostel" ? (
        <HostelListingForm goBack={goBack} />
      ) : (
        <PrivateListingForm goBack={goBack} />
      )}

      <BottomNavigation />
    </div>
  );
}
