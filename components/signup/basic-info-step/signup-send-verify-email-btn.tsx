import useSendVerifyEmailBtn from "@/hooks/signup/useSendVerifyEmailBtn";

interface IProps {
  handleClickSendToVerifyEmail: () => void;
}
export default function SignupSendVerifyEmailBtn({
  handleClickSendToVerifyEmail,
}: IProps) {
  const { isDisabled } = useSendVerifyEmailBtn();

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
