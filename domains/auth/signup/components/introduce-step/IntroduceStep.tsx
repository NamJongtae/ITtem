import IntroduceField from "./IntroduceField";
import StepBtns from "./StepBtns";

interface IProps {
  prevStepHandler: () => void;
}

export default function IntroduceStep({ prevStepHandler }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium text-gray-400 mb-2 text-center">
        소개글은 나중에 작성해도 되요.
      </p>
      <IntroduceField />
      <StepBtns prevStepHandler={prevStepHandler} />
    </div>
  );
}
