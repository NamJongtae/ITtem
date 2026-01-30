"use client";

import Empty from "@/shared/common/components/Empty";
import SellerInfo from "./SellerInfo";
import ProductList from "./SellerProductList";
import useProductQuery from "@/domains/product/shared/hooks/queries/useProductQuery";

export default function SellerSection() {
  const { productData, showCSRSkeleton } = useProductQuery();
  return (
    <section className="basis-1/3">
      <h3 className="text-gray-600 text-xl font-medium">판매자 정보</h3>
      <hr className="h-px border-0 bg-gray-500 my-3" />
      {productData.auth?.uid ? (
        <>
          <SellerInfo
            auth={productData.auth}
            showCSRSkeleton={showCSRSkeleton}
          />
          <ProductList auth={productData.auth} />
        </>
      ) : (
        <Empty message={"유저가 존재하지 않아요."} />
      )}
    </section>
  );
}
