import useSignupCancelHandler from "@/hooks/signup/basic-info/useSignupCancelHandler";

export default function CancelSignupBtn() {
  const { cancelSignup } = useSignupCancelHandler();

  return (
    <button
      type="button"
      onClick={cancelSignup}
      className="button_secondary w-full"
    >
      다음에 가입하기
    </button>
  );
}
