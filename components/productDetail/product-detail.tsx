"use client";

import CategoryNav from "../commons/category/category-nav";
import ProductDetailContent from "./product-detail-content";
import ProductDetailDescrtion from "./product-detail-descrtion";
import ProductDetailSeller from "./product-detail-seller";
import Loading from "@/app/loading";
import { isAxiosError } from "axios";
import ProductListEmpty from "../commons/Empty";
import useProductDetailPage from "@/hooks/productDetail/useProductDetailPage";

export default function ProductDetailPage() {
  const { productDetailData, loadProductLoading, loadProductError } =
    useProductDetailPage();

  if (loadProductLoading) {
    return <Loading />;
  }

  if (loadProductError) {
    if (isAxiosError<{ message: string }>(loadProductError)) {
      return (
        <ProductListEmpty
          message={loadProductError.response?.data.message || ""}
        />
      );
    }
  }
  return (
    productDetailData && (
      <>
        <div className="pt-8 pb-12">
          <div className="relative container mx-auto px-6 max-w-[1024px]">
            <CategoryNav className={"max-w-7xl mx-auto mb-5"} />
            <ProductDetailContent productDetailData={productDetailData} />
            <div className="container mt-16 flex flex-col xl:flex-row border-t-2 border-solid border-black justify-between gap-10 xl:gap-5 pt-10 mx-auto max-w-7xl">
              <ProductDetailDescrtion
                description={productDetailData?.description}
              />
              <ProductDetailSeller auth={productDetailData?.auth} />
            </div>
          </div>
        </div>
      </>
    )
  );
}
