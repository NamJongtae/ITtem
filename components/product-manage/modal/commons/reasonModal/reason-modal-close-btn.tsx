import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import Image from "next/image";
import { MutableRefObject, forwardRef } from "react";
import CloseIcon from "@/public/icons/x_icon.svg";

interface IProps {
  handleClickCloseBtn: () => void;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  selectorRef: MutableRefObject<HTMLSelectElement | null>;
}

const ReasonModalCloseBtn = forwardRef<HTMLButtonElement | null, IProps>(
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
            nextTarget: selectorRef.current,
          })
        }
      >
        <CloseIcon className="fill-black w-3 h-3" aria-label="닫기" />
      </button>
    );
  }
);

ReasonModalCloseBtn.displayName = "ReasonModalCloseBtn";
export default ReasonModalCloseBtn;
