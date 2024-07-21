import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import CloseIcon from "@/public/icons/x_icon.svg";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  isModal?: boolean;
  introduceRef: MutableRefObject<HTMLTextAreaElement | null>;
  profileImgResetBtnRef: MutableRefObject<HTMLButtonElement | null>;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
  handleClickClose: () => void;
}

const ProfileEditCloseBtn = forwardRef<HTMLButtonElement, IProps>(
  (
    {
      isModal,
      introduceRef,
      profileImgResetBtnRef,
      submitBtnRef,
      handleClickClose,
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
                  nextTarget: profileImgResetBtnRef.current,
                })
            : undefined
        }
      >
        <CloseIcon className="w-3 h-3" />
      </button>
    );
  }
);

ProfileEditCloseBtn.displayName = "ProfileEditCloseBtn";
export default ProfileEditCloseBtn;
