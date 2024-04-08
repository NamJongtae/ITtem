import { imgValidation } from "@/lib/imgValidation";
import Image from "next/image";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function ProfileImgField() {
  const [preview, setPreview] = useState("/icons/user_icon.svg");
  const imgInputRef = useRef<HTMLInputElement>(null);

  const { register, setValue, resetField } = useFormContext();

  const handleClickImgInput = () => {
    if (!imgInputRef.current) return;
    imgInputRef.current.click();
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const isValid = imgValidation(file);
    if (!isValid) return;

    const imgPreview = URL.createObjectURL(file);
    setValue("profileImg", file);
    setPreview(imgPreview);
  };

  const resetProfileImg = () => {
    resetField("profileImg")
    setPreview("/icons/user_icon.svg");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <button
          onClick={handleClickImgInput}
          type="button"
          className="relative before:absolute before:bottom-0 before:right-0 before:w-10 before:h-10 before:bg-[url('/icons/img_upload_icon.svg')] before:rounded-full before:bg-center before:bg-cover focus:outline-none"
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
        >
          <Image
            src={"/icons/x_icon.svg"}
            alt="초기화"
            width={10}
            height={10}
          />
        </button>
      </div>

      <input
        className="hidden"
        type="file"
        accept="image/jpeg, image/png, image/svg+xml"
        id="profileImg"
        {...(register("profileImg"),
        {
          onChange: handleChangeImg,
          ref: imgInputRef,
        })}
      />
    </div>
  );
}
