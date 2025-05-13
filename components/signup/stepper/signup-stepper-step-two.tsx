import { useSignupProfileStatus } from "@/hooks/signup/profile/useSignupProfileStatus";

interface IProps {
  currentStep: "기본정보입력" | "프로필설정" | "소개글작성";
}

export default function SignupStepperStepTwo({ currentStep }: IProps) {
  const { isDirty: proflieIsDirty, errors: proflieErrors } =
    useSignupProfileStatus();

  return (
    <div
      className={`${
        proflieIsDirty &&
        !proflieErrors &&
        (currentStep === "프로필설정" || currentStep === "소개글작성")
          ? "border-indigo-600 "
          : currentStep === "프로필설정"
            ? "border-indigo-300"
            : "border-gray-200"
      } flex flex-col border-solid font-medium pt-4 border-t-2 border-l-0 pl-0 transition-all duration-300`}
    >
      <span
        className={`${
          proflieIsDirty &&
          !proflieErrors &&
          (currentStep === "프로필설정" || currentStep === "소개글작성")
            ? "text-indigo-600"
            : currentStep === "프로필설정"
              ? "text-indigo-300"
              : "text-gray-200"
        } text-sm lg:text-base transition-all duration-300`}
      >
        Step 2
      </span>
      <h3
        className={`${
          currentStep === "프로필설정" || currentStep === "소개글작성"
            ? "text-gray-900"
            : "text-gray-200"
        } text-base lg:text-lg`}
      >
        프로필설정
      </h3>
    </div>
  );
}
