import SigninEmailField from "./signin-email-field";
import SigninPasswordField from "./signin-password-field";
import SigninLinks from "./signin-links";
import SiginLoginBtn from "./sigin-loginBtn";
import SigninSocialLoginBtns from "./signin-social-loginBtns";
import SigninModalCloseBtn from "./modal/signin-modal-closeBtn";
import useSigninFormContent from "@/hooks/signin/useSigninFormContent";
import { MutableRefObject } from "react";

interface IProps {
  isModal?: boolean;
}

export default function SigninFormContent({ isModal }: IProps) {
  const { emailRef, googleLoginBtnRef, closeBtnRef } = useSigninFormContent();

  return (
    <>
      <p className="font-bold text-xl leading-8 whitespace-pre-wrap mb-8">
        {"중고거래의 시작,\n잇템과 함께하세요 :)"}
      </p>
      <SigninEmailField
        isModal={isModal}
        emailRef={emailRef}
        closeBtnRef={closeBtnRef}
      />
      <SigninPasswordField />

      <SigninLinks />

      <SiginLoginBtn />

      <SigninSocialLoginBtns
        isModal={isModal}
        googleLoginBtnRef={googleLoginBtnRef}
      />

      {isModal && (
        <SigninModalCloseBtn
          ref={closeBtnRef}
          emailRef={emailRef}
          googleLoginBtnRef={googleLoginBtnRef}
        />
      )}
    </>
  );
}
