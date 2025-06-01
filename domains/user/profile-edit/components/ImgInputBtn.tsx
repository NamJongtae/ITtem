import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";
import Image from "next/image";
import XIcon from "@/public/icons/x-icon.svg";
import { RefObject } from "react";

interface IProps {
  isModal?: boolean;
  handleClickImgInput: () => void;
  resetProfileImg: () => void;
  preview: string;
  profileImgBtnRef: RefObject<HTMLButtonElement | null>;
  profileImgResetBtnRef: RefObject<HTMLButtonElement | null>;
  nicknameRef: RefObject<HTMLInputElement | null>;
  closeBtnRef: RefObject<HTMLButtonElement | null>;
}

export default function ImgInputBtn({
  isModal,
  handleClickImgInput,
  resetProfileImg,
  preview,
  profileImgBtnRef,
  profileImgResetBtnRef,
  nicknameRef,
  closeBtnRef
}: IProps) {
  return (
    <div className="relative">
      <button
        onClick={handleClickImgInput}
        type="button"
        className="relative before:absolute before:bottom-0 before:right-0 before:w-10 before:h-10 before:bg-[url('/icons/img-upload_icon.svg')] before:rounded-full before:bg-center before:bg-cover"
        ref={profileImgBtnRef}
        onKeyDown={(e) =>
          optimizationTabFocus({
            event: e,
            previousTarget: profileImgResetBtnRef.current,
            nextTarget: nicknameRef.current
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
        onKeyDown={
          isModal
            ? (e) =>
                optimizationTabFocus({
                  event: e,
                  previousTarget: closeBtnRef.current,
                  nextTarget: profileImgBtnRef.current
                })
            : undefined
        }
      >
        <XIcon className="fill-white w-[10px] h-[10px]" aria-label="초기화" />
      </button>
    </div>
  );
}
