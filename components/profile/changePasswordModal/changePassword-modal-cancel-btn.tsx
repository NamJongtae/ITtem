import { optModalTabFocus } from "@/lib/optimizationTabFocus";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  handleClickChangePwCloseBtn: () => void;
  currentPwRef: MutableRefObject<HTMLInputElement | null>;
  pwCheckRef: MutableRefObject<HTMLInputElement | null>;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

const ChangePasswordModalCancelBtn = forwardRef<
  HTMLButtonElement | null,
  IProps
>(
  (
    { handleClickChangePwCloseBtn, currentPwRef, pwCheckRef, submitBtnRef },
    ref
  ) => {
    return (
      <button
        type="button"
        onClick={handleClickChangePwCloseBtn}
        className="py-2 px-4 bg-gray-400 text-white font-medium betterhover:hover:bg-gray-600"
        ref={ref}
        onKeyDown={(e) =>
          optModalTabFocus({
            event: e,
            previousTarget: pwCheckRef.current,
            nextTarget: submitBtnRef.current?.disabled
              ? currentPwRef.current
              : submitBtnRef.current,
          })
        }
      >
        취소하기
      </button>
    );
  }
);
ChangePasswordModalCancelBtn.displayName = "ChangePasswordModalCancelBtn";
export default ChangePasswordModalCancelBtn;
