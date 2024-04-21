import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Loading from "../commons/loading";
import useSocialLoginMutate from '@/hooks/querys/useSocialLoginMutate';
import { SocialType } from '@/types/apiTypes';
import { toast } from 'react-toastify';

export default function SigninSocialLoginBtns() {
  const { socialLoginMutate, socialLoginLoading } = useSocialLoginMutate();
  const handleClickGoogleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const accessToken = credentialResponse.access_token;

      socialLoginMutate({
        socialType: SocialType.GOOGLE,
        accessToken,
      });
    },
    onError: () => {
      toast.warn("로그인 중 에러가 발생하였습니다.\n잠시 후 다시 시도해주세요.")
    },
  });

  if (socialLoginLoading) {
    return <Loading />;
  }

  return (
    <div className="relative flex flex-col gap-3">
      <button
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
