import BasicInfoNextStepBtn from "./basic-info-next-step-btn";
import CancelSignupBtn from "./cancel-signup-btn";

interface IProps {
  nextStepHandler: () => void;
}

export default function SignupBasicInfoStepBtns({ nextStepHandler }: IProps) {
  return (
    <div className="w-full flex flex-col gap-3 absolute bottom-3">
      <BasicInfoNextStepBtn nextStepHandler={nextStepHandler} />
      <CancelSignupBtn />
    </div>
  );
}
