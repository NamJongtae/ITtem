import { useEmailVerificationValidator } from "../../hooks/email-verification/useEmailVerificationVaildator";
import useVerificationEmailSendBtnDisabled from "../../hooks/email-verification/useVerificationEmailSendBtnDisabled";
import { useVerificationEmailSendHandler } from "../../hooks/email-verification/useVerificationEmailSendHandler";
import { EmailVerificationType } from "../../types/auth-types";

interface IProps {
  emailVerificationType: EmailVerificationType;
}

export default function EmailVerificationSendBtn({
  emailVerificationType
}: IProps) {
  const { isDisabled } = useVerificationEmailSendBtnDisabled();
  const { validate } = useEmailVerificationValidator(emailVerificationType);
  const { sendToEmailHandler } = useVerificationEmailSendHandler({
    validate,
    type: emailVerificationType
  });

  return (
    <button
      onClick={sendToEmailHandler}
      className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
      type="button"
      disabled={isDisabled}
    >
      인증받기
    </button>
  );
}
