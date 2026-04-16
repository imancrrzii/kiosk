import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (error) => {
        console.error("Query error:", error);
      },
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    },
  },
});