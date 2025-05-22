import SigninEmailField from "./signin-email-field";
import SigninPasswordField from "./signin-password-field";
import SigninLinks from "./signin-links";
import SigninLoginBtn from "./signin-login-btn";
import SigninSocialLoginBtns from "./signin-social-login-Btns";
import useSigninFieldRef from "../../hooks/signin/useSigninFieldRef";
import SigninModalCloseBtn from "./modal/signin-modal-close-Btn";
import { useFocusing } from "@/hooks/useFocusing";

interface IProps {
  isModal?: boolean;
}

export default function SigninFormContent({ isModal }: IProps) {
  const { emailRef, googleLoginBtnRef, closeBtnRef } = useSigninFieldRef();

  useFocusing(emailRef);

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

      <SigninLinks isModal={isModal} />

      <SigninLoginBtn />

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
