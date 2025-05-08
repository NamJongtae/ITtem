import useEmailVerificationBtnDisabled from "@/hooks/signup/basic-info/useEmailVerificationBtnDisabled";

interface IProps {
  handleClickVerificationEmail: () => void;
  verificationEmailLoading: boolean;
}

export default function SignupEmailVerificationBtn({
  handleClickVerificationEmail,
  verificationEmailLoading
}: IProps) {
  const { isDisabled } = useEmailVerificationBtnDisabled();

  return (
    <button
      onClick={handleClickVerificationEmail}
      className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
      type="button"
      disabled={isDisabled || verificationEmailLoading}
    >
      인증하기
    </button>
  );
}
