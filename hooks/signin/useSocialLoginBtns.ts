import { useRouter } from "next/navigation";

export default function useSocialLoginBtns() {
  const router = useRouter();

  const handleClickGoogleLogin = () => {
    router.push(`https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
		&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile&prompt=login`);
  };

  const handleClickKaKaoLogin = () => {
    router.push(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&prompt=login`
    );
  };

  return { handleClickGoogleLogin, handleClickKaKaoLogin };
}
