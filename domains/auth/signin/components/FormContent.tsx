import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import LinkGroup from "./LinkGroup";
import LoginBtn from "./LoginBtn";
import SocialLoginBtns from "./SociaLoginBtns";
import useSigninFieldRef from "../hooks/useSigninFieldRef";
import CloseBtn from "./modal/CloseBtn";
import { useFocusing } from "@/shared/common/hooks/useFocusing";

interface IProps {
  isModal?: boolean;
}

export default function FormContent({ isModal }: IProps) {
  const { emailRef, googleLoginBtnRef, closeBtnRef } = useSigninFieldRef();

  useFocusing(emailRef);

  return (
    <>
      <p className="font-bold text-xl leading-8 whitespace-pre-wrap mb-8">
        {"중고거래의 시작,\n잇템과 함께하세요 :)"}
      </p>
      <EmailField
        isModal={isModal}
        emailRef={emailRef}
        closeBtnRef={closeBtnRef}
      />
      <PasswordField />

      <LinkGroup isModal={isModal} />

      <LoginBtn />

      <SocialLoginBtns
        isModal={isModal}
        googleLoginBtnRef={googleLoginBtnRef}
      />

      {isModal && (
        <CloseBtn
          ref={closeBtnRef}
          emailRef={emailRef}
          googleLoginBtnRef={googleLoginBtnRef}
        />
      )}
    </>
  );
}
