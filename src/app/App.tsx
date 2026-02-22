import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ReactQueryProvider from "./providers/ReactQueryProvider";

export default function App() {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />;
      </AuthProvider>
    </ReactQueryProvider>
  );
}
