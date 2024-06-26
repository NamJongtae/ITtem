import { ProductData } from "@/types/productTypes";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  productData: ProductData | undefined;
}

export default function ProductDetailSellerProductItem({
  productData,
}: IProps) {
  return (
    <li
      className={
        "relative betterhover:hover:opacity-50 transition-all group ease-in duration-200"
      }
    >
      <Link
        className="w-full h-full aspect-square"
        href={`/product/${productData?._id}`}
      >
        <Image
          className="mx-auto w-full h-full aspect-square object-cover object-center"
          src={productData?.imgData[0].url || ""}
          width={316}
          height={316}
          alt={productData?.name || ""}
        />
        <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white h-5 text-[14px] xl:h-4 xl:text-xs inline-flex justify-center items-center">
          <span>{productData?.price}</span> 원
        </div>
      </Link>
    </li>
  );
}
