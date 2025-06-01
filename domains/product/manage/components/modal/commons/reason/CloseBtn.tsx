import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";
import { RefObject, forwardRef } from "react";
import CloseIcon from "@/public/icons/x-icon.svg";

interface IProps {
  handleClickCloseBtn: () => void;
  submitBtnRef: RefObject<HTMLButtonElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  selectorRef: RefObject<HTMLSelectElement | null>;
}

const CloseBtn = forwardRef<HTMLButtonElement | null, IProps>(
  ({ handleClickCloseBtn, submitBtnRef, textareaRef, selectorRef }, ref) => {
    return (
      <button
        type="button"
        onClick={handleClickCloseBtn}
        className="absolute top-5 right-5"
        ref={ref}
        onKeyDown={(e) =>
          optimizationTabFocus({
            event: e,
            previousTarget: submitBtnRef.current?.disabled
              ? textareaRef.current?.disabled
                ? selectorRef.current
                : textareaRef.current
              : submitBtnRef.current,
            nextTarget: selectorRef.current
          })
        }
      >
        <CloseIcon className="fill-black w-3 h-3" aria-label="닫기" />
      </button>
    );
  }
);

CloseBtn.displayName = "ReasonModalCloseBtn";
export default CloseBtn;
