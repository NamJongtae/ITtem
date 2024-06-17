import { optModalTabFocus } from "@/lib/optimizationTabFocus";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  introduceRef: MutableRefObject<HTMLTextAreaElement | null>;
  profileImgResetBtnRef: MutableRefObject<HTMLButtonElement | null>;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
  handleClickProfieEditCloseBtn: () => void;
}

const ProfileEditCancelBtn = forwardRef<HTMLButtonElement, IProps>(
  (
    {
      introduceRef,
      profileImgResetBtnRef,
      submitBtnRef,
      handleClickProfieEditCloseBtn,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClickProfieEditCloseBtn}
        className="py-2 px-4 bg-gray-400 text-white font-medium betterhover:hover:bg-gray-600"
        onKeyDown={(e) =>
          optModalTabFocus({
            event: e,
            previousTarget: introduceRef.current,
            nextTarget: submitBtnRef.current?.disabled
              ? profileImgResetBtnRef.current
              : submitBtnRef.current,
          })
        }
      >
        취소하기
      </button>
    );
  }
);

ProfileEditCancelBtn.displayName = "ProfileEditCancelBtn";
export default ProfileEditCancelBtn;
