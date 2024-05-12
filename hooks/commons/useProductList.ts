import { ProductCategory, ProductListType } from "@/types/productTypes";
import { useSearchParams } from "next/navigation";
import useProductTodayListInfiniteQuery from "../querys/useProductTodayListInfiniteQuery";
import useCategoryProductListInfiniteQuery from "../querys/useCategoryProductListInfiniteQuery";
import useSearchProductListInfiniteQuery from "../querys/useSearchProductListInfiniteQuery";
import useProfileProductListInfiniteQuery from "../querys/useProfileProductListInfiniteQuery";

export default function useProductList(
  productListType: ProductListType,
  productIds?: string[],
  profileProductCategory?: ProductCategory
) {
  const search = useSearchParams();

  const category =
    profileProductCategory ||
    (search.get("category") as ProductCategory) ||
    null;
  const {
    todayProductListData,
    hasNextPageTodayProductList,
    fetchNextPageTodayProductList,
    isFetchingNextPageTodayProductList,
    isLoadingTodayProductList,
    todayProductListError,
  } = useProductTodayListInfiniteQuery({ productListType });

  const {
    categoryProductListData,
    hasNextPageCategoryProductList,
    fetchNextPageCategoryProductList,
    isFetchingNextPageCategoryProductList,
    isLoadingCategoryProductList,
    categoryProductListError,
  } = useCategoryProductListInfiniteQuery({
    category: category || undefined,
    productListType,
  });

  const {
    searchProductListData,
    hasNextPageSearchProductList,
    fetchNextPageSearchProductList,
    isFetchingNextPageSearchProductList,
    isLoadingSearchProductList,
    searchProductListError,
  } = useSearchProductListInfiniteQuery({
    category: category || undefined,
    productListType,
  });

  const {
    profileProductListData,
    hasNextPageProfileProductList,
    fetchNextPageProfileProductList,
    isFetchingNextPageProfileProductList,
    isLoadingProfileProductList,
    profileProductListError,
  } = useProfileProductListInfiniteQuery({
    category: category || undefined,
    productListType,
    productIds: productIds || [],
  });

  const isLoading =
    productListType === "TODAY"
      ? isLoadingTodayProductList
      : productListType === "CATEGORY"
      ? isLoadingCategoryProductList
      : productListType === "PROFILE" || productListType === "MY_PROFILE"
      ? isLoadingProfileProductList
      : isLoadingSearchProductList;

  const data =
    productListType === "TODAY"
      ? todayProductListData
      : productListType === "CATEGORY"
      ? categoryProductListData
      : productListType === "PROFILE" || productListType === "MY_PROFILE"
      ? profileProductListData
      : searchProductListData;

  const fetchNextPage =
    productListType === "TODAY"
      ? fetchNextPageTodayProductList
      : productListType === "CATEGORY"
      ? fetchNextPageCategoryProductList
      : productListType === "PROFILE" || productListType === "MY_PROFILE"
      ? fetchNextPageProfileProductList
      : fetchNextPageSearchProductList;

  const isFetchingNextPage =
    productListType === "TODAY"
      ? isFetchingNextPageTodayProductList
      : productListType === "CATEGORY"
      ? isFetchingNextPageCategoryProductList
      : productListType === "PROFILE" || productListType === "MY_PROFILE"
      ? isFetchingNextPageProfileProductList
      : isFetchingNextPageSearchProductList;

  const hasNextPage =
    productListType === "TODAY"
      ? hasNextPageTodayProductList
      : productListType === "CATEGORY"
      ? hasNextPageCategoryProductList
      : productListType === "PROFILE" || productListType === "MY_PROFILE"
      ? hasNextPageProfileProductList
      : hasNextPageSearchProductList;

  const error =
    productListType === "TODAY"
      ? todayProductListError
      : productListType === "CATEGORY"
      ? categoryProductListError
      : productListType === "PROFILE" || productListType === "MY_PROFILE"
      ? profileProductListError
      : searchProductListError;

  return {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
  };
}
