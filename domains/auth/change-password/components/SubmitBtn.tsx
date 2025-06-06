import useCheckDisabledBtn from "../hooks/useCheckDisabledBtn";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";
import { RefObject, forwardRef } from "react";

interface IProps {
  isModal?: boolean;
  pwCheckRef: RefObject<HTMLInputElement | null>;
  closeBtnRef: RefObject<HTMLButtonElement | null>;
}

const SubmitBtn = forwardRef<HTMLButtonElement | null, IProps>(
  ({ isModal, pwCheckRef, closeBtnRef }, ref) => {
    const { isDisabled } = useCheckDisabledBtn();

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
                  previousTarget: pwCheckRef.current,
                  nextTarget: closeBtnRef.current
                })
            : undefined
        }
      >
        변경하기
      </button>
    );
  }
);
SubmitBtn.displayName = "ChangePasswordSubmitBtn";
export default SubmitBtn;
