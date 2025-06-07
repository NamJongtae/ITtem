import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAuthStore from "../../store/authStore";
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
