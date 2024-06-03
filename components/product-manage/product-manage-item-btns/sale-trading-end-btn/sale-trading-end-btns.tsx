import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import SeleTradingEndTradingDetailBtn from "./sale-trading-end-trading-detail-btn";
import SaleTradingEndReviewBtn from "./sale-trading-end-review-btn";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function SaleTradingEndBtns({ tradingData }: IProps) {
  if (tradingData.isReviewed) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <SeleTradingEndTradingDetailBtn tradingData={tradingData} />
        <SaleTradingEndReviewBtn productId={tradingData.productId} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <SeleTradingEndTradingDetailBtn tradingData={tradingData} />
      </div>
    );
  }
}