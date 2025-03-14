import { PurchaseTradingData, SaleTradingData } from "@/types/product-types";
import { ProductManageDeatilMenu } from "../../product-manage-page";
import ProductManageItemTradingContent from "./product-manage-item-trading-content";
import ProductManageItemTradingEndContent from "./product-manage-item-trading-end-content";
import ProductManageItemCancelReturnContent from "./product-manage-item-return-content";
import ProductManageItemCancelReturnRejectContent from "./product-manage-item-return-reject-content";
import FallbackImage from "@/components/commons/fallback-Image";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  detailMenu: ProductManageDeatilMenu;
}

export default function ProductManageItemContents({
  tradingData,
  detailMenu,
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
        {detailMenu === "거래중" && (
          <ProductManageItemTradingContent tradingData={tradingData} />
        )}
        {detailMenu === "거래완료 내역" && (
          <ProductManageItemTradingEndContent tradingData={tradingData} />
        )}
        {detailMenu === "취소/반품 내역" && (
          <ProductManageItemCancelReturnContent tradingData={tradingData} />
        )}
        {detailMenu === "취소/반품 거절 내역" && (
          <ProductManageItemCancelReturnRejectContent
            tradingData={tradingData}
          />
        )}
      </div>
    </div>
  );
}
