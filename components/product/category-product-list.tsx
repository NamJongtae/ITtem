"use client";

import { useGetQuerys } from "@/hooks/commons/useGetQuerys";
import ProductListUI from "../commons/product-list/product-list-ui";
import useCategoryProductListInfiniteQuery from "@/hooks/react-query/queries/product/useCategoryProductListInfiniteQuery";
import { ProductCategory } from "@/types/product-types";

export default function CategoryProductList() {
  const { category } = useGetQuerys("category");
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useCategoryProductListInfiniteQuery({
      category: category ? (category as ProductCategory) : ProductCategory.전체
    });

  return (
    <ProductListUI
      data={data}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      emptyMessage="상품이 존재하지 않아요."
    />
  );
}
