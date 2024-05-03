import { imgValidation } from "@/lib/imgValidation";
import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function useProfileImg() {
  const [preview, setPreview] = useState("/icons/user_icon.svg");
  const imgInputRef = useRef<HTMLInputElement | null>(null);

  const { setValue, resetField } = useFormContext();

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
    resetField("profileImg");
    setPreview("/icons/user_icon.svg");
  };

  return {
    handleClickImgInput,
    resetProfileImg,
    preview,
    handleChangeImg,
    imgInputRef,
  };
}