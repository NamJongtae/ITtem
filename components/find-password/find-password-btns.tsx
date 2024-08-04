import useFindPasswordBtn from "@/hooks/find-password/useFindPasswordBtn";

export default function FindPassswordBtns() {
  const { isDisabled, handleCilckToback } = useFindPasswordBtn();

  return (
    <div className="w-full flex flex-col gap-3">
      <button
        type="submit"
        className="button_primary w-full disabled:opacity-50"
        disabled={isDisabled}
      >
        비밀번호 변경하기
      </button>
      <button
        type="button"
        onClick={handleCilckToback}
        className="button_secondary w-full"
      >
        취소
      </button>
    </div>
  );
}
