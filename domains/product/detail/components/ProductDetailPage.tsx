"use client";

import CategoryNav from "@/shared/category/components/CategoryNav";
import Content from "./content/Content";
import Description from "./Description";
import SellerSection from "./seller/SellerSection";
import useProductQuery from "../../shared/hooks/queries/useProductQuery";
import useAddRecentProduct from "../../../../shared/layout/hooks/useAddRecentProduct";
import { useEffect } from "react";
import incrementProductView from "../api/incrementProductView";
import Empty from "@/shared/common/components/Empty";

export default function ProductDetailPage() {
  const { productData, showCSRSkeleton } = useProductQuery();

  const isBlocked = !!productData?.block;
  const recentProduct = {
    productId: productData?._id ?? "",
    productImg: productData?.imgData?.[0]?.url ?? "",
    productName: productData?.name ?? ""
  };

  useAddRecentProduct({
    recentProduct,
    enabled: !!productData && !isBlocked
  });

  useEffect(() => {
    if (!productData?._id) return;
    if (isBlocked) return;

    incrementProductView(productData._id);
  }, [productData?._id, isBlocked]);

  if (isBlocked) {
    return <Empty message="신고 누적으로 블라인드 처리된 상품입니다." />;
  }

  return (
    <div className="pt-8 pb-12">
      <div className="relative container mx-auto px-6 max-w-[1024px]">
        <CategoryNav className={"max-w-7xl mx-auto mb-5"} />
        <Content
          productDetailData={productData}
          showCSRSkeleton={showCSRSkeleton}
        />
        <div className="container mt-16 flex flex-col xl:flex-row border-t-2 border-solid border-black justify-between gap-10 xl:gap-5 pt-10 mx-auto max-w-7xl">
          <Description description={productData?.description} />
          <SellerSection
            auth={productData?.auth}
            showCSRSkeleton={showCSRSkeleton}
          />
        </div>
      </div>
    </div>
  );
}
