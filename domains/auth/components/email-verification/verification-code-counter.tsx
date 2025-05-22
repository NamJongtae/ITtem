import useVerificationTimer from '../../hooks/email-verification/useVerificationTimer';

export default function VerificationCodeTimer() {
  const { timer } = useVerificationTimer();
  return (
    <span
      className={`${timer <= 10 && "text-red-400"} text-sm mr-2 text-gray-400`}
    >
      {String(Math.floor(timer / 60)).padStart(2, "0")}:
      {String(timer % 60).padStart(2, "0")}
    </span>
  );
}
