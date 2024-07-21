import useProfileEditSubmitBtn from "@/hooks/profileEdit/useProfileEditSubmitBtn";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  isModal?: boolean;
  introduceRef: MutableRefObject<HTMLTextAreaElement | null>;
  closeBtnRef: MutableRefObject<HTMLButtonElement | null>;
}
const ProfileEditSubmitBtn = forwardRef<HTMLButtonElement | null, IProps>(
  ({ isModal, introduceRef, closeBtnRef }, ref) => {
    const { isDisabled } = useProfileEditSubmitBtn();

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
                  nextTarget: closeBtnRef.current,
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
