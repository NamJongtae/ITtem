import ProductListUI from "@/domains/product/components/product-list/product-list-ui";
import useProfileProductListInfiniteQuery from "@/domains/user/hooks/profile/queries/useProfileProductListInfiniteQuery";

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
