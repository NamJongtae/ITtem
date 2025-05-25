import { optimizationTabFocus } from "@/shared/common/utils/optimizationKeyboard";
import XIcon from "@/public/icons/x-icon.svg";
import { RefObject, forwardRef } from "react";

interface IProps {
  isModal?: boolean;
  introduceRef: RefObject<HTMLTextAreaElement | null>;
  profileImgResetBtnRef: RefObject<HTMLButtonElement | null>;
  submitBtnRef: RefObject<HTMLButtonElement | null>;
  handleClickClose: () => void;
}

const CloseBtn = forwardRef<HTMLButtonElement, IProps>(
  (
    {
      isModal,
      introduceRef,
      profileImgResetBtnRef,
      submitBtnRef,
      handleClickClose
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClickClose}
        className="absolute top-5 right-5"
        onKeyDown={
          isModal
            ? (e) =>
                optimizationTabFocus({
                  event: e,
                  previousTarget: submitBtnRef.current?.disabled
                    ? introduceRef.current
                    : submitBtnRef.current,
                  nextTarget: profileImgResetBtnRef.current
                })
            : undefined
        }
      >
        <XIcon className="fill-black w-3 h-3" aria-label="닫기" />
      </button>
    );
  }
);

CloseBtn.displayName = "ProfileEditModalCloseBtn";
export default CloseBtn;
