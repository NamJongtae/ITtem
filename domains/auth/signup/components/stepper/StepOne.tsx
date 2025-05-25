import { useSignupBasictInfoStatus } from "../../hooks/basic-info-step/useSignupBasicInfoStatus";

export default function StepOne() {
  const { isDirty: basicInfoIsDirty, errors: basicInfofoErrors } =
    useSignupBasictInfoStatus();

  return (
    <div
      className={`${
        basicInfoIsDirty && !basicInfofoErrors
          ? "border-indigo-600"
          : "border-indigo-300"
      } flex flex-col border-solid font-medium pt-4 border-t-2 border-l-0 pl-0 transition-all duration-300`}
    >
      <span
        className={`${
          basicInfoIsDirty && !basicInfofoErrors
            ? "text-indigo-600"
            : "text-indigo-300"
        } text-sm lg:text-base transition-all duration-300`}
      >
        Step 1
      </span>
      <h3 className="text-base lg:text-lg text-gray-900">기본정보입력</h3>
    </div>
  );
}
