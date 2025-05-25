import React from "react";
import ImgSlider from "@/shared/common/components/ImgSlider";
import { ProductData, ProductStatus } from "../../types/productTypes";
import FallbackImage from "@/shared/common/components/FallbackImage";

interface IProps {
  data: Pick<ProductData, "imgData" | "status" | "name">;
}

const status = {
  soldout: "판매완료",
  trading: "거래중",
  sold: "판매중"
} as const;

export default function ProductListImg({ data }: IProps) {
  const soldoutStyles = `before:absolute before:inset-0 before:bg-gray-700 before:bg-opacity-50 before:z-10 before:text-white before:text-xl before:font-semibold before:content-[attr(data-status)] before:flex before:justify-center before:items-center`;
  const dataStatus = status[data.status];
  const isSoldout = data.status !== ProductStatus.soldout;
  const isTrading = data.status === ProductStatus.trading;
  const isOneImg = data.imgData.length === 1;

  return (
    <div
      data-status={dataStatus}
      className={`${
        data.status !== ProductStatus.sold ? soldoutStyles : ""
      } relative flex h-full w-full`}
    >
      {isOneImg || isSoldout || isTrading ? (
        <FallbackImage
          className="w-full h-full object-cover object-center aspect-square"
          src={data.imgData[0].url}
          alt={data.status !== ProductStatus.sold ? "soldout" : data.name}
          width={300}
          height={300}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      ) : (
        <ImgSlider
          imgData={data.imgData}
          imgWidth={300}
          imgHeight={300}
          isAutoPlay={true}
          isLoop={true}
        />
      )}
    </div>
  );
}
