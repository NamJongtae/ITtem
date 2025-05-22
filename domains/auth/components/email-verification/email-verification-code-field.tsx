import VerificationCodeInput from "./verification-code-input";
import EmailVerificationBtn from "./email-verification-Btn";
import useFocusVerificationCode from "../../hooks/email-verification/useFocusVerificationCode";
import useEmailVerificationStatus from "../../hooks/email-verification/useEmailVerificationStatus";
import EmailVerificationError from "./email-verification-error";
import { EmailVerificationType } from "../../types/auth-types";
import ChangeVerificationEmailBtn from "./change-verification-email-btn";
import ResendVerificationCodeBtn from "./resend-verification-code-btn";

interface IProps {
  emailVerificationType: EmailVerificationType;
}

export default function EmailVerificationCodeField({
  emailVerificationType
}: IProps) {
  const { verificationCodeRef } = useFocusVerificationCode();
  const { isSendToVerificationEmail } = useEmailVerificationStatus();

  if (!isSendToVerificationEmail) return null;

  return (
    <div>
      <div className="flex gap-2 items-center mt-3">
        <label className="sr-only" htmlFor="verificationCode">
          인증코드
        </label>

        <VerificationCodeInput verificationCodeRef={verificationCodeRef} />

        <EmailVerificationBtn emailVerificationType={emailVerificationType} />
      </div>

      <EmailVerificationError />

      <div className="text-sm text-center mt-2">
        <ResendVerificationCodeBtn
          emailVerificationType={emailVerificationType}
          verificationCodeRef={verificationCodeRef}
        />
        <ChangeVerificationEmailBtn />
      </div>
    </div>
  );
}
