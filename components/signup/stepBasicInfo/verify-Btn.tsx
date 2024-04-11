interface IProps {
  handleClickVerifyEmail: () => void;
}

export default function VerifyBtn({ handleClickVerifyEmail }: IProps) {
  return (
    <button
      onClick={handleClickVerifyEmail}
      className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
      type="button"
    >
      인증하기
    </button>
  );
}
