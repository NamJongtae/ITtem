import { optModalTabFocus } from "@/lib/optimizationTabFocus";
import Image from "next/image";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  handleClickCloseBtn: () => void;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  selectorRef: MutableRefObject<HTMLSelectElement | null>;
}

const ReasonModalCloseBtn = forwardRef<
  HTMLButtonElement | null,
  IProps
>(({ handleClickCloseBtn, submitBtnRef, textareaRef, selectorRef }, ref) => {
  return (
    <button
      type="button"
      onClick={handleClickCloseBtn}
      className="absolute top-3 right-3 bg-gray-500 rounded-full p-[6px]"
      ref={ref}
      onKeyDown={(e) =>
        optModalTabFocus({
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
      <Image src={"/icons/x_icon.svg"} alt="닫기" width={12} height={12} />
    </button>
  );
});

ReasonModalCloseBtn.displayName = "ReasonModalCloseBtn";
export default ReasonModalCloseBtn;
