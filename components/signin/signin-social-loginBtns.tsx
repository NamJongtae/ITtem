import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SigninSocialLoginBtns() {
  const router = useRouter();

  const handleClickGoogleLogin = () => {
    router.push(`https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
		&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile`);
  };

  const handleClickKaKaoLogin = () => {
    router.push(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&prompt=login`
    );
  };

  return (
    <div className="relative flex flex-col gap-3">
      <button
        onClick={handleClickKaKaoLogin}
        type="button"
        className="relative mt-5 text-sm bg-[#FEE500] py-3 rounded-md"
      >
        <Image
          className="absolute left-5 top-1/2 -translate-y-1/2"
          src="/icons/kakao_icon.svg"
          alt=""
          width={20}
          height={20}
        />
        카카오로 시작하기
      </button>
      <div
        className="absolute w-full h-[1px] bg-gray-600 before:absolute before:h-5 before:-top-[9px] before:left-1/2 before:-translate-x-1/2 before:text-xs before:text-gray-700 before:px-2 before:bg-gray-100 before:content-[attr(data-before)]"
        role="line"
        data-before="3초만에 시작하기"
      />
      <button
        type="button"
        onClick={() => handleClickGoogleLogin()}
        className="relative mb-5 text-sm bg-white py-3 rounded-md"
      >
        <Image
          className="absolute left-5 top-1/2 -translate-y-1/2"
          src="/icons/google_icon.svg"
          alt=""
          width={20}
          height={20}
        />
        구글로 시작하기
      </button>
    </div>
  );
}
