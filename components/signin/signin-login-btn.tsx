import useSigninLoginBtn from "@/hooks/signin/useSigninLoginBtn";

export default function SigninLoginBtn() {
  const { isDisabled } = useSigninLoginBtn();

  return (
    <button
      type="submit"
      className="button_primary mb-12 disabled:bg-opacity-50"
      disabled={isDisabled}
    >
      로그인
    </button>
  );
}
