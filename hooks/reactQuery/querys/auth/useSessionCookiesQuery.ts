import { queryKeys } from "@/queryKeys";
import { authSlice } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useSessionCookiesQuery() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = router.pathname;
  let queryKeyConfig = queryKeys.session.isExist;
  const { data, isSuccess, error, refetch } = useQuery({
    queryFn: queryKeyConfig.queryFn,
    queryKey: queryKeyConfig.queryKey,
  });

  useEffect(() => {
    if (isSuccess) {
      if (!data.data.ok) dispatch(authSlice.actions.setIsLoading(false));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  useEffect(() => {
    if (error) {
      dispatch(authSlice.actions.setIsLoading(false));
    }
  }, [error, dispatch]);

  return {
    isExistSession: !!data?.data.ok,
  };
}
