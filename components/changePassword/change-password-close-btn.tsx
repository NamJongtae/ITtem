import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import { MutableRefObject, forwardRef } from "react";
import CloseIcon from "@/public/icons/x_icon.svg";

interface IProps {
  isModal?: boolean;
  handleClickClose: () => void;
  currentPwRef: MutableRefObject<HTMLInputElement | null>;
  pwCheckRef: MutableRefObject<HTMLInputElement | null>;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

const ChangePasswordCloseBtn = forwardRef<HTMLButtonElement | null, IProps>(
  (
    { isModal, handleClickClose, currentPwRef, pwCheckRef, submitBtnRef },
    ref
  ) => {
    return (
      <button
        type="button"
        onClick={handleClickClose}
        className="absolute top-5 right-5"
        ref={ref}
        onKeyDown={
          isModal
            ? (e) =>
                optimizationTabFocus({
                  event: e,
                  previousTarget: submitBtnRef.current?.disabled
                    ? pwCheckRef.current
                    : submitBtnRef.current,
                  nextTarget: currentPwRef.current,
                })
            : undefined
        }
      >
        <CloseIcon className="w-3 h-3" />
      </button>
    );
  }
);
ChangePasswordCloseBtn.displayName = "ChangePasswordModalCloseBtn";
export default ChangePasswordCloseBtn;
