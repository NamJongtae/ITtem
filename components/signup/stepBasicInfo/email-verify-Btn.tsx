import { useFormContext } from "react-hook-form";

interface IProps {
  handleClickVerifyEmail: () => void;
  verfiyEmailLoading: boolean;
}

export default function EmailVerifyBtn({
  handleClickVerifyEmail,
  verfiyEmailLoading,
}: IProps) {
  const { formState } = useFormContext();
  const error = formState.errors["verifyCode"];
  const isDirty = formState.dirtyFields["verifyCode"];
  const isDisabled = !!error || !isDirty || verfiyEmailLoading;

  return (
    <button
      onClick={handleClickVerifyEmail}
      className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
      type="button"
      disabled={isDisabled}
    >
      인증하기
    </button>
  );
}
