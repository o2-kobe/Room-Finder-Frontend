import { createContext, useEffect, type ReactNode } from "react";
import { useCurrentUser } from "../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, signoutUser, getCurrentUser } from "../services/apiUser";
import { setAccessToken } from "../services/axiosInstance";

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

  const { data, isLoading, isError } = useCurrentUser();
  useEffect(() => {
    if (isError) {
      queryClient.setQueryData(["currentUser"], null);
    }
  }, [isError, queryClient]);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      try {
        setAccessToken(data.accessToken);
        const userData = await getCurrentUser();
        queryClient.setQueryData(["currentUser"], userData);
      } catch (err) {
        console.error("Failed to fetch user after login", err);
        throw err;
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: signoutUser,
    onSuccess: () => {
      setAccessToken(null);
      queryClient.setQueryData(["currentUser"], null);
      queryClient.clear();
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
