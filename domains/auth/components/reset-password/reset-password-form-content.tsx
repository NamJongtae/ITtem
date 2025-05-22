import FindPasswordPasswordCheckField from "./reset-password-password-check-field";
import FindPasswordPasswordField from "./reset-password-password-field";
import FindPasswordSubTitle from "./reset-password-sub-title";
import EmailVerificationCodeField from "../email-verification/email-verification-code-field";
import EmailVerificationField from "../email-verification/email-verification-field";
import ChangePasswordBtn from "./change-password-btn";
import CancelFindPasswordBtn from "./cancel-find-password-btn";

export default function ResetPasswordFormConent() {
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
