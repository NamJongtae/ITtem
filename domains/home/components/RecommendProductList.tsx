"use client";

import ProductListUI from "@/domains/product/shared/components/product-list/ProductListUI";
import useRecommendProductInfiniteQuery from "@/domains/product/shared/hooks/queries/useRecommendProductInfiniteQuery";

export default function RecommendProductList({
  nextCursor
}: {
  nextCursor: string | null;
}) {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useRecommendProductInfiniteQuery({ limit: 12, nextCursor });

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
