import Link from "next/link";
import ProductListImg from "./product-list-img";
import ProductListContent from "./product-list-content";
import { ProductCategory, ProductData } from "../../types/product-types";

interface IProps {
  data: ProductData;
  category: ProductCategory | undefined;
}

export default function ProductListItem({ data, category }: IProps) {
  return (
    <li className="relative w-full h-full mx-auto">
      <Link
        href={`/product/${data._id}${category ? `?category=${category}` : ""}`}
        className="mx-auto group flex w-full h-full max-w-xs flex-col overflow-hidden bg-white border "
      >
        <ProductListImg
          data={{
            imgData: data.imgData,
            status: data.status,
            name: data.name
          }}
        />

        <ProductListContent
          data={{
            name: data.name,
            createdAt: data.createdAt,
            price: data.price,
            location: data.location
          }}
        />
      </Link>
    </li>
  );
}
