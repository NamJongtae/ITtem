import Link from "next/link";
import ProductListImg from "./product-list-img";
import ProductListContent from "./product-list-content";
import { ProductData } from '@/types/productTypes';

interface IProps {
  data: ProductData;
}

export default function ProductItem({ data }: IProps) {
  return (
    <li className="relative w-full h-full mx-auto">
      <Link
        href={`/fleamarket/${data.id}`}
        className="mx-auto group flex w-full h-full max-w-xs flex-col overflow-hidden bg-white border "
      >
        <ProductListImg
          data={{
            imgUrls: data.imgUrls,
            status: data.status,
            name: data.name,
          }}
        />

        <ProductListContent data={{ name: data.name, createdAt: data.createdAt }} />
      </Link>
    </li>
  );
}
