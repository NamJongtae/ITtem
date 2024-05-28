import {
  PurchaseTradingData,
  SaleTradingData,
  TradingStatus,
} from "@/types/productTypes";
import { ProductManageMenu } from "./product-manage-page";
import PurchaseTradingEndReviewUploadBtn from "./purchase-trading-end-btn/purchase-trading-end-review-upload-btn";
import PurchaseTradingEndReviewBtn from "./purchase-trading-end-btn/purchase-trading-end-review-btn";
import SaleTradingEndReviewBtn from "./modal/sale-trading-end-btn/sale-trading-end-review-btn";

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
          <SaleTradingEndReviewBtn productId={tradingData.productId} />
        </div>
      );
    }
  } else {
    if (tradingData.isReviewed) {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <PurchaseTradingEndReviewBtn productId={tradingData.productId} />
          <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
            환불요청
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <PurchaseTradingEndReviewUploadBtn
            productId={tradingData.productId}
          />
          <button className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600">
            환불요청
          </button>
        </div>
      );
    }
  }

  return null;
}
