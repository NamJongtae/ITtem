import { getCategoryProductListQueryKey } from "@/constants/constant";
import { getCategoryProductList } from "@/lib/api/product";
import { RootState } from "@/store/store";
import {
  ProductCategory,
  ProductData,
  ProductListType,
} from "@/types/productTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";

export default function useCategoryProductListInfiniteQuery({
  limit = 10,
  category = ProductCategory.전체,
  productListType,
}: {
  limit?: number;
  category?: ProductCategory;
  productListType: ProductListType;
}) {
  const location = useSelector((state: RootState) => state.location.location);

  const {
    data: categoryProductListData,
    hasNextPage: hasNextPageCategoryProductList,
    fetchNextPage: fetchNextPageCategoryProductList,
    isFetchingNextPage: isFetchingNextPageCategoryProductList,
    isLoading: isLoadingCategoryProductList,
    error: categoryProductListError,
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey: getCategoryProductListQueryKey(category, location),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getCategoryProductList({
        category,
        page: pageParam,
        limit,
        location,
      });
      return response.data.product;
    },
    enabled: productListType === "CATEGORY",
    retry: 0,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      if (lastPage.length < limit) {
        return undefined;
      }
      return nextPage;
    },
  });

  return {
    categoryProductListData: categoryProductListData?.pages.flat(),
    hasNextPageCategoryProductList,
    fetchNextPageCategoryProductList,
    isFetchingNextPageCategoryProductList,
    isLoadingCategoryProductList,
    categoryProductListError,
  };
}
