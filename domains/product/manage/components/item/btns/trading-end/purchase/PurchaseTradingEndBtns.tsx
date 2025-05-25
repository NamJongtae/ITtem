import {
  SaleTradingData,
  PurchaseTradingData
} from "@/domains/product/manage/types/productManageTypes";
import DetailBtn from "./DetailBtn";
import ReviewBtn from "./ReviewBtn";
import ReturnBtn from "../../trading/purchase/ReturnBtn";
import ReviewUploadBtn from "./ReviewUploadBtn";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function PurchaseTradingEndBtns({ tradingData }: IProps) {
  const isReviewed = tradingData.isReviewed;
  const reviewActionButton = isReviewed ? (
    <ReviewBtn productId={tradingData.productId} />
  ) : (
    <ReviewUploadBtn productId={tradingData.productId} />
  );

  return (
    <div className="flex flex-row justify-end sm:flex-col gap-3">
      <DetailBtn tradingData={tradingData} />
      {reviewActionButton}
      <ReturnBtn productId={tradingData.productId} />
    </div>
  );
}
