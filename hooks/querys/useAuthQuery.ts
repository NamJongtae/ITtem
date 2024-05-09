import { AUTH_QUERY_KEY } from "@/constants/constant";
import { getUser } from "@/lib/api/auth";
import { AuthData } from "@/types/authTypes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useAuthQuery(isExistSession: boolean) {
  const router = useRouter();
  const pathname = router.pathname;
  const params = router.query;

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

  useEffect(() => {
    if (isExistSession) refetchAuth();
  }, [pathname, params, refetchAuth, isExistSession]);

  return { user, authIsLoading, authError, refetchAuth };
}
