import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import Image from "next/image";
import React, { MutableRefObject } from "react";

interface IProps {
  handleClickImgInput: () => void;
  resetProfileImg: () => void;
  preview: string;
  profileImgBtnRef: MutableRefObject<HTMLButtonElement | null>;
  profileImgResetBtnRef: MutableRefObject<HTMLButtonElement | null>;
  nicknameRef: MutableRefObject<HTMLInputElement | null>;
  cancelBtnRef: MutableRefObject<HTMLButtonElement | null>;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

export default function ProfileEditImgInputBtn({
  handleClickImgInput,
  resetProfileImg,
  preview,
  profileImgBtnRef,
  profileImgResetBtnRef,
  nicknameRef,
  cancelBtnRef,
  submitBtnRef,
}: IProps) {
  return (
    <div className="relative">
      <button
        onClick={handleClickImgInput}
        type="button"
        className="relative before:absolute before:bottom-0 before:right-0 before:w-10 before:h-10 before:bg-[url('/icons/img_upload_icon.svg')] before:rounded-full before:bg-center before:bg-cover"
        ref={profileImgBtnRef}
        onKeyDown={(e) =>
          optimizationTabFocus({
            event: e,
            previousTarget: profileImgResetBtnRef.current,
            nextTarget: nicknameRef.current,
          })
        }
      >
        <Image
          className="w-[110px] h-[110px] rounded-full bg-gray-200"
          src={preview}
          alt="이미지 변경"
          width={110}
          height={110}
        />
      </button>
      <button
        type="button"
        onClick={resetProfileImg}
        className="absolute top-1 -right-1 bg-gray-500 rounded-full p-2"
        ref={profileImgResetBtnRef}
        onKeyDown={(e) =>
          optimizationTabFocus({
            event: e,
            previousTarget: submitBtnRef.current?.disabled
              ? cancelBtnRef.current
              : submitBtnRef.current,
            nextTarget: profileImgBtnRef.current,
          })
        }
      >
        <Image src={"/icons/x_icon.svg"} alt="초기화" width={10} height={10} />
      </button>
    </div>
  );
}
