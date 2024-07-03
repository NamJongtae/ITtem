import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import Image from "next/image";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  introduceRef: MutableRefObject<HTMLTextAreaElement | null>;
  profileImgResetBtnRef: MutableRefObject<HTMLButtonElement | null>;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
  handleClickProfieEditCloseBtn: () => void;
}

const ProfileEditCloseBtn = forwardRef<HTMLButtonElement, IProps>(
  (
    {
      introduceRef,
      profileImgResetBtnRef,
      submitBtnRef,
      handleClickProfieEditCloseBtn,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClickProfieEditCloseBtn}
        className="absolute top-3 right-3 bg-gray-500 rounded-full p-[6px]"
        onKeyDown={(e) =>
          optimizationTabFocus({
            event: e,
            previousTarget: submitBtnRef.current?.disabled
              ? introduceRef.current
              : submitBtnRef.current,
            nextTarget: profileImgResetBtnRef.current,
          })
        }
      >
        <Image src={"/icons/x_icon.svg"} alt="닫기" width={12} height={12} />
      </button>
    );
  }
);

ProfileEditCloseBtn.displayName = "ProfileEditCloseBtn";
export default ProfileEditCloseBtn;
