import { getTradingDateFormat } from "@/utils/getDateFormate";
import {
  PurchaseTradingData,
  SaleTradingData
} from "@/domains/product/types/product-types";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function TradeDetailModalDate({ tradingData }: IProps) {
  return (
    <>
      <div className="border-b border-gray-300 pb-2">
        <span className="font-medium w-20 inline-block">거래 시작</span>
        <span>
          {"saleStartDate" in tradingData
            ? getTradingDateFormat(tradingData.saleStartDate)
            : getTradingDateFormat(tradingData.purchaseStartDate)}
        </span>
      </div>

      <div className="border-b border-gray-300 pb-2">
        <span className="font-medium w-20 inline-block"> 거래 완료</span>
        <span>
          {"saleEndDate" in tradingData
            ? getTradingDateFormat(tradingData.saleEndDate || "")
            : "purchaseEndDate" in tradingData &&
              getTradingDateFormat(tradingData.purchaseEndDate || "")}
        </span>
      </div>
    </>
  );
}
