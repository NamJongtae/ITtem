import { ProductImgData } from "../../../../types/product-types";
import XIcon from "@/public/icons/x-icon.svg";
import Image from "next/legacy/image";
import React from "react";

interface IProps {
  imgData: ProductImgData[];
  handleRemoveImg: (index: number) => void;
}
export default function ProductUploadImgPreviewList({
  imgData,
  handleRemoveImg
}: IProps) {
  return (
    <ul className="flex gap-5 mx-auto w-full overflow-y-hidden white-space-nowrap scrollbar pb-1">
      {imgData.map((data, index) => (
        <li
          key={data.url}
          className="relative w-48 h-48 border border-gray-400 box-content rounded-sm bg-opacity-50"
        >
          <Image
            className="w-full h-full object-cover object-center rounded-sm"
            src={data.url}
            alt="img"
            layout="fixed"
            width={192}
            height={192}
          />
          <button
            onClick={() => handleRemoveImg(index)}
            className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full w-5 h-5 inline-flex items-center justify-center"
          >
            <XIcon className="fill-white w-2 h-2" aria-label="삭제" />
          </button>
        </li>
      ))}
    </ul>
  );
}
