import { createContext, useEffect, type ReactNode } from "react";
import { useCurrentUser } from "../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginUser,
  signoutUser,
  getCurrentUser,
  createUser,
} from "../services/apiUser";
import { setAccessToken } from "../services/axiosInstance";
import { toast } from "sonner";
import type { LoginFormData, SignupFormData } from "../schema/user.schema";

type AuthContextType = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: any) => Promise<void>;
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
      setAccessToken(data.accessToken);
      const userData = await getCurrentUser();
      queryClient.setQueryData(["currentUser"], userData);
      toast.success("Login successful");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to Login",
      );
    },
  });

  const signupMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Account created successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Account creation failed",
      );
    },
  });

  const logoutMutation = useMutation({
    mutationFn: signoutUser,
    onSuccess: () => {
      setAccessToken(null);
      queryClient.setQueryData(["currentUser"], null);
      queryClient.clear();
      toast.success("You are logged out!");
    },
  });

  const value = {
    user: data?.data ?? null,
    isAuthenticated: !!data?.data,
    isLoading,
    login: async (formData: LoginFormData) => {
      await loginMutation.mutateAsync(formData);
    },
    logout: async () => {
      await logoutMutation.mutateAsync();
    },
    signup: async (formData: SignupFormData) => {
      await signupMutation.mutateAsync(formData);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
