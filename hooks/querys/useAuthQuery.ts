import { queryKeys } from "@/queryKeys";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useAuthQuery(isExistSession: boolean) {
  const router = useRouter();
  const pathname = router.pathname;
  const params = router.query;
  const myInfo = useSelector((state: RootState) => state.auth.user);

  const {
    data: user,
    isLoading: authIsLoading,
    error: authError,
    refetch: refetchAuth,
  } = useQuery({
    ...queryKeys.auth.info(myInfo?.uid),
    retry: 0,
    enabled: isExistSession,
  });

  useEffect(() => {
    if (isExistSession) refetchAuth();
  }, [pathname, params, refetchAuth, isExistSession]);

  return { user, authIsLoading, authError, refetchAuth };
}
