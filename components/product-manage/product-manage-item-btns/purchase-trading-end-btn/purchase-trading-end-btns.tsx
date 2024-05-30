import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import PurchaseTradingEndTradingDetailBtn from "./purchase-trading-end-trading-detail-btn";
import PurchaseTradingEndReviewBtn from "./purchase-trading-end-review-btn";
import PurchaseTradingReturnBtn from "../purchase-trading-btns/purchase-trading-return-btn";
import PurchaseTradingEndReviewUploadBtn from "./purchase-trading-end-review-upload-btn";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function PurchaseTradingEndBtns({ tradingData }: IProps) {
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
        <PurchaseTradingEndReviewUploadBtn productId={tradingData.productId} />
        <PurchaseTradingReturnBtn productId={tradingData.productId} />
      </div>
    );
  }
}
