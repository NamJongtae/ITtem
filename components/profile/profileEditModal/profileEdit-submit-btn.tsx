import useProfileEditSubmitBtn from "@/hooks/profile/useProfileEditSubmitBtn";
import { optModalTabFocus } from "@/lib/optimizationTabFocus";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  profileImgResetBtnRef: MutableRefObject<HTMLButtonElement | null>;
  cancelBtnRef: MutableRefObject<HTMLButtonElement | null>;
}
const ProfileEditSubmitBtn = forwardRef<HTMLButtonElement | null, IProps>(
  ({ profileImgResetBtnRef, cancelBtnRef }, ref) => {
    const { isDisabled } = useProfileEditSubmitBtn();

    return (
      <button
        type="submit"
        disabled={isDisabled}
        className="py-2 px-4 bg-[#66a2fb] text-white font-medium betterhover:hover:bg-[#3c87f8] disabled:opacity-50"
        ref={ref}
        onKeyDown={(e) =>
          optModalTabFocus({
            event: e,
            previousTarget: cancelBtnRef.current,
            nextTarget: profileImgResetBtnRef.current,
          })
        }
      >
        수정하기
      </button>
    );
  }
);

ProfileEditSubmitBtn.displayName = "ProfileEditSubmitBtn";
export default ProfileEditSubmitBtn;
