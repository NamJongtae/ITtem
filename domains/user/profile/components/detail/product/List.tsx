import ProductListUI from "@/domains/product/shared/components/product-list/ProductListUI";
import useProfileProductListInfiniteQuery from "../../../hooks/queries/useProfileProductListInfiniteQuery";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";

interface IProps {
  isMyProfile?: boolean;
  productIds: string[] | undefined;
  productCategory: ProductCategory;
}

export default function List({
  isMyProfile,
  productIds,
  productCategory
}: IProps) {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useProfileProductListInfiniteQuery({
      productListType: isMyProfile ? "MY_PROFILE" : "PROFILE",
      productCategory,
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
