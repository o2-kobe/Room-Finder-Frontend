import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { Toaster } from "sonner";

export default function App() {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />;
        <Toaster richColors position="top-center" expand={true} />
      </AuthProvider>
    </ReactQueryProvider>
  );
}
