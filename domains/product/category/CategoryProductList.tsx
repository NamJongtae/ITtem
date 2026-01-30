"use client";

import useCategoryProductListInfiniteQuery from "../shared/hooks/queries/useCategoryProductListInfiniteQuery";
import { ProductCategory } from "../shared/types/productTypes";
import ProductListUI from "../shared/components/product-list/ProductListUI";

interface IProps {
  category: ProductCategory;
  nextCursor: string | null;
}

export default function CategoryProductList({ category, nextCursor }: IProps) {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useCategoryProductListInfiniteQuery({
      category: category ? (category as ProductCategory) : ProductCategory.전체,
      nextCursor
    });

  return (
    <ProductListUI
      data={data}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}
