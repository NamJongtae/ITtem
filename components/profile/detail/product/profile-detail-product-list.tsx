import ProductListUI from "@/components/commons/product-list/product-list-ui";
import useProfileProductListInfiniteQuery from "@/hooks/react-query/queries/profile/useProfileProductListInfiniteQuery";
import React from "react";

interface IProps {
  isMyProfile?: boolean;
  productIds: string[] | undefined;
}

export default function ProfileDetailProductList({
  isMyProfile,
  productIds
}: IProps) {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useProfileProductListInfiniteQuery({
      productListType: isMyProfile ? "MY_PROFILE" : "PROFILE",
      productIds: productIds || []
    });
  return (
    <ProductListUI
      data={data}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      emptyMessage="상품이 존재하지 않아요."
    />
  );
}
