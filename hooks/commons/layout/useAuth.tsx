import useAuthQuery from "@/hooks/react-query/queries/auth/useAuthQuery";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useSessionCookiesQuery from "@/hooks/react-query/queries/auth/useSessionCookiesQuery";
import useAuthStore from "@/store/auth-store";

export default function useAuth() {
  const { isExistSession } = useSessionCookiesQuery();

  const { user, authIsLoading, authError } = useAuthQuery(isExistSession);

  const actions = useAuthStore((state) => state.actions);

  useEffect(() => {
    if (user) {
      actions.setAuth({
        uid: user.uid,
        nickname: user.nickname,
        email: user.email,
        profileImg: user.profileImg
      });
    }
  }, [user, actions]);

  useEffect(() => {
    if (authError) {
      toast.warn((authError as any).response.data.message);
      actions.resetAuth();
      actions.setIsLoading(false);
    }
  }, [authError, actions]);

  return { user, authIsLoading, authError };
}
