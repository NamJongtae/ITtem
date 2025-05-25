import { useEmailVerificationValidator } from "../hooks/useEmailVerificationVaildator";
import useVerificationEmailSendBtnDisabled from "../hooks/useVerificationEmailSendBtnDisabled";
import { useVerificationEmailSendHandler } from "../hooks/useVerificationEmailSendHandler";
import { EmailVerificationType } from "../types/emailVerificationTypes";

interface IProps {
  emailVerificationType: EmailVerificationType;
}

export default function SendVerificationCodeBtn({
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
