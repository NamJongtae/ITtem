import PasswordCheckField from "./PasswordCheckField";
import PasswordField from "./PasswordField";
import SubTitle from "./SubTitle";
import EmailVerificationCodeField from "../../shared/email-verification/components/EmailVerificationCodeField";
import EmailVerificationField from "../../shared/email-verification/components/EmailVerificationField";
import SubmitBtn from "./SubmitBtn";
import CancelBtn from "./CancelBtn";

export default function FormConent() {
  return (
    <div className="h-[calc(100%-46px)] flex flex-col gap-3 justify-between">
      <div className="flex flex-col gap-3">
        <SubTitle />

        <EmailVerificationField emailVerificationType="resetPw" />

        <EmailVerificationCodeField emailVerificationType="resetPw" />

        <PasswordField />

        <PasswordCheckField />
      </div>

      <SubmitBtn />
      <CancelBtn />
    </div>
  );
}
