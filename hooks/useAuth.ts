import { useDispatch } from "react-redux";
import useAuthQuery from "./querys/useAuthQuery";
import { AppDispatch } from "@/store/store";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { authSlice } from "@/store/authSlice";
import { toast } from "react-toastify";
import useSessionCookiesMutate from "./querys/useSessionCookiesMutate";

export default function useAuth() {
  const { getSessionCookiesMuate, isExistSession, resetIsExistSession } =
    useSessionCookiesMutate();
  const { user, authIsLoading, authError, refetchAuth } =
    useAuthQuery(isExistSession);

  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = [searchParams].toString();

  useEffect(() => {
    getSessionCookiesMuate();
  }, [pathname, params, getSessionCookiesMuate]);

  useEffect(() => {
    resetIsExistSession();
    if (user) {
      dispatch(authSlice.actions.saveAuth(user));
    }
  }, [user, resetIsExistSession, dispatch]);

  useEffect(() => {
    if (authError) {
      toast.warn((authError as any).response.data.message);
      dispatch(authSlice.actions.resetAuth());
      dispatch(authSlice.actions.setIsLoading(false));
    }
  }, [authError, dispatch]);

  return { user, authIsLoading, authError, refetchAuth };
}
