import useProfileEditSubmitBtnDisabled from "../../hooks/profile-edit/useProfileEditSubmitBtnDisabled";
import { optimizationTabFocus } from "@/utils/optimizationKeyboard";
import { RefObject, forwardRef } from "react";

interface IProps {
  isModal?: boolean;
  introduceRef: RefObject<HTMLTextAreaElement | null>;
  closeBtnRef: RefObject<HTMLButtonElement | null>;
}
const ProfileEditSubmitBtn = forwardRef<HTMLButtonElement | null, IProps>(
  ({ isModal, introduceRef, closeBtnRef }, ref) => {
    const { isDisabled } = useProfileEditSubmitBtnDisabled();

    return (
      <button
        type="submit"
        disabled={isDisabled}
        className="mt-2 py-2 px-4 bg-[#66a2fb] text-white font-medium betterhover:hover:bg-[#3c87f8] disabled:opacity-50"
        ref={ref}
        onKeyDown={
          isModal
            ? (e) =>
                optimizationTabFocus({
                  event: e,
                  previousTarget: introduceRef.current,
                  nextTarget: closeBtnRef.current
                })
            : undefined
        }
      >
        수정하기
      </button>
    );
  }
);

ProfileEditSubmitBtn.displayName = "ProfileEditSubmitBtn";
export default ProfileEditSubmitBtn;
