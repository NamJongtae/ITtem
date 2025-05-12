import EmailVerificationField from "../../commons/email-verification/email-verification-field";
import SignupPasswordField from "./signup-password-field";
import SignupBasicInfoStepBtns from "./basic-info-step-btns";
import VerificationCodeField from "../../commons/email-verification/email-verification-code-field";

interface IProps {
  nextStepHandler: () => void;
}

export default function SignupBasicInfoStep({ nextStepHandler }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <EmailVerificationField emailVerificationType="signup" />

        <VerificationCodeField emailVerificationType="signup" />

        <SignupPasswordField />
      </div>

      <SignupBasicInfoStepBtns nextStepHandler={nextStepHandler} />
    </div>
  );
}
