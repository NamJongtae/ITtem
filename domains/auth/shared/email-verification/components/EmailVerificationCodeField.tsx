import VerificationCodeInput from "./VerificationCodeInput";
import EmailVerificationBtn from "./EmailVerificationBtn";
import useFocusVerificationCode from "../hooks/useFocusVerificationCode";
import useEmailVerificationStatus from "../hooks/useEmailVerificationStatus";
import EmailVerificationError from "./EmailVerificationError";
import { EmailVerificationType } from "../types/emailVerificationTypes";
import ChangeVerificationEmailBtn from "./ChangeVerificationEmailBtn";
import ResendVerificationCodeBtn from "./ResendVerificationCodeBtn";

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
