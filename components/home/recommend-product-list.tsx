"use client";

import useRecommendProductInfiniteQuery from "@/hooks/react-query/queries/product/useRecommendProductInfiniteQuery";
import ProductListUI from "../commons/product-list/product-list-ui";

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
