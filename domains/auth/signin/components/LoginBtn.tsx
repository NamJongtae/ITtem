import useSigninBtnDisabled from "../hooks/useSigninBtnDisabled";

export default function LoginBtn() {
  const { isDisabled } = useSigninBtnDisabled();

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
