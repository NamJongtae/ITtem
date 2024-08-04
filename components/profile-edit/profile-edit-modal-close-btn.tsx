import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import XIcon from "@/public/icons/x_icon.svg";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  isModal?: boolean;
  introduceRef: MutableRefObject<HTMLTextAreaElement | null>;
  profileImgResetBtnRef: MutableRefObject<HTMLButtonElement | null>;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
  handleClickClose: () => void;
}

const ProfileEditModalCloseBtn = forwardRef<HTMLButtonElement, IProps>(
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
        <XIcon className="fill-black w-3 h-3" aria-label="닫기" />
      </button>
    );
  }
);

ProfileEditModalCloseBtn.displayName = "ProfileEditModalCloseBtn";
export default ProfileEditModalCloseBtn;
