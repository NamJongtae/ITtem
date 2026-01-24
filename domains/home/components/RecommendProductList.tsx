"use client";

import ProductListSkeletonUI from "@/domains/product/shared/components/product-list/ProductListSkeletonUI";
import useRecommendProductInfiniteQuery from "@/domains/product/shared/hooks/queries/useRecommendProductInfiniteQuery";
import dynamic from "next/dynamic";
const ProductListUI = dynamic(
  () => import("../../product/shared/components/product-list/ProductListUI"),
  { ssr: false, loading: () => <ProductListSkeletonUI /> }
);

export default function RecommendProductList() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useRecommendProductInfiniteQuery({ limit: 12 });

  return (
    <ProductListUI
      data={data}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      emptyMessage={"오늘의 추천 상품이 없어요."}
    />
  );
}
