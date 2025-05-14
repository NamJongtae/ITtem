"use client";

import CategoryNav from "../commons/category/category-nav";
import ProductDetailContent from "./content/product-detail-content";
import ProductDetailDescription from "./product-detail-description";
import ProductDetailSeller from "./seller/product-detail-seller";
import { isAxiosError } from "axios";
import Empty from "../commons/empty";

import ProductDetailLoading from "@/app/product/[productId]/loading";
import useProductQuery from "@/hooks/react-query/queries/product/useProductQuery";
import useAddRecentProduct from "@/hooks/product-detail/useAddRecentProduct";

export default function ProductDetailPage() {
  const { productDetailData, loadProductLoading, loadProductError } =
    useProductQuery();

  useAddRecentProduct(productDetailData);

  if (loadProductLoading) {
    return <ProductDetailLoading />;
  }

  if (loadProductError) {
    if (isAxiosError<{ message: string }>(loadProductError)) {
      return <Empty message={loadProductError.response?.data.message || ""} />;
    }
  }
  return (
    <div className="pt-8 pb-12">
      <div className="relative container mx-auto px-6 max-w-[1024px]">
        <CategoryNav className={"max-w-7xl mx-auto mb-5"} />
        <ProductDetailContent productDetailData={productDetailData} />
        <div className="container mt-16 flex flex-col xl:flex-row border-t-2 border-solid border-black justify-between gap-10 xl:gap-5 pt-10 mx-auto max-w-7xl">
          <ProductDetailDescription
            description={productDetailData?.description}
          />
          <ProductDetailSeller auth={productDetailData?.auth} />
        </div>
      </div>
    </div>
  );
}
