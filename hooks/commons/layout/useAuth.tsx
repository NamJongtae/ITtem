import useAuthQuery from "@/hooks/react-query/queries/auth/useAuthQuery";
import { useEffect } from "react";
import useSessionCookiesQuery from "@/hooks/react-query/queries/auth/useSessionCookiesQuery";
import useAuthStore from "@/store/auth-store";
import { usePathname } from "next/navigation";

export default function useAuth() {
  const { isExistSession, sessionQueryIsSuccess, sessionQueryError } =
    useSessionCookiesQuery();
  const { user, authIsLoading, authError, refetchAuth } = useAuthQuery();
  const actions = useAuthStore((state) => state.actions);
  const pathname = usePathname();

  // session 쿠키를 통해 유저 로그인 유무 확인 => 유저 정보 패치
  useEffect(() => {
    if (
      sessionQueryIsSuccess &&
      pathname !== "/refresh-token" &&
      pathname !== "/session-expired"
    ) {
      if (isExistSession) {
        refetchAuth();
      } else {
        actions.resetAuth();
      }
      actions.setIsLoading(false);
    }
  }, [isExistSession, sessionQueryIsSuccess, pathname, actions, refetchAuth]);

  // 로그인 상태 확인 => 전역 상태에 유저 정보 저장
  useEffect(() => {
    if (isExistSession && user) {
      actions.setAuth({
        uid: user.uid,
        nickname: user.nickname,
        email: user.email,
        profileImg: user.profileImg
      });
    }
  }, [user, actions, isExistSession]);

  // 세션 정보 패치 에러 처리
  useEffect(() => {
    if (sessionQueryError) {
      actions.setIsLoading(false);
    }
  }, [sessionQueryError, actions]);

  // 유저 정보 패치 오류 발생시 유저 정보 초기화
  useEffect(() => {
    if (authError) {
      actions.resetAuth();
    }
  }, [authError, actions]);

  return { user, authIsLoading, authError };
}
