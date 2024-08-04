import SignupEmailField from "./signup-email-field";
import SignupPasswordField from "./signup-password-field";
import SignupBasicInfoStepBtns from "./basic-info-step-btns";
import SignupVerifyCodeField from "./signup-verify-code-field";

interface IProps {
  nextStepHandler: () => void;
}

export default function SignupBasicInfoStep({ nextStepHandler }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <SignupEmailField />

        <SignupVerifyCodeField />

        <SignupPasswordField />
      </div>

      <SignupBasicInfoStepBtns nextStepHandler={nextStepHandler} />
    </div>
  );
}
