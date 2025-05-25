import {
  SaleTradingData,
  PurchaseTradingData
} from "@/domains/product/manage/types/productManageTypes";
import DetailBtn from "./DetailBtn";
import ReviewBtn from "./ReviewBtn";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function SaleTradingEndBtns({ tradingData }: IProps) {
  if (tradingData.isReviewed) {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <DetailBtn tradingData={tradingData} />
        <ReviewBtn productId={tradingData.productId} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-end sm:flex-col gap-3">
        <DetailBtn tradingData={tradingData} />
      </div>
    );
  }
}
