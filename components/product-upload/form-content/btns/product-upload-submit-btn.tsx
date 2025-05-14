import useProductUploadBtnDisabled from "@/hooks/product-upload/useProductUploadBtnDisabled";
import React from "react";

interface IProps {
  isEdit?: boolean;
}
export default function ProductUploadSubmitBtn({ isEdit }: IProps) {
  const { isDisabled } = useProductUploadBtnDisabled(isEdit);

  return (
    <button
      type="submit"
      className="text-md text-white font-semibold bg-gray-700 py-2 w-24 disabled:opacity-50"
      disabled={isDisabled}
    >
      등록하기
    </button>
  );
}
