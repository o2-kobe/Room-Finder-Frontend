import { useContext, useEffect } from "react";
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
  // when the app starts we look for a cached user in localStorage so
  // that the UI can render immediately without waiting for the network.
  // we still *always* run the query however; disabling it created a
  // secondary problem where, after a successful login, the query would
  // never execute and `isAuthenticated` would stay false.
  const stored = localStorage.getItem("currentUser");
  const parsed = stored
    ? (() => {
        try {
          return JSON.parse(stored);
        } catch {
          return undefined;
        }
      })()
    : undefined;

  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialData: parsed,
  });

  useEffect(() => {
    if (query.data) {
      try {
        localStorage.setItem("currentUser", JSON.stringify(query.data));
      } catch {
        // ignore storage errors
      }
    }
  }, [query.data]);

  useEffect(() => {
    if (query.isError) {
      localStorage.removeItem("currentUser");
    }
  }, [query.isError]);

  return query;
}
