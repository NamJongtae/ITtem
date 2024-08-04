import { queryKeys } from "@/query-keys/query-keys";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useAuthQuery(isExistSession: boolean) {
  const pathname = usePathname();
  const params = useParams();
  const myInfo = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.isLoading);

  const {
    data: user,
    isLoading,
    error: authError,
    refetch: refetchAuth,
  } = useQuery({
    ...queryKeys.auth.info(myInfo?.uid),
    retry: 0,
    enabled: isExistSession,
  });

  const authIsLoading = loading || isLoading;

  useEffect(() => {
    if (isExistSession) {
      refetchAuth();
    }
  }, [pathname, params, refetchAuth, isExistSession]);

  return { user, authIsLoading, authError, refetchAuth };
}
