import { ArrowLeft } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingSchema, type ListingFormData } from "../schema/listing.schema";
import Input from "./FormInput";
import RoomType from "./RoomType";
import api from "../services/axiosInstance";
import ImageUpload from "./ImageUpload";
// import { LocationSearch } from "./LocationSearch";

interface CreateListingFormProps {
  providerType: string | null;
  goBack: () => void;
}

export default function CreateListingForm({
  providerType,
  goBack,
}: CreateListingFormProps) {
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      listingType: providerType === "hostel" ? "hostel" : "private",
      images: [],
      amenities: [],
      location: {
        area: "",
        university: "",
        address: "",
        coordinates: {
          type: "Point",
          coordinates: [0, 0],
        },
      },
      pricing: {
        monthlyPrice: undefined,
        priceRange: undefined,
      },
      roomTypes: [],
      availabilityStatus: "available",
      contact: {
        phone: "",
        email: "",
        website: "",
      },
    },
  });

  const onSubmit: SubmitHandler<ListingFormData> = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("listingType", data.listingType);

    formData.append("location", JSON.stringify(data.location));
    formData.append("pricing", JSON.stringify(data.pricing));
    formData.append("contact", JSON.stringify(data.contact));

    if (data.roomTypes) {
      formData.append("roomTypes", JSON.stringify(data.roomTypes));
    }

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    await api.post("/listings", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <button
        onClick={goBack}
        title="Go back"
        className="absolute top-20 left-0 flex items-center mb-5 underline"
      >
        <span className="p-1">
          <ArrowLeft size={16} className="bg-muted rounded-full" />{" "}
        </span>
        Go back
      </button>

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
            {...register("location.university")}
            error={errors.location?.university}
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
            error={errors.location?.area}
            {...register("location.area")}
          />

          <Input
            isSubmitting={isSubmitting}
            label="Address"
            type="text"
            placeholder="Street address"
            error={errors.location?.address}
            {...register("location.address")}
          />

          {/* Location Search */}

          {/* <LocationSearch
          // value={form.location}
          // onChange={(location) =>
          //   setForm((prev) => ({
          //     ...prev,
          //     location,
          //   }))
          /> */}
        </div>

        {/* Price */}
        {providerType === "private" && (
          <Input
            isSubmitting={isSubmitting}
            label="Monthly rent &#40;Gh&#8353;&#41;"
            type="text"
            placeholder="1000"
            error={errors.pricing?.monthlyPrice}
            {...register("pricing.monthlyPrice")}
          />
        )}

        {/* Room Types (for hostels) */}
        {providerType === "hostel" && (
          <RoomType register={register} selected={watch("roomTypes") || []} />
        )}

        {/* Price Range*/}
        {providerType === "hostel" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <h4>Price Range *</h4>
            <div className="flex flex-col md:flex-row justify-between md:justify-around items-start md:items-center gap-4">
              <div className="w-full md:w-auto">
                <label htmlFor="minPrice">
                  Minimum Price &#40;Gh&#8353;&#41;
                </label>
                <br />
                <input
                  id="minPrice"
                  placeholder="1000"
                  className="w-full md:w-auto no-spin px-4 py-3 rounded-xl bg-input-background border focus:border-primary focus:outline-none"
                  type="number"
                  min={0}
                  {...register("pricing.priceRange.min")}
                />
                {errors?.pricing?.priceRange?.min && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pricing?.priceRange?.min.message}
                  </p>
                )}
              </div>

              <div className="w-full md:w-auto">
                <label htmlFor="maxPrice">
                  Maximum Price &#40;Gh&#8353;&#41;
                </label>
                <br />
                <input
                  id="maxPrice"
                  placeholder="5000"
                  className="w-full md:w-auto no-spin px-4 py-3 rounded-xl bg-input-background border focus:border-primary focus:outline-none"
                  type="number"
                  min={0}
                  {...register("pricing.priceRange.max")}
                />
                {errors?.pricing?.priceRange?.max && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pricing?.priceRange?.max.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg">Contact Information</h3>

          <Input
            label="Phone Number"
            isSubmitting={isSubmitting}
            type="tel"
            placeholder="+233 XX XXX XXXX"
            error={errors.contact?.phone}
            {...register("contact.phone")}
          />

          <Input
            isSubmitting={isSubmitting}
            label="Email (optional)"
            type="email"
            placeholder="email@example.com"
            error={errors.contact?.email}
            {...register("contact.email")}
          />

          {providerType === "hostel" && (
            <Input
              isSubmitting={isSubmitting}
              label="Hostel Website (if you have any)"
              type="text"
              placeholder="https://hostela.gh"
              error={errors.contact?.website}
              {...register("contact.website")}
            />
          )}
        </div>

        {/* Images */}
        <ImageUpload
          files={selectedFiles}
          setFiles={setSelectedFiles}
          setValue={setValue}
          error={errors.images}
        />

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
