import { queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function useSessionCookiesQuery() {
  const actions  = useAuthStore(state=>state.actions);
  const pathname = usePathname();
  let queryKeyConfig = queryKeys.session.isExist;
  const { data, isSuccess, error, refetch } = useQuery({
    queryFn: queryKeyConfig.queryFn,
    queryKey: queryKeyConfig.queryKey
  });

  useEffect(() => {
    if (isSuccess) {
      if (!data.data.ok) actions.setIsLoading(false);
    }
  }, [isSuccess, data, actions]);

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  useEffect(() => {
    if (error) {
      actions.setIsLoading(false);
    }
  }, [error, actions]);

  return {
    isExistSession: !!data?.data.ok
  };
}
