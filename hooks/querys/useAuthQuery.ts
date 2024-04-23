import { AUTH_QUERY_KEY } from "@/constants/constant";
import { getUser } from "@/lib/api/auth";
import { AuthData, SessionCookiesResponseData } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export default function useAuthQuery(
  data: AxiosResponse<SessionCookiesResponseData, any> | undefined
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
    enabled: !!data?.data.ok,
  });

  return { user, authIsLoading, authError, refetchAuth };
}
