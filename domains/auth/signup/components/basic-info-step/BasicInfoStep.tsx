import EmailVerificationField from "@/domains/auth/shared/email-verification/components/EmailVerificationField";
import PasswordField from "./PasswordField";
import StepBtns from "./StepBtns";
import EmailVerificationCodeField from "@/domains/auth/shared/email-verification/components/EmailVerificationCodeField";

interface IProps {
  nextStepHandler: () => void;
}

export default function BasicInfoStep({ nextStepHandler }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <EmailVerificationField emailVerificationType="signup" />

        <EmailVerificationCodeField emailVerificationType="signup" />

        <PasswordField />
      </div>

      <StepBtns nextStepHandler={nextStepHandler} />
    </div>
  );
}
