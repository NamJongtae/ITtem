import { getCategoryProductListQueryKey } from "@/constants/constant";
import { getCategoryProductList } from "@/lib/api/product";
import { ProductCategory, ProductData, ProductListType } from "@/types/productTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useCategoryProductListInfiniteQuery({
  limit = 10,
  category = ProductCategory.전체,
  productListType,
}: {
  limit?: number;
  category?: ProductCategory;
  productListType: ProductListType;
}) {
  const {
    data: categoryProductListData,
    hasNextPage: hasNextPageCategoryProductList,
    fetchNextPage: fetchNextPageCategoryProductList,
    isFetchingNextPage: isFetchingNextPageCategoryProductList,
    isLoading: isLoadingCategoryProductList,
    isError: isErrorCategoryProductList,
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey: getCategoryProductListQueryKey(category),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getCategoryProductList(category, pageParam, limit);
      return response.data.product;
    },
    enabled: productListType === "CATEGORY",
    initialPageParam: 1,
    getNextPageParam: (lastPage, allpages) => {
      return lastPage.length === limit
        ? allpages.flat().length / limit + 1
        : undefined;
    },
  });

  return {
    categoryProductListData: categoryProductListData?.pages.flat(),
    hasNextPageCategoryProductList,
    fetchNextPageCategoryProductList,
    isFetchingNextPageCategoryProductList,
    isLoadingCategoryProductList,
    isErrorCategoryProductList,
  };
}
