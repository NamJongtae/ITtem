"use client";

import CategoryNav from "@/shared/category/components/CategoryNav";
import Content from "./content/Content";
import Description from "./Description";
import SellerSection from "./seller/SellerSection";
import useProductQuery from "../../shared/hooks/queries/useProductQuery";
import useAddRecentProduct from "../../../../shared/layout/hooks/useAddRecentProduct";

export default function ProductDetailPage() {
  const { productData } = useProductQuery();

  useAddRecentProduct({
    productId: productData._id,
    productImg: productData.imgData[0].url,
    productName: productData.name
  });

  return (
    <div className="pt-8 pb-12">
      <div className="relative container mx-auto px-6 max-w-[1024px]">
        <CategoryNav className={"max-w-7xl mx-auto mb-5"} />
        <Content productDetailData={productData} />
        <div className="container mt-16 flex flex-col xl:flex-row border-t-2 border-solid border-black justify-between gap-10 xl:gap-5 pt-10 mx-auto max-w-7xl">
          <Description description={productData?.description} />
          <SellerSection auth={productData?.auth} />
        </div>
      </div>
    </div>
  );
}
