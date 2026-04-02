import { useRef } from "react";
import { Upload } from "lucide-react";
import {
  type UseFormSetValue,
  type FieldError,
  type FieldValues,
  type Path,
  type PathValue,
  type Merge,
} from "react-hook-form";

interface HasImages {
  images?: File[];
}

interface ImageUploadProps<T extends FieldValues & HasImages> {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setValue: UseFormSetValue<T>;
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}

export default function ImageUpload<T extends FieldValues & HasImages>({
  files,
  setFiles,
  setValue,
  error,
}: ImageUploadProps<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);
    if (!selected.length) return;

    const updatedFiles = [...files, ...selected];
    if (updatedFiles.length > 3) {
      alert("You can only upload a maximum of 3 images.");
      return;
    }

    setFiles(updatedFiles);

    //  Cast "images" as Path<T> and the value as PathValue
    setValue("images" as Path<T>, updatedFiles as PathValue<T, Path<T>>, {
      shouldValidate: true,
    });

    event.target.value = "";
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    setValue("images" as Path<T>, updatedFiles as PathValue<T, Path<T>>, {
      shouldValidate: true,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <label className="block mb-2 font-medium">Photos (Max 3)</label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors"
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
        {files.length === 0 && (
          <div className="text-sm text-muted-foreground">
            Click to upload (Maximum 3 images)*{" "}
            <p>At least One image is required</p>
          </div>
        )}

        {files.length > 0 && (
          <div className="space-y-3 text-left mt-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-t pt-2"
              >
                <div>
                  <p className="text-sm font-medium text-primary">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-red-500 font-semibold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
    </div>
  );
}
