import { ProductImgData } from '@/types/productTypes';
import Image from "next/legacy/image";
import React from "react";

interface IProps {
  imgData: ProductImgData[];
  handleRemoveImg: (index: number) => void;
}
export default function ImgPreviewList({ imgData, handleRemoveImg }: IProps) {
  return (
    <ul className="flex gap-5 mx-auto w-full overflow-y-hidden white-space-nowrap scrollbar pb-1">
      {imgData.map((data, index) => (
        <li
          key={data.name}
          className="relative w-48 h-48 border border-gray-400 box-content rounded-sm"
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
            className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full w-6 h-6 inline-flex items-center justify-center"
          >
            <Image
              src={"/icons/x_icon.svg"}
              alt="닫기"
              width={12}
              height={12}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
