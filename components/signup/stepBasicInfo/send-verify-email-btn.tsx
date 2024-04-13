import { useFormContext } from "react-hook-form";

interface IProps {
  handleClickSendToVerifyEmail: () => void;
}
export default function SendVerifyEmailBtn({ handleClickSendToVerifyEmail }: IProps) {
  const { formState } = useFormContext();
  const error = formState.errors["email"];
  const isDirty = formState.dirtyFields["email"];
  const isDisabled = !!error || !isDirty;

  return (
    <button
      onClick={handleClickSendToVerifyEmail}
      className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
      type="button"
      disabled={isDisabled}
    >
      인증받기
    </button>
  );
}
