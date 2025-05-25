import { ProductDetailData } from "../../types/productDetailTypes";
import ReportBtn from "./ReportBtn";
import ContentInfoPrice from "./ContentInfoPrice";
import ContentInfoStatus from "./ContentInfoStatus";
import ContentInfoList from "./ContentInfoList";

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ContentInfo({ productDetailData }: IProps) {
  return (
    <>
      <h3 className="text-gray-700 text-3xl md:text-4xl">
        {productDetailData?.name}
      </h3>
      <ContentInfoPrice price={productDetailData?.price || 0} />
      <hr className="my-3" />
      <div className="flex justify-between">
        <ContentInfoStatus
          wishCount={productDetailData?.wishCount || 0}
          viewCount={productDetailData?.viewCount || 0}
          createdAt={productDetailData?.createdAt || ""}
        />
        <ReportBtn productDetailData={productDetailData} />
      </div>

      <ContentInfoList
        productDetailData={{
          condition: productDetailData?.condition,
          returnPolicy: productDetailData?.returnPolicy,
          transaction: productDetailData?.transaction,
          location: productDetailData?.location,
          deliveryFee: productDetailData?.deliveryFee
        }}
      />
    </>
  );
}
