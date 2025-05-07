import useVerifyEmailTimer from '@/hooks/signup/basic-info/useVerifyEmailTimer';

export default function SignupVerfiyCodeTimer() {
  const { timer } = useVerifyEmailTimer();
  return (
    <span
      className={`${
        timer <= 10 && "text-red-400"
      } text-sm mr-2 text-gray-400`}
    >
      {String(Math.floor(timer / 60)).padStart(2, "0")}:
      {String(timer % 60).padStart(2, "0")}
    </span>
  );
}
