import { ProductCategory, ProductListType } from "@/types/productTypes";
import useProductTodayListInfiniteQuery from "../reactQuery/queries/product/useProductTodayListInfiniteQuery";
import useCategoryProductListInfiniteQuery from "../reactQuery/queries/product/useCategoryProductListInfiniteQuery";
import useSearchProductListInfiniteQuery from "../reactQuery/queries/product/useSearchProductListInfiniteQuery";
import { useSearchParams } from "next/navigation";
import useProfileProductListInfiniteQuery from '../reactQuery/queries/profile/useProfileProductListInfiniteQuery';

export default function useProductList(
  productListType: ProductListType,
  productIds?: string[],
  profileProductCategory?: ProductCategory
) {
  const search = useSearchParams();
  const keyword = search.get("keyword");

  const emptyMessage = `${
    productListType === "TODAY"
      ? "오늘의 상품이 존재하지 않아요."
      : productListType === "CATEGORY" ||
        productListType === "PROFILE" ||
        productListType === "MY_PROFILE"
      ? "상품이 존재하지 않아요."
      : `${'"' + keyword + '"'}에 대한 검색결과가 없어요.`
  }`;

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
    emptyMessage,
  };
}
