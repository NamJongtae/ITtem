import useSendVerifyEmailBtnDisabled from "@/hooks/signup/basic-info/useSendVerifyEmailBtnDisabled";

interface IProps {
  sendToEmailHandler: () => void;
}
export default function SignupSendVerifyEmailBtn({
  sendToEmailHandler
}: IProps) {
  const { isDisabled } = useSendVerifyEmailBtnDisabled();

  return (
    <button
      onClick={sendToEmailHandler}
      className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
      type="button"
      disabled={isDisabled}
    >
      인증받기
    </button>
  );
}
