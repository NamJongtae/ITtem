import Content from "./content/Content";
import Description from "./Description";
import SellerSection from "./seller/SellerSection";
import { ProductDetailData } from "../types/productDetailTypes";
import { Suspense } from "react";
import ProductDetailCategoryNav from "./ProductDetailCategoryNav";

export default function ProductDetailScreen({
  product
}: {
  product: ProductDetailData;
}) {
  return (
    <div className="pt-8 pb-12">
      <div className="relative container mx-auto px-6 max-w-[1024px]">
        <Suspense
          fallback={
            <div
              className={
                "w-36 h-5 max-w-7xl mb-5 bg-gray-200 rounded animate-pulse"
              }
            />
          }
        >
          <ProductDetailCategoryNav />
        </Suspense>
        <Content productDetailData={product} />
        <div className="container mt-16 flex flex-col xl:flex-row border-t-2 border-solid border-black justify-between gap-10 xl:gap-5 pt-10 mx-auto max-w-7xl">
          <Description description={product?.description} />
          <SellerSection />
        </div>
      </div>
    </div>
  );
}
