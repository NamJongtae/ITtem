import { useFormContext } from "react-hook-form";

interface IProps {
  handleClickVerifyEmail: () => void;
}

export default function EmailVerifyBtn({ handleClickVerifyEmail }: IProps) {
  const { formState } = useFormContext();
  const error = formState.errors["email"];
  const isDirty = formState.dirtyFields["email"];
  return (
    <button
      onClick={handleClickVerifyEmail}
      className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
      type="button"
      disabled={!!error || !isDirty}
    >
      인증하기
    </button>
  );
}
