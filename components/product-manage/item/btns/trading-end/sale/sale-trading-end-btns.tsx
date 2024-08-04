import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import SaleTradineEndTradingDetailBtn from "./sale-trading-end-trading-detail-btn";
import SaleTradineEndReviewBtn from "./sale-trading-end-review-btn";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function SaleTradingEndBtns({ tradingData }: IProps) {
  if (tradingData.isReviewed) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <SaleTradineEndTradingDetailBtn tradingData={tradingData} />
        <SaleTradineEndReviewBtn productId={tradingData.productId} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <SaleTradineEndTradingDetailBtn tradingData={tradingData} />
      </div>
    );
  }
}
