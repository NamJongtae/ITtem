import useProfileQuery from "@/hooks/querys/useProfileQuery";
import { isAxiosError } from "axios";
import Empty from "../commons/Empty";
import Spinner from "../commons/spinner";
import ProductDetailSellerInfo from "./produdct-detail-seller-info";
import ProductDetailSellerProductList from "./product-detail-seller-product-list";

interface IProps {
  uid: string | undefined;
}

export default function ProductDeatilSeller({ uid }: IProps) {
  const { profileData, loadProfileDataLoading, loadProfileDataError } =
    useProfileQuery(uid || "");

  return (
    <section className="basis-1/3">
      <h3 className="text-gray-600 text-xl font-medium">판매자 정보</h3>

      <hr className="h-px border-0 bg-gray-500 my-3" />
      {loadProfileDataLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : loadProfileDataError ? (
        <Empty
          message={
            (isAxiosError<{ message: string }>(loadProfileDataError) &&
              loadProfileDataError.response?.data.message) ||
            ""
          }
        />
      ) : (
        <>
          <ProductDetailSellerInfo profileData={profileData} />
          <ProductDetailSellerProductList profileData={profileData} />
        </>
      )}
    </section>
  );
}
