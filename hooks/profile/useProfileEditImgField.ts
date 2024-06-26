import { useRef } from "react";

export default function useProfileEditImgField() {
  const imgInputRef = useRef<HTMLInputElement>(null);

  const handleClickImgInput = (e: any) => {
    if (!imgInputRef.current) return;
    e.preventDefault();
    imgInputRef.current.click();
  };

  return { imgInputRef, handleClickImgInput };
}
