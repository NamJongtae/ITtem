import { getTradingDateFormat } from "@/lib/getDateFormate";
import { PurchaseTradingData, SaleTradingData } from "@/types/product-types";

interface IProps {
  tradingData: SaleTradingData | PurchaseTradingData;
}

export default function ProductManageItemTradingEndContent({
  tradingData,
}: IProps) {
  return (
    <>
      {"saleStartDate" in tradingData && (
        <div>
          <span className="inline-block w-16">판매일</span>
          <time dateTime={tradingData.saleStartDate}>
            {getTradingDateFormat(tradingData.saleStartDate)}
          </time>
        </div>
      )}
      {"saleEndDate" in tradingData && (
        <div>
          <span className="inline-block w-16">판매 완료</span>
          <time dateTime={tradingData.saleEndDate}>
            {getTradingDateFormat(tradingData.saleEndDate!)}
          </time>
        </div>
      )}
      {"purchaseStartDate" in tradingData && (
        <div>
          <span className="inline-block w-16">구매일</span>
          <time dateTime={tradingData.purchaseStartDate}>
            {getTradingDateFormat(tradingData.purchaseStartDate)}
          </time>
        </div>
      )}
      {"purchaseEndDate" in tradingData && (
        <div>
          <span className="inline-block w-16">구매 완료</span>
          <time dateTime={tradingData.purchaseEndDate}>
            {getTradingDateFormat(tradingData.purchaseEndDate!)}
          </time>
        </div>
      )}
    </>
  );
}
