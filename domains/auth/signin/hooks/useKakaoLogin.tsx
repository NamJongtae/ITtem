import { useCustomRouter } from "@/shared/common/hooks/useCustomRouter";

export default function useKakaoLogin() {
  const { navigate } = useCustomRouter();
  const kakaoLogin = () => {
    navigate({
      type: "push",
      url: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&prompt=login`
    });
  };

  return { kakaoLogin };
}
