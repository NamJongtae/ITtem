import useProfileProductListInfiniteQuery from "@/hooks/querys/useProfileProductListInfiniteQuery";
import { ProfileData } from "@/types/authTypes";
import Spinner from "../commons/spinner";
import Empty from "../commons/Empty";
import { isAxiosError } from "axios";
import ProductDetailSellerProductItem from "./product-detail-seller-product-item";
import ProductDetailSellerProductMoreBtn from "./product-detail-seller-product-moreBtn";

interface IProps {
  profileData: ProfileData | undefined;
}

export default function ProductDetailSellerProductList({
  profileData,
}: IProps) {
  const {
    profileProductListData,
    isLoadingProfileProductList,
    profileProductListError,
  } = useProfileProductListInfiniteQuery({
    productListType: "PROFILE",
    productIds: profileData?.productIds || [],
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
            profileData={profileData}
            profileProductListData={profileProductListData}
          />
        </>
      )}
    </div>
  );
}
