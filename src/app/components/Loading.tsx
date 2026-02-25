import { LoaderIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoaderIcon className="animate-spin text-3xl" />
      <p>Loading Page</p>
    </div>
  );
};
export default Loading;
