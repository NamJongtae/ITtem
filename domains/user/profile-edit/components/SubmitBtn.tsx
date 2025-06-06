import useProfileEditSubmitBtnDisabled from "../hooks/useProfileEditSubmitBtnDisabled";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";
import { RefObject, forwardRef } from "react";

interface IProps {
  isModal?: boolean;
  introduceRef: RefObject<HTMLTextAreaElement | null>;
  closeBtnRef: RefObject<HTMLButtonElement | null>;
}
const SubmitBtn = forwardRef<HTMLButtonElement | null, IProps>(
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

SubmitBtn.displayName = "ProfileEditSubmitBtn";
export default SubmitBtn;
