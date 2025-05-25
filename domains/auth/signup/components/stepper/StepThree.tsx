import { useSignupIntroduceStatus } from "../../hooks/introduce-step/useSignupIntroduceStatus";

interface IProps {
  currentStep: "기본정보입력" | "프로필설정" | "소개글작성";
}

export default function StepThree({ currentStep }: IProps) {
  const { errors: introduceErrors } = useSignupIntroduceStatus();
  return (
    <div
      className={`${
        !introduceErrors && currentStep === "소개글작성"
          ? "border-indigo-600 "
          : currentStep === "소개글작성"
            ? "text-indigo-300"
            : "text-gray-200"
      } flex flex-col border-solid border-gray-200 font-medium pt-4 border-t-2 border-l-0 pl-0 transition-all duration-300`}
    >
      <span
        className={`${
          !introduceErrors && currentStep === "소개글작성"
            ? "text-indigo-600"
            : currentStep === "소개글작성"
              ? "text-indigo-300"
              : "text-gray-200"
        } text-sm lg:text-base transition-all duration-300`}
      >
        Step 3
      </span>
      <h3
        className={`${
          currentStep === "소개글작성" ? "text-gray-900" : "text-gray-200"
        } text-base lg:text-lg transition-all duration-300`}
      >
        소개글작성
      </h3>
    </div>
  );
}
