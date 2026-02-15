import { MapPin, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingSchema, type ListingFormData } from "../schema/listing.schema";
import Input from "./FormInput";

interface CreateListingFormProps {
  providerType: string | null;
}

export default function CreateListingForm({
  providerType,
}: CreateListingFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      university: "",
      area: "",
      address: "",
      monthlyRent: undefined,
      availabilityStatus: undefined,
      contactName: "",
      phoneNumber: undefined,
      email: "",
      images: [""],
    },
  });

  const onSubmit = (data: ListingFormData) => {
    console.log("Form submitted with data:", data);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    if (newFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
    // Reset input value so user can select the same file again
    event.target.value = "";
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <Input
          label="Title"
          type="text"
          isSubmitting={isSubmitting}
          placeholder={
            providerType === "hostel"
              ? "e.g., University of Ghana Main Hostel"
              : "e.g., Cozy Studio Apartment"
          }
          {...register("title")}
          error={errors?.title}
        />

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <label className="block mb-2">Description *</label>
          <textarea
            rows={4}
            {...register("description")}
            placeholder="Describe the accommodation..."
            className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors resize-none"
          />
          {errors?.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg">Location</h3>

          <Input
            isSubmitting={isSubmitting}
            type="text"
            label="University"
            list="ghana-universities"
            placeholder="Start typing related university"
            {...register("university")}
            error={errors.university}
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

          <Input
            isSubmitting={isSubmitting}
            label="Area"
            type="text"
            placeholder="e.g., Legon, Accra"
            error={errors.area}
            {...register("area")}
          />

          <Input
            isSubmitting={isSubmitting}
            label="Address"
            type="text"
            placeholder="Street address"
            error={errors.address}
            {...register("address")}
          />

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
          <Input
            isSubmitting={isSubmitting}
            label="Monthly rent"
            type="text"
            placeholder="1000"
            error={errors.monthlyRent}
            {...register("monthlyRent")}
          />
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
            {...register("availabilityStatus")}
            className="w-full px-4 py-3 rounded-xl bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
          >
            <option value="">Select status</option>
            <option value="available">Available</option>
            <option value="recently-updated">Recently Updated</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors?.availabilityStatus && (
            <p className="text-red-500 text-sm mt-1">
              {errors.availabilityStatus.message}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg">Contact Information</h3>

          <Input
            isSubmitting={isSubmitting}
            label="Contact Name"
            type="text"
            placeholder="Your name"
            error={errors.contactName}
            {...register("contactName")}
          />

          <Input
            label="Phone Number"
            isSubmitting={isSubmitting}
            type="tel"
            placeholder="+233 XX XXX XXXX"
            error={errors.phoneNumber}
            {...register("phoneNumber")}
          />

          <Input
            isSubmitting={isSubmitting}
            label="Email (optional)"
            type="email"
            placeholder="email@example.com"
            error={errors.email}
            {...register("email")}
          />
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <label className="block mb-2">Photos</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
            {selectedFiles.length > 0 ? (
              <div>
                <p className="text-sm text-primary font-medium mb-3">
                  {selectedFiles.length} file
                  {selectedFiles.length > 1 ? "s" : ""} selected
                </p>
                <div className="space-y-2 text-left">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="text-xs text-muted-foreground border-t pt-2 flex justify-between items-start"
                    >
                      <div>
                        <p className="font-medium text-primary">{file.name}</p>
                        <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="text-red-500 hover:text-red-700 font-semibold ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  Multiple PNG, JPG files up to 10MB each
                </p>
              </div>
            )}
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
