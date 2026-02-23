import { createContext, type ReactNode } from "react";
import { useCurrentUser } from "../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, signoutUser, getCurrentUser } from "../services/apiUser";

type AuthContextType = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useCurrentUser();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      // after successful login, immediately fetch the user data
      // (the backend has set the httpOnly cookie), and cache it.
      // do NOT store the accessToken in localStorage.
      try {
        const userData = await getCurrentUser();
        queryClient.setQueryData(["currentUser"], userData);
      } catch (err) {
        // if the fetch fails, the login was likely incomplete
        console.error("Failed to fetch user after login", err);
        throw err;
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: signoutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      localStorage.removeItem("currentUser");
    },
  });

  const value = {
    user: data?.data ?? null,
    isAuthenticated: !!data?.data,
    isLoading,
    login: async (formData: any) => {
      await loginMutation.mutateAsync(formData);
    },
    logout: async () => {
      await logoutMutation.mutateAsync();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
