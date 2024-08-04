import SignupIntroductField from "./signup-introduce-field";
import SignupIntroductStepBtns from "./signup-introduce-step-btns";

interface IProps {
  prevStepHandler: () => void;
}

export default function SignupIntroduceStep({ prevStepHandler }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium text-gray-400 mb-2 text-center">
        소개글은 나중에 작성해도 되요.
      </p>
      <SignupIntroductField />
      <SignupIntroductStepBtns prevStepHandler={prevStepHandler} />
    </div>
  );
}
