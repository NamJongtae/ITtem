import SignupStepperStepOne from "./signup-stepper-step-one";
import SignupStepperStepTwo from "./signup-stepper-step-two";
import SignupStepperStepThree from "./signup-stepper-step-three";

interface IProps {
  currentStep: "기본정보입력" | "프로필설정" | "소개글작성";
}

export default function SignupStepper({ currentStep }: IProps) {
  return (
    <ol className="flex items-center w-full space-x-8 space-y-0 pb-16">
      <li className="flex-1">
        <SignupStepperStepOne />
      </li>
      <li className=" flex-1">
        <SignupStepperStepTwo currentStep={currentStep} />
      </li>
      <li className=" flex-1">
        <SignupStepperStepThree currentStep={currentStep} />
      </li>
    </ol>
  );
}
