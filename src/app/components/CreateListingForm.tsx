import { MapPin, Upload } from "lucide-react";

interface CreateListingFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  providerType: string | null;
}

export default function CreateListingForm({
  handleSubmit,
  providerType,
}: CreateListingFormProps) {
  return (
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

            <input
              type="text"
              name="university"
              list="ghana-universities"
              required
              placeholder="Start typing your university..."
              className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
            />
            <datalist id="ghana-universities">
              <option value="University of Ghana" />
              <option value="Kwame Nkrumah University of Science and Technology" />
              <option value="University of Cape Coast" />
              <option value="University of Education, Winneba" />
              <option value="University for Development Studies" />
              <option value="University of Professional Studies, Accra" />
              <option value="University of Health and Allied Sciences" />
              <option value="Ghana Institute of Management and Public Administration" />
              <option value="Ghana Communication Technology University" />
              <option value="Accra Technical University" />
              <option value="Kumasi Technical University" />
              <option value="Takoradi Technical University" />
              <option value="Ho Technical University" />
              <option value="Koforidua Technical University" />
              <option value="Cape Coast Technical University" />
              <option value="Tamale Technical University" />
              <option value="Sunyani Technical University" />
              <option value="Bolgatanga Technical University" />
              <option value="Ashesi University" />
              <option value="Central University" />
              <option value="Valley View University" />
              <option value="Islamic University College, Ghana" />
              <option value="Methodist University Ghana" />
              <option value="Presbyterian University, Ghana" />
              <option value="Pentecost University" />
              <option value="Lancaster University Ghana" />
              <option value="African University College of Communications" />
              <option value="Garden City University College" />
              <option value="Kings University College" />
              <option value="Wisconsin International University College, Ghana" />
            </datalist>
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
            <input type="file" />
            <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
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
  );
}
