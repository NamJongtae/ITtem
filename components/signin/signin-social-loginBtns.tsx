import Image from 'next/image';

export default function SigninSocialLoginBtns() {
  return (
    <div className="relative flex flex-col gap-3">
      <button className="relative mt-5 text-sm bg-[#FEE500] py-3 rounded-md">
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
      <button className="relative mb-5 text-sm bg-white py-3 rounded-md">
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
