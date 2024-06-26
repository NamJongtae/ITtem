import EmailField from "./email-field";
import PasswordField from "./password-field";
import StepBasicInfoBtns from "./step-BasicInfo-btns";
import VerifyCodeField from "./verifyCode-field";

interface IProps {
  nextStepHandler: () => void;
}

export default function SignupStepBasicInfo({ nextStepHandler }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <EmailField />

        <VerifyCodeField />

        <PasswordField />
      </div>

      <StepBasicInfoBtns nextStepHandler={nextStepHandler} />
    </div>
  );
}
