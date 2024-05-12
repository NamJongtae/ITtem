import Image from "next/image";
import { useRef } from "react";

export default function ProfileEditImgField() {
  const imgInputRef = useRef<HTMLInputElement>(null);

  const handleClickImgInput = (e:any) => {
    if (!imgInputRef.current) return;
    e.preventDefault();
    imgInputRef.current.click();
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleClickImgInput}
        className="relative before:absolute before:bottom-0 before:right-0 before:w-10 before:h-10 before:bg-[url('/icons/img_upload_icon.svg')] before:rounded-full before:bg-center before:bg-cover focus:outline-none"
      >
        <Image
          className="w-[110px] h-[110px] rounded-full bg-gray-200"
          src={"/icons/user_icon.svg"}
          alt="이미지 변경"
          width={110}
          height={110}
        />
      </button>
      <input
        className="hidden"
        type="file"
        ref={imgInputRef}
        multiple
        name="img"
        accept="image/jpeg, image/png, image/svg+xml"
        id="img"
      />
    </div>
  );
}
