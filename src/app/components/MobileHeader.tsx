import { HomeIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

const MobileHeader = ({
  heading,
  children,
}: {
  heading: string;
  children?: ReactNode;
}) => {
  const navigate = useNavigate();
  return (
    <header className="bg-white border-b border-border px-4 py-4 flex-shrink-0 md:hidden shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 bg-muted hover:bg-gray-400 rounded-full transition-colors"
          >
            <HomeIcon size={25} />
          </button>
          <h1 className="text-xl">{heading}</h1>
        </div>
        {children && <div>{children}</div>}
      </div>
    </header>
  );
};
export default MobileHeader;
