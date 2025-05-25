import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

interface IProps {
  currentStep: "기본정보입력" | "프로필설정" | "소개글작성";
}

export default function Stepper({ currentStep }: IProps) {
  return (
    <ol className="flex items-center w-full space-x-8 space-y-0 pb-16">
      <li className="flex-1">
        <StepOne />
      </li>
      <li className=" flex-1">
        <StepTwo currentStep={currentStep} />
      </li>
      <li className=" flex-1">
        <StepThree currentStep={currentStep} />
      </li>
    </ol>
  );
}
