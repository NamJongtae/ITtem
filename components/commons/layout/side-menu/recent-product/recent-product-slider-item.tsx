import FallbackImage from "@/components/commons/fallback-Image";
import { RecentProductData } from "@/types/productTypes";
import Link from "next/link";
import React from "react";

interface IProps {
  recentProductData: RecentProductData;
}
export default function RecentProductSliderItem({ recentProductData }: IProps) {
  return (
    <li key={recentProductData.productId} className="h-[100px] min-w-[100px]">
      <Link href={`/product/${recentProductData.productId}`}>
        <FallbackImage
          className="w-full h-full object-cover object-center"
          src={recentProductData.productImg}
          alt={recentProductData.productName}
          width={160}
          height={160}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      </Link>
    </li>
  );
}
