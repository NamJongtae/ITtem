import { AUTH_QUERY_KEY } from "@/constants/constant";
import { getUser } from "@/lib/api/auth";
import { AuthData } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";

export default function useAuthQuery(
  isExistSession: boolean
) {
  const {
    data: user,
    isLoading: authIsLoading,
    error: authError,
    refetch: refetchAuth,
  } = useQuery<AuthData>({
    queryFn: getUser,
    queryKey: AUTH_QUERY_KEY,
    retry: 0,
    enabled: isExistSession,
  });

  return { user, authIsLoading, authError, refetchAuth };
}
