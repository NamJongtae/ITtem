"use client";

import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";
import useCategoryProductListInfiniteQuery from "../../shared/hooks/queries/useCategoryProductListInfiniteQuery";
import { ProductCategory } from "../../shared/types/productTypes";
import ProductListUI from "../../shared/components/product-list/ProductListUI";


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
