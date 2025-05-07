import useEmailVerifyBtn from "@/hooks/signup/basic-info/useEmailVerifyBtnDisabled";

interface IProps {
  handleClickVerifyEmail: () => void;
  verfiyEmailLoading: boolean;
}

export default function SignupEmailVerifyBtn({
  handleClickVerifyEmail,
  verfiyEmailLoading,
}: IProps) {
  const { isDisabled } = useEmailVerifyBtn();

  return (
    <button
      onClick={handleClickVerifyEmail}
      className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
      type="button"
      disabled={isDisabled || verfiyEmailLoading}
    >
      인증하기
    </button>
  );
}
