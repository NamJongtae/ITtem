import React from "react";
import ImgSlider from "../imgSlider/img-slider";
import Image from "next/image";
import { ProductData, ProductStatus } from "@/types/productTypes";

interface IProps {
  data: Pick<ProductData, "imgData" | "status" | "name">;
}

export default function ProductListImg({ data }: IProps) {
  const soldoutStyles = `before:absolute before:inset-0 before:bg-gray-700 before:bg-opacity-50 before:z-10 before:text-white before:text-xl before:font-semibold before:content-[attr(data-status)] before:flex before:justify-center before:items-center`;

  return (
    <div
      data-status={
        data.status === ProductStatus.soldout
          ? "판매완료"
          : data.status === ProductStatus.trading
          ? "거래중"
          : "판매중"
      }
      className={`${
        data.status !== ProductStatus.sold ? soldoutStyles : ""
      } relative flex h-full w-full`}
    >
      {data.imgData.length === 1 || data.status !== ProductStatus.sold ? (
        <Image
          className="w-full h-full object-cover object-center aspect-square"
          src={data.imgData[0].url}
          alt={data.status !== ProductStatus.sold ? "soldout" : data.name}
          width={300}
          height={300}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      ) : (
        <ImgSlider imgData={data.imgData} imgWidth={300} imgHeight={300} />
      )}
    </div>
  );
}
