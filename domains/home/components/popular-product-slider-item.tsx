import Link from "next/link";
import React from "react";
import FallbackImage from "../../../components/fallback-Image";
import ProductListContent from "../../product/components/product-list/product-list-content";
import { ProductData } from "../../product/types/product-types";

interface IProps {
  data: ProductData;
}

export default function PopularProductSliderItem({ data }: IProps) {
  return (
    <div className="relative w-full h-[340px] mx-auto">
      <Link
        href={`/product/${data._id}`}
        className="mx-auto group flex w-full h-full max-w-xs flex-col overflow-hidden bg-white border "
      >
        <div className="w-full h-full overflow-hidden">
          <FallbackImage
            className="w-full h-full object-cover object-center aspect-square"
            src={data.imgData[0].url}
            alt={data.name}
            width={300}
            height={300}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          />
        </div>

        <ProductListContent
          data={{
            name: data.name,
            createdAt: data.createdAt,
            price: data.price,
            location: data.location
          }}
        />
      </Link>
    </div>
  );
}
