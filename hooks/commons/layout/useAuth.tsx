import { useDispatch } from "react-redux";
import useAuthQuery from "@/hooks/react-query/queries/auth/useAuthQuery";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { authSlice } from "@/store/slice/auth-slice";
import { toast } from "react-toastify";
import useSessionCookiesQuery from "@/hooks/react-query/queries/auth/useSessionCookiesQuery";

export default function useAuth() {
  const { isExistSession } = useSessionCookiesQuery();

  const { user, authIsLoading, authError } = useAuthQuery(isExistSession);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      dispatch(
        authSlice.actions.saveAuth({
          uid: user.uid,
          nickname: user.nickname,
          email: user.email,
          profileImg: user.profileImg,
        })
      );
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (authError) {
      toast.warn((authError as any).response.data.message);
      dispatch(authSlice.actions.resetAuth());
      dispatch(authSlice.actions.setIsLoading(false));
    }
  }, [authError, dispatch]);

  return { user, authIsLoading, authError };
}
