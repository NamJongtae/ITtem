import IntroductField from "./introduce-field";
import StepIntrouduceBtns from "./step-introduce-btns";

interface IProps {
  prevStepHandler: () => void;
}

export default function SignupStepIntroduce({ prevStepHandler }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium text-gray-400 mb-2 text-center">
        소개글은 나중에 작성해도 되요.
      </p>
      <IntroductField />
      <StepIntrouduceBtns prevStepHandler={prevStepHandler} />
    </div>
  );
}
