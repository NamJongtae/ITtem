import {
  ProductManageStatusType,
  PurchaseTradingData,
  SaleTradingData
} from "@/domains/product/types/product-types";
import ProductManageItemTradingContent from "./product-manage-item-trading-content";
import ProductManageItemTradingEndContent from "./product-manage-item-trading-end-content";
import ProductManageItemCancelReturnContent from "./product-manage-item-return-content";
import ProductManageItemCancelReturnRejectContent from "./product-manage-item-return-reject-content";
import FallbackImage from "@/components/fallback-Image";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  productManageStatus: ProductManageStatusType;
}

function ContentByStatus({
  productManageStatus,
  tradingData
}: {
  productManageStatus: ProductManageStatusType;
  tradingData: SaleTradingData | PurchaseTradingData;
}) {
  switch (productManageStatus) {
    case "거래중":
      return <ProductManageItemTradingContent tradingData={tradingData} />;
    case "거래완료 내역":
      return <ProductManageItemTradingEndContent tradingData={tradingData} />;
    case "취소/반품 내역":
      return <ProductManageItemCancelReturnContent tradingData={tradingData} />;
    case "취소/반품 거절 내역":
      return (
        <ProductManageItemCancelReturnRejectContent tradingData={tradingData} />
      );
  }
}

export default function ProductManageItemContents({
  tradingData,
  productManageStatus
}: IProps) {
  return (
    <div className="flex gap-3 items-center">
      <FallbackImage
        className="w-32 h-32 object-cover object-center"
        src={tradingData.productImg}
        alt={tradingData.productName}
        width={120}
        height={120}
      />
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex">
          <span className="inline-block w-16">상품명</span>
          <span className="line-clamp-1">{tradingData.productName}</span>
        </div>
        <div>
          <span className="inline-block w-16">가격</span>
          <span>{tradingData.productPrice.toLocaleString()}</span>원
        </div>
        <ContentByStatus
          productManageStatus={productManageStatus}
          tradingData={tradingData}
        />
      </div>
    </div>
  );
}
