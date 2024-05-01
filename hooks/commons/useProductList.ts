import { ProductCategory, ProductListType } from "@/types/productTypes";
import { useSearchParams } from "next/navigation";
import React from "react";
import useProductTodayListInfiniteQuery from "../querys/useProductTodayListInfiniteQuery";
import useCategoryProductListInfiniteQuery from "../querys/useCategoryProductListInfiniteQuery";
import useSearchProductListInfiniteQuery from "../querys/useSearchProductListInfiniteQuery";

export default function useProductList(productListType: ProductListType) {
  const search = useSearchParams();
  const keyword = search.get("keyword");

  const category = (search.get("category") as ProductCategory) || null;
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

  const isLoading =
    productListType === "TODAY"
      ? isLoadingTodayProductList
      : productListType === "CATEGORY"
      ? isLoadingCategoryProductList
      : isLoadingSearchProductList;

  const data =
    productListType === "TODAY"
      ? todayProductListData
      : productListType === "CATEGORY"
      ? categoryProductListData
      : searchProductListData;

  const fetchNextPage =
    productListType === "TODAY"
      ? fetchNextPageTodayProductList
      : productListType === "CATEGORY"
      ? fetchNextPageCategoryProductList
      : fetchNextPageSearchProductList;

  const isFetchingNextPage =
    productListType === "TODAY"
      ? isFetchingNextPageTodayProductList
      : productListType === "CATEGORY"
      ? isFetchingNextPageCategoryProductList
      : isFetchingNextPageSearchProductList;

  const hasNextPage =
    productListType === "TODAY"
      ? hasNextPageTodayProductList
      : productListType === "CATEGORY"
      ? hasNextPageCategoryProductList
      : hasNextPageSearchProductList;

  const error =
    productListType === "TODAY"
      ? todayProductListError
      : productListType === "CATEGORY"
      ? categoryProductListError
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
