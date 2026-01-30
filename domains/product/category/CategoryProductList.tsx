"use client";

import useCategoryProductListInfiniteQuery from "../shared/hooks/queries/useCategoryProductListInfiniteQuery";
import { ProductCategory } from "../shared/types/productTypes";
import ProductListUI from "../shared/components/product-list/ProductListUI";
import Empty from "@/shared/common/components/Empty";

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

  if (data.length === 0) {
    return (
      <div className="max-w-[1024px] mx-auto pb-12 px-8 mt-6">
        <Empty message="상품이 존재하지 않아요." />
      </div>
    );
  }

  return (
    <ProductListUI
      data={data}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}
