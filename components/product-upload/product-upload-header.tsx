import React from "react";

interface IProps {
  isEdit: boolean;
}

export default function ProductUploadHeader({ isEdit }: IProps) {
  return (
    <h2 className="font-bold text-xl border-b-2 pb-3 border-b-gray-600 flex items-center">
      {isEdit ? "상품수정" : "상품등록"}
      <strong className="text-red-500 text-sm ml-5">*필수입력</strong>
    </h2>
  );
}
