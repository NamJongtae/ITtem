import { useDispatch } from "react-redux";
import useAuthQuery from "./querys/useAuthQuery";
import { AppDispatch } from "@/store/store";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { authSlice } from "@/store/authSlice";
import { toast } from "react-toastify";
import useSessionCookiesMutate from "./querys/useSessionCookiesMutate";

export default function useAuth() {
  const { user, authIsLoading, authError, refetchAuth } = useAuthQuery();

  const onRefetchAuth = () => {
    refetchAuth();
  }

  const { getSessionCookiesMuate } = useSessionCookiesMutate(onRefetchAuth);

  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    getSessionCookiesMuate();
  }, [pathname, [searchParams].toString()]);

  useEffect(() => {
    if (user) {
      dispatch(authSlice.actions.saveAuth(user));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (authError) {
      toast.warn((authError as any).response.data.message);
      dispatch(authSlice.actions.resetAuth());
    }
  }, [authError]);

  return { user, authIsLoading, authError, refetchAuth };
}
