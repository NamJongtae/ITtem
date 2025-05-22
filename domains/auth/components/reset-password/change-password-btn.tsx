import useFindPasswordBtnDisabled from "../../hooks/reset-password/useFindPasswordBtnDisabled";

export default function ChangePasswordBtn() {
  const { isDisabled } = useFindPasswordBtnDisabled();
  return (
    <button
      type="submit"
      className="button_primary w-full disabled:opacity-50"
      disabled={isDisabled}
    >
      비밀번호 변경하기
    </button>
  );
}
