import { optModalTabFocus } from "@/lib/optimizationTabFocus";
import Image from "next/image";
import React, { MutableRefObject, forwardRef } from "react";

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
          optModalTabFocus({
            event: e,
            previousTarget: submitBtnRef.current?.disabled
              ? textareaRef.current
              : submitBtnRef.current,
            nextTarget: starRef.current,
          });
        }}
      >
        <Image src={"/icons/x_icon.svg"} alt="닫기" width={12} height={12} />
      </button>
    );
  }
);

ReviewUploadModalCloseBtn.displayName = "ReviewUploadModalCloseBtn";
export default ReviewUploadModalCloseBtn;
