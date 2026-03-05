import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiUser";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 0,
  });
}
