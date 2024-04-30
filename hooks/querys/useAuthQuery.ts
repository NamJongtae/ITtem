import { AUTH_QUERY_KEY } from "@/constants/constant";
import { getUser } from "@/lib/api/auth";
import { AuthData } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function useAuthQuery(isExistSession: boolean) {
  const pathname = usePathname();

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
  }, [pathname, refetchAuth, isExistSession]);

  return { user, authIsLoading, authError, refetchAuth };
}
