import FindPasswordPasswordCheckField from "./find-password-password-check-field";
import FindPasswordPasswordField from "./find-password-password-field";
import FindPasswordSubTitle from "./find-password-sub-title";
import EmailVerificationCodeField from "../commons/email-verification/email-verification-code-field";
import EmailVerificationField from "../commons/email-verification/email-verification-field";
import ChangePasswordBtn from "./change-password-btn";
import CancelFindPasswordBtn from "./cancel-find-password-btn";

export default function FindPasswordFormConent() {
  return (
    <div className="h-[calc(100%-46px)] flex flex-col gap-3 justify-between">
      <div className="flex flex-col gap-3">
        <FindPasswordSubTitle />
        
        <EmailVerificationField emailVerificationType="resetPw" />

        <EmailVerificationCodeField emailVerificationType="resetPw" />

        <FindPasswordPasswordField />

        <FindPasswordPasswordCheckField />
      </div>

      <ChangePasswordBtn />
      <CancelFindPasswordBtn />
    </div>
  );
}
