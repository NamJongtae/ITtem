import useCheckDisabledBtn from "@/hooks/chatPasswordModal/useCheckDisabledBtn";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  currentPwRef: MutableRefObject<HTMLInputElement | null>;
  cancelBtnRef: MutableRefObject<HTMLButtonElement | null>;
  handleClickChangePwCloseBtn: () => void;
}

const ChangePasswordModalSubmitBtn = forwardRef<
  HTMLButtonElement | null,
  IProps
>(({ currentPwRef, cancelBtnRef }, ref) => {
  const { isDisabled } = useCheckDisabledBtn();

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="py-2 px-4 bg-[#66a2fb] text-white font-medium betterhover:hover:bg-[#3c87f8] disabled:opacity-50"
      ref={ref}
      onKeyDown={(e) =>
        optimizationTabFocus({
          event: e,
          previousTarget: cancelBtnRef.current,
          nextTarget: currentPwRef.current,
        })
      }
    >
      변경하기
    </button>
  );
});
ChangePasswordModalSubmitBtn.displayName = "ChangePasswordModalSubmitBtn";
export default ChangePasswordModalSubmitBtn;
