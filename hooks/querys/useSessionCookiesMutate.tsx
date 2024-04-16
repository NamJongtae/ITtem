import { getSessionCookies } from "@/lib/api/auth";
import { authSlice } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { SessionCookiesResponseData } from '@/types/apiTypes';
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";

export default function useSessionCookiesMutate(onRefetchAuth: () => void) {
  const dispatch = useDispatch<AppDispatch>();

  const { mutate: getSessionCookiesMuate } = useMutation<
    AxiosResponse<SessionCookiesResponseData>,
    AxiosError
  >({
    mutationFn: getSessionCookies,
    onSuccess: (response) => {
      if (response.data.ok) {
        onRefetchAuth();
      } else {
        dispatch(authSlice.actions.setIsLoading(false));
      }
    },
    onError: () => {
      dispatch(authSlice.actions.setIsLoading(false));
    },
  });

  return { getSessionCookiesMuate };
}
