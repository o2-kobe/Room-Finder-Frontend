import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { privateSchema, type PrivateFormData } from "../schema/listing.schema";
import Input from "./FormInput";
import ImageUpload from "./ImageUpload";
import AmenitiesInput from "./AmenitiesInput";
import api from "../services/axiosInstance";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import LocationSearch from "./LocationSearch";

export default function PrivateListingForm({ goBack }: { goBack: () => void }) {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PrivateFormData>({
    resolver: zodResolver(privateSchema),
    defaultValues: {
      title: "",
      description: "",
      listingType: "private",
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
        monthlyPrice: 0,
      },
      availabilityStatus: "available",
      contact: {
        phone: "",
      },
    },
  });

  const onSubmit: SubmitHandler<PrivateFormData> = async (data) => {
    toast.loading("Creating Rental Listing");
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("listingType", "private");
    formData.append("amenities", JSON.stringify(data.amenities));
    formData.append("location", JSON.stringify(data.location));
    formData.append("pricing", JSON.stringify(data.pricing));
    formData.append("availabilityStatus", data.availabilityStatus);
    formData.append("contact", JSON.stringify(data.contact));

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    await api.post("/listings", formData);
    navigate("/");
    toast.dismiss();
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

      <h3 className="hidden md:block text-center my-4">
        CREATE PRIVATE RENTAL FORM
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Title"
          type="text"
          isSubmitting={isSubmitting}
          placeholder="e.g., Cozy Studio Apartment"
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

        <AmenitiesInput control={control} errors={errors} />

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

          <LocationSearch<PrivateFormData>
            setValue={setValue}
            addressField="location.address"
            coordinatesField="location.coordinates"
          />
        </div>

        <Input
          isSubmitting={isSubmitting}
          label="Monthly rent &#40;Gh&#8353;&#41;"
          type="text"
          placeholder="1000"
          error={errors.pricing?.monthlyPrice}
          {...register("pricing.monthlyPrice", {
            valueAsNumber: true,
          })}
        />

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
        </div>

        <ImageUpload
          files={selectedFiles}
          setFiles={setSelectedFiles}
          setValue={setValue}
          error={errors.images}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 bg-primary ${
            isSubmitting ? "bg-blue-950" : ""
          } text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors`}
        >
          {isSubmitting ? "Creating..." : "Create Private Rental"}
        </button>
      </form>
    </div>
  );
}
