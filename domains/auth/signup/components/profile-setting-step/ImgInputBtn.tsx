import Image from "next/image";
import XIcon from "@/public/icons/x-icon.svg";

interface IProps {
  handleClickImgInput: () => void;
  resetProfileImg: () => void;
  preview: string;
}

export default function ImgInputBtn({
  handleClickImgInput,
  resetProfileImg,
  preview,
}: IProps) {
  return (
    <div className="relative">
      <button
        onClick={handleClickImgInput}
        type="button"
        className="relative before:absolute before:bottom-0 before:right-0 before:w-10 before:h-10 before:bg-[url('/icons/img-upload-icon.svg')] before:rounded-full before:bg-center before:bg-cover focus:outline-none"
      >
        <Image
          className="w-[110px] h-[110px] rounded-full bg-gray-200"
          src={preview || "/icons/user-icon.svg"}
          alt="이미지 변경"
          width={110}
          height={110}
        />
      </button>
      <button
        type="button"
        onClick={resetProfileImg}
        className="absolute top-1 -right-1 bg-gray-500 rounded-full p-2"
      >
        <XIcon className="fill-white w-[10px] h-[10px]" aria-label="초기화" />
      </button>
    </div>
  );
}
