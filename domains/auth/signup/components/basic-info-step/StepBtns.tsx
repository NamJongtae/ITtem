import BasicInfoNextStepBtn from "./NextStepBtn";
import CancelSignupBtn from "./CancelBtn";

interface IProps {
  nextStepHandler: () => void;
}

export default function StepBtns({ nextStepHandler }: IProps) {
  return (
    <div className="w-full flex flex-col gap-3 absolute bottom-3">
      <BasicInfoNextStepBtn nextStepHandler={nextStepHandler} />
      <CancelSignupBtn />
    </div>
  );
}
