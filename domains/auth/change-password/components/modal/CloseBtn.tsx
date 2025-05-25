import { optimizationTabFocus } from "@/shared/common/utils/optimizationKeyboard";
import { RefObject, forwardRef } from "react";
import CloseIcon from "@/public/icons/x-icon.svg";

interface IProps {
  isModal?: boolean;
  handleClickClose: () => void;
  currentPwRef: RefObject<HTMLInputElement | null>;
  pwCheckRef: RefObject<HTMLInputElement | null>;
  submitBtnRef: RefObject<HTMLButtonElement | null>;
}

const CloseBtn = forwardRef<HTMLButtonElement | null, IProps>(
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
                  nextTarget: currentPwRef.current
                })
            : undefined
        }
      >
        <CloseIcon className="fill-black w-3 h-3" aria-label="닫기" />
      </button>
    );
  }
);
CloseBtn.displayName = "ChangePasswordModalCloseBtn";
export default CloseBtn;
