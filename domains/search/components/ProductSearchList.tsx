"use client";

import useSearchProductListInfiniteQuery from "@/domains/product/shared/hooks/queries/useSearchProductListInfiniteQuery";
import ProductListUI from "../../product/shared/components/product-list/ProductListUI";
import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";

export default function ProductSearchList() {
  const { keyword } = useGetQuerys("keyword");
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSearchProductListInfiniteQuery();

  return (
    <ProductListUI
      data={data}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      emptyMessage={`"${keyword}"에 대한 검색결과가 없어요.`}
    />
  );
}
