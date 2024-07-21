import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import CloseIcon from "@/public/icons/x_icon.svg";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  handleClickCloseBtn: () => void;
  starRef: MutableRefObject<HTMLDivElement | null>;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

const ReviewUploadModalCloseBtn = forwardRef<HTMLButtonElement | null, IProps>(
  ({ handleClickCloseBtn, starRef, textareaRef, submitBtnRef }, ref) => {
    return (
      <button
        type="button"
        onClick={handleClickCloseBtn}
        className="absolute top-3 right-3 bg-gray-500 rounded-full p-[6px]"
        ref={ref}
        onKeyDown={(e) => {
          optimizationTabFocus({
            event: e,
            previousTarget: submitBtnRef.current?.disabled
              ? textareaRef.current
              : submitBtnRef.current,
            nextTarget: starRef.current,
          });
        }}
      >
        <CloseIcon className="fill-black w-3 h-3" aria-label="닫기" />
      </button>
    );
  }
);

ReviewUploadModalCloseBtn.displayName = "ReviewUploadModalCloseBtn";
export default ReviewUploadModalCloseBtn;
