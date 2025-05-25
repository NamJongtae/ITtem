import useResetVerificationEmail from "../hooks/useResetVerificationEmail";

export default function ChangeVerificationEmailBtn() {
  const { resetSendToVerificationEmail } = useResetVerificationEmail();

  return (
    <p>
      이메일을 잘못입력하셨나요?{" "}
      <button
        onClick={resetSendToVerificationEmail}
        className="text-gray-400 underline underline-offset-2 mt-1"
        type="button"
      >
        이메일 변경하기
      </button>
    </p>
  );
}
