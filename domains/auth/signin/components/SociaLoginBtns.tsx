import KakaoLoginBtn from "./KakaoLoginBtn";
import GoogleLoginBtn from "./GoogleLoginBtn";

interface IProps {
  isModal?: boolean;
  googleLoginBtnRef: React.RefObject<HTMLButtonElement | null>;
}

export default function SocialLoginBtns({
  isModal,
  googleLoginBtnRef
}: IProps) {
  return (
    <div className="relative flex flex-col gap-3">
      <KakaoLoginBtn />
      <div
        className={`absolute w-full h-[1px] bg-gray-600 before:absolute before:h-5 before:-top-[9px] before:left-1/2 before:-translate-x-1/2 before:text-xs before:text-gray-700 before:px-2 ${
          isModal ? "before:bg-white" : "before:bg-gray-100"
        } before:content-[attr(data-before)]`}
        data-before="3초만에 시작하기"
      />
      <GoogleLoginBtn ref={googleLoginBtnRef} />
    </div>
  );
}
