import SigninEmailField from "./signin-email-field";
import SigninPasswordField from "./signin-password-field";
import SigninLinks from "./signin-links";
import SiginLoginBtn from './sigin-loginBtn';
import SigninSocialLoginBtns from "./signin-social-loginBtns";

export default function SigninFormContent() {
  return (
    <>
      <p className="font-bold text-xl leading-8 whitespace-pre-wrap mb-8">
        {"중고거래의 시작,\n잇템과 함께하세요 :)"}
      </p>
      <SigninEmailField />
      <SigninPasswordField />

      <SigninLinks />

      <SiginLoginBtn />

      <SigninSocialLoginBtns />
    </>
  );
}
