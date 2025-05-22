import {
  PurchaseTradingData,
  SaleTradingData
} from "@/domains/product/types/product-types";
import TradingDetailBtn from "./purchase-trading-end-trading-detail-btn";
import PurchaseTradingEndReviewBtn from "./purchase-trading-end-review-btn";
import PurchaseTradingEndReturnBtn from "../../trading/purchase/purchase-trading-return-btn";
import PurchaseTradingEndReviewUploadBtn from "./purchase-trading-end-review-upload-btn";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function PurchaseTradingEndBtns({ tradingData }: IProps) {
  const isReviewed = tradingData.isReviewed;
  const ReviewBtn = isReviewed ? (
    <PurchaseTradingEndReviewBtn productId={tradingData.productId} />
  ) : (
    <PurchaseTradingEndReviewUploadBtn productId={tradingData.productId} />
  );

  return (
    <div className="flex flex-row justify-end sm:flex-col gap-3">
      <TradingDetailBtn tradingData={tradingData} />
      {ReviewBtn}
      <PurchaseTradingEndReturnBtn productId={tradingData.productId} />
    </div>
  );
}
