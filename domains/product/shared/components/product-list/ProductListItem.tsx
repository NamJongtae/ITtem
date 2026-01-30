import Link from "next/link";
import ProductListImg from "./ProductListImg";
import ProductListContent from "./ProductListContent";
import { ProductCategory, ProductData } from "../../types/productTypes";
import { CATEGORY } from "../../constants/constants";

interface IProps {
  data: ProductData;
  category: ProductCategory | undefined;
}

export default function ProductListItem({ data, category }: IProps) {
  const categoryId = category !== undefined ? CATEGORY.indexOf(category) : 0;

  return (
    <Link
      href={`/product/${data._id}${category ? `?category_id=${categoryId}` : ""}`}
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
  );
}
