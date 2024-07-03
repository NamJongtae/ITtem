import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import Image from "next/image";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  handleClickChangePwCloseBtn: () => void;
  currentPwRef: MutableRefObject<HTMLInputElement | null>;
  pwCheckRef: MutableRefObject<HTMLInputElement | null>;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

const ChangePasswordModalCloseBtn = forwardRef<
  HTMLButtonElement | null,
  IProps
>(
  (
    { handleClickChangePwCloseBtn, currentPwRef, pwCheckRef, submitBtnRef },
    ref
  ) => {
    return (
      <button
        type="button"
        onClick={handleClickChangePwCloseBtn}
        className="absolute top-3 right-3 bg-gray-500 rounded-full p-[6px]"
        ref={ref}
        onKeyDown={(e) =>
          optimizationTabFocus({
            event: e,
            previousTarget: submitBtnRef.current?.disabled
              ? pwCheckRef.current
              : submitBtnRef.current,
            nextTarget: currentPwRef.current,
          })
        }
      >
        <Image src={"/icons/x_icon.svg"} alt="닫기" width={12} height={12} />
      </button>
    );
  }
);
ChangePasswordModalCloseBtn.displayName = "ChangePasswordModalCloseBtn";
export default ChangePasswordModalCloseBtn;
