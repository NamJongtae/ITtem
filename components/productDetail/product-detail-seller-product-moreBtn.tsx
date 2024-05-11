import { ProductDetailAuthData } from "@/types/productTypes";
import Link from "next/link";

interface IProps {
  auth: ProductDetailAuthData | undefined;
}
export default function ProductDetailSellerProductMoreBtn({ auth }: IProps) {
  const isShowMoreBtn =
    auth?.productIds &&
    (auth?.recentProducts.length ?? 0) > 0 &&
    auth.productIds.slice.length -
      1 -
      (auth?.recentProducts.length ?? 0) >
      0;

  return (
    isShowMoreBtn && (
      <Link
        href={`/profile/${auth.uid}`}
        className="inline-flex mt-5 border p-2 text-sm ml-[50%] -translate-x-[50%] rounded-sm betterhover:hover:bg-gray-100"
      >
        <span className="text-red-500">
          {auth.productIds.length - 1 - auth?.recentProducts!.length}개
        </span>
        의 상품 더보기{" "}
        <svg
          className={"-mr-1 h-5 w-5 text-gray-400 -rotate-90"}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    )
  );
}
