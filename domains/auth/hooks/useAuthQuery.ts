import { queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "../store/auth-store";
import { useQuery } from "@tanstack/react-query";

export default function useAuthQuery() {
  const loading = useAuthStore((state) => state.isLoading);

  const {
    data: user,
    isLoading,
    error: authError,
    refetch: refetchAuth
  } = useQuery({
    ...queryKeys.auth.info,
    retry: 0,
    staleTime: Infinity,
    enabled: false
  });


  const authIsLoading = loading || isLoading;

  return { user, authIsLoading, authError, refetchAuth };
}
