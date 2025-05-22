import { ProductDetailData } from "../../../types/product-types";
import ProductDetailReportBtn from "../product-detail-report-btn";
import ProductDetailContentInfoPrice from "./product-detail-content-info-price";
import ProductDetailContentInfoStatus from "./product-detail-content-info-status";
import ProductDetailContentInfoList from "./product-detail-content-info-list";

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ProductDetailContentInfo({
  productDetailData
}: IProps) {
  return (
    <>
      <h3 className="text-gray-700 text-3xl md:text-4xl">
        {productDetailData?.name}
      </h3>
      <ProductDetailContentInfoPrice price={productDetailData?.price || 0} />
      <hr className="my-3" />
      <div className="flex justify-between">
        <ProductDetailContentInfoStatus
          wishCount={productDetailData?.wishCount || 0}
          viewCount={productDetailData?.viewCount || 0}
          createdAt={productDetailData?.createdAt || ""}
        />
        <ProductDetailReportBtn productDetailData={productDetailData} />
      </div>

      <ProductDetailContentInfoList
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
