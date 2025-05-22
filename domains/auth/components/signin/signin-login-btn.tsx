import useSigninBtnDisabled from '../../hooks/signin/useSigninBtnDisabled';

export default function SigninLoginBtn() {
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
