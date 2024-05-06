import { SESSION_QUERY_KEY } from '@/constants/constant';
import { getSessionCookies } from "@/lib/api/auth";
import { authSlice } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { SessionCookiesResponseData } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useSessionCookiesQuery() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = router.pathname;
  
  const { data, isSuccess, error, refetch } = useQuery<
    AxiosResponse<SessionCookiesResponseData>,
    AxiosError
  >({
    queryFn: getSessionCookies,
    queryKey: SESSION_QUERY_KEY,
  });

  useEffect(() => {
    if (isSuccess) {
      if (!data.data.ok) dispatch(authSlice.actions.setIsLoading(false));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(()=>{
    refetch();
  },[pathname, refetch])

  useEffect(() => {
    if (error) {
      dispatch(authSlice.actions.setIsLoading(false));
    }
  }, [error, dispatch]);

  return {
    isExistSession: !!data?.data.ok,
  };
}
