import useSignupStepper from "@/hooks/signup/useSignuStepper";

interface IProps {
  currentStep: "기본정보입력" | "프로필설정" | "소개글작성";
}

export default function SignupStepper({ currentStep }: IProps) {
  const {
    defaultIsDirty,
    defaultInfoErrors,
    proflieIsDirty,
    proflieErrors,
    introduceErrors,
  } = useSignupStepper();

  return (
    <ol className="flex items-center w-full space-x-8 space-y-0 pb-16">
      <li className="flex-1">
        <div
          className={`${
            defaultIsDirty && !defaultInfoErrors
              ? "border-indigo-600"
              : "border-indigo-300"
          } flex flex-col border-solid font-medium pt-4 border-t-2 border-l-0 pl-0 transition-all duration-300`}
        >
          <span
            className={`${
              defaultIsDirty && !defaultInfoErrors
                ? "text-indigo-600"
                : "text-indigo-300"
            } text-sm lg:text-base transition-all duration-300`}
          >
            Step 1
          </span>
          <h3 className="text-base lg:text-lg text-gray-900">기본정보입력</h3>
        </div>
      </li>
      <li className=" flex-1">
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
      </li>
      <li className=" flex-1">
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
      </li>
    </ol>
  );
}
