import { PurchaseTradingData, SaleTradingData } from "@/types/product-types";
import TradingDetailBtn from "./purchase-trading-end-trading-detail-btn";
import PurchaseTradingEndReviewBtn from "./purchase-trading-end-review-btn";
import PurchaseTradingEndReturnBtn from "../../trading/purchase/purchase-trading-return-btn";
import PurchaseTradingEndReviewUploadBtn from "./purchase-trading-end-review-upload-btn";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function PurchaseTradingEndBtns({ tradingData }: IProps) {
  if (tradingData.isReviewed) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <TradingDetailBtn tradingData={tradingData} />
        <PurchaseTradingEndReviewBtn productId={tradingData.productId} />
        <PurchaseTradingEndReturnBtn productId={tradingData.productId} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <TradingDetailBtn tradingData={tradingData} />
        <PurchaseTradingEndReviewUploadBtn productId={tradingData.productId} />
        <PurchaseTradingEndReturnBtn productId={tradingData.productId} />
      </div>
    );
  }
}
