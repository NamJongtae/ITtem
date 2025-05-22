"use client";

import useRecommendProductInfiniteQuery from "@/domains/product/hooks/queries/useRecommendProductInfiniteQuery";
import ProductListUI from "../../product/components/product-list/product-list-ui";

export default function RecommendProductList() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useRecommendProductInfiniteQuery();

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
