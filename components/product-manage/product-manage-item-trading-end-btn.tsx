import {
  PurchaseTradingData,
  SaleTradingData,
  TradingStatus,
} from "@/types/productTypes";
import { ProductManageMenu } from "./product-manage-page";
import PurchaseTradingEndReviewUploadBtn from "./purchase-trading-end-btn/purchase-trading-end-review-upload-btn";
import PurchaseTradingEndReviewBtn from "./purchase-trading-end-btn/purchase-trading-end-review-btn";
import SaleTradingEndReviewBtn from "./sale-trading-end-btn/sale-trading-end-review-btn";
import PurchaseTradingReturnBtn from "./purchaseTradingBtn/purchase-trading-return-btn";
import PurchaseTradingEndTradingDetailBtn from "./purchase-trading-end-btn/purchase-trading-end-trading-detail-btn";
import SeleTradingEndTradingDetailBtn from "./sale-trading-end-btn/sale-trading-end-trading-detail-btn";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
  menu: ProductManageMenu;
}
export default function ProductManageItemTradingEndBtn({
  tradingData,
  menu,
}: IProps) {
  if (menu === "판매") {
    if (tradingData.isReviewed) {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <SeleTradingEndTradingDetailBtn tradingData={tradingData} />
          <SaleTradingEndReviewBtn productId={tradingData.productId} />
        </div>
      );
    }
  } else {
    if (tradingData.isReviewed) {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <PurchaseTradingEndTradingDetailBtn tradingData={tradingData} />
          <PurchaseTradingEndReviewBtn productId={tradingData.productId} />
          <PurchaseTradingReturnBtn productId={tradingData.productId} />
        </div>
      );
    } else {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <PurchaseTradingEndTradingDetailBtn tradingData={tradingData} />
          <PurchaseTradingEndReviewUploadBtn
            productId={tradingData.productId}
          />
          <PurchaseTradingReturnBtn productId={tradingData.productId} />
        </div>
      );
    }
  }

  return null;
}
