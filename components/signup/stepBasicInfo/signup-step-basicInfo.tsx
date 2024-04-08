import EmailField from "./email-field";
import PasswordField from "./password-field";
import StepBasicInfoBtns from './step-BasicInfo-btns';

interface IProps {
  nextStepHandler: () => void;
}

export default function SignupStepBasicInfo({ nextStepHandler }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <EmailField />
      <PasswordField />
      <StepBasicInfoBtns nextStepHandler={nextStepHandler} />
    </div>
  );
}
