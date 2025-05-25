import useEmailVerificationBtnDisabled from "../hooks/useEmailVerificationBtnDisabled";
import useEmailVerificationHandler from "../hooks/useEmailVerificationHandler";
import { EmailVerificationType } from "../types/emailVerificationTypes";

interface IProps {
  emailVerificationType: EmailVerificationType;
}

export default function EmailVerificationBtn({
  emailVerificationType
}: IProps) {
  const { isDisabled } = useEmailVerificationBtnDisabled();
  const { handleClickVerificationEmail, verificationEmailLoading } =
    useEmailVerificationHandler(emailVerificationType);

  return (
    <button
      onClick={handleClickVerificationEmail}
      className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
      type="button"
      disabled={isDisabled || verificationEmailLoading}
    >
      인증하기
    </button>
  );
}
