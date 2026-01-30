"use client";

import useSearchProductListInfiniteQuery from "@/domains/product/shared/hooks/queries/useSearchProductListInfiniteQuery";
import ProductListUI from "../../product/shared/components/product-list/ProductListUI";
import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";
import Empty from "@/shared/common/components/Empty";

export default function ProductSearchList() {
  const { keyword } = useGetQuerys("keyword");
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSearchProductListInfiniteQuery();

  if (data.length === 0) {
    return (
      <div className="max-w-[1024px] mx-auto pb-12 px-8 mt-6">
        <Empty message={`"${keyword}"에 대한 검색결과가 없어요.`} />
      </div>
    );
  }

  return (
    <ProductListUI
      data={data}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
}
