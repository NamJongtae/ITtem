import useProfileProductListInfiniteQuery from "@/hooks/querys/useProfileProductListInfiniteQuery";
import Spinner from "../commons/spinner";
import Empty from "../commons/Empty";
import { isAxiosError } from "axios";
import ProductDetailSellerProductItem from "./product-detail-seller-product-item";
import ProductDetailSellerProductMoreBtn from "./product-detail-seller-product-moreBtn";
import { ProductDetailAuthData } from '@/types/productTypes';

interface IProps {
  auth: ProductDetailAuthData | undefined;
}

export default function ProductDetailSellerProductList({
  auth,
}: IProps) {
  const {
    profileProductListData,
    isLoadingProfileProductList,
    profileProductListError,
  } = useProfileProductListInfiniteQuery({
    productListType: "PROFILE",
    productIds: auth?.productIds || [],
    limit: 9,
  });

  return (
    <div className="mt-2">
      <h4>판매자의 다른 상품</h4>
      <hr className="border-0 h-px mt-2 mb-5 bg-gray-200" />

      {isLoadingProfileProductList ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : profileProductListError ? (
        <Empty
          message={
            (isAxiosError<{ message: string }>(profileProductListError) &&
              profileProductListError.response?.data.message) ||
            ""
          }
        />
      ) : (
        <>
          <ul className="grid grid-cols-autoFill_140 lg:grid-cols-autoFill_180 xl:grid-cols-3 gap-3">
            {profileProductListData?.map((data) => (
              <ProductDetailSellerProductItem
                key={data._id}
                productData={data}
              />
            ))}
          </ul>
          <ProductDetailSellerProductMoreBtn
            auth={auth}
          />
        </>
      )}
    </div>
  );
}
