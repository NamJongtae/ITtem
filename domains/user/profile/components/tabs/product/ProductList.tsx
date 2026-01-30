import ProductListUI from "@/domains/product/shared/components/product-list/ProductListUI";
import useProfileProductListInfiniteQuery from "../../../hooks/queries/useProfileProductListInfiniteQuery";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import Empty from "@/shared/common/components/Empty";

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
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
}
