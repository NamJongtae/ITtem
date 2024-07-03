import useCheckDisabledBtn from "@/hooks/changePasswordModal/useCheckDisabledBtn";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  pwCheckRef: MutableRefObject<HTMLInputElement | null>;
  closeBtnRef: MutableRefObject<HTMLButtonElement | null>;
  handleClickChangePwCloseBtn: () => void;
}

const ChangePasswordModalSubmitBtn = forwardRef<
  HTMLButtonElement | null,
  IProps
>(({ pwCheckRef, closeBtnRef }, ref) => {
  const { isDisabled } = useCheckDisabledBtn();

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="mt-2 py-2 px-4 bg-[#66a2fb] text-white font-medium betterhover:hover:bg-[#3c87f8] disabled:opacity-50"
      ref={ref}
      onKeyDown={(e) =>
        optimizationTabFocus({
          event: e,
          previousTarget: pwCheckRef.current,
          nextTarget: closeBtnRef.current,
        })
      }
    >
      변경하기
    </button>
  );
});
ChangePasswordModalSubmitBtn.displayName = "ChangePasswordModalSubmitBtn";
export default ChangePasswordModalSubmitBtn;
