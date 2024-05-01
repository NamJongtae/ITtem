import { getSearchProductListQueryKey } from "@/constants/constant";
import { getSearchProductList } from "@/lib/api/product";
import {
  ProductCategory,
  ProductData,
  ProductListType,
} from "@/types/productTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";

export default function useSearchProductListInfiniteQuery({
  limit = 10,
  category = ProductCategory.전체,
  productListType,
}: {
  limit?: number;
  category?: ProductCategory;
  productListType: ProductListType;
}) {
  const search = useSearchParams();
  const keyword = search.get("keyword");

  const {
    data: searchProductListData,
    hasNextPage: hasNextPageSearchProductList,
    fetchNextPage: fetchNextPageSearchProductList,
    isFetchingNextPage: isFetchingNextPageSearchProductList,
    isLoading: isLoadingSearchProductList,
    error: searchProductListError,
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey: getSearchProductListQueryKey(category, keyword),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getSearchProductList({
        category,
        page: pageParam,
        limit,
        keyword: keyword || "",
      });
      return response.data.product;
    },
    enabled: productListType === "SEARCH" && !!keyword,
    retry: 0,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allpages) => {
      return lastPage.length === limit
        ? allpages.flat().length / limit + 1
        : undefined;
    },
  });

  return {
    searchProductListData: searchProductListData?.pages.flat(),
    hasNextPageSearchProductList,
    fetchNextPageSearchProductList,
    isFetchingNextPageSearchProductList,
    isLoadingSearchProductList,
    searchProductListError,
  };
}
