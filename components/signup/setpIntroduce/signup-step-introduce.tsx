import IntroductField from "./introduce-field";
import StepIntroudctBtns from "./step-introudct-btns";

interface IProps {
  prevStepHandler: () => void;
}

export default function SignupStepIntroduce({ prevStepHandler }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <IntroductField />
      <StepIntroudctBtns prevStepHandler={prevStepHandler} />
    </div>
  );
}
